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
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
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
      <div className="flex flex-row space-x-2 mt-2 text-sm text-foreground-accent">
        <p className="menu-card">Share</p>
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
