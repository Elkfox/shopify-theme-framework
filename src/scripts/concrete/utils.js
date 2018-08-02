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

concrete.handlebarsHelpers = (function() {
  /*
    Task: Compare two values and return true or false
  */
  Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
    'use strict';
    var operators = {
      '==': v1 == v2 ? true : false,
      '===': v1 === v2 ? true : false,
      '!=': v1 != v2 ? true : false,
      '!==': v1 !== v2 ? true : false,
      '>': v1 > v2 ? true : false,
      '>=': v1 >= v2 ? true : false,
      '<': v1 < v2 ? true : false,
      '<=': v1 <= v2 ? true : false,
      '||': v1 || v2 ? true : false,
      '&&': v1 && v2 ? true : false
    }
    if (operators.hasOwnProperty(operator)) {
      if (operators[operator]) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
    return console.error('Error: Operator "' + operator + '" not found');
  });

  /*
    Task: Return the size of an object
  */
  Handlebars.registerHelper('size', function (object, amount, options) {
    var size = 0;
    for (key in object) {
      if (object.hasOwnProperty(key)) size++;
    }
    if (size > amount) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  /*
    Task: Output image url at a specified size, similar to Shopify's liquid filter
  */
  Handlebars.registerHelper('img_url', function (options) {
    var image = options.hash['image'],
        size = options.hash['size'],
        scale = options.hash['scale'] || 1,
        url = image;

    if (typeof(image) != 'undefined') {
      if (typeof(size) != 'undefined') {
        if (size.indexOf('x') != -1) {
          var filter = size.indexOf('x'),
              chars = size.length,
              sizes = size.split('x'),
              size = '';

          for (i = 0; i < sizes.length; i++) {
            if ((filter == 0 && i == 0) || (filter != 0 && i != 0)) {
              size += 'x';
            }
            if (sizes[i] != 0) {
              size += sizes[i] * scale;
            }
            if (filter == chars && i == 0) {
              size += 'x';
            }
          }
          size = '_' + size + '.';
          url = image.replace(/.([^.]*)$/, size + '$1');
        }
      }

      return url;
    }
  });

  /*
    Task: Split a string at the requested position
  */
  Handlebars.registerHelper('split', function(content, split, position, options) {
    if (content !== null && content !== undefined) {
      if (content.indexOf(split) >= 0) {
        var split = content.split(split);
        return split[position];
      } else {
        return content;
      }
    } else {
      return false;
    }
  });

  /*
    Task: Format money using the Cartfox formatMoney function
  */
  Handlebars.registerHelper('formatMoney', function (amount, options) {
    return cartFox.formatMoney(amount);
  });
}());
