// @flow

import fs from 'fs';
import {
  HalDependencyResolver,
  HalDescribeParser,
} from 'binary-version-reader';
import nullthrows from 'nullthrows';
import protocolSettings from '../settings';
import FirmwareSettings from '../../third-party/settings.json';

class FirmwareManager {
  static getOtaSystemUpdateConfig = async (
    systemInformation: Object,
  ): Promise<*> => {
    const platformID = systemInformation.p;
    const resolver = new HalDependencyResolver();
    const missingDependencies = resolver.findAnyMissingDependencies(
      systemInformation,
    );

    if (!missingDependencies || !missingDependencies.length) {
      return null;
    }

    const missingDependency = missingDependencies[0];
    const moduleFunction = missingDependency.f === 'b' ? 2 : 4;

    const firstDependency = FirmwareSettings.find(
      ({ prefixInfo }: { prefixInfo: any }): boolean =>
        prefixInfo.platformID === platformID &&
        prefixInfo.moduleVersion === missingDependency.v &&
        prefixInfo.moduleFunction === moduleFunction,
    );

    if (!firstDependency) {
      return null;
    }

    const systemFile = fs.readFileSync(
      `${protocolSettings.BINARIES_DIRECTORY}/${firstDependency.filename}`,
    );

    return {
      moduleFunction,
      moduleIndex: missingDependency.n,
      systemFile,
    };
  };

  static getAppModule = (systemInformation: Object): Object => {
    const parser = new HalDescribeParser();
    return nullthrows(
      parser
        .getModules(systemInformation)
        // Filter so we only have the app modules
        .find((module: Object): boolean => module.func === 'u'),
    );
  };

  getKnownAppFileName = (): ?string => {
    throw new Error('getKnownAppFileName has not been implemented.');
  };
}

export default FirmwareManager;
