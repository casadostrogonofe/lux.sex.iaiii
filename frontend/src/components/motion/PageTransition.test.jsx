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

import { PageTransition } from "./PageTransition";

describe("PageTransition", () => {
  it("preserva conteúdo quando reduced motion está ativo", () => {
    render(
      <PageTransition>
        <span>Conteúdo</span>
      </PageTransition>,
    );
    expect(screen.getByText("Conteúdo")).toBeVisible();
  });
});