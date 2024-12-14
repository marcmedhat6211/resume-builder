import { FC, useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface Props {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

const EditableSectionTitle: FC<Props> = ({ title, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== title) {
      onTitleChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setValue(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="focus:!border-blue-700 focus:!ring-0 focus-visible:!border-blue-700 focus-visible:!ring-0"
          />
          <Pencil size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-700" />
        </div>
      ) : (
        <h3
          onClick={() => setIsEditing(true)}
          className={cn(
            "text-lg font-semibold cursor-pointer hover:text-blue-700 transition-colors"
          )}
        >
          {value}
        </h3>
      )}
    </div>
  );
};

export default EditableSectionTitle;
