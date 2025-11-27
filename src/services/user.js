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

export const verifyEmailRequest = async (token) => {
  const res = await fetch(`${API_BASE}/users/verifyEmail?token=${token}`, {
    method: "GET",
    credentials: "include", // important: receive jwt cookie
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Verification failed");
  }

  return data;
};

export async function resendVerificationEmail() {
  const res = await fetch(`${API_BASE}/users/resendVerification`, {
    method: "POST",
    credentials: "include", // must include cookie
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to resend email");
  }

  return data;
}

export async function forgotPasswordRequest({ email }) {
  const res = await fetch(`${API_BASE}/users/forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}

export async function resetPasswordRequest(token, body) {
  const res = await fetch(`${API_BASE}/users/resetPassword/${token}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}
