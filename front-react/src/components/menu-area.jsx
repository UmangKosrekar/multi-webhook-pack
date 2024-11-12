/* eslint-disable react/prop-types */
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MenuTab = () => {
  const webhookLink = localStorage.getItem("webhookLink");

  return (
    <>
      <div className="flex flex-row space-x-2 mt-2 text-sm text-foreground-accent ml-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" size="noPadding">
              Share
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Webhook Link</DialogTitle>
              <DialogDescription>This is your webhook link where the data would bounce</DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={webhookLink} readOnly />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Separator orientation="vertical" height={50} />
        <p className="menu-card">Copy Link</p>
        <Separator orientation="vertical" height={50} />
        <p className="menu-card">Redirect</p>
        <Separator orientation="vertical" height={50} />
      </div>
    </>
  );
};

export default MenuTab;
