import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  Link as LinkIcon,
  List,
} from "lucide-react";
import { useState } from "react";
import { LinkModal } from "./LinkModal";

const Editor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (newValue: string) => void;
}) => {
  const [showLinkModal, setShowLinkModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      BubbleMenuExtension,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg mt-10 focus:outline-none min-h-[70vh] !text-[var(--textColor)]",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const handleLinkSubmit = (url: string, text?: string) => {
    if (text && !editor.state.selection.content().size) {
      editor.chain().focus().insertContent(text).setLink({ href: url }).run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <>
      {editor && (
        <BubbleMenu
          className="flex w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-[var(--softTextColor)] shadow-lg"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 hover:bg-gray-100 ${editor.isActive("bold") ? "bg-gray-100" : ""}`}
          >
            <Bold className="h-5 w-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 hover:bg-gray-100 ${editor.isActive("italic") ? "bg-gray-100" : ""}`}
          >
            <Italic className="h-5 w-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 hover:bg-gray-100 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-100" : ""}`}
          >
            <Heading1 className="h-5 w-5" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 hover:bg-gray-100 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-100" : ""}`}
          >
            <Heading2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 hover:bg-gray-100 ${editor.isActive("bulletList") ? "bg-gray-100" : ""}`}
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowLinkModal(true)}
            className={`p-2 hover:bg-gray-100 ${editor.isActive("link") ? "bg-gray-100" : ""}`}
          >
            <LinkIcon className="h-5 w-5" />
          </button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />

      <LinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onSubmit={handleLinkSubmit}
        initialText={
          editor?.state.selection.content().content?.firstChild?.text || ""
        }
      />
    </>
  );
};

export default Editor;
