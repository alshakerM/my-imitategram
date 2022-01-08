import { requestProfileData, receiveProfileData } from './actions';

export function* getProfileData(userName, postType) {
  if (userName) {
    const userProfile = yield requestProfileData(userName, postType);
    yield receiveProfileData(userProfile, postType);
  } else {
    const userProfile = yield requestProfileData(undefined, undefined, [
      'user_name',
      'user_thumbnail',
      'full_name',
    ]);
    yield receiveProfileData(userProfile);
  }
}
