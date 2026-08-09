import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppErrorFallback } from "./AppErrorFallback";

describe("AppErrorFallback", () => {
  it("oferece nova tentativa e executa o reset", () => {
    const resetError = vi.fn();
    render(<AppErrorFallback resetError={resetError} />);

    expect(screen.getByTestId("application-error-state")).toHaveAttribute("role", "alert");
    fireEvent.click(screen.getByTestId("application-error-retry-button"));
    expect(resetError).toHaveBeenCalledTimes(1);
  });
});