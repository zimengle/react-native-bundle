'use strict'
import sourceMap from 'source-map';
import fs from 'fs';
import docblock from 'node-haste/lib/DependencyGraph/docblock.js';
import path from 'path';
const ifEmpty = function () {
  for (var i = 0, args = arguments; i < args.length - 1; i++) if (args[i]) return args[i];
  return args[i];
}

const parse = function (sourceRealpath) {
  var parts = sourceRealpath.split(path.sep);
  var index = parts.lastIndexOf('node_modules');

  if (index < 0) return null;

  // 获取模块名称。
  var moduleName = parts[++index];
  if (moduleName.startsWith('@')) {
    moduleName += '/' + parts[++index];
  }

  // 获取模块 package.json 数据。
  var packageJson = require(parts.slice(0, ++index).concat('package.json').join(path.sep));

  // 获取脚本在模块内的相对路径。
  var relapath = parts.slice(index).join('/');

  // 获取脚本在模块内的相对路径（省略文件名后缀）。
  var relapathWithoutPostfix = relapath.substr(0, relapath.length - path.extname(relapath).length);

  var shortname = moduleName + '/' + relapathWithoutPostfix;
  var fullname = moduleName + '/' + relapath;

  var names = [
    fullname,
    shortname
  ];

  var main = ifEmpty(packageJson.main, 'index.js');
  // 如果脚本文件为模块入口文件，则模块名亦可直接作为引用名。
  if (main == relapath || main == relapathWithoutPostfix) {
    names.push(shortname = moduleName);
  }

  return {
    version: packageJson.version,

    // @TODO 获取脚本所属模块的版本范围信息。
    versionRange: null,

    names: names,
    shortname: shortname
  }
};

const metaGenerator = (bundle,sourcemap,metapath)=> {
  let commonBundleCode = fs.readFileSync(bundle, 'utf8');

  let reDefine = /^__d\((\d+)/;
  let reNewline = /\r\n|\r|\n/;
  let commonSMC = new sourceMap.SourceMapConsumer(
    JSON.parse(fs.readFileSync(sourcemap, 'utf8'))
  );

  const moduleMetas = [];
  commonBundleCode.split(reNewline).forEach((line, index)=> {
    if (!reDefine.test(line)) return;
    var moduleId = RegExp.$1;
    if ("0" == moduleId) return;
    var pos = {line: index + 1, column: line.indexOf('{') + 1 + 1};
    var info = commonSMC.originalPositionFor(pos);

    if (!info.source) {

    }

    var blockInfos = docblock.parse(fs.readFileSync(info.source, 'utf8'));

    var providesModule;
    for (let i = 0; i < blockInfos.length; i++) {
      if (blockInfos[i][0] == 'providesModule') {
        providesModule = blockInfos[i][1];
        break;
      }
    }
    var moduleMeta = parse(info.source);
    if(!moduleMeta){
      console.error(info.source);
    }
    moduleMeta['android'] = moduleId;
    if (providesModule) {
      moduleMeta.names.push(providesModule);
      moduleMeta.shortname = providesModule;
    }
    moduleMetas.push(moduleMeta);

  });

  fs.writeFile(metapath, JSON.stringify(moduleMetas));
}

module.exports = metaGenerator;

// metaGenerator("/Users/zhangzimeng/Workspace/AwesomeProject10/.packCommon/android/bundle.js","/Users/zhangzimeng/Workspace/AwesomeProject10/.packCommon/android/sourcemap.json","/Users/zhangzimeng/Workspace/AwesomeProject10/.packCommon/android/meta.json")

