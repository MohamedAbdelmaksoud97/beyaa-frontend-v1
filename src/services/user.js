// services/user.js

// ✅ Centralized API base (switches automatically between dev/prod)
const API_BASE = import.meta.env.VITE_API_BASE;
console.log("ssss", API_BASE);
export async function signUp(values) {
  const res = await fetch(`${API_BASE}/users/signUp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.error(err.data);
    throw err;
  }

  return data;
}

export async function login(values) {
  const res = await fetch(`${API_BASE}/users/logIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.error(err.data);
    throw err;
  }

  return data;
}

export async function fetchUser() {
  const res = await fetch(`${API_BASE}/users/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data.data.user;
}

export async function updateUser(values) {
  const res = await fetch(`${API_BASE}/users/updateMe`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.error(err.data);
    throw err;
  }

  return data;
}

export async function updatePassword(values) {
  const res = await fetch(`${API_BASE}/users/updatePassword`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.error(err.data);
    throw err;
  }

  return data;
}

export async function logout() {
  const res = await fetch(`${API_BASE}/users/logOut`, {
    method: "GET", // change to "POST" if your backend expects it
    credentials: "include",
  });

  if (!res.ok) {
    let msg = "Failed to log out";
    try {
      const data = await res.json();
      msg = data?.message || msg;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(msg);
  }

  try {
    return await res.json();
  } catch {
    return {}; // handle empty response
  }
}
