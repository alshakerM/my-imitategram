import { requestProfileData, receiveProfileData } from './actions';

export function* getProfileData() {
  const userProfile = yield requestProfileData();
  yield receiveProfileData(userProfile);
}
