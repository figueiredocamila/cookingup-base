import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IngredientesContext } from "../IngredientesContext/index";
import CardIngrediente from "./index";

// Mock do componente TagIngrediente
vi.mock("../TagIngrediente", () => ({
  __esModule: true,
  default: vi.fn(({ ingrediente, ativo, onClick }) => (
    <button
      data-testid={`ingrediente-${ingrediente.nome}`}
      ativo={ativo ? "true" : "false"}
      onClick={onClick}
    >
      {ingrediente.nome}
    </button>
  )),
}));

describe("CardIngrediente", () => {
  const mockCategoria = {
    nome: "Vegetais",
    icone: "/icons/vegetais.png",
    ingredientes: [
      { id: 1, nome: "Cenoura" },
      { id: 2, nome: "Batata" },
    ],
  };

  const mockAlternarIngrediente = vi.fn();
  const mockIngredienteEstaSelecionado = vi.fn();

  const renderWithContext = (categoria) =>
    render(
      <IngredientesContext.Provider
        value={{
          alternarIngrediente: mockAlternarIngrediente,
          ingredienteEstaSelecionado: mockIngredienteEstaSelecionado,
        }}
      >
        <CardIngrediente categoria={categoria} />
      </IngredientesContext.Provider>
    );

  it("deve renderizar corretamente o título, ícone e ingredientes", () => {
    renderWithContext(mockCategoria);

    // Verifica o título
    expect(screen.getByText("Vegetais")).toBeInTheDocument();

    // Verifica o ícone
    const icone = screen.getByRole("img");
    expect(icone).toHaveAttribute("src", "/icons/vegetais.png");

    // Verifica os ingredientes
    expect(screen.getByText("Cenoura")).toBeInTheDocument();
    expect(screen.getByText("Batata")).toBeInTheDocument();
  });

  it("deve chamar alternarIngrediente ao clicar em um TagIngrediente", () => {
    renderWithContext(mockCategoria);

    // Simula o clique no ingrediente
    const tagCenoura = screen.getByTestId("ingrediente-Cenoura");
    fireEvent.click(tagCenoura);

    expect(mockAlternarIngrediente).toHaveBeenCalledWith({
      id: 1,
      nome: "Cenoura",
    });
  });

  it("deve passar o estado correto para TagIngrediente", () => {
    // Configura o mock para retornar true para o ingrediente com id 1
    mockIngredienteEstaSelecionado.mockImplementation(
      (ingrediente) => ingrediente.id === 1
    );

    renderWithContext(mockCategoria);

    // Verifica os atributos do mock do componente
    const tagCenoura = screen.getByTestId("ingrediente-Cenoura");
    const tagBatata = screen.getByTestId("ingrediente-Batata");

    expect(tagCenoura).toHaveAttribute("ativo", "true");
    expect(tagBatata).toHaveAttribute("ativo", "false");
  });
});
