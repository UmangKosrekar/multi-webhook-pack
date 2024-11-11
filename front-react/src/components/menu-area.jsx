/* eslint-disable react/prop-types */
import { Separator } from "./ui/separator";

const MenuTab = () => {
  return (
    <div className="flex flex-row space-x-2 mt-2 text-sm text-foreground-accent">
      <p className="menu-card">Share</p>
      <Separator orientation="vertical" height={50} />
      <p className="menu-card">Copy Link</p>
      <Separator orientation="vertical" height={50} />
      <p className="menu-card">Redirect</p>
      <Separator orientation="vertical" height={50} />
    </div>
  );
};

export default MenuTab;
