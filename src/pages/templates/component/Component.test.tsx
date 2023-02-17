import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import Component from "./Component";

describe("Component", () => {
  it("renders", () => {
    render(<Component />);

    screen.debug();
  });
});
