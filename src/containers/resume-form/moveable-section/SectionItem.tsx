import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { FC, ReactNode, useState } from "react";
import DeleteDialog from "./DeleteDialog";

type Props = {
  children: ReactNode;
  title: string;
  subtitle: string;
  onDelete: () => void;
};

const SectionItem: FC<Props> = ({ children, title, subtitle, onDelete }) => {
  const [showContent, setShowContent] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between py-2">
        <div className="flex flex-col">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-gray-400">{subtitle}</div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            onClick={() => setShowContent(!showContent)}
            variant="ghost"
            className="h-6 w-6"
          >
            {showContent ? <ChevronUp /> : <ChevronDown />}
          </Button>
          <DeleteDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            onConfirm={onDelete}
            trigger={
              <Button type="button" variant="ghost" className="h-6 w-6">
                <Trash2 />
              </Button>
            }
          />
        </div>
      </div>
      {showContent && <div className="mt-2 pt-4">{children}</div>}
    </div>
  );
};

export default SectionItem;
