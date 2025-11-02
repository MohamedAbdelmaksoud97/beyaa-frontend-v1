// services/http.js
export async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function makeApiError(res, data, fallback = "Request failed") {
  const err = new Error(data?.message || fallback);
  err.status = res.status;
  err.code = data?.code;
  err.fieldErrors = data?.fieldErrors;
  err.payload = data;
  return err;
}
