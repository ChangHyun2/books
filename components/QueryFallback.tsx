import Loading from "@/design-system/Loading";
import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";

export default function QueryFallback({ query }: { query: UseQueryResult }) {
  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return (
      <div>
        <div>
          <XIcon className="w-4 h-4 mb-4" />
        </div>
        <div>{query.error.message}</div>
        <Button onClick={() => query.refetch()}>Retry</Button>
      </div>
    );
  }

  return null;
}
