import { FC } from "react";
import EditableSectionTitle from "./EditableSectionTitle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  onTitleChange: (newTitle: string) => void;
  onDelete: () => void;
}

const SectionHeader: FC<Props> = ({ title, subtitle, onTitleChange, onDelete }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <EditableSectionTitle title={title} onTitleChange={onTitleChange} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
