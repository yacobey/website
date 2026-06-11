export async function postJson<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let message = `${res.status}: ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // non-JSON error body — keep the status message
    }
    throw new Error(message);
  }
  return res.json();
}
