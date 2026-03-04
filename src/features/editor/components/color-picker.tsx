import { HexColorPicker } from "react-colorful";
import { colors } from "../types";
import { hexToRgba, rgbaToHex } from "../utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const hexValue = value.startsWith("rgba") ? rgbaToHex(value) : value;

  return (
    <div className="w-full space-y-4">
      <HexColorPicker
        color={hexValue}
        onChange={(hex) => onChange(hexToRgba(hex))}
        style={{ width: "100%" }}
      />
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => onChange(hexToRgba(color))}
          />
        ))}
      </div>
    </div>
  );
};
