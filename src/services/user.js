// services/user.js
export async function signUp(values) {
  const res = await fetch("http://localhost:3000/api/v1/users/signUp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include", // keep if you use cookies/JWT
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.log(err.data);

    throw err; // <-- stops here and bubbles to the mutation
  }

  return data;
}
export async function login(values) {
  const res = await fetch("http://localhost:3000/api/v1/users/logIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include", // keep if you use cookies/JWT
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.log(err.data);

    throw err; // <-- stops here and bubbles to the mutation
  }

  return data;
}
export async function fetchUser() {
  const res = await fetch("http://localhost:3000/api/v1/users/me", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  console.log(data);
  return data.data.user;
}

export async function updateUser(values) {
  const res = await fetch("http://localhost:3000/api/v1/users/updateMe", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include", // keep if you use cookies/JWT
  });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.log(err.data);

    throw err; // <-- stops here and bubbles to the mutation
  }

  return data;
}
export async function updatePassword(values) {
  const res = await fetch("http://localhost:3000/api/v1/users/updatePassword", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    credentials: "include", // keep if you use cookies/JWT
  });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Attach useful info to the error so React Query gets it
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    console.log(err.data);

    throw err; // <-- stops here and bubbles to the mutation
  }

  return data;
}

export async function logout() {
  const res = await fetch("http://localhost:3000/api/v1/users/logOut", {
    method: "GET", // change to "POST" if your API expects it
    credentials: "include", // send cookies/session
  });

  if (!res.ok) {
    let msg = "Failed to log out";
    try {
      const data = await res.json();
      msg = data?.message || msg;
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
  }

  // some logout endpoints return no JSON; guard it
  try {
    return await res.json();
  } catch {
    return {};
  }
}
