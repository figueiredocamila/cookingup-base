import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import TagIngrediente from "./index";

const ingredienteMock = {
  nome: "Tomate",
};


test("TagIngrediente component renders correctly", () => {
  render(<TagIngrediente ingrediente={ingredienteMock} ativo={false} />);
  const buttonElement = screen.getByRole("button", { name: /Tomate/i });
  expect(buttonElement).toBeInTheDocument();
})

test("should call onClick when the button is clicked", () => {
  const onClickMock = vi.fn();

  const { getByRole } = render(<TagIngrediente ingrediente={ingredienteMock} ativo={false} onClick={onClickMock} />);

  const buttonElement = getByRole("button", { name: /Tomate/i });

  fireEvent.click(buttonElement);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test("should have the 'ativo' class when the 'ativo' prop is true", () => {
  const { getByRole } = render(<TagIngrediente ingrediente={ingredienteMock} ativo={true} />);

  const buttonElement = getByRole("button", { name: /Tomate/i });

  expect(buttonElement).toMatchSnapshot();
});

test("should not have the 'ativo' class when the 'ativo' prop is false", () => {
  const { getByRole } = render(<TagIngrediente ingrediente={ingredienteMock} ativo={false} />);

  const buttonElement = getByRole("button", { name: /Tomate/i });

  expect(buttonElement).toMatchSnapshot();
});