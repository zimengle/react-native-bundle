import log4js from 'log4js';
import {options} from './cmd';
import fs from 'fs-extra';
import {spawn} from 'child-process-promise';
import _dir from './dir';
import metaGenerator from './commonMeta';
const logger = log4js.getLogger();

const dir = _dir(options.workspace);

const reactBundle = async(workspace, entryFile, output, platform, dev = false, sourcemap = null, assets = null)=> {
  let args = ['bundle', '--bundle-output', output, '--dev', dev, '--entry-file', entryFile, '--platform', platform];

  if (assets) {
    args = args.concat(['--assets-dest', assets]);
  }

  if (sourcemap) {
    args = args.concat(['--sourcemap-output', sourcemap]);
  }

  return spawn('react-native',
    args,
    {
      cwd: workspace,
      capture: ['stdout', 'stderr']
    }
  );
}

const packCommon = async(platform) => {

  const commonDir = dir.packCommonDir(platform);

  logger.info("pack common bundle start...");

  logger.info(`copy fake.js from ${dir.tpl.fake} to ${commonDir.fake}`);

  fs.copySync(dir.tpl.fake, commonDir.fake);

  logger.info(`bundle fake entry`);

  await reactBundle(options.workspace, commonDir.fake, commonDir.bundle, platform, false, commonDir.sourcemap);

  metaGenerator(commonDir.bundle,commonDir.sourcemap,commonDir.meta);

  logger.info(`pack common bundle end on path ${JSON.stringify(commonDir)}`);


}

(async()=> {
  try {
    await packCommon("android");
  } catch (e) {
    logger.error(e);
  }
})();



