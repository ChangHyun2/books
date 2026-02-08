import { HTTPError } from "ky";
import { ZodError } from "zod";

export default function handleError(error: unknown): string {
  let errorMessage = "unknown error";

  if (error instanceof HTTPError) {
    errorMessage = error.response.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error instanceof ZodError) {
    errorMessage = error.issues.map((issue) => issue.message).join("\n");
  }

  return errorMessage;
}
