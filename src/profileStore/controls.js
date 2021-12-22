export async function REQUEST_PROFILE() {
  const response = await fetch('/Data/users.json');
  const results = await response.json();
  return results;
}
