import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { IngredientesContext } from "../IngredientesContext/index";
import IngredientesSelecionados from "./index";

// Mock do componente TagIngrediente
vi.mock("../TagIngrediente", () => ({
  __esModule: true,
  default: vi.fn(({ ingrediente, ativo }) => (
    <div data-testid={`ingrediente-${ingrediente.nome}`} data-ativo={ativo ? "true" : "false"}>
      {ingrediente.nome}
    </div>
  )),
}));

describe("IngredientesSelecionados", () => {
  const mockAlternarIngrediente = vi.fn();

  const renderWithContext = (ingredientesSelecionados) =>
    render(
      <IngredientesContext.Provider
        value={{
          categorias: [],
          ingredientesSelecionados,
          alternarIngrediente: mockAlternarIngrediente,
          ingredienteEstaSelecionado: (ingrediente) => true
        }}
      >
        <IngredientesSelecionados />
      </IngredientesContext.Provider>
    );

  it("deve exibir o título e os ingredientes selecionados", () => {
    const ingredientes = [
      { id: 1, nome: "Tomate" },
      { id: 2, nome: "Cenoura" },
    ];

    renderWithContext(ingredientes);

    // Verifica o título
    expect(screen.getByText("Sua lista:")).toBeInTheDocument();

    // Verifica os ingredientes renderizados
    expect(screen.getByText("Tomate")).toBeInTheDocument();
    expect(screen.getByText("Cenoura")).toBeInTheDocument();

    // Verifica o botão de remover
    expect(screen.getAllByText("Remover")).toHaveLength(2);
  });

  it("deve chamar alternarIngrediente ao clicar em um ingrediente", () => {
    const ingredientes = [{ id: 1, nome: "Tomate" }];

    renderWithContext(ingredientes);

    const tagIngrediente = screen.getByTestId("ingrediente-Tomate");
    fireEvent.click(tagIngrediente);

    expect(mockAlternarIngrediente).toHaveBeenCalledWith({ id: 1, nome: "Tomate" });
  });

  it("não deve renderizar nada se não houver ingredientes selecionados", () => {
    renderWithContext([]);

    expect(screen.queryByText("Sua lista:")).not.toBeInTheDocument();
    expect(screen.queryByTestId(/ingrediente-/)).not.toBeInTheDocument();
  });
});
