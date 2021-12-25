export function requestProfileData() {
  return { type: 'REQUEST_PROFILE' };
}

export function receiveProfileData(profileData) {
  return {
    type: 'RECEIVE_PROFILE',
    profileData,
  };
}
