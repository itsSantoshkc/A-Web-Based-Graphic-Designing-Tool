import { useCallback, useRef } from "react";
import { fabric } from "fabric";

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}

type ClipboardObject = fabric.Object | fabric.ActiveSelection | null;

const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<ClipboardObject>(null);

  const copy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: fabric.Object) => {
      clipboard.current = cloned;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!clipboard.current) return;

    clipboard.current.clone((clonedObj: fabric.Object) => {
      canvas?.discardActiveObject();

      clonedObj.set({
        left: (clonedObj.left ?? 0) + 10,
        top: (clonedObj.top ?? 0) + 10,
        evented: true,
      });

      if (clonedObj.type === "activeSelection") {
        const selection = clonedObj as fabric.ActiveSelection;

        selection.canvas = canvas!;
        selection.forEachObject((obj: fabric.Object) => {
          canvas?.add(obj);
        });

        selection.setCoords();
      } else {
        canvas?.add(clonedObj);
      }

      if (clipboard.current) {
        clipboard.current.left = (clipboard.current.left ?? 0) + 10;
        clipboard.current.top = (clipboard.current.top ?? 0) + 10;
      }

      canvas?.setActiveObject(clonedObj);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
};

export default useClipboard;
