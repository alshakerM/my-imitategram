export function requestProfileData(userName, postType, fields) {
  return { type: 'REQUEST_PROFILE', userName, postType, fields };
}

export function receiveProfileData(profileData, postType) {
  return {
    type: 'RECEIVE_PROFILE',
    profileData,
    postType,
  };
}
export function receiveAllProfileData(profileData) {
  return {
    type: 'RECEIVE_ALL_PROFILES',
    profileData,
  };
}
