import { render, screen } from '@testing-library/react';
import { IngredientesContext } from '../IngredientesContext';
import Ingredientes from './index';

vi.mock('../IngredientesSelecionados', () => ({
  __esModule: true,
  default: () => <div>Ingredientes Selecionados Mock</div>,
}));

vi.mock('../CardIngrediente', () => ({
  __esModule: true,
  default: ({ ingrediente }) => <div>{ingrediente}</div>,
}));

describe('Ingredientes Component', () => {
  it('deve renderizar o titulo e paragrafo corretamente', () => {
    render(
      <IngredientesContext.Provider value={{ categorias: [] }}>
        <Ingredientes />
      </IngredientesContext.Provider>
    );

    const tituloElement = screen.getByText(/Ingredientes/i, { selector: 'h3' });
    expect(tituloElement).toBeInTheDocument();

    const paragrafoElement = screen.getByText(/Selecione abaixo os ingredientes que você quer usar nesta receita:/i, { selector: 'p' });
    expect(paragrafoElement).toBeInTheDocument();
  });

  it('deve renderizar o componente IngredientesSelecionados', () => {
    render(
      <IngredientesContext.Provider value={{ categorias: [] }}>
        <Ingredientes />
      </IngredientesContext.Provider>
    );

    const ingredientesSelecionadosElement = screen.getByText(/Ingredientes Selecionados Mock/i);
    expect(ingredientesSelecionadosElement).toBeInTheDocument();
  });
});
