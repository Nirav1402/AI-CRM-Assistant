const API = "http://127.0.0.1:8000";

export async function sendMessage(message, currentInteraction = {}, history = []) {
  const response = await fetch(`${API}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      current_interaction: currentInteraction,
      history,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
