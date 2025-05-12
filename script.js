let listaDeTarefas = [
    { id: 1, descricao: "Estudar para a prova de matemática", concluida: false },
    { id: 2, descricao: "Fazer um projeto de arte para a escola", concluida: false },
    { id: 3, descricao: "Ligar para o veterinário e agendar a consulta do Spike", concluida: true },
    { id: 4, descricao: "Comprar os ingredientes para o jantar", concluida: false },
    { id: 5, descricao: "Ler o próximo capítulo do livro", concluida: true },
    { id: 6, descricao: "Organizar a mesa de estudos", concluida: false }
];

const listaTarefasElement = document.getElementById('lista-de-tarefas');
const filtroElement = document.getElementById('filtro');
const inputNovaTarefa = document.getElementById('tarefaInput'); // Alterado para 'tarefaInput'
const botaoAdicionarTarefa = document.getElementById('adicionarTarefa'); // Alterado para 'adicionarTarefa'

function renderizarLista(tarefas) {
    listaTarefasElement.innerHTML = '';
    tarefas.forEach(tarefa => {
        const listItem = document.createElement('li');
        listItem.textContent = tarefa.descricao;
        if(tarefa.concluida){
            listItem.classList.add('completed')
        }

        const removerbtn = document.createElement('button');
        removerbtn.textContent = 'X';
        removerbtn.className = 'remover';
        removerbtn.onclick = function() {
            const idToRemove = listaDeTarefas.findIndex(t => t.descricao === tarefa.descricao);
            listaDeTarefas.splice(idToRemove, 1);
            renderizarLista(filtrarTarefas(filtroElement.value));
        };

        listItem.onclick = function() {
            tarefa.concluida = !tarefa.concluida;
            renderizarLista(filtrarTarefas(filtroElement.value));
        };

        listItem.appendChild(removerbtn);
        listaTarefasElement.appendChild(listItem);
    });
}

function filtrarTarefas(status) {
    if (status === "concluidas") {
        return listaDeTarefas.filter(tarefa => tarefa.concluida);
    } else if (status === "naoConcluidas") {
        return listaDeTarefas.filter(tarefa => !tarefa.concluida);
    } else {
        return listaDeTarefas;
    }
}

filtroElement.addEventListener('change', function() {
    const statusSelecionado = this.value;
    const tarefasFiltradas = filtrarTarefas(statusSelecionado);
    renderizarLista(tarefasFiltradas);
});

function adicionarTarefa() {
    const tarefaTexto = inputNovaTarefa.value.trim();
    if (tarefaTexto !== '') {
        const novoId = listaDeTarefas.length > 0 ? Math.max(...listaDeTarefas.map(t => t.id)) + 1 : 1;
        listaDeTarefas.push({ id: novoId, descricao: tarefaTexto, concluida: false });
        inputNovaTarefa.value = '';
        renderizarLista(filtrarTarefas(filtroElement.value));
    }
}
botaoAdicionarTarefa.addEventListener('click', adicionarTarefa);


renderizarLista(listaDeTarefas);