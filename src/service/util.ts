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
