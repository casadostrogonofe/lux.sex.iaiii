import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ fetch: vi.fn() }));

vi.mock("../sanity/client", () => ({
  sanityClient: {
    withConfig: () => ({ fetch: mocks.fetch }),
  },
}));

import { isAllowedSoundCloudUrl, useSoundCloudUrl } from "./useSoundCloudUrl";

describe("useSoundCloudUrl", () => {
  beforeEach(() => mocks.fetch.mockReset());

  it("prioriza a URL publicada no Sanity", async () => {
    mocks.fetch.mockResolvedValue({ soundcloudUrl: "https://soundcloud.com/lux/radio" });
    const { result } = renderHook(() => useSoundCloudUrl());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.url).toBe("https://soundcloud.com/lux/radio");
    expect(result.current.error).toBe(false);
  });

  it("valida protocolo e domínio do SoundCloud", () => {
    expect(isAllowedSoundCloudUrl("https://soundcloud.com/lux/radio")).toBe(true);
    expect(isAllowedSoundCloudUrl("https://on.soundcloud.com/example")).toBe(true);
    expect(isAllowedSoundCloudUrl("http://soundcloud.com/inseguro")).toBe(false);
    expect(isAllowedSoundCloudUrl("javascript:alert(1)")).toBe(false);
    expect(isAllowedSoundCloudUrl("https://example.com/radio")).toBe(false);
  });
});