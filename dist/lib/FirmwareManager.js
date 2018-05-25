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

var _class, _temp;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _binaryVersionReader = require('binary-version-reader');

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _settings3 = require('../../third-party/settings.json');

var _settings4 = _interopRequireDefault(_settings3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FirmwareManager = (_temp = _class = function FirmwareManager() {
  (0, _classCallCheck3.default)(this, FirmwareManager);

  this.getKnownAppFileName = function () {
    throw new Error('getKnownAppFileName has not been implemented.');
  };
}, _class.getOtaSystemUpdateConfig = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(systemInformation) {
    var platformID, resolver, missingDependencies, missingDependency, moduleFunction, firstDependency, systemFile;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            platformID = systemInformation.p;
            resolver = new _binaryVersionReader.HalDependencyResolver();
            missingDependencies = resolver.findAnyMissingDependencies(systemInformation);

            if (!(!missingDependencies || !missingDependencies.length)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', null);

          case 5:
            missingDependency = missingDependencies[0];
            moduleFunction = missingDependency.f === 'b' ? 2 : 4;
            firstDependency = _settings4.default.find(function (_ref2) {
              var prefixInfo = _ref2.prefixInfo;
              return prefixInfo.platformID === platformID && prefixInfo.moduleVersion === missingDependency.v && prefixInfo.moduleFunction === moduleFunction;
            });

            if (firstDependency) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', null);

          case 10:
            systemFile = _fs2.default.readFileSync(_settings2.default.BINARIES_DIRECTORY + '/' + firstDependency.filename);
            return _context.abrupt('return', {
              moduleFunction: moduleFunction,
              moduleIndex: missingDependency.n,
              systemFile: systemFile
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), _class.getAppModule = function (systemInformation) {
  var parser = new _binaryVersionReader.HalDescribeParser();
  return (0, _nullthrows2.default)(parser.getModules(systemInformation)
  // Filter so we only have the app modules
  .find(function (module) {
    return module.func === 'u';
  }));
}, _temp);
exports.default = FirmwareManager;