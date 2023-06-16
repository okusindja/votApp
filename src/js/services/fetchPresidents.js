export async function getPresidents() {
  let response = await fetch("http://localhost:3000/presidents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let entities = await response.json();
  return entities;
}
