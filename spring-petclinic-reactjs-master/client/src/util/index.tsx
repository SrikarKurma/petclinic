import { IHttpMethod } from '../types';

declare const __API_SERVER_URL__: string | undefined;
const BACKEND_URL = (typeof __API_SERVER_URL__ === 'undefined' ? 'http://localhost:9967/petclinic' : __API_SERVER_URL__);

export const url = (path: string): string => `${BACKEND_URL}/${path}`;

/**
 * path: relative PATH without host and port (i.e. '/api/123')
 * data: object that will be passed as request body
 * onSuccess: callback handler if request succeeded. Succeeded means it could technically be handled (i.e. valid json is returned)
 * regardless of the HTTP status code.
 */
export const submitForm = (method: IHttpMethod, path: string, data: any, onSuccess: (status: number, response: any) => void): void => {
  const requestUrl = url(path);

  const fetchParams: RequestInit = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  console.log(`Submitting to ${method} ${requestUrl}`);
  fetch(requestUrl, fetchParams)
    .then(response => {
      if (response.status === 204) {
        onSuccess(response.status, {});
      } else {
        response.json().then(result => onSuccess(response.status, result));
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // Optionally call onSuccess with error status and message if you want to handle fetch errors
    });
};
