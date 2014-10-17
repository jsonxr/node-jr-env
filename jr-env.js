
function wordwrap( str, width, brk, cut ) {

  brk = brk || '\n';
  width = width || 75;
  cut = cut || false;

  if (!str) { return str; }

  var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');

  return str.match( new RegExp(regex, 'g') ).join( brk );

}

function forEachKey(obj, fn) {
  var key, value;

  if (obj) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        value = obj[key];
        fn(key, value);
      }
    }
  }
}

function parseBool(value) {
  return (value && 'true' === value.toString());
}


//TODO: Add required attribute for each value. Some values are not required to be overridden in non development environments.





//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------

function shellScriptWrap(value) {
  if (typeof value === 'string') {
    return '"' + value + '"'
  } else if( Object.prototype.toString.call(value) === '[object Array]' ) {
    return '"' + value.join(",") + '"'
  } else {
    return value
  }
}


function jrEnv(defaults) {
  var env = {};
  // Chec the process.env for overrides
  forEachKey(defaults, function (key, variable) {
    var type = typeof variable.value;
    
    if (process.env[key] !== undefined) {
      if (type === 'number') {
        env[key] = parseInt(process.env[key], 10);
      } else if (type === 'boolean') {
        env[key] = parseBool(process.env[key]);
      } else if( Object.prototype.toString.call(variable.value) === '[object Array]' ) {
        // Array
        env[key] = process.env[key].split(',');
      } else {
        env[key] = process.env[key];
      }
    } else {
      env[key] = variable.value;
    }
  });

  env.check = function () {
    var description;
    forEachKey(defaults, function (key, value) {
      console.log('#----------------------------------------------------------------------------');
      console.log('# ' + key);
      console.log('#----------------------------------------------------------------------------');
      if (defaults[key].description) {
        description = '# ' + defaults[key].description;
        console.log(wordwrap(description, 76, '\n# '));
      }
        console.log('#');
        console.log('# export ' + key + '=' + shellScriptWrap(defaults[key].value));
        if (process.env[key] !== undefined) {
          console.log()
          console.log("export " + key + '=' + shellScriptWrap(env[key]));
        } else {
          if (defaults[key].required) {
            console.log("echo WARNING: " + key + " is a required setting")
            console.log("# export " + key + '=');
          }
        }
      console.log()
      console.log()
    });

  };
  
  return env;
}


module.exports = jrEnv;