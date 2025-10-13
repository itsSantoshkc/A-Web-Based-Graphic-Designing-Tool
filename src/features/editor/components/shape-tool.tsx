import { cn } from "@/lib/utils";
import { Icon, LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons";

interface ShapeToolProps {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
}

const ShapeTool = ({ icon: Icon, onClick, iconClassName }: ShapeToolProps) => {
  return (
    <button className="aspect-square border rounded-md p-5" onClick={onClick}>
      <Icon className={cn("size-full", iconClassName)} />
    </button>
  );
};

export default ShapeTool;
