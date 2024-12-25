import { render, screen } from '@testing-library/react';
import Rodape from './index';

// Teste unitário para o componente Rodape

describe('Rodape Component', () => {
  it('deve renderizar o texto correto', () => {
    render(<Rodape />);
    const rodapeElement = screen.getByText(/Desenvolvido por Alura \| 2023 - Projeto fictício sem fins comerciais\./i);
    expect(rodapeElement).toBeInTheDocument();
  });

  it('deve ter o estilo de fundo correto', () => {
    render(<Rodape />);
    const rodapeElement = screen.getByText(/Desenvolvido por Alura \| 2023 - Projeto fictício sem fins comerciais\./i);
    expect(rodapeElement).toHaveStyle('background: var(--verde-escuro, #263A29)');
  });
});
