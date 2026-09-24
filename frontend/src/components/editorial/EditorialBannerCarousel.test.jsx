import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialBannerCarousel } from "./EditorialBannerCarousel";

const slides = [
  {
    id: "one",
    image: "https://images.example/one.jpg",
    alt: "Primeiro banner",
    title: "Primeiro",
  },
  {
    id: "two",
    image: "https://images.example/two.jpg",
    alt: "Segundo banner",
    title: "Segundo",
  },
];

describe("EditorialBannerCarousel", () => {
  it("reserva o espaço 6:1 com Anuncie aqui quando estiver vazio", () => {
    render(<EditorialBannerCarousel section="turismo/moteis" slides={[]} loading={false} />);
    const slot = screen.getByTestId("editorial-banner-empty-turismo/moteis");
    expect(slot).toHaveClass("aspect-[6/1]");
    expect(screen.getByText("Anuncie aqui")).toBeVisible();
  });

  it("navega pelo carrossel de banners publicados", () => {
    render(<EditorialBannerCarousel section="turismo" slides={slides} loading={false} />);
    expect(screen.getByAltText("Primeiro banner")).toBeVisible();
    fireEvent.click(screen.getByTestId("editorial-banner-next-turismo"));
    expect(screen.getByTestId("editorial-banner-slide-turismo-1")).toHaveClass("opacity-100");
  });
});