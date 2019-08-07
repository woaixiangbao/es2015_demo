'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = download;

var _utils = require('./utils');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _copy = require('./copy');

var _copy2 = _interopRequireDefault(_copy);

var _download = require('./download');

var _download2 = _interopRequireDefault(_download);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function download(source, target, progress) {
  target = target || (0, _utils.randomFilename)(download.tmpDir);
  progress = progress || _utils.noop;
  return new Promise(function (resolve, reject) {
    (0, _mkdirp2.default)(_path2.default.dirname(target), function (err) {
      if (err) return (0, _util.callbackify)(err);
      resolve(((0, _utils.isURL)(source) ? _download2.default : _copy2.default)(source, target, progress));
    });
  });
}