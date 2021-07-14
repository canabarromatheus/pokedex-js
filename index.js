let pokeApi = new PokeApi();
const cookies = new Cookies;

window.onload = () => {
    if (cookies.verificarQuantidade() > 0) {
        let poke = new Pokemon(cookies.obter(cookies.ultimoPokemon));
        document.getElementById('pokemon-search').value = cookies.ultimoPokemon;
    
        organizarCard(0);
        renderizar(poke);
        habilitarBotoes();
    }
}

function buscarPokemon() {
    esconderErro();
    let id = document.getElementById('pokemon-search').value;

    if(id.length > 0 && id != 0) {
        if (cookies.ultimoPokemon != id) {
            if (cookies.obter(id) == null) {
                pokeApi.buscarEspecifico(id)
                .then(pokemon => {
                    cookies.adicionar(pokemon);
                    let poke = new Pokemon(pokemon);
                    
                    organizarCard(0);
                    limparListas();
                    renderizar(poke);
                    habilitarBotoes();
                })
                .catch(() => {
                    organizarCard(5);
                    limparGeral();
                    limparListas();
                    exibirErro();
                    desabilitarBotoes();
                });
            } else {
                let poke = new Pokemon(cookies.obter(id));
        
                organizarCard(0);
                renderizar(poke);
                habilitarBotoes();
            }
        }
    } else {
        organizarCard(5);
        limparGeral();
        limparListas();
        exibirErro();
        desabilitarBotoes();
    }
}

function buscarPokemonAleatorio() {
    let id = gerarNumeroAleatorio();

    if (cookies.obter(id) == null) {
        limparListas();
        document.getElementById('pokemon-search').value = id;

        pokeApi.buscarEspecifico(id)
        .then(pokemon => {
            cookies.adicionar(pokemon)
            let poke = new Pokemon(pokemon);
            
            organizarCard(0);
            renderizar(poke);
            habilitarBotoes();
        })
        .catch(() => {
            organizarCard(5);
            limparGeral();
            exibirErro();
            desabilitarBotoes();
        });
    } else {
        let poke = new Pokemon(cookies.obter(id));

        organizarCard(0);
        renderizar(poke);
        habilitarBotoes();
    }
}

renderizar = (pokemon) => {
    let nomePokemon = document.getElementById('pokemon-nome')
    let imagemPokemon = document.getElementById('pokemon-imagem');
    let dadosPokemon = document.getElementById('pokemon-informacao');

    nomePokemon.innerHTML = pokemon.nome.toUpperCase();
    imagemPokemon.src = pokemon.imagens.front_default;

    let infoNome = dadosPokemon.querySelector('#pokemon-info-nome');
    infoNome.innerHTML = pokemon.nome;

    let infoAltura = dadosPokemon.querySelector('#pokemon-info-altura');
    infoAltura.innerHTML = pokemon.altura;

    let infoPeso = dadosPokemon.querySelector('#pokemon-info-peso');
    infoPeso.innerHTML = pokemon.peso;

    let infoTipoLista = dadosPokemon.querySelector('#pokemon-info-tipos');

    for (let i = 0; i < pokemon.tipos.length; i++) {
        let tipo = pokemon.tipos[i];
        let li = document.createElement('li');
        li.innerHTML = capitalizarPrimeiraLetra(tipo.type.name);
        infoTipoLista.appendChild(li);
    }

    let infoHabilidadeLista = dadosPokemon.querySelector('#pokemon-info-habilidades');

    for (let i = 0; i < pokemon.habilidades.length; i++) {
        let habilidade = pokemon.habilidades[i];
        let li = document.createElement('li');
        li.innerHTML = capitalizarPrimeiraLetra(habilidade.ability.name);
        infoHabilidadeLista.appendChild(li);
    }

    let infoMovimentoLista = dadosPokemon.querySelector('#pokemon-info-movimentos');

    for (let i = 0; i < pokemon.movimentos.length; i++) {
        let movimento = pokemon.movimentos[i];
        let li = document.createElement('li');
        li.innerHTML = capitalizarPrimeiraLetra(movimento.move.name);
        infoMovimentoLista.appendChild(li);
    }

    let infoStatsLista = dadosPokemon.querySelector('#pokemon-info-stats');

    for(let i = 0; i < pokemon.estatisticas.length; i++) {
        let estatistica = pokemon.estatisticas[i];
        let tr = document.createElement('tr');
        let tdNome = document.createElement('td');
        let tdValor = document.createElement('td');
        let tdEsforco = document.createElement('td');

        tdNome.innerHTML = capitalizarPrimeiraLetra(estatistica.stat.name);
        tdValor.innerHTML = estatistica.base_stat;
        tdEsforco.innerHTML = estatistica.effort;

        tr.appendChild(tdNome);
        tr.appendChild(tdValor);
        tr.appendChild(tdEsforco);

        infoStatsLista.appendChild(tr);
    }
}

