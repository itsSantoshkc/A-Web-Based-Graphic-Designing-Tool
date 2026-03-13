"use client";
import { fabric } from "fabric";
import { useCallback, useMemo, useState } from "react";
import { useAutoResize } from "@/features/editor/hooks/use-auto-resize";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  FONT_SIZE,
  FONT_FAMILY,
  FONT_STYLE,
  FONT_WEIGHT,
  LINE_THROUGH,
  OPACITY,
  SQUARE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TEXTALIGN,
  TRIANGLE_OPTION,
  UNDERLINE,
} from "../types";
import useCanvasEvents from "./use-canvas-events";
import { isTextType } from "../utils";

const buildEditor = ({
  canvas,
  selectedObjects,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  strokeDashArray,
  setStrokeDashArray,
  opacity,
  setOpacity,
  fontFamily,
  setFontFamily,
}: BuildEditorProps): Editor => {
  const getWorkSpace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };
  const center = (object: fabric.Object) => {
    const workspace = getWorkSpace();
    const center = workspace?.getCenterPoint();
    if (!center) return;

    //@ts-ignore
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };
  return {
    delete: () => {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj);
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    bringForwards: () => {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.bringForward(obj);
      });
      canvas.renderAll();
      const workspace = getWorkSpace();
      workspace?.sendToBack();
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((obj) => {
        canvas.sendBackwards(obj);
      });
      canvas.renderAll();
      const workspace = getWorkSpace();
      workspace?.sendToBack();
    },
    changeOpacity: (value: number) => {
      setOpacity(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ opacity: value });
      });
      canvas.renderAll();
    },
    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ fontWeight: value });
        }
      });
      canvas.renderAll();
    },
    changeFontStyle: (value: string) => {
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ fontStyle: value });
        }
      });
      canvas.renderAll();
    },
    changeFontLineThrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ linethrough: value });
        }
      });
      canvas.renderAll();
    },
    changeFontUndeline: (value: boolean) => {
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ underline: value });
        }
      });
      canvas.renderAll();
    },
    changeTextAlign: (value: string) => {
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ textAlign: value });
        }
      });
      canvas.renderAll();
    },
    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          // @ts-ignore
          obj.set({ fontSize: value });
        }
      });
      canvas.renderAll();
    },

    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          obj.set({ fill: value });
          return;
        }
        obj.set({ stroke: value });
      });
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeWidth: value });
      });
      canvas.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((obj) => {
        obj.set({ fill: value });
      });
      canvas.renderAll();
    },
    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((obj) => {
        if (isTextType(obj.type)) {
          //@ts-ignore
          obj.set({ fontFamily: value });
        }
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addSquare: () => {
      const object = new fabric.Rect({
        ...SQUARE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addSquareFull() {
      const object = new fabric.Rect({
        ...SQUARE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
        rx: 50,
        ry: 50,
      });
      addToCanvas(object);
    },
    addTriangle() {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTION,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },
    addInvertedTriangle() {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTION,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        flipY: true,
        strokeDashArray: strokeDashArray,
      });
      addToCanvas(object);
    },

    addDiamond() {
      const HEIGHT = DIAMOND_OPTIONS.height,
        WIDTH = DIAMOND_OPTIONS.width;
      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        },
      );
      addToCanvas(object);
    },
    addImage: (value: string) => {
      (fabric.Image.fromURL(value, (image) => {
        const workspace = getWorkSpace();

        image.scaleToWidth(workspace?.width || 0);
        image.scaleToHeight(workspace?.height || 0);

        addToCanvas(image);
      }),
        {
          crossOrigin: "anonymous",
        });
    },
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    opacity,

    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeColor;
      }
      const value = selectedObject.get("stroke") || strokeColor;
      return value as string;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeWidth;
      }
      const value = selectedObject.get("strokeWidth") || strokeWidth;
      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return strokeDashArray;
      }
      const value = selectedObject.get("strokeDashArray") || strokeDashArray;
      return value;
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return fillColor;
      }
      const value = selectedObject.get("fill") || fillColor;
      return value as string;
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return fontFamily;
      }
      //@ts-ignore
      const value = selectedObject.get("fontFamily") || fontFamily;

      return value;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_WEIGHT;
      }
      //@ts-ignore
      const value = selectedObject.get("fontWeight") || FONT_WEIGHT;

      return value;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return FONT_STYLE;
      }
      //@ts-ignore
      const value = selectedObject.get("fontStyle") || FONT_STYLE;

      return value;
    },
    getActiveFontLineThrough: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return LINE_THROUGH;
      }
      //@ts-ignore
      const value = selectedObject.get("linethrough") || LINE_THROUGH;

      return value;
    },
    geActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return LINE_THROUGH;
      }
      //@ts-ignore
      const value = selectedObject.get("underline") || UNDERLINE;

      return value;
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return TEXTALIGN;
      }
      //@ts-ignore
      const value = selectedObject.get("textAlign") || TEXTALIGN;

      return value;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return TEXTALIGN;
      }
      //@ts-ignore
      const value = selectedObject.get("fontSize") || FONT_SIZE;

      return value;
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) {
        return 1;
      }
      const value = selectedObject.get("opacity") || opacity;

      return value;
    },
    addText: (value, options) => {
      const obj = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });
      addToCanvas(obj);
    },
    canvas,
  };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);
  const [opacity, setOpacity] = useState(OPACITY);

  useAutoResize({ canvas, container });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        strokeDashArray,
        setStrokeDashArray,
        selectedObjects,
        opacity,
        setOpacity,
        fontFamily,
        setFontFamily,
      });
    }
    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
    opacity,
  ]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#fff",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    [],
  );

  return { init, editor };
};
