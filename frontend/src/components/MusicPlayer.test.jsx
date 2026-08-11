import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hookState = vi.hoisted(() => ({
  value: {
    url: "https://soundcloud.com/lux/radio",
    loading: false,
    error: false,
    retry: vi.fn(),
  },
}));

vi.mock("../hooks/useSoundCloudUrl", () => ({
  useSoundCloudUrl: () => hookState.value,
}));

import MusicPlayer from "./MusicPlayer";

describe("MusicPlayer", () => {
  beforeEach(() => hookState.value.retry.mockClear());

  it("monta o widget com a URL vinda da configuração", () => {
    render(<MusicPlayer />);
    expect(screen.getByTestId("music-player")).toBeVisible();
    expect(screen.getByTitle("Lux Radio")).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent("https://soundcloud.com/lux/radio")),
    );
  });

  it("mantém a rádio visível e permite retry quando não há URL", () => {
    hookState.value = { ...hookState.value, url: null, retry: vi.fn() };
    render(<MusicPlayer />);
    fireEvent.click(screen.getByTestId("music-player-unavailable-retry"));
    expect(hookState.value.retry).toHaveBeenCalledTimes(1);
  });
});