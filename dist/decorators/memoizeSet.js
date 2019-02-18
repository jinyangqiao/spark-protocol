'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
exports.default = function () {
  var parameterKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function (target, name, descriptor) {
    var descriptorFunction = descriptor.value;
    var fetchItemFunction = function fetchItemFunction(item) {
      return item;
    };

    if (!parameterKeys) {
      fetchItemFunction = function fetchItemFunction(item) {
        return item;
      };
    } else if (parameterKeys[0] === 'id') {
      fetchItemFunction = function fetchItemFunction(id) {
        return this.getByID(id);
      };
    } else {
      fetchItemFunction = function fetchItemFunction(keys) {
        return function () {
          for (var _len = arguments.length, parameters = Array(_len), _key = 0; _key < _len; _key++) {
            parameters[_key] = arguments[_key];
          }

          return this.getAll().filter(function (item) {
            return parameters.every(function (param, index) {
              return param === item[keys[index]];
            });
          });
        };
      };
    }

    descriptor.value = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _fetchItemFunction;

      var args,
          result,
          item,
          _args = arguments;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              args = _args; // eslint-disable-line prefer-rest-params

              _context.next = 3;
              return descriptorFunction.call.apply(descriptorFunction, [this].concat((0, _toConsumableArray3.default)(args)));

            case 3:
              result = _context.sent;
              _context.t0 = _extends3.default;
              _context.t1 = {};
              _context.t2 = result;
              _context.next = 9;
              return (_fetchItemFunction = fetchItemFunction).call.apply(_fetchItemFunction, [this].concat((0, _toConsumableArray3.default)(args)));

            case 9:
              _context.t3 = _context.sent;
              item = (0, _context.t0)(_context.t1, _context.t2, _context.t3);


              target._caches.forEach(function (cache) {
                cache.keySets.forEach(function (keySet) {
                  var _cache$memoized;

                  if (!keySet || !keySet.length) {
                    cache.memoized.clear();
                    return;
                  }
                  // Either get the parameter out of item or the args.
                  var cacheParams = keySet.map(function (key) {
                    return item[key] || args[keySet.indexOf(key)];
                  });
                  (_cache$memoized = cache.memoized).delete.apply(_cache$memoized, (0, _toConsumableArray3.default)(cacheParams));
                });
              });

              return _context.abrupt('return', result);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return descriptor;
  };
};