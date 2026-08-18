const formularioTarefa = document.getElementById("formulario-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const campoTitulo = document.getElementById("titulo-tarefa");
const campoDescricao = document.getElementById("descricao-tarefa");
const campoIdTarefa = document.getElementById("id-tarefa");
const botaoCancelar = document.getElementById("botao-cancelar");
const botaoEnviar = document.getElementById("botao-enviar");

async function buscarTarefas() {
    const response = await fetch("/tarefas");

    if (response.ok) {
        const { tarefas } = await response.json();
        return tarefas;
    }

    return [];
};

async function criarTarefa() {
      const payload = {
        titulo: campoTitulo.value,
        descricao: campoDescricao.value,
        feito: false
      }

      const response = await fetch("/tarefas", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

    if (response.ok) {
        const { mensagem, tarefaCriada } = await response.json();

        alert(mensagem);

        return tarefaCriada;
    }

    return {};
}

async function editarTarefa(id) {
    const payload = {
        titulo: campoTitulo.value,
        descricao: campoDescricao.value,
        feito: false
    }

    const response = await fetch(`/tarefas/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const { mensagem, tarefaAtualizada } = await response.json();

        alert(mensagem);

        renderizarTarefas();

        return tarefaAtualizada;
    }


    return {};
}

async function excluirTarefa(id) {
    const response = await fetch(`/tarefas/${id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const { mensagem } = await response.json();
        alert(mensagem);
    }

    renderizarTarefas();

    return;
}

async function renderizarTarefas() {
    const tarefas = await buscarTarefas();

    let html = tarefas.length === 0
        ? `<li class="estado-vazio">Nenhuma tarefa encontrada.</li>`
        : "";

    for (const tarefa of tarefas) {
        html += `
            <li class="item-tarefa">
                <div class="conteudo-tarefa">
                    <strong class="titulo-tarefa">${tarefa.titulo}</strong>
                    <p class="descricao-tarefa">${tarefa.descricao}</p>
                    <p class="meta-tarefa">ID: ${tarefa.id}</p>
                </div>
                <div class="acoes-tarefa">
                    <button type="button" onclick="editarTarefa(${tarefa.id})" class="botao-editar">Editar</button>
                    <button type="button" onclick="excluirTarefa(${tarefa.id})" class="botao-excluir">Excluir</button>
                </div>
            </li>
        `;
    }

    listaTarefas.innerHTML = html;
};

botaoEnviar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const tarefa = await criarTarefa();
    console.log(tarefa)

    let novaTarefaLi = document.createElement("li");
    novaTarefaLi.classList.add("item-tarefa")

    novaTarefaLi.innerHTML = `
        <div class="conteudo-tarefa">
            <strong class="titulo-tarefa">${tarefa.titulo}</strong>
            <p class="descricao-tarefa">${tarefa.descricao}</p>
            <p class="meta-tarefa">ID: ${tarefa.id}</p>
        </div>
        <div class="acoes-tarefa">
            <button type="button" class="botao-editar">Editar</button>
            <button type="button" class="botao-excluir">Excluir</button>
        </div>
    `;

    listaTarefas.appendChild(novaTarefaLi)
})

renderizarTarefas()