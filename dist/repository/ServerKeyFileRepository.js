'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _FileManager = require('./FileManager');

var _FileManager2 = _interopRequireDefault(_FileManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServerKeyFileRepository = function ServerKeyFileRepository(serverKeysDir, serverKeyFileName) {
  var _this = this;

  (0, _classCallCheck3.default)(this, ServerKeyFileRepository);

  this.createKeys = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(privateKeyPem, publicKeyPem) {
      var extIdx, pubPemFilename;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              extIdx = _this._serverKeyFileName.lastIndexOf('.');
              pubPemFilename = _this._serverKeyFileName.substring(0, extIdx) + '.pub.pem';


              _this._fileManager.createFile(_this._serverKeyFileName, privateKeyPem);
              _this._fileManager.createFile(pubPemFilename, publicKeyPem);

              return _context.abrupt('return', { privateKeyPem: privateKeyPem, publicKeyPem: publicKeyPem });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.getPrivateKey = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _this._fileManager.getFile(_this._serverKeyFileName));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  this._fileManager = new _FileManager2.default(serverKeysDir);
  this._serverKeyFileName = serverKeyFileName;
};

exports.default = ServerKeyFileRepository;