/* eslint-disable react/prop-types */
import moment from "moment-timezone";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { useMail } from "@/app/(app)/examples/mail/use-mail";

// export default function List() {
export default function List({ items, setSelectedHook, selectedHook }) {
  console.log("LIST selectedHook", selectedHook);

  return (
    <>
      <span className="text-3xl flex justify-left ml-2 mb-5 font-light">History</span>
      <ScrollArea className="h-screen list-card">
        <div className="flex flex-col pt-0">
          {items.length
            ? items.map((item) => {
                const isSelected = selectedHook?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex flex-col items-start gap-2 border-opacity-25 p-3 text-left text-sm transition-all hover:bg-accent overflow-hidden",
                      isSelected && "bg-muted"
                    )}
                    onClick={() => setSelectedHook(item)}
                  >
                    <div className="flex items-center gap-2">
                      {!item.viewed && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                      <div>
                        <Badge variant={item.method}>{item.method.toUpperCase()}</Badge>
                        <span className="text-xs ml-1 truncate overflow-hidden text-muted-foreground">
                          {item.baseURL || "/"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "ml-1 text-xs text-muted-foreground",
                        isSelected ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {moment(item.createAt).tz("Asia/Calcutta").format("lll")}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(item.body)).catch(() => {
                            console.log("error");
                          });
                          toast.info("Copied!");
                        }}
                      >
                        Copy Body
                      </Button>
                    </div>
                  </div>
                );
              })
            : "No History"}
        </div>
      </ScrollArea>
    </>
  );
}
