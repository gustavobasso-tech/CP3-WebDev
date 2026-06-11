// DECLARAÇÃO DE VARIÁVEIS GLOBAIS
// Banco de dados em memória utilizando estritamente um array de strings simples
var listaJogos = ["Resident Evil 4", "Rainbow Six Siege", "Elden Ring"];

// MAPEAMENTO DE ELEMENTOS DO DOM
var secaoLogin = document.getElementById("secao-login");
var secaoDashboard = document.getElementById("secao-dashboard");
var campoUsuario = document.getElementById("usuario");
var campoSenha = document.getElementById("senha");
var containerErroLogin = document.getElementById("erro-login");
var containerErroCadastro = document.getElementById("erro-cadastro");
var campoNovoItem = document.getElementById("novo-item");
var elementoLista = document.getElementById("lista-itens");

// FUNÇÃO DE LOGIN
function executarLogin() {
    var usuarioDigitado = campoUsuario.value.trim();
    var senhaDigitada = campoSenha.value;

    // Validação de campos vazios
    if (usuarioDigitado === "" || senhaDigitada === "") {
        containerErroLogin.textContent = "Erro: Usuário e senha não podem ser enviados vazios.";
        containerErroLogin.classList.remove("oculta");
        return;
    }

    // Verificação das credenciais exigidas
    if (usuarioDigitado === "aluno" && senhaDigitada === "fiap2025") {
        containerErroLogin.classList.add("oculta");
        containerErroLogin.textContent = "";
        
        // Redirecionamento de telas
        secaoLogin.classList.add("oculta");
        secaoDashboard.classList.remove("oculta");

        // Limpa os campos de login por segurança
        campoUsuario.value = "";
        campoSenha.value = "";

        // Chamada inicial de renderização da lista
        renderizarLista();
    } else {
        containerErroLogin.textContent = "Erro: Usuário ou senha incorretos.";
        containerErroLogin.classList.remove("oculta");
    }
}

// FUNÇÃO DE LOGOUT
function executarLogout() {
    secaoDashboard.classList.add("oculta");
    secaoLogin.classList.remove("oculta");
}

// FUNÇÃO DE RENDERIZAÇÃO DA LISTA (READ)
function renderizarLista() {
    // Limpa a tela antes de recriar o estado atual dos dados
    elementoLista.innerHTML = "";
    containerErroCadastro.classList.add("oculta");
    containerErroCadastro.textContent = "";

    // Iteração sobre o array de strings simples
    for (var i = 0; i < listaJogos.length; i++) {
        var jogoAtual = listaJogos[i];

        // Criação dinâmica dos elementos HTML do CRUD
        var li = document.createElement("li");
        li.className = "item-lista";

        var span = document.createElement("span");
        span.className = "item-texto";
        span.textContent = jogoAtual;

        var divAcoes = document.createElement("div");
        divAcoes.className = "botoes-acoes";

        // Criação do botão de editar passando o ÍNDICE atual como parâmetro
        var btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.className = "btn-editar";
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute("onclick", "editarItem(" + i + ")");

        // Criação do botão de remover passando o ÍNDICE atual como parâmetro
        var btnRemover = document.createElement("button");
        btnRemover.type = "button";
        btnRemover.className = "btn-remover";
        btnRemover.textContent = "Remover";
        btnRemover.setAttribute("onclick", "removerItem(" + i + ")");

        // Montagem da árvore de elementos
        divAcoes.appendChild(btnEditar);
        divAcoes.appendChild(btnRemover);
        li.appendChild(span);
        li.appendChild(divAcoes);
        
        elementoLista.appendChild(li);
    }
}

// FUNÇÃO DE ADICIONAR AO INÍCIO (CREATE - unshift)
function adicionarAoInicio() {
    var textoItem = campoNovoItem.value.trim();

    if (textoItem === "") {
        containerErroCadastro.textContent = "Erro: Não é possível adicionar um item vazio.";
        containerErroCadastro.classList.remove("oculta");
        return;
    }

    listaJogos.unshift(textoItem);
    campoNovoItem.value = "";
    renderizarLista();
}

// FUNÇÃO DE ADICIONAR AO FINAL (CREATE - push)
function adicionarAoFinal() {
    var textoItem = campoNovoItem.value.trim();

    if (textoItem === "") {
        containerErroCadastro.textContent = "Erro: Não é possível adicionar um item vazio.";
        containerErroCadastro.classList.remove("oculta");
        return;
    }

    listaJogos.push(textoItem);
    campoNovoItem.value = "";
    renderizarLista();
}

// FUNÇÃO DE EDITAR ITEM (UPDATE)
function editarItem(indice) {
    var valorOriginal = listaJogos[indice];
    var novoValor = prompt("Editar nome do jogo:", valorOriginal);

    // Validação: Se o usuário cancelar (null) ou confirmar com o campo vazio (limpo), mantém o original
    if (novoValor === null || novoValor.trim() === "") {
        return; 
    }

    listaJogos[indice] = novoValor.trim();
    renderizarLista();
}

// FUNÇÃO DE REMOVER ITEM (DELETE - usa estritamente a posição/índice)
function removerItem(indice) {
    // Remove o elemento da posição correta, impedindo que duplicados sumam juntos
    listaJogos.splice(indice, 1);
    renderizarLista();
}