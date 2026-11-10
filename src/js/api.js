import { API_URL } from "/config.js";

// const API_URL = "http://localhost:3000";

// CSRF Token Helpers
let csrfToken = null;

export async function getCsrfToken() {
  const response = await fetch(`${API_URL}/api/auth/csrf-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve CSRF token");
  }

  const data = await response.json();

  csrfToken = data.csrfToken;
}

// NOTE - below is a guard for state-changing helpers to catch situations where the CSRF token wasn't retrieved
function getCsrfHeaders() {
  if (!csrfToken) {
    throw new Error("CSRF token has not been initialized");
  }

  return {
    "X-CSRF-Token": csrfToken,
  };
}

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
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // "X-CSRF-Token": csrfToken, // NEW! CSRF Token
        ...getCsrfHeaders(), // NEW, instead of above, add a guard to your state-changing helpers to catch situations where you haven't retrieved a CSRF token
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

// export async function put(endpoint, data) {
//   try {
//     const response = await fetch(`${API_URL}${endpoint}`, {
//       method: "PUT",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         // "X-CSRF-Token": csrfToken, // NEW! CSRF Token
//         ...getCsrfHeaders(), // NEW, instead of above, add a guard to your state-changing helpers to catch situations where you haven't retrieved a CSRF token
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.log(errorData);

//       throw new Error(
//         errorData?.message ||
//           errorData.error?.message ||
//           errorData?.errors?.map((err) => err.message).join(", ") ||
//           `Request failed: ${response.status}`,
//       );
//     }

//     return response.json();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

export async function patch(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // "X-CSRF-Token": csrfToken, // NEW! CSRF Token
        ...getCsrfHeaders(), // NEW, instead of above, add a guard to your state-changing helpers to catch situations where you haven't retrieved a CSRF token
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
      headers: {
        // "X-CSRF-Token": csrfToken, // NEW! CSRF Token
        ...getCsrfHeaders(), // NEW, instead of above, add a guard to your state-changing helpers to catch situations where you haven't retrieved a CSRF token
      },
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
