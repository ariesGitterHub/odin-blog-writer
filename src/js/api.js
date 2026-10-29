const API_URL = "http://localhost:3000";

export async function get(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();

      console.log(errorData);

      throw new Error(
        // NOTE - the optional chaining (?.) prevents an error if the response doesn't contain an error property
        // NOTE - below used || to catch all various ways the backend shapes error messages
        errorData?.message ||
          errorData.error?.message ||
          // NOTE - Below is an optional-chaining JavaScript snippet safely extracts and formats error messages from an API response object. // It was needed for signup validation when passwords are weak
          errorData?.errors?.map((err) => err.message).join(", ") ||
          `Request failed: ${response.status}`,
      );
    }

    // NOTE - await is not needed here, leave for self reference
    // return await response.json();
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function post(endpoint, data) {
  console.log("POST data:", data);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      console.log(errorData);

      throw new Error(
        errorData?.message ||
          errorData.error?.message ||
          errorData?.errors?.map((err) => err.message).join(", ") ||
          `Request failed: ${response.status}`,
      );
    }

    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function put(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      console.log(errorData);

      throw new Error(
        errorData?.message ||
          errorData.error?.message ||
          errorData?.errors?.map((err) => err.message).join(", ") ||
          `Request failed: ${response.status}`,
      );
    }

    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function del(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(
        errorData?.message ||
          errorData.error?.message ||
          errorData?.errors?.map((err) => err.message).join(", ") ||
          `Request failed: ${response.status}`,
      );
    }

    // NOTE - a 204 No Content response has no response body, but my del() function does, so it will try to parse an empty response body as JSON and throw an error even though the deletion succeeded.
    if (response.status === 204) {
      return;
    }

    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
