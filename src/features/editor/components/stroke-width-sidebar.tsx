import React, { useCallback } from "react";
import { ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const onClose = useCallback(() => {
    onChangeActiveTool("select");
  }, [onChangeActiveTool]);

  const onChangeStrokeWidth = (newvalue: number) => {
    editor?.changeStrokeWidth(newvalue);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typedValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
  console.log(typedValue);
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Stroke Color"
        description="Modify the stroke width"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke Width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>

        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke Type</Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start px-2 py-4 text-left",
              JSON.stringify(typedValue) === `[]` && "border-2 border-blue-500",
            )}
          >
            <div className="w-full border-black rounded-full border-4 "></div>
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start px-2 py-4 text-left",
              JSON.stringify(typedValue) === `[5,5]` &&
                "border-2 border-blue-500",
            )}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed"></div>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
