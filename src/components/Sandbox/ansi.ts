import toHTML from "ansi-html";

export default function ansi(raw: string) {
  let buffer: string[][] = [];
  let x = 0;
  let y = 0;
  let index = 0;

  while (index < raw.length) {
    let char = raw.charAt(index);

    switch (char) {
      case "\n":
        x = 0;
        y += 1;
        index += 1;
        char = "";
        break;

      // See https://www.solarstrike.net/docs/micromacro/ansi-console#navigation
      case "\x1b":
        const match = raw.slice(index).match(/^\x1b\[(?<n>\d)(?<op>[A-Z])/);
        if (!match) break;

        const { 0: code, groups: { n = 0, op } = {} } = match;

        switch (op) {
          case "A":
            x = 0;
            y -= Number(n);
            break;
          case "B":
            x = 0;
            y += Number(n);
            break;
          case "K":
            buffer = buffer.slice(0, y + 1);
            buffer[y] = buffer[y].slice(0, x);
            break;
        }

        index += code.length;
        char = "";
    }

    if (!buffer[y]) buffer[y] = [];

    buffer[y][x++] = char;
    index += char.length;
  }

  const output = buffer.map((line) => line.join("")).join("\n");

  return toHTML(output);
}
