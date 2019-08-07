import {randomFilename, isURL, noop, callbackify} from './utils';
import path from 'path';
import mkdirp from 'mkdirp';
import copyFile from './copy';
import downloadFile from './download';

export default callbackify(function download(source, target, progress) {
  target = target || randomFilename(download.tmpDir);
  progress = progress || noop;
  return new Promise ((resolve, reject) => {
    mkdirp(path.dirname(target), err => {
      if (err) return callbackify(err);
      resolve((isURL(source) ? downloadFile : copyFile)(source, target, progress));
    });
  })
});