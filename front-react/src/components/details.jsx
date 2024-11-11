/* eslint-disable react/prop-types */
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import moment from "moment-timezone";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const copyToClipboard = (content) => {
  navigator.clipboard.writeText(JSON.stringify(content, null, 2)).then(
    () => toast.info("Copied!"),
    () => console.error("Copy failed")
  );
};

const Details = ({ selectedHook }) => {
  if (!selectedHook) return <div>Select Hook from list</div>;

  const requestDetails = {
    Method: selectedHook.method,
    "Base URL": selectedHook.baseURL,
    Host: selectedHook.host,
    Date: moment(selectedHook.createAt).format("lll"),
    Size: formatSize(selectedHook.size || 0),
    ID: selectedHook.id,
    Note: selectedHook.note
  };

  return (
    <div className="min-h-screen flex flex-col mt-2">
      {selectedHook && (
        <Card className="w-full h-full bg-transparent">
          <div className="grid grid-rows-1 grid-cols-2 h-1/2">
            <Card className="bg-transparent">
              <CardHeader>
                <Text style="lead" variant="h5" className="font-bold">
                  Request Details
                </Text>
                <Separator />
              </CardHeader>
              <CardContent>{makeTable(requestDetails)}</CardContent>
            </Card>

            <Card className="bg-transparent">
              <CardHeader>
                <Text variant="h5" className="font-bold">
                  Headers
                </Text>
                <Separator />
              </CardHeader>
              <ScrollArea style={{ height: "30vh" }}>
                <CardContent>{makeTable(selectedHook.headers)}</CardContent>
              </ScrollArea>
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
              <Separator />
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
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    const kb = (bytes / 1024).toFixed(2);
    return `${kb} KB`;
  } else {
    const mb = (bytes / (1024 * 1024)).toFixed(2);
    return `${mb} MB`;
  }
}

function makeTable(obj) {
  const array = Object.entries(obj);

  return (
    <table className="w-full table-auto">
      <tbody>
        {array.map((entry, i) => (
          <tr key={entry[0]} className={`text-sm ${i % 2 === 0 ? "bg-accent" : ""}`}>
            <td className="px-2">
              <Text style="table_text">{entry[0]}</Text>
            </td>
            <td>
              <Text style="table_text">{entry[1]}</Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
