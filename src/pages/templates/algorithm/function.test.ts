import { describe, expect, it } from "vitest";
import { add } from "./function";

describe(add.name, () => {
  it("should support numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
