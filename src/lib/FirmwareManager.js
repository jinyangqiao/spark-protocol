// @flow

import fs from 'fs';
import { HalDescribeParser } from 'binary-version-reader';
import nullthrows from 'nullthrows';
import protocolSettings from '../settings';
import settings from '../../third-party/settings.json';
import specifications from '../../third-party/specifications';
import versions from '../../third-party/versions.json';

type OtaUpdate = {
  address: string,
  alt: string,
  binaryFileName: string,
};

const platformSettings = Object.entries(specifications);
const SPECIFICATION_KEY_BY_PLATFORM = new Map(
  Object.values(settings.knownPlatforms)
    .map((platform: mixed): [mixed, ?string] => {
      const spec = platformSettings.find(
        // eslint-disable-next-line no-unused-vars
        ([key, value]: [string, mixed]): boolean =>
          (value: any).productName === platform,
      );

      return [platform, spec && spec[0]];
    })
    .filter((item: [mixed, ?string]): boolean => !!item[1]),
);
const FIRMWARE_VERSION_BY_PLATFORM_ID = new Map(
  Object.entries(
    settings.versionNumbers,
  ).map(([platform, version]: [string, any]): [number, string] => {
    const specsForPlatform: any = nullthrows(
      Object.values(specifications).find(
        (item: any): boolean => item.productName.toLowerCase() === platform,
      ),
    );

    const releaseVersion = versions.find(
      (item: Array<*>): boolean => item[1] === version,
    )[0];

    return [specsForPlatform.productId, releaseVersion];
  }),
);

class FirmwareManager {
  static getOtaSystemUpdateConfig = async (
    systemInformation: Object,
  ): Promise<*> => {
    const parser = new HalDescribeParser();
    const platformID = systemInformation.p;

    const modules = parser
      .getModules(systemInformation)
      // Filter so we only have the system modules
      .filter((module: Object): boolean => module.func === 's');

    if (!modules) {
      throw new Error('Could not find any system modules for OTA update');
    }
    const moduleToUpdate = modules.find(
      (module: Object): boolean =>
        module.version <
        nullthrows(FIRMWARE_VERSION_BY_PLATFORM_ID.get(platformID)),
    );

    if (!moduleToUpdate) {
      // This should happen the majority of times
      return null;
    }

    const otaUpdateConfig = FirmwareManager.getOtaUpdateConfig(platformID);
    if (!otaUpdateConfig) {
      throw new Error('Could not find OTA update config for device');
    }

    const moduleIndex = modules.indexOf(moduleToUpdate);

    const config = otaUpdateConfig[moduleIndex];
    if (!config) {
      throw new Error('Cannot find the module for updating');
    }

    const systemFile = fs.readFileSync(
      `${protocolSettings.BINARIES_DIRECTORY}/${config.binaryFileName}`,
    );

    return {
      moduleIndex,
      systemFile,
    };
  };

  static getOtaUpdateConfig(platformID: number): ?Array<OtaUpdate> {
    const platform = settings.knownPlatforms[platformID.toString()];
    const key = SPECIFICATION_KEY_BY_PLATFORM.get(platform);

    // GCC Platform skip OTA Update Config
    if (platformID === 3) {
      return null;
    }

    if (!key) {
      return null;
    }

    const firmwareSettings = settings.updates[key];
    if (!key) {
      return null;
    }

    const firmwareKeys = Object.keys(firmwareSettings);
    return firmwareKeys.map((firmwareKey: string): Object => ({
      ...specifications[key][firmwareKey],
      binaryFileName: firmwareSettings[firmwareKey],
    }));
  }

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
