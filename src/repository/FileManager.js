// @flow

import fs from 'fs';
import path from 'path';

class FileManager {
  _path: string;

  constructor(path: string) {
    this._path = path;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  createFile<TModel>(fileName: string, data: TModel): void {
    if (fs.existsSync(path.join(this._path, fileName))) {
      return;
    }

		this.writeFile(fileName, data);
  }

  deleteFile(fileName: string): void {
    const filePath = path.join(this._path, fileName);
    if (!fs.existsSync(filePath)) {
      return;
    }

    fs.unlink(filePath);
  }

  getAllData<TModel>(): Array<TModel> {
    return fs.readdirSync(this._path).map(
      fileName => JSON.parse(fs.readFileSync(
        path.join(this._path, fileName),
        'utf8',
      )),
    );
  }

  getFile<TModel>(fileName: string): ?TModel {
    const filePath = path.join(this._path, fileName);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  writeFile<TModel>(fileName: string, data: TModel): void {
		fs.writeFileSync(
      path.join(this._path, fileName),
      JSON.stringify(data, null, 2),
    );
  }
}

export default FileManager;