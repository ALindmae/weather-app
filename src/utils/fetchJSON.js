export async function fetchJSON(URL, options = "") {
  try {
    const response = await fetch(URL, options);

    if (!response || !response.ok)
      throw new Error("Faulty response from the rserver");

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
