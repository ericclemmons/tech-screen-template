import * as React from "react";
import { WebContainer } from "@webcontainer/api";
import type { FileSystemTree } from "@webcontainer/api";
import ansiHTML from "ansi-html";

function useWebContainer(tree: FileSystemTree) {
  const [state, setState] = React.useState<
    "IDLE" | "BOOTING" | "INSTALLING" | "RUNNING" | "READY"
  >("IDLE");
  // TODO wrap `setOutput` to replace previous line when it sees `[1A`
  const [output, setOutput] = React.useState("");
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      setState("BOOTING");

      const instance = await WebContainer.boot();
      await instance.mount(tree);

      setState("INSTALLING");
      const install = await instance.spawn("pnpm", ["install"]);
      install.output.pipeTo(
        new WritableStream({
          write(data) {
            setOutput((previous) => previous.concat(data));
          },
        })
      );

      await install.exit;

      setState("RUNNING");
      setOutput("");

      const start = await instance.spawn("pnpm", ["start"]);
      start.output.pipeTo(
        new WritableStream({
          write(data) {
            setOutput((previous) => previous.concat(data));
          },
        })
      );

      instance.on("server-ready", (port, url) => {
        setState("READY");
        setUrl(url);
      });
    })();
  }, []);

  return [output, url];
}

export function Sandbox({ files }: { files: FileSystemTree }) {
  const [output = ""] = useWebContainer(files);

  return (
    <pre className="h-64 overflow-auto flex flex-col-reverse">
      <code
        dangerouslySetInnerHTML={{
          __html: ansiHTML(output), //ansi.toHtml(output),
        }}
      ></code>
    </pre>
  );
}
