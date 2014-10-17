var jrEnv = require('./jr-env');

var env = jrEnv({
  NODE_ENV: {
    required: true,
    value: 'development'
  },
  HOST_NAME: {
    required: true,
    value: 'www.myserver.com',
    description: 'This is the maximum number of processors to use. If set to' +
                 ' 0, then it will use the number of CPUs in the system. The' +
                 ' default is 2 to ensure testing of load balanced environments'
  },
  PORT: {
    required: true,
    value: 3000,
    description: 'Port that the server listens on'
  },
  MYBOOL: {
    required: false,
    value: false,
    description: 'Example boolean value. Possible values are true/false'
  },
  MYARR: {
    required: false,
    value: ['*','*'],
    description: 'Example Array'
  },
  MYARR2: {
    required: false,
    value: ['*'],
    description: 'Example Array'
  }
});

env.check();



