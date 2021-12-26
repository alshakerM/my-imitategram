export async function REQUEST_MESSAGES() {
  const response = await fetch(`/api/messages/`);
  return await response.json();
}
