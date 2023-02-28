import { TDFile, Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import * as React from "react";

type Props = {
  design: TDFile;
  url: string;
};

export function Design({ design, url }: Props) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const fs = useFileSystem();

  const handleClick = React.useCallback(() => {
    container?.requestFullscreen();
  }, [container]);

  return (
    <>
      <nav className="flex justify-end">
        <a
          className="btn btn-xs btn-ghost !shadow-none"
          href={`vscode://${url}`}
        >
          Edit
        </a>

        <button
          className="btn btn-xs btn-ghost !shadow-none"
          data-fullscreen
          onClick={handleClick}
        >
          Fullscreen
        </button>
      </nav>

      <div
        className="w-full h-96 overflow-hidden relative ring-1 rounded shadow-md"
        ref={setContainer}
      >
        <Tldraw
          document={design.document}
          readOnly={true}
          showMenu={false}
          showPages={false}
          showStyles={false}
          showTools={false}
          showZoom={true}
          {...fs}
        />
      </div>
    </>
  );
}
