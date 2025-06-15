const BASE_URL = "http://localhost:5000/api";

export async function createUser(api_key) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key }),
  });
  // ignore if user already exists
  if (!res.ok && res.status !== 409) {
    throw new Error("Failed to create user");
  }
}

export async function addTarget(user_api_key, target_id) {
  const res = await fetch(`${BASE_URL}/targets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_api_key, target_id }),
  });
  if (!res.ok) throw new Error("Failed to add target");
}

export async function fetchTargets(user_api_key) {
  const res = await fetch(`${BASE_URL}/targets?user_api_key=${user_api_key}`);
  if (!res.ok) throw new Error("Failed to fetch targets");
  return await res.json();
}

export async function deleteTarget(user_api_key, target_id) {
  const res = await fetch(`${BASE_URL}/targets`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_api_key, target_id }),
  });
  if (!res.ok) throw new Error("Failed to delete target");
}
