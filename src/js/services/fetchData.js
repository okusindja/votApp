/**
 *
 * @param {*} content fetch BI data and returns it to use
 */

export async function getData(content) {
  let response = await fetch(content, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let voters = await response.json();
  return voters;
}
