"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *   Copyright (c) 2015 Particle Industries, Inc.  All rights reserved.
 *
 *   This program is free software; you can redistribute it and/or
 *   modify it under the terms of the GNU Lesser General Public
 *   License as published by the Free Software Foundation, either
 *   version 3 of the License, or (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *   Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public
 *   License along with this program; if not, see <http://www.gnu.org/licenses/>.
 *
 * 
 *
 */

var BufferStream = function BufferStream(buffer) {
  var _this = this;

  (0, _classCallCheck3.default)(this, BufferStream);
  this._index = 0;

  this.seek = function (index) {
    _this._index = index;
  };

  this.read = function (size) {
    if (!_this._buffer) {
      return null;
    }

    var index = _this._index;
    var endIndex = index + size;

    if (endIndex >= _this._buffer.length) {
      endIndex = _this._buffer.length;
    }

    var result = null;
    if (endIndex - index > 0) {
      result = _this._buffer.slice(index, endIndex);
      _this._index = endIndex;
    }

    return result;
  };

  this.close = function () {
    _this._buffer = null;
  };

  this._buffer = buffer;
};

exports.default = BufferStream;