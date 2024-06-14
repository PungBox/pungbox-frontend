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
  const accessToken = window.localStorage.getItem('accessToken');
  const newFetchInit = {
    method: fetchInit?.method || 'POST',
    headers: fetchInit?.headers || (accessToken) ? {
      'Content-Type': 'application/json',
      'Access-Token': window.localStorage.getItem('accessToken'),
    } : {
      'Content-Type': 'application/json',
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
  console.error(`${newFetchInit.method} ${endpoint} returned status code ${data.statusCode || response.status} ${httpStatusMessage[data.statusCode || response.status]}:\n${JSON.stringify(data)}`);
};

const httpStatusMessage: { [key: string]: string } = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  507: 'Insufficient Storage',
  511: 'Network Authentication Required',
};
