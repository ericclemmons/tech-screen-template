import type { FileSystemTree } from "@webcontainer/api";
import { WebContainer } from "@webcontainer/api";
import toHTML from "ansi-html";
import * as React from "react";

import ansi from "./ansi";

function useWebContainer(tree: FileSystemTree) {
  const [state, setState] = React.useState<
    "IDLE" | "BOOTING" | "INSTALLING" | "RUNNING" | "READY"
  >("IDLE");
  const boot = React.useMemo<Promise<WebContainer>>(
    () => WebContainer.boot(),
    []
  );

  const [output, setOutput] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      setState("BOOTING");
      const instance = await boot;
      await instance.mount(tree);

      setState("INSTALLING");
      const install = await instance.spawn("pnpm", ["install"]);
      install.output.pipeTo(
        new WritableStream({
          write(data) {
            setOutput((previousOutput) => previousOutput.concat(data));
          },
        })
      );

      await install.exit;

      setState("RUNNING");

      const start = await instance.spawn("pnpm", ["start"]);
      start.output.pipeTo(
        new WritableStream({
          write(data) {
            setOutput((previousOutput) => previousOutput.concat(data));
          },
        })
      );

      instance.on("server-ready", (port, url) => {
        setState("READY");
        setUrl(url);
      });
    })();
  }, []);

  return [ansi(output), url];
}

export function Sandbox({ files }: { files: FileSystemTree }) {
  const [output = ""] = useWebContainer(files);

  return (
    <pre className="h-64 overflow-auto flex flex-col-reverse">
      <code dangerouslySetInnerHTML={{ __html: toHTML(output) }} />
    </pre>
  );
}
