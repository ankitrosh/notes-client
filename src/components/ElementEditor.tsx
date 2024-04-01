import { motion, useDragControls } from "framer-motion";
import { Button } from "./ui/button";
import { useState } from "react";

interface IElementEditor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDragEnd: (e: any) => void;
  handleSave: () => void;
}
const ElementEditor: React.FC<IElementEditor> = ({
  handleDragEnd,
  handleSave,
}) => {
  const controls = useDragControls();
  const [isDragging, setIsDraggin] = useState(false);
  function startDrag(event) {
    controls.start(event);
  }

  return (
    <div className="z-100">
      <motion.div
        className="element resize overflow-auto "
        dragControls={controls}
        drag={isDragging ? "x" : false}
        onDragEnd={handleDragEnd}
      >
        <Button
          onPointerDown={startDrag}
          onMouseEnter={() => {
            setIsDraggin(true);
          }}
          onMouseLeave={() => {
            setIsDraggin(false);
          }}
        >
          Drag
        </Button>
        <Button
          onClick={() => {
            handleSave();
          }}
        >
          save
        </Button>
        Hello
      </motion.div>
    </div>
  );
};

export default ElementEditor;
