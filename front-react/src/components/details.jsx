/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import moment from "moment-timezone";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { CopyButton } from "./ui/copyBtn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Details = ({ selectedHook }) => {
  if (!selectedHook) return <div>Select Hook from list</div>;

  const requestDetails = {
    method: selectedHook.method,
    "base url": selectedHook.baseURL,
    host: selectedHook.host,
    date: moment(selectedHook.createAt).format("lll"),
    size: formatSize(selectedHook.size || 0),
    id: selectedHook.id,
    note: selectedHook.note
  };

  return (
    <div className="min-h-screen flex flex-col mt-2">
      {selectedHook && (
        <Card className="w-full h-full bg-transparent">
          <div className="grid grid-cols-2">
            <Card className="bg-transparent">
              <CardHeader className="p-6 pt-0 pb-2">
                <Text style="lead" variant="h7">
                  How to USE Multi-Webhook
                </Text>
                <Separator />
              </CardHeader>
              <CardContent>{makeTable(requestDetails)}</CardContent>
            </Card>

            <Card className="bg-transparent mr-10 h-[20vh]">
              <Text style="lead" variant="h7">
                Webhook Details
              </Text>
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                </TabsList>
                <TabsContent value="summary">{makeTable(requestDetails)}</TabsContent>
                <TabsContent value="headers">
                  <ScrollArea className="h-[20vh]">
                    <CardContent className="p-0">{makeTable(selectedHook.headers)}</CardContent>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="p-4 mt-4 h-1/2">
            <CardHeader className="p-6 pt-0 pb-2">
              <Text style="lead" variant="h7" className="flex justify-between items-center">
                Body
                <CopyButton body={selectedHook.body} />
              </Text>
              <Separator />
            </CardHeader>
            <ScrollArea style={{ height: "55vh" }} className="border rounded-md bg-accent">
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
