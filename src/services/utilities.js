const API_URI = 'http://localhost:4000';

const parseJSON = (response) => response.json();

const checkStatus = async (response) => {
  if (!response.ok) {
    if (response.statusText === 'Unauthorized') {
      // prettier-ignore
      localStorage.removeItem("authenticated");
      localStorage.removeItem('user');

      window.location.reload(true);
    }

    const message = await response.text();

    const err = JSON.parse(message);

    throw Object.freeze({ message: err.message || err.error });
  }

  return response;
};

export const defaultHeaders = {
  Accept: 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
  'Content-Type': 'application/json',
};

const headers = (token) => {
  if (token) {
    const jwt = `Bearer ${token}`;
    return { ...defaultHeaders, Authorization: jwt };
  } else {
    return defaultHeaders;
  }
};

export const request = async (url, method, authed = false, data) => {
  // prettier-ignore
  const token = localStorage.getItem("authenticated");

  console.log('from reqfunc', token);

  const response = await fetch(`${API_URI}/${url}`, {
    method: method,
    headers: authed ? headers(token) : { ...defaultHeaders },
    body: JSON.stringify(data),
  });

  const result = await checkStatus(response);
  return parseJSON(result);
};
