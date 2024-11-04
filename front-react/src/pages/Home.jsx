import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import List from "@/components/list";

export default function Home() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20} collapsible={true} minSize={20} maxSize={45}>
        <span className="text-3xl flex justify-left ml-5 font-light">History</span>
        <List
          items={[
            {
              id: 1,
              method: "get",
              read: true,
              date: "2024-11-04T09:02:09.507Z",
              baseUrl: "/"
            },
            {
              id: 2,
              method: "post",
              read: false,
              date: "2024-11-04T09:02:09.507Z",
              baseUrl: "/api/v1/give"
            },
            {
              id: 3,
              method: "put",
              read: false,
              date: "2024-11-04T09:02:09.507Z",
              baseUrl: "/callback"
            },
            {
              id: 4,
              method: "patch",
              read: false,
              date: "2024-11-04T09:02:09.507Z",
              baseUrl: "/api/v2/update/"
            },
            {
              id: 5,
              method: "delete",
              read: false,
              date: "2024-11-04T09:02:09.507Z",
              baseUrl: "/long-url"
            }
          ]}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
}
