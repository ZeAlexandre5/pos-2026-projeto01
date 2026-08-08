const API_URL = 'https://pokeapi.co/api/v2';

export async function listarPokemons() {
    const response = await fetch(`${API_URL}/pokemon`);

    if (!response.ok) {
        throw new Error('Erro ao buscar os Pokémons');
    }

    return await response.json();
}

export async function buscarPokemon(nome) {
    const response = await fetch(`${API_URL}/pokemon/${nome}`);

    if (!response.ok) {
        throw new Error('Pokémon não encontrado');
    }

    return await response.json();
}

