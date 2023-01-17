const addTarefas = document.getElementById('texto-tarefa');
const btnAdicionar = document.getElementById('criar-tarefa');
const lista = document.getElementById('lista-tarefas');
const tasks = document.getElementsByClassName('task-list');
const btnLimpar = document.getElementById('apaga-tudo');
const btnFinish = document.getElementById('remover-finalizados');
const btnSave = document.getElementById('salvar-tarefas');
const btnUP = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');
const btnDeleted = document.getElementById('remover-selecionado');

function addText() {
  const tarefas = document.createElement('li');
  tarefas.innerText = addTarefas.value;
  addTarefas.value = '';
  tarefas.className = 'task-list';
  tarefas.addEventListener('click', addGrayTextList);
  tarefas.addEventListener('dblclick', addFinishi);
  lista.appendChild(tarefas);
}

btnAdicionar.addEventListener('click', addText);

function addGrayTextList(event) {
  const selecioned = document.querySelector('.selected');
  if (selecioned) {
    selecioned.classList.remove('selected');
  }
  event.currentTarget.classList.add('selected');
}

function addFinishi(event) {
  const finish = event.currentTarget;
  if (finish.classList.contains('completed') === false) {
    finish.classList.add('completed');
  } else {
    finish.classList.remove('completed');
  }
}

function clearList() {
  lista.innerHTML = '';
}

btnLimpar.addEventListener('click', clearList);

function clearFinish() {
  const clear = document.querySelectorAll('.completed');
  for (let index = 0; index < clear.length; index += 1) {
    lista.removeChild(clear[index]);
  }
}

btnFinish.addEventListener('click', clearFinish);

function saveList() {
  localStorage.setItem('saveList', JSON.stringify(lista.innerHTML));
}

window.onload = function storage() {
  lista.innerHTML = JSON.parse(localStorage.getItem('saveList'));
}

btnSave.addEventListener('click', saveList);

function upList() {
  const task = document.querySelectorAll('li');
  for (let index = 0; index < task.length; index += 1) {
    if (task[index].classList.contains('selected') && task[index].previousElementSibling) {
      task[index].parentNode.insertBefore(task[index], task[index].previousElementSibling);
    }
  }
}

btnUP.addEventListener('click', upList);

function downList() {
  const task = document.querySelectorAll('li');
  for (let index = 0; index < task.length; index += 1) {
    if (task[index].classList.contains('selected') && task[index].nextElementSibling) {
      task[index].parentNode.insertBefore(task[index].nextElementSibling, task[index]);
    }
  }
}

btnDown.addEventListener('click', downList);

function deleteSelected() {
  const task = document.querySelectorAll('li');
  for (let index = 0; index < task.length; index += 1) {
    if (task[index].classList.contains('selected')) {
      task[index].remove();
    }
  }
}

btnDeleted.addEventListener('click', deleteSelected);
