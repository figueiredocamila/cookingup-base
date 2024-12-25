import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Cabecalho from "./index";
import Logo from "./Logo";

describe("Cabecalho", () => {
  it("deve renderizar o Logo corretamente", () => {
    render(<Logo />);
    expect(screen.getByTitle("Logo da aplicação")).toBeInTheDocument();
  });

  it("deve renderizar corretamente o componente", () => {
    render(<Cabecalho />);

    // Verifica o texto do título principal
    expect(
      screen.getByText(/Um banquete de ideias para/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/despertar o chef que há em você!/i)
    ).toBeInTheDocument();

    // Verifica o subtítulo
    expect(
      screen.getByText(
        /Explore novas receitas todos os dias com os ingredientes que estão ao seu alcance!/i
      )
    ).toBeInTheDocument();

    // Verifica se a imagem do banner está renderizada
    const bannerImg = screen.getByAltText("");
    expect(bannerImg).toBeInTheDocument();
    expect(bannerImg).toHaveAttribute("src", "/banner.png");
  });
});
