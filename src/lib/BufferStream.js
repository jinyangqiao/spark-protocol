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
 * @flow
 *
 */

class BufferStream {
  _buffer: ?Buffer;
  _index: number = 0;

  constructor(buffer: Buffer) {
    this._buffer = buffer;
  }

  seek = (index: number) => {
    this._index = index;
  };

  read = (size?: number): ?Buffer => {
    if (!this._buffer) {
      return null;
    }

    const index = this._index;
    let endIndex = index + size;

    if (endIndex >= this._buffer.length) {
      endIndex = this._buffer.length;
    }

    let result = null;
    if (endIndex - index > 0) {
      result = this._buffer.slice(index, endIndex);
      this._index = endIndex;
    }

    return result;
  };

  close = () => {
    this._buffer = null;
  };
}

export default BufferStream;
