import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorActionButton from "@/containers/text-editor/TextEditorActionButton";
import { getTextEditorButtons } from "@/utils/getTextEditorButtons";
import { Control, Controller, FieldValues, FieldPath } from "react-hook-form";
import "./TextEditor.scss";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
};

const TextEditor = <T extends FieldValues>({ control, name }: Props<T>) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Summary...</p>",
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md p-4 border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus:!ring-0 focus-visible:!ring-0">
      <div className="mb-2">
        {getTextEditorButtons(editor).map((buttonData) => (
          <TextEditorActionButton
            key={buttonData.actionName}
            onClick={buttonData.onClick}
            isActive={editor.isActive(buttonData.actionName)}
          >
            {buttonData.icon}
          </TextEditorActionButton>
        ))}
      </div>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <EditorContent
            editor={editor}
            onInput={() => onChange(editor.getHTML())}
            value={value}
          />
        )}
      />
    </div>
  );
};

export default TextEditor;
