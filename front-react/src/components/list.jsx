/* eslint-disable react/prop-types */
import moment from "moment-timezone";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
// import { useMail } from "@/app/(app)/examples/mail/use-mail";

// export default function MailList() {
export default function MailList({ items }) {
  //   const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent overflow-hidden"
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
              {!item.read && <span className="h-2 w-2 rounded-full bg-blue-600" />}
              <div>
                <Badge variant={item.method}>{item.method.toUpperCase()}</Badge>
                <span className="text-xs ml-1 truncate overflow-hidden text-muted-foreground">{item.baseUrl}</span>
              </div>
            </div>

            <div
              className={cn(
                "ml-1 text-xs text-muted-foreground"
                // ,mail.selected === item.id ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {moment(item.date).tz("Asia/Calcutta").format("lll")}
              <Button
                size="sm"
                variant="ghost"
                onClick={(event) => {
                  navigator.clipboard.writeText("0000").catch(() => {
                    console.log("error");
                  });
                  event.currentTarget.textContent = "Copied!";
                }}
              >
                Copy Body
              </Button>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
