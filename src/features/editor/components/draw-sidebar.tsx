import React from "react";
import { ActiveTool, Editor, STROKE_COLOR, STROKE_WIDTH } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "./color-picker";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface DrawSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const DrawSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: DrawSidebarProps) => {
  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onColorChange = (colorValue: string) => {
    editor?.changeStrokeColor(colorValue);
  };

  const onWidthChange = (widthValue: number) => {
    editor?.changeStrokeWidth(widthValue);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-40 w-[360px] h-full flex flex-col",
        activeTool === "draw" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Drawing Mode"
        description="Modidy Brush Setting"
      />
      <ScrollArea>
        <div className=" gap-4 p-4 border-b">
          <Label className="tet-sm">Brush Width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onWidthChange(values[0])}
          />
        </div>
        <div className=" gap-4 p-4">
          <ColorPicker value={colorValue} onChange={onColorChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose
        onClick={() => {
          editor?.disableDrawingMode();
          onChangeActiveTool("select");
        }}
      />
    </aside>
  );
};

export default DrawSidebar;
