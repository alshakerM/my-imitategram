import { requestProfileData, receiveProfileData } from './actions';

export function* getProfileData(userName, postType) {
  const userProfile = yield requestProfileData(userName, postType);
  yield receiveProfileData(userProfile, postType);
}
