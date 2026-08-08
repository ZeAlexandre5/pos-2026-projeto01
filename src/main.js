

import {
    listarPokemons,
    buscarPokemon
} from './api/api.js';

import {
    mostrarCarregando,
    mostrarErro,
    mostrarPokemons,
    mostrarDetalhesPokemon,
    mostrarBotaoVoltar
} from './dom/ui.js';

const app = document.querySelector('#app');

async function carregarPokemons() {
    try {
        mostrarCarregando(app);

        const dados = await listarPokemons();

        mostrarPokemons(
            app,
            dados.results,
            carregarDetalhes
        );

    } catch (error) {
        mostrarErro(app, error.message);
    }
}

async function carregarDetalhes(nome) {
    try {
        mostrarCarregando(app);

        const pokemon = await buscarPokemon(nome);

        mostrarDetalhesPokemon(app, pokemon);

        mostrarBotaoVoltar(app, carregarPokemons);

    } catch (error) {
        mostrarErro(app, error.message);
    }
}
carregarPokemons();

