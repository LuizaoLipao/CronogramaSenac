let aulaAtualId = "";

function abrirObservacao(id, aulaNome, dia, aulaHorario) {
  aulaAtualId = id;
  document.getElementById("tituloAula").innerText = `${dia} - ${aulaHorario} (${aulaNome})`;

  const obsSalva = localStorage.getItem(id);
  document.getElementById("textoObservacao").value = obsSalva || "";

  document.getElementById("observacaoBox").classList.remove("hidden");
}

function salvarObservacao() {
  const texto = document.getElementById("textoObservacao").value;
  localStorage.setItem(aulaAtualId, texto);
  alert("Observação salva!");
  fecharObservacao();
}

function fecharObservacao() {
  document.getElementById("observacaoBox").classList.add("hidden");
}
    