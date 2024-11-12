import * as React from "react";
import { toast } from "sonner";
import { Button } from "./button";

const copyToClipboard = (content) => {
  if (typeof content === "object") {
    content = JSON.stringify(content);
  }

  navigator.clipboard.writeText(content).then(
    () => toast.info("Copied!"),
    () => console.error("Copy failed")
  );
};

const CopyButton = React.forwardRef(({ className, text = "Copy", body = "", ...props }, ref) => {
  return (
    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(body)} className={className} ref={ref} {...props}>
      {text}
    </Button>
  );
});
CopyButton.displayName = "CopyButton";

export { CopyButton };
