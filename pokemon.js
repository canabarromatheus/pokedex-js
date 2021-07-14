class Pokemon {
    constructor(pokemonObjeto) {
        this._id = pokemonObjeto.id;
        this._imagens = pokemonObjeto.sprites;
        this._nome = pokemonObjeto.name;
        this._altura = pokemonObjeto.height;
        this._peso = pokemonObjeto.weight;
        this._tipos = pokemonObjeto.types;
        this._habilidades = pokemonObjeto.abilities;
        this._movimentos = pokemonObjeto.moves;
        this._estatisticas = pokemonObjeto.stats;
    }

    get id() {
        return this._id;
    }

    get imagens() {
        return this._imagens;
    }

    get nome() {
        return capitalizarPrimeiraLetra(this._nome);
    }

    get altura() {
        return `${this._altura * 10}cm`;
    }

    get peso() {
        return `${this._peso / 10}kg`;
    }

    get tipos() {
        return this._tipos;
    }

    get habilidades() {
        return this._habilidades;
    }

    get movimentos() {
        return this._movimentos;
    }

    get estatisticas() {
        return this._estatisticas;
    }
}