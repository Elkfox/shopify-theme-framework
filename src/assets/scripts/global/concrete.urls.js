/*
  This plugin brings your URL states to life
  Especially useful for collection sorting and alternate views

  Using the canonical_url object, you can use certain params in both liquid and js
  Params available in canonincal_url: blog, page, collection, handle, type, vendor, q
*/

// Replace URL Parameters
concrete.replaceUrlParam = function(url, paramName, paramValue){
    if(paramValue == null)
        paramValue = '';
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)')
    if(url.search(pattern)>=0){
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue
}

// Remove URL Parameters
// Useful for situations where we don't want to remove all current URL params
concrete.removeUrlParam = function(url, paramName) {
  let value = concrete.getUrlParameterByName(paramName, url);
  let newUrl = '';
  if(url.indexOf('?'+paramName+'='+value) > -1) {
    if (location.search.split('&').length > 1) {
      newUrl = url.replace(paramName+'=', '').replace(value+'&', '');
    } else {
      newUrl = url.replace('?'+paramName+'=', '').replace(value, '');
    }
  } else {
    newUrl = url.replace('&'+paramName+'=', '').replace(value, '');
  }

  return newUrl;
}

// Get URL Parameters
concrete.getUrlParameters = function(){
  parameters = {};
  if (location.search.length) {
    for (var value, i = 0, pairs = location.search.substr(1).split('&'); i < pairs.length; i++) {
      value = pairs[i].split('=');
      if (value.length > 1) {
        parameters[decodeURIComponent(value[0])] = decodeURIComponent(value[1]);
      }
    }
  }
  return parameters;
}

// Push a new URL
// Handy when you want a stable and functional browser history
concrete.pushNewUrl = function(url, method) {
  method = method || 'push'
  if(method == 'push') {
    window.history.pushState({path: url}, '', url);
  } else {
    window.history.replaceState({path: url}, '', url);
  }
}

// Collection template sorting
concrete.getUrlParameterByName = function(parameter) {
  var url = decodeURIComponent(window.location.search.substring(1)),
      urlVariables = url.split('&'),
      parameterName;

  for (i = 0; i < urlVariables.length; i++) {
    parameterName = urlVariables[i].split('=');
    if (parameterName[0] === parameter) {
      return parameterName[1] === undefined ? true : parameterName[1];
    }
  }
};

concrete.urlParams = concrete.getUrlParameters();
