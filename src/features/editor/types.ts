import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];

export type EditorHookProps = {
  clearSelectionCallback?: () => void;
};

export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];
export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "font-bold"
  | "opacity"
  | "filter"
  | "ai"
  | "remove-bg"
  | "settings"
  | "templates";

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
  fillColor: string;
  setFillColor: (value: string) => void;
  strokeColor: string;
  setStrokeColor: (value: string) => void;
  strokeWidth: number;
  setStrokeWidth: (value: number) => void;
  strokeDashArray: number[];
  setStrokeDashArray: (value: number[]) => void;
  opacity: number;
  setOpacity: (value: number) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
};

export const fonts = [
  "Arimo",
  "Montserrat",
  "Open Sans",
  "Inter",
  "Roboto",
  "Helvetica",
  "Tinos",
  "Noto Serif",
  "EB Garamond",
  "Courier Prime",
  "Lora",
  "Palatino",
  "Comfortaa",
  "Nanum Gothic Coding",
  "Lucida Console",
];
export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const OPACITY = 1;
export const STROKE_DASH_ARRAY = [];
export const FONT_SIZE = 32;
export const FONT_FAMILY = "Arimo";
export const FONT_WEIGHT = 400;
export const FONT_STYLE = "normal";
export const LINE_THROUGH = false;
export const UNDERLINE = false;
export const TEXTALIGN = "left";

export const CIRCLE_OPTIONS = {
  radius: 120,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const SQUARE_OPTIONS = {
  height: 200,
  width: 200,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const TRIANGLE_OPTION = {
  height: 200,
  width: 200,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};
export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};
export interface Editor {
  delete: () => void;
  bringForwards: () => void;
  sendBackwards: () => void;
  addCircle: () => void;
  addSquare: () => void;
  addSquareFull: () => void;
  addTriangle: () => void;
  addInvertedTriangle: () => void;
  addDiamond: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  addImage: (value: string) => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveOpacity: () => number;
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveFontLineThrough: () => boolean;
  geActiveFontUnderline: () => boolean;
  getActiveTextAlign: () => string;
  getActiveFontSize: () => number;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeFillColor: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  changeOpacity: (value: number) => void;
  changeFontFamily: (value: string) => void;
  changeFontWeight: (value: number) => void;
  changeFontStyle: (value: string) => void;
  changeFontLineThrough: (value: boolean) => void;
  changeFontUndeline: (value: boolean) => void;
  changeTextAlign: (value: string) => void;
  changeFontSize: (value: number) => void;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  opacity: number;
  selectedObjects: fabric.Object[];
  canvas: fabric.Canvas;
}
