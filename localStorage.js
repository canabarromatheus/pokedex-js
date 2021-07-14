class Cookies {
    constructor() {
        this._storage = localStorage;
        this._ultimoPokemon = this._storage.getItem(0);
    }

    get ultimoPokemon() {
        return this._ultimoPokemon;
    }

    obter(chave) {
        let pokemon = JSON.parse(this._storage.getItem(chave));

        if(pokemon != null) {
            this._storage.setItem(0, pokemon.id)
            this._ultimoPokemon = pokemon.id;
        }
    
        return pokemon;
    }
    
    adicionar(pokemon) {
        this._storage.setItem(pokemon.id, JSON.stringify(pokemon));

        this._storage.setItem(0, pokemon.id)
        this._ultimoPokemon = pokemon.id;
    }

    verificarQuantidade() {
        return this._storage.length;
    }
}
