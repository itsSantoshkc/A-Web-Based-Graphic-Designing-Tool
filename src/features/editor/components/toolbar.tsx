import { Hint } from "@/components/hint";
import {
  ActiveTool,
  Editor,
  FONT_SIZE,
  FONT_WEIGHT,
  UNDERLINE,
} from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RxTransparencyGrid } from "react-icons/rx";
import { BsBorderWidth } from "react-icons/bs";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Currency,
  Trash,
} from "lucide-react";
import { isTextType } from "../utils";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaThermometer,
  FaUnderline,
} from "react-icons/fa6";
import { useState } from "react";
import FontSizeInput from "./font-size-input";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: ToolbarProps) => {
  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectType);
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight();
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLineThrough = editor?.getActiveFontLineThrough();
  const initialFontUnderline = editor?.geActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize();
  const selectedObject = editor?.selectedObjects[0];
  const [properties, setProperties] = useState({
    fontWeight: initialFontWeight || FONT_WEIGHT,
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontStyle: initialFontStyle,
    lineThrough: initialFontLineThrough,
    underline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize || FONT_SIZE,
  });

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return;
    }
    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };
  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }
    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };
  const toggleItalic = () => {
    if (!selectedObject) {
      return;
    }
    const newValue = properties.fontStyle === "normal" ? "italic" : "normal";
    editor?.changeFontStyle(newValue);
    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  };
  const toggleUnderline = () => {
    if (!selectedObject) {
      return;
    }
    const newValue = properties.underline ? false : true;
    editor?.changeFontUndeline(newValue);
    setProperties((current) => ({
      ...current,
      underline: newValue,
    }));
  };
  const toggleLineThrough = () => {
    if (!selectedObject) {
      return;
    }
    const newValue = properties.lineThrough ? false : true;
    editor?.changeFontLineThrough(newValue);
    setProperties((current) => ({
      ...current,
      lineThrough: newValue,
    }));
  };
  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"></div>
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex  items-center justify-center h-full">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: properties.fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>
      {!isText && (
        <>
          <div className="flex  items-center justify-center h-full">
            <Hint label="Stroke Color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "stroke-color" && "bg-gray-100")}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{
                    borderColor: properties.strokeColor,
                  }}
                />
              </Button>
            </Hint>
          </div>

          <div className="flex  items-center justify-center h-full">
            <Hint label="Stroke Color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-width")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "stroke-width" && "bg-gray-100")}
              >
                <BsBorderWidth className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
      )}
      {isText && (
        <>
          <div className="flex  items-center justify-center h-full">
            <Hint label="Fonts" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("font")}
                size="icon"
                variant="ghost"
                className={cn(
                  "w-auto px-2 text-sm",
                  activeTool === "font" && "bg-gray-100",
                )}
              >
                <div className="max-w-[300ox] truncate">
                  {properties.fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </Hint>
          </div>
          <div className="flex  items-center justify-center h-full">
            <Hint label="Fonts" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleBold}
                size="icon"
                variant="ghost"
                className={cn(properties.fontWeight > 500 && "bg-gray-100")}
              >
                <div className="max-w-[300ox] truncate">
                  <FaBold className="size-4  shrink-0" />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex  items-center justify-center h-full">
            <Hint label="Italic" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleItalic}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.fontStyle === "italic" && "bg-gray-100",
                )}
              >
                <div className="max-w-[300ox] truncate">
                  <FaItalic className="size-4  shrink-0" />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex  items-center justify-center h-full">
            <Hint label="Line" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleLineThrough}
                size="icon"
                variant="ghost"
                className={cn(properties.lineThrough && "bg-gray-100")}
              >
                <div className="max-w-[300ox] truncate">
                  <FaStrikethrough className="size-4  shrink-0" />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex  items-center justify-center h-full">
            <Hint label="UnderLine" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleUnderline}
                size="icon"
                variant="ghost"
                className={cn(properties.underline && "bg-gray-100")}
              >
                <div className="max-w-[300ox] truncate">
                  <FaUnderline className="size-4  shrink-0" />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex  items-center justify-center h-full">
            <Hint label="Align Left" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("left")}
                size="icon"
                variant="ghost"
                className={cn(properties.textAlign === "left" && "bg-gray-100")}
              >
                <div className="max-w-[300ox] truncate">
                  <AlignLeft className="size-4  shrink-0" />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex  items-center justify-center h-full">
            <Hint label="Align Center" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("center")}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.textAlign === "center" && "bg-gray-100",
                )}
              >
                <div className="max-w-[300ox] truncate">
                  <AlignCenter className="size-4  shrink-0" />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex  items-center justify-center h-full">
            <Hint label="Align Right" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("right")}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.textAlign === "right" && "bg-gray-100",
                )}
              >
                <div className="max-w-[300ox] truncate">
                  <AlignRight className="size-4  shrink-0" />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex  items-center justify-center h-full">
            <FontSizeInput
              value={properties.fontSize}
              onChange={onChangeFontSize}
            />
          </div>
        </>
      )}
      <div className="flex  items-center justify-center h-full">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex  items-center justify-center h-full">
        <Hint label="Send Backward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex  items-center justify-center h-full">
        <Hint label="Opacity " side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex  items-center justify-center h-full">
        <Hint label="Delete " side="bottom" sideOffset={5}>
          <Button onClick={() => editor?.delete()} size="icon" variant="ghost">
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
