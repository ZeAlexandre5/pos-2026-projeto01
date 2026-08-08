

export function mostrarCarregando(container) {
    container.innerHTML = `
        <div class="loading">
            <p>Carregando...</p>
        </div>
    `;
}

export function mostrarErro(container, mensagem) {
    container.innerHTML = `
        <div class="error">
            <p>${mensagem}</p>
        </div>
    `;
}

export function mostrarPokemons(container, pokemons, onDetalhes) {
    container.innerHTML = '';

    pokemons.forEach(pokemon => {
        const card = criarCardPokemon(pokemon, onDetalhes);

        container.appendChild(card);
    });
}

export function criarCardPokemon(pokemon, onDetalhes) {
    const card = document.createElement('div');

    card.classList.add('pokemon-card');

    card.innerHTML = `
        <h2>${pokemon.name}</h2>

        <button class="btn-detalhes">
            Ver detalhes
        </button>
    `;

    const botao = card.querySelector('.btn-detalhes');

    botao.addEventListener('click', () => {
        onDetalhes(pokemon.name);
    });

    return card;
}

export function mostrarDetalhesPokemon(container, pokemon) {
    const tipos = pokemon.types
        .map(tipo => tipo.type.name)
        .join(', ');

    const habilidades = pokemon.abilities
        .map(item => item.ability.name)
        .join(', ');

    container.innerHTML = `
        <section class="pokemon-detalhes">

            <h1>${pokemon.name}</h1>

            <img
                src="${pokemon.sprites.front_default}"
                alt="${pokemon.name}"
            >

            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>

            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>

            <p><strong>Tipos:</strong> ${tipos}</p>

            <p><strong>Habilidades:</strong> ${habilidades}</p>

        </section>
    `;
}

export function mostrarBotaoVoltar(container, onVoltar) {
    const botao = document.createElement('button');

    botao.textContent = '← Voltar para Pokémon';

    botao.classList.add('btn-voltar');

    botao.addEventListener('click', onVoltar);

    container.prepend(botao);
}

export function limparContainer(container) {
    container.innerHTML = '';
}