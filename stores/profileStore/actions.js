export function requestProfile(userName, postType) {
  return { type: 'REQUEST_PROFILE', userName, postType };
}

export function receiveProfile(fullProfileData, postType) {
  return {
    type: 'RECEIVE_PROFILE',
    fullProfileData,
    postType,
  };
}

export function requestProfiles(fields) {
  return { type: 'REQUEST_PROFILES', fields };
}

export function receiveProfiles(profiles) {
  return {
    type: 'RECEIVE_PROFILES',
    profiles
  };
}
