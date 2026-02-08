import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { Spinner } from "./ui/spinner";
import handleError from "@/utils/handleError";

export default function QueryFallback({ query }: { query: UseQueryResult }) {
  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if (query.isError) {
    const errorMessage = handleError(query.error);

    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <div>
          <XIcon className="size-8 text-red-500" />
        </div>
        <div>{errorMessage}</div>
        <Button onClick={() => query.refetch()}>Retry</Button>
      </div>
    );
  }

  return null;
}
