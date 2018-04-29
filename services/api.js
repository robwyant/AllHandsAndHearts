import { SalesforceApiWrapper } from '../utils/utils';
import * as AuthService from './auth';
const SalesforceApi = new SalesforceApiWrapper();

export default class Api {
  /**
   * Region related Apis
   */
  getRegionList = async () => {
    return await SalesforceApi.get('/regions');
  };
  getPinsListByRegion = async regionId => {
    const queryEndpoint = `/pins/${regionId}`;
    return await SalesforceApi.get(queryEndpoint);
  };

  setPinByRegion = async (regionId, pinData) => {
    let currentUserId = await AuthService.getValueFromStorage('Id');

    const payload = {
      createdByUserId: currentUserId,
      name: pinData.name,
      regionId: regionId,
      address: pinData.address,
      description: pinData.description,
      latitude: pinData.latitude,
      longitude: pinData.longitude,
      pinType: pinData.pinType ? pinData.pinType.name : 'Other',
      Id: pinData.id ? pinData.id : ''
    };

    return await SalesforceApi.post('/pins', payload);
  };

  deletePinById = async pinId => {
    const queryEndPoint = `/pins/${pinId}`;
    SalesforceApi.delete(queryEndPoint);
  };

  /**
   * Alert related Apis
   */
  getBroadcastCards = async () => {
    return await SalesforceApi.get('/broadcasts');
  };
}
