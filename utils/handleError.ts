import { HTTPError } from "ky";

export default function handleError(error: unknown): string {
  let errorMessage = "unknown error";

  if (error instanceof HTTPError) {
    errorMessage = error.response.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return errorMessage;
}
