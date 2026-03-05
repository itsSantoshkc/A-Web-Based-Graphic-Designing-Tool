import React, { useCallback } from "react";
import { ActiveTool, Editor, OPACITY } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = useCallback(() => {
    onChangeActiveTool("select");
  }, [onChangeActiveTool]);

  const value = editor?.getActiveOpacity() || OPACITY;
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="Text" description="Add Text to Your Canvas" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText("Heading", {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className="text-xl font-bold">Add a heading</span>
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText("Sub Heading", {
                fontSize: 64,
                fontWeight: 300,
              })
            }
          >
            <span className="text-lg font-semibold">Add a Sub-Heading</span>
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText("Paragraph", {
                fontSize: 32,
              })
            }
          >
            <span className="text-md font-medium">Add a Paragraph</span>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default TextSidebar;
