function capitalizarPrimeiraLetra(frase) {
  return frase.charAt(0).toUpperCase() + frase.slice(1);
}

function limparElemento(elemento) {
  elemento.innerHTML = '';
}

function gerarNumeroAleatorio() {
  return parseInt(Math.random() * (894 - 1) + 1);
}

function mostrarLoading() {
  document.getElementById('button-sorte').disabled = true;
  document.getElementById('loader').style.display = 'block';
}

function fecharLoading() {
  document.getElementById('button-sorte').disabled = false;
  document.getElementById('loader').style.display = 'none';
}