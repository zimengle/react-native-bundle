const babel = require('babel-core');
import fs from 'fs';
const transform = (code)=> {
    var result = babel.transform(code, {
        'presets': [ 'es2015', 'stage-0', 'react' ],
        'plugins': [ 'transform-es5-property-mutators', 'transform-class-properties' ]
    });
    return result.code;
}

(()=>{
    const code = transform(fs.readFileSync("/Users/zhangzimeng/Workspace/AwesomeProject10/index.android.js","utf-8"));
    fs.writeFileSync(__dirname+"/../code.js",code);
})();

