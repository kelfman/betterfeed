require('babel-core').transform('code', {plugins: ['transform-class-properties']});
require('babel-core/register')({presets: ['es2015', 'react', 'stage-0']});
require('../server/index');
