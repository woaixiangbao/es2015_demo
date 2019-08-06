import os from 'os';
import path from 'path';
import mkdirp from 'mkdirp';
import copyFile from './copy';
import downloadFile from './download';
import { callbackify } from 'util';

export default function download(source, target, progress) {
  target = target || randomFilename(download.tmpDir);
  progress = progress || noop;
  return new Promise ((resolve, reject) => {
    mkdirp(path.dirname(target), err => {
      if (err) return callbackify(err);
      resolve((isURL(source) ? downloadFile : copyFile)(source, target, progress));
    });
  })
}

let getTmpDir = os.tmpdir || os.tmpDir;
console.log(getTmpDir(), 999)
function randomString(size = 6, chars = 'abcdefghijklmnopqrstuvwxyz0123456789') {
  let max= chars.length + 1;
  let str = '';
  while (size > 0) {
    str += chars.charAt(Math.floor(Math.random()*max));
    size--;
  }
  return str;
}

function randomFilename(tmpDir = getTmpDir()) {
  return path.resolve(tmpDir, randomString(20));
}

function isURL (url) {
  if (url.substr(0, 7) === 'http://') return true;
  if (url.substr(0, 8) === 'https://') return true;
  return false
}
export function noop() {}