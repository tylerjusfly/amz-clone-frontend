const API_URI = 'http://localhost:4000';

const parseJSON = (response) => response.json();

const checkStatus = async (response) => {
  if (!response.ok) {
    if (response.statusText === 'Unauthorized') {
      // prettier-ignore
      localStorage.removeItem("amzClone");
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
  // const user = cookies.get("AMZCOOKIE");
  const user = JSON.parse(localStorage.getItem("amzClone"));

  const response = await fetch(`${API_URI}/${url}`, {
    method: method,
    headers: authed ? headers(user.access_token) : { ...defaultHeaders },
    body: JSON.stringify(data),
  });

  const result = await checkStatus(response);
  return parseJSON(result);
};

export const updateImmutable = (list, payload) => {
  const data = list.find((d) => d.id === payload.id);
  console.log('Immutable', data);
  if (data) {
    const index = list.findIndex((d) => d.id === payload.id);

    return [...list.slice(0, index), { ...data, ...payload }, ...list.slice(index + 1)];
  }

  return list;
};
