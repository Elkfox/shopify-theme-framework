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

concrete.pushNewUrl = function(url) {
  window.history.replaceState({path: url}, '', url);
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