limparGeral = () => {
    let dadosPokemon = document.getElementById('pokemon-informacao');
    let nomePokemon = document.getElementById('pokemon-nome')
    let imagemPokemon = document.getElementById('pokemon-imagem');

    let infoNome = dadosPokemon.querySelector('#pokemon-info-nome');
    let infoAltura = dadosPokemon.querySelector('#pokemon-info-altura');
    let infoPeso = dadosPokemon.querySelector('#pokemon-info-peso');

    nomePokemon.innerHTML = '';
    imagemPokemon.src = '';

    infoNome.innerHTML = '';
    infoAltura.innerHTML = '';
    infoPeso.innerHTML = '';
}

limparListas = () => {
    let dadosPokemon = document.getElementById('pokemon-informacao');
    let infoTipoLista = dadosPokemon.querySelector('#pokemon-info-tipos');
    let infoHabilidadeLista = dadosPokemon.querySelector('#pokemon-info-habilidades');
    let infoMovimentoLista = dadosPokemon.querySelector('#pokemon-info-movimentos');
    let infoStatsLista = dadosPokemon.querySelector('#pokemon-info-stats')

    let listas = [infoTipoLista, infoHabilidadeLista, infoMovimentoLista, infoStatsLista];

    for (let i = 0; i < listas.length; i++) {
        limparElemento(listas[i]);
    }
}

esconderErro = () => {
    let card = document.querySelector('.info-error');
    card.hidden = true;
}

exibirErro = () => {
    let card = document.querySelector('.info-error');
    card.hidden = false;
}

habilitarBotoes = () => {
    const botoes = document.querySelector('.button-group').children;

    for (let i = 0; i < botoes.length; i++) {
        let botao = botoes[i];
        botao.disabled = false;
    }
}

desabilitarBotoes = () => {
    const botoes = document.querySelector('.button-group').children;

    for (let i = 0; i < botoes.length; i++) {
        let botao = botoes[i];
        botao.disabled = true;
    }
}

organizarCard = (valor) => {
    let dadosPokemon = document.getElementById('pokemon-informacao');

    let infoGeral = dadosPokemon.querySelector('.info-geral');
    let infoHabilidades = dadosPokemon.querySelector('.info-habilidades');
    let infoMovimentos = dadosPokemon.querySelector('.info-movimentos');
    let infoStats = dadosPokemon.querySelector('.info-stats');

    switch (valor) {
        case 0:
            infoGeral.hidden = false;
            infoHabilidades.hidden = true;
            infoMovimentos.hidden = true;
            infoStats.hidden = true;

            break;

        case 1:
            infoGeral.hidden = true;
            infoHabilidades.hidden = false;
            infoMovimentos.hidden = true;
            infoStats.hidden = true;

            break;

        case 2:
            infoGeral.hidden = true;
            infoHabilidades.hidden = true;
            infoMovimentos.hidden = false;
            infoStats.hidden = true;
        
            break;

        case 3:
            infoGeral.hidden = true;
            infoHabilidades.hidden = true;
            infoMovimentos.hidden = true;
            infoStats.hidden = false;
        
            break;
    
        default:
            infoGeral.hidden = true;
            infoHabilidades.hidden = true;
            infoMovimentos.hidden = true;
            infoStats.hidden = true;

            break;
    }
}
