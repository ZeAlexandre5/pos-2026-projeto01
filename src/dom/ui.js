export function mostrarCarregando(container) {
    container.innerHTML = `
        <div class="loading">
            <div class="loading-ball"></div>
            <p>Carregando Pokémon...</p>
        </div>
    `;
}

export function mostrarErro(container, mensagem) {
    container.innerHTML = `
        <div class="error">
            <h2>Deu ruim tropa!</h2>
            <p>${mensagem}</p>
        </div>
    `;
}

export function mostrarPokemons(container, pokemons, onDetalhes) {
    container.innerHTML = '';

    const titulo = document.createElement('div');
    titulo.classList.add('page-header');

    titulo.innerHTML = `
        <div>
            <p class="subtitle">POKÉDEX</p>
            <h1>Explore os Pokémon</h1>
            <p class="description">
                Descubra informações, tipos, habilidades e estatísticas.
            </p>
        </div>
    `;

    container.appendChild(titulo);

    const grid = document.createElement('div');
    grid.classList.add('pokemon-grid');

    pokemons.forEach(pokemon => {
        const card = criarCardPokemon(pokemon, onDetalhes);
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

export function criarCardPokemon(pokemon, onDetalhes) {
    const card = document.createElement('div');

    card.classList.add('pokemon-card');

    // Pega o número do Pokémon a partir da URL da API
    const id = pokemon.url
        ? pokemon.url.split('/').filter(Boolean).pop()
        : '';

    // Imagem oficial do Pokémon
    const imagem = id
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        : '';

    card.innerHTML = `
        <div class="pokemon-number">
            #${String(id).padStart(3, '0')}
        </div>

        <div class="pokemon-image-container">
            <img
                class="pokemon-image"
                src="${imagem}"
                alt="${pokemon.name}"
                loading="lazy"
            >
        </div>

        <h2>${formatarNome(pokemon.name)}</h2>

        <button class="btn-detalhes">
            Ver detalhes
            <span>→</span>
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
        .map(tipo => `
            <span class="type-badge type-${tipo.type.name}">
                ${formatarNome(tipo.type.name)}
            </span>
        `)
        .join('');

    const habilidades = pokemon.abilities
        .map(item => `
            <span class="ability-badge">
                ${formatarNome(item.ability.name)}
            </span>
        `)
        .join('');

    const estatisticas = pokemon.stats
        .map(item => {
            const nome = formatarStat(item.stat.name);
            const valor = item.base_stat;

            // Limita a barra visual a 100
            const porcentagem = Math.min(valor, 100);

            return `
                <div class="stat">
                    <div class="stat-header">
                        <span>${nome}</span>
                        <strong>${valor}</strong>
                    </div>

                    <div class="stat-bar">
                        <div
                            class="stat-fill"
                            style="width: ${porcentagem}%"
                        ></div>
                    </div>
                </div>
            `;
        })
        .join('');

    container.innerHTML = `
        <section class="details-page">

            <div class="details-top">
                <button class="btn-voltar">
                    ← Voltar para Pokémon
                </button>
            </div>

            <div class="details-card">

                <div class="details-image-area">

                    <span class="details-number">
                        #${String(pokemon.id).padStart(3, '0')}
                    </span>

                    <img
                        class="details-image"
                        src="${pokemon.sprites.other['official-artwork'].front_default}"
                        alt="${pokemon.name}"
                    >

                </div>

                <div class="details-info">

                    <p class="subtitle">POKÉMON</p>

                    <h1>${formatarNome(pokemon.name)}</h1>

                    <div class="types">
                        ${tipos}
                    </div>

                    <div class="basic-info">

                        <div>
                            <span>Altura</span>
                            <strong>${pokemon.height / 10} m</strong>
                        </div>

                        <div>
                            <span>Peso</span>
                            <strong>${pokemon.weight / 10} kg</strong>
                        </div>

                    </div>

                    <div class="section">
                        <h2>Habilidades</h2>

                        <div class="abilities">
                            ${habilidades}
                        </div>
                    </div>

                </div>

            </div>

            <div class="stats-section">

                <div class="section-title">
                    <p class="subtitle">STATUS</p>
                    <h2>Estatísticas</h2>
                </div>

                <div class="stats">
                    ${estatisticas}
                </div>

            </div>

        </section>
    `;

    const botaoVoltar = container.querySelector('.btn-voltar');

    botaoVoltar.addEventListener('click', () => {
    });
}

export function mostrarBotaoVoltar(container, onVoltar) {
    const botao = container.querySelector('.btn-voltar');

    if (!botao) {
        return;
    }

    // Remove possíveis eventos anteriores clonando o botão
    const novoBotao = botao.cloneNode(true);

    botao.replaceWith(novoBotao);

    novoBotao.addEventListener('click', onVoltar);
}

export function limparContainer(container) {
    container.innerHTML = '';
}

function formatarNome(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function formatarStat(nome) {
    const nomes = {
        hp: 'HP',
        attack: 'Ataque',
        defense: 'Defesa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defesa Especial',
        speed: 'Velocidade'
    };

    return nomes[nome] || formatarNome(nome);
}