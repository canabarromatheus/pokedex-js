class PokeApi {
    constructor() {
        this._url = "https://pokeapi.co/api/v2/pokemon";
    }

    buscarEspecifico(id) {
        let requisicao = fetch(`${this._url}/${id}`);
        return requisicao.then(data => data.json())
    }
}