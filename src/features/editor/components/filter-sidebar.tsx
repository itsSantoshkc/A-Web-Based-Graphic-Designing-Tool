import React, { useCallback } from "react";
import { ActiveTool, Editor, FILTER_TYPES, fonts, OPACITY } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => onChangeActiveTool("select");
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "filter" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Apply a Filters to selected image"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {FILTER_TYPES.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className={cn("w-full h-16 justify-start text-left ")}
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FilterSidebar;
