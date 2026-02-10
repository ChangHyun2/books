import { ScrollArea } from "@/components/ui/scroll-area";
import { ComponentType } from "react";

export default function BookPageTemplate({
  Provider,
  title,
  searchbar,
  bookList,
  pagination,
}: {
  Provider: ComponentType<{ children: React.ReactNode }>;
  title: string;
  bookList: React.ReactNode;
  pagination?: React.ReactNode;
  searchbar?: React.ReactNode;
}) {
  return (
    <Provider>
      <div className="mx-auto h-full min-h-0 flex flex-col overflow-hidden">
        <h1 className="text-xl font-semibold mb-4">{title}</h1>
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="mb-4 ml-[1px]">{searchbar}</div>
          <ScrollArea className="flex-1 min-h-0 pr-3">{bookList}</ScrollArea>
          <div className="pt-4">{pagination}</div>
        </div>
      </div>
    </Provider>
  );
}
