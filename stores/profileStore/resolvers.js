import {
  requestProfile,
  requestProfiles,
  receiveProfile,
  receiveProfiles,
} from './actions';

export function* getProfile(userName, postType) {
  const userProfile = yield requestProfile(userName, postType);
  yield receiveProfile(userProfile, postType);
}

export function* getProfiles() {
  const profiles = yield requestProfiles([
    'user_name',
    'user_thumbnail',
    'full_name',
    'user_has_story',
    'user_id',
  ]);
  yield receiveProfiles(profiles);
}
