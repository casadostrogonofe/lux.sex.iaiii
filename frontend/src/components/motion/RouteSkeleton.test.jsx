import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, initial, animate, exit, transition, variants, ...props }) => (
      <div {...props}>{children}</div>
    ),
  },
  useReducedMotion: () => true,
}));

import { RouteSkeleton } from "./RouteSkeleton";

describe("RouteSkeleton", () => {
  it("expõe estado de loading acessível e estável", () => {
    render(<RouteSkeleton />);
    expect(screen.getByTestId("route-loading-skeleton")).toHaveAttribute(
      "aria-label",
      "Carregando conteúdo",
    );
  });
});