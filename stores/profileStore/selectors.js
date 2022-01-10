export function getProfile(state, username, postType) {
  return state.fullProfilesData[username]?.[postType] ?? {};
}

export function getProfiles(state) {
  return state.profiles;
}
