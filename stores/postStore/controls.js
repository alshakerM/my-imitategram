export async function REQUEST_POSTS() {
  const response = await fetch('../Data/IG-v3.json');
  const results = await response.json();
  return results;
}
