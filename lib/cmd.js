import dir from './dir';

let options = {
  workspace: "/Users/zhangzimeng/Workspace/AwesomeProject10",
  entry: "./Examples/HelloWorld/index.android.js",
  output: "./Examples/HelloWorld/bundle"
};

module.exports = {

  options: options,

  dir: dir(options.workspace)

}
