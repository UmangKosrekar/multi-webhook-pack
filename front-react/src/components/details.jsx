/* eslint-disable react/prop-types */
import moment from "moment-timezone";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { useMail } from "@/app/(app)/examples/mail/use-mail";

// export default function MailList() {
export default function MailList({ items }) {
  //   const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border border-opacity-25 p-3 text-left text-sm transition-all hover:bg-accent overflow-hidden list-card"
              //   ,mail.selected === item.id && "bg-muted"
            )}
            // onClick={() =>
            //   setMail({
            //     ...mail,
            //     selected: item.id
            //   })
            // }
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
                "ml-1 text-xs text-muted-foreground"
                // ,mail.selected === item.id ? "text-foreground" : "text-muted-foreground"
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
        ))}
      </div>
    </ScrollArea>
  );
}

/**
  {
    "id": "4ae5cd30-c676-482d-ace8-da9f9fc7401c",
    "baseURL": "",
    "body": {
        "oop": "Great 1"
    },
    "createAt": "2024-11-05T06:34:24.808Z",
    "userUUID": "a5ad363e-b48f-4041-aca5-28fef9d4e3ce",
    "viewed": true,
    "method": "POST"
  }
 */
