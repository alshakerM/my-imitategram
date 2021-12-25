import { requestProfileData, receiveProfileData } from './actions';

export function* getProfileData(userName) {
  const userProfile = yield requestProfileData(userName);
  yield receiveProfileData(userProfile);
}
