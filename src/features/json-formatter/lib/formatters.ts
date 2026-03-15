import { JSON_FORMATTED_SPACES } from './consts';

export const verifyJSON = (json: string) => {
  const result = { value: null, error: false, text: 'Valid JSON' };

  try {
    result.value = JSON.parse(json);
  } catch {
    result.error = true;
    result.text = 'Invalid JSON';
  }

  return { ...result };
};

export const prettifyJSON = (json: string) => {
  const { value, error, text } = verifyJSON(json);

  if (error) return text;

  const prettyJSON = JSON.stringify(value, null, JSON_FORMATTED_SPACES);

  return prettyJSON;
};

export const minifyJSON = (json: string) => {
  const { value, error, text } = verifyJSON(json);

  if (error) return text;

  const minifiedJSON = JSON.stringify(value);

  return minifiedJSON;
};
