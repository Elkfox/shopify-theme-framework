// replace urlparameter
concrete.replaceUrlParam = function(url, paramName, paramValue){
    if(paramValue == null)
        paramValue = '';
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)')
    if(url.search(pattern)>=0){
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue
}

concrete.removeUrlParam = function(url, paramName) {
  // Use this function incase we are not removing the url of the current page.
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
