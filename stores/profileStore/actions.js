export function requestProfileData(userName, postType) {
  return { type: 'REQUEST_PROFILE', userName, postType };
}

export function receiveProfileData(profileData, postType) {
  return {
    type: 'RECEIVE_PROFILE',
    profileData,
    postType
  };
}
