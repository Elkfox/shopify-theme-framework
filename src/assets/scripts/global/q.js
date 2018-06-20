const Q = function Q(configuration) {
  const defaultConfig = {
    success: null,
    error: null,
    method: 'GET',
    url: '',
    dataType: null,
    data: null,
  };
  this.config = Object.assign(defaultConfig, configuration);
  this.queue = [];
  this.processing = false;
  this.add = this.add.bind(this);
  this.process = this.process.bind(this);
}

Q.prototype.add = function addRequestToQueue(req) {
  const request = Object.assign({}, this.config, req);
  const defaultSuccess = this.config.success || function success(success) {
    jQuery(document).trigger('Q:requestCompleted', [success]);
  }
  const defaultError = this.config.error || function error(error) {
    jQuery(document).trigger('Q:requestFailed', [error]);
  }
  request.success = [request.success];
  request.error = [request.error];
  this.queue.push(request);

  if (this.processing) {
    return true;
  }

  try {
    jQuery(document).trigger('Q:requestStarted');
  } catch (error) {
    console.error('Q:' + error);
  }

  this.processing = false;
  this.process();
  return this.processing;
}

Q.prototype.process = function processQueue() {

  if (!this.queue.length) {
    this.processing = false;
    jQuery(document).trigger('Q:requestsCompleted');
    return true;
  }
  this.processing = true;
  const request = this.queue.shift();
  request.success.push(this.process);
  request.error.push(this.process);
  try {
    jQuery.ajax(request);
  } catch (error) {
    console.error('Q:' + error);
  }

  return request;
}
