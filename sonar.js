const scanner = require('sonarqube-scanner');

scanner({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectKey': 'squ_f2b04676d208bb38ff586f681650ab88aa90688b',
    'sonar.sources': 'src',
    'sonar.tests': 'tests,__tests__',
    'sonar.exclusions': 'node_modules/**,public/**,.next/**',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.sourceEncoding': 'UTF-8'
  },
}, () => process.exit());