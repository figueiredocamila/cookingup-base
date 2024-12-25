import { act, render, screen } from '@testing-library/react';
import React from 'react';
import db from './db.json';
import { IngredientesContext, IngredientesProvider } from './index';

describe('IngredientesProvider', () => {
    it('tem o estado inicial correto', () => {
        render(
            <IngredientesProvider>
                <IngredientesContext.Consumer>
                    {({ categorias, ingredientesSelecionados }) => (
                        <div>
                            <div data-testid="categorias">
                                {categorias.map((categoria) => (
                                    <span key={categoria.id}>{categoria.nome}</span>
                                ))}
                            </div>
                            <div data-testid="ingredientes-selecionados">
                                {ingredientesSelecionados.length === 0
                                    ? 'Nenhum ingrediente selecionado'
                                    : ingredientesSelecionados.map((ingrediente) => (
                                        <span key={ingrediente.id}>{ingrediente.nome}</span>
                                    ))}
                            </div>
                        </div>
                    )}
                </IngredientesContext.Consumer>
            </IngredientesProvider>
        );

        // Verifica o estado inicial das categorias
        const categoriasDiv = screen.getByTestId('categorias');
        db.categorias.forEach((categoria) => {
            expect(categoriasDiv).toHaveTextContent(categoria.nome);
        });

        // Verifica o estado inicial dos ingredientes selecionados
        const ingredientesSelecionadosDiv = screen.getByTestId('ingredientes-selecionados');
        expect(ingredientesSelecionadosDiv).toHaveTextContent('Nenhum ingrediente selecionado');
    });

    it('fornece as categorias corretamente', () => {
        render(
            <IngredientesProvider>
                <IngredientesContext.Consumer>
                    {({ categorias }) => (
                        <div data-testid="categorias">
                            {categorias.map((categoria) => (
                                <span key={categoria.id}>{categoria.nome}</span>
                            ))}
                        </div>
                    )}
                </IngredientesContext.Consumer>
            </IngredientesProvider>
        );

        // Verifica se as categorias estão sendo fornecidas corretamente
        const categoriasDiv = screen.getByTestId('categorias');
        db.categorias.forEach((categoria) => {
            expect(categoriasDiv).toHaveTextContent(categoria.nome);
        });
    });

    it('adiciona e remove ingredientes corretamente', () => {
        const ingredienteTeste = { id: 1, nome: 'Tomate' };

        render(
            <IngredientesProvider>
                <IngredientesContext.Consumer>
                    {({ ingredientesSelecionados, alternarIngrediente }) => (
                        <div>
                            <button
                                data-testid="alternar-ingrediente"
                                onClick={() => alternarIngrediente(ingredienteTeste)}
                            >
                                Alternar Ingrediente
                            </button>
                            <div data-testid="ingredientes-selecionados">
                                {ingredientesSelecionados.map((ingrediente) => (
                                    <span key={ingrediente.id}>{ingrediente.nome}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </IngredientesContext.Consumer>
            </IngredientesProvider>
        );

        const alternarIngredienteButton = screen.getByTestId('alternar-ingrediente');
        const ingredientesSelecionadosDiv = screen.getByTestId('ingredientes-selecionados');

        // Adiciona o ingrediente
        act(() => {
            alternarIngredienteButton.click();
        });
        expect(ingredientesSelecionadosDiv).toHaveTextContent('Tomate');

        // Remove o ingrediente
        act(() => {
            alternarIngredienteButton.click();
        });
        expect(ingredientesSelecionadosDiv).not.toHaveTextContent('Tomate');
    });

    it('verifica se um ingrediente está selecionado', () => {
        const ingredienteTeste = { id: 1, nome: 'Tomate' };

        render(
            <IngredientesProvider>
                <IngredientesContext.Consumer>
                    {({ alternarIngrediente, ingredienteEstaSelecionado }) => (
                        <div>
                            <button
                                data-testid="alternar-ingrediente"
                                onClick={() => alternarIngrediente(ingredienteTeste)}
                            >
                                Alternar Ingrediente
                            </button>
                            <div data-testid="ingrediente-esta-selecionado">
                                {ingredienteEstaSelecionado(ingredienteTeste) ? 'Sim' : 'Não'}
                            </div>
                        </div>
                    )}
                </IngredientesContext.Consumer>
            </IngredientesProvider>
        );

        const alternarIngredienteButton = screen.getByTestId('alternar-ingrediente');
        const ingredienteEstaSelecionadoDiv = screen.getByTestId('ingrediente-esta-selecionado');

        // Inicialmente, o ingrediente não está selecionado
        expect(ingredienteEstaSelecionadoDiv).toHaveTextContent('Não');

        // Adiciona o ingrediente
        act(() => {
            alternarIngredienteButton.click();
        });
        expect(ingredienteEstaSelecionadoDiv).toHaveTextContent('Sim');

        // Remove o ingrediente
        act(() => {
            alternarIngredienteButton.click();
        });
        expect(ingredienteEstaSelecionadoDiv).toHaveTextContent('Não');
    });
});
