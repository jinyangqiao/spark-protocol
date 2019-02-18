'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _dec2, _dec3, _dec4, _desc, _value, _class;

var _JSONFileManager = require('./JSONFileManager');

var _JSONFileManager2 = _interopRequireDefault(_JSONFileManager);

var _memoizeGet = require('../decorators/memoizeGet');

var _memoizeGet2 = _interopRequireDefault(_memoizeGet);

var _memoizeSet = require('../decorators/memoizeSet');

var _memoizeSet2 = _interopRequireDefault(_memoizeSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

// getByID, deleteByID and update uses model.deviceID as ID for querying
var DeviceAttributeFileRepository = (_dec = (0, _memoizeSet2.default)(), _dec2 = (0, _memoizeSet2.default)(['deviceID']), _dec3 = (0, _memoizeGet2.default)(['deviceID']), _dec4 = (0, _memoizeGet2.default)(), (_class = function () {
  function DeviceAttributeFileRepository(path) {
    var _this = this;

    (0, _classCallCheck3.default)(this, DeviceAttributeFileRepository);

    this.create = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(model) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('Create device attributes not implemented');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    this.getAll = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var userID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var allData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this._getAll();

              case 2:
                allData = _context2.sent;

                if (!userID) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', allData.filter(function (attributes) {
                  return attributes.ownerID === userID;
                }));

              case 5:
                return _context2.abrupt('return', allData);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function () {
        return _ref2.apply(this, arguments);
      };
    }();

    this._fileManager = new _JSONFileManager2.default(path);
  }

  // eslint-disable-next-line no-unused-vars


  (0, _createClass3.default)(DeviceAttributeFileRepository, [{
    key: 'updateByID',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(deviceID, props) {
        var currentAttributes, modelToSave;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getByID(deviceID);

              case 2:
                currentAttributes = _context3.sent;
                modelToSave = (0, _extends3.default)({}, currentAttributes || {}, props, {
                  timestamp: new Date()
                });


                this._fileManager.writeFile(deviceID + '.json', modelToSave);
                return _context3.abrupt('return', modelToSave);

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateByID(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return updateByID;
    }()
  }, {
    key: 'deleteByID',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(deviceID) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._fileManager.deleteFile(deviceID + '.json');

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteByID(_x5) {
        return _ref4.apply(this, arguments);
      }

      return deleteByID;
    }()
  }, {
    key: 'getByID',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(deviceID) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', this._fileManager.getFile(deviceID + '.json'));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getByID(_x6) {
        return _ref5.apply(this, arguments);
      }

      return getByID;
    }()
  }, {
    key: '_getAll',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', this._fileManager.getAllData());

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _getAll() {
        return _ref6.apply(this, arguments);
      }

      return _getAll;
    }()
  }]);
  return DeviceAttributeFileRepository;
}(), (_applyDecoratedDescriptor(_class.prototype, 'updateByID', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateByID'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'deleteByID', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'deleteByID'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getByID', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getByID'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getAll', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_getAll'), _class.prototype)), _class));
exports.default = DeviceAttributeFileRepository;