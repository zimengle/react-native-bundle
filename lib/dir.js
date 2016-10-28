import mkdirp from 'mkdirp-promise';

/**
 * 目录结构，参见README.md
 */

const dir = (workSpace)=> {

  return {
    tpl: {
      fake: __dirname + "/../tpl/fake.js"
    },
    packCommonDir: (platform)=> {
      let base = workSpace + "/.packCommon/" + platform + "/";
      mkdirp(base);
      return {
        fake: base + "fake.js",
        bundle: base + "bundle.js",
        sourcemap: base + "sourcemap.json",
        meta: base + "meta.json"
      }
    }
  }
}

module.exports = dir;
