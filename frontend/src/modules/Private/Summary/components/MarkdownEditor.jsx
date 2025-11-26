import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export const MarkdownEditor = () => {
  const [content, setContent] = useState("# Mi primer titulo");
  const [isEdit, setIsEdit] = useState(false);
  const [prevContent, setPrevContent] = useState("");

  const handleEdit = () => {
    setPrevContent(content);
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setContent(prevContent);
    setIsEdit(false);
  };

  const handleSave = () => {
    setIsEdit(false);
  };

  return (
    <section className="bg-secondary h-[800px] p-4 rounded-xl border border-border shadow-sm overflow-y-auto">
      <div className="flex flex-row-reverse gap-2 mb-6">
        {isEdit ? (
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2"
            onClick={handleSave}
          >
            Guardar
          </button>
        ) : (
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2"
            onClick={handleEdit}
          >
            Editar
          </button>
        )}
        {isEdit && (
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2"
            onClick={handleCancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>
      {isEdit ? (
        <MDEditor
          value={content}
          onChange={setContent}
          height={700}
          style={{ backgroundColor: "var(--card)" }}
          data-color-mode="light"
          preview="edit"
        />
      ) : (
        <MDEditor.Markdown
          source={content}
          style={{
            backgroundColor: "var(--color-background)",
            color: "var(--color-secondary-foreground)",
          }}
          className="rounded-xl p-2 min-h-[700px]"
        />
      )}
    </section>
  );
};

export default MarkdownEditor;
