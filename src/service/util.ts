import { isEmpty } from 'lodash';

export const generateEndpoint = ({ endpoint, params = {} }: {
  endpoint: string;
  params?: Record<string, string | number>;
}) => {
  return `${import.meta.env.VITE_PROD_ENDPOINT}${endpoint}${
    !isEmpty(params)
      ? `?${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')}`
      : ''
  }`;
};

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
type RequestInitLike = { method?: HTTPMethod, headers?: { [key: string]: string }, body?: any };

export const fetchPung = async ({ endpoint, params = {}, fetchInit = undefined, auth = false }: {
  endpoint: string, params?: {
    [key: string]: string | number
  }, fetchInit?: RequestInit | RequestInitLike | undefined,
}) => {
  const newFetchInit = {
    method: fetchInit?.method || 'POST',
    headers: fetchInit?.headers || {
      'Content-Type': 'application/json',
      'Access-Token': window.localStorage.getItem('accessToken') || '',
    },
    body: JSON.stringify(fetchInit?.body) || undefined,
  };
  const response = await fetch(generateEndpoint({ endpoint, params }), newFetchInit);
  const data = await response.json();
  
  if (Math.floor(response.status / 100) <= 3 && (!data.statusCode || (data.statusCode / 100 <= 3))) {
    return data;
  }
  
  if (response.status === 401 /*unauthorized*/ || response.status === 403 /*Forbidden*/) {
    window.localStorage.setItem('accessToken', '');
  }
  console.error(`${newFetchInit.method} ${endpoint} returned status code ${data.statusCode || response.status}:\n${JSON.stringify(data)}`);
};
