function capitalizarPrimeiraLetra(frase) {
  return frase.charAt(0).toUpperCase() + frase.slice(1);
}

function limparElemento(elemento) {
  elemento.innerHTML = '';
}

function gerarNumeroAleatorio() {
  return parseInt(Math.random() * (894 - 1) + 1);
}