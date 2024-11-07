/* eslint-disable react/prop-types */
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import moment from "moment-timezone";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";

// Helper function to copy JSON to clipboard
const copyToClipboard = (content) => {
  navigator.clipboard.writeText(JSON.stringify(content, null, 2)).then(
    () => toast.info("Copied!"),
    () => console.error("Copy failed")
  );
};

const Details = ({ selectedHook }) => {
  console.log("selectedHook", selectedHook);

  if (!selectedHook) {
    return <div>Select Hook from list</div>;
  }

  const requestDetails = [
    { label: "Method", value: selectedHook.method },
    { label: "Base URL", value: selectedHook.baseURL },
    { label: "Host", value: selectedHook.host },
    { label: "Date", value: moment(selectedHook.createAt).format("lll") },
    { label: "Size", value: formatSize(selectedHook.size || 0) },
    { label: "ID", value: selectedHook.id },
    { label: "Note", value: selectedHook.note }
  ];

  return (
    <div className="min-h-screen flex flex-col mt-2">
      {selectedHook && (
        <Card className="w-full h-full bg-transparent">
          <div className="grid grid-rows-1 grid-cols-2 h-1/2">
            <Card className="bg-transparent">
              <CardHeader>
                <Text variant="h5" className="font-bold">
                  Request Details
                </Text>
              </CardHeader>
              <CardContent>
                <table className="w-full table-auto">
                  <tbody>
                    {requestDetails.map((detail, index) => (
                      <tr key={detail.label} className={`text-sm ${index % 2 === 0 ? "bg-accent" : ""}`}>
                        <td className="px-2">{detail.label}</td>
                        <td>{detail.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="p-4 overflow-y-auto max-h-96 bg-transparent">
              <CardHeader>
                <Text variant="h5" className="font-bold">
                  Headers
                </Text>
              </CardHeader>
              <CardContent>
                {selectedHook.headers &&
                  Object.entries(selectedHook.headers).map(([key, value]) => (
                    <Text key={key} className="mb-2">
                      <strong>{key}:</strong> {value}
                    </Text>
                  ))}
              </CardContent>
            </Card>
          </div>

          <div className="p-4 mt-4 h-1/2">
            <CardHeader>
              <Text variant="h5" className="font-bold flex justify-between items-center">
                Body
                <Button size="sm" variant="outline" className="mt-4" onClick={() => copyToClipboard(selectedHook.body)}>
                  Copy
                </Button>
              </Text>
            </CardHeader>
            <ScrollArea style={{ height: "45.6vh" }} className="border-2 rounded-lg bg-accent">
              <CardContent>
                <div className="w-full flex justify-start">
                  <pre className="p-4 text-wrap text-left font-mono">{JSON.stringify(selectedHook.body, null, 2)}</pre>
                </div>
              </CardContent>
            </ScrollArea>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Details;

function formatSize(bytes) {
  if (bytes < 1024) {
    // If less than 1KB, show in bytes
    return `${bytes} Byte${bytes === 1 ? "" : "s"}`;
  } else if (bytes < 1024 * 1024) {
    // If less than 1MB, show in KB
    const kb = (bytes / 1024).toFixed(2);
    return `${kb} KB`;
  } else {
    // If 1MB or more, show in MB
    const mb = (bytes / (1024 * 1024)).toFixed(2);
    return `${mb} MB`;
  }
}
