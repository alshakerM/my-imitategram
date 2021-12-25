export function requestProfileData(userName) {
  return { type: 'REQUEST_PROFILE', userName };
}

export function receiveProfileData(profileData) {
  return {
    type: 'RECEIVE_PROFILE',
    profileData,
  };
}
