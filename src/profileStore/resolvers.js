import {
  setLoadingProfile,
  requestProfileData,
  receiveProfileData,
} from './actions';

export function* getProfileData() {
  yield setLoadingProfile(true);
  const suggestions = yield requestProfileData();
  yield receiveProfileData(suggestions);
  yield setLoadingProfile(false);
}
