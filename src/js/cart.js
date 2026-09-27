let carrinho = [];
let produtoAtual = { nome: '', precoBase: 0, tamanho: 'M', adicionalPreco: 0, borda: 'Nenhuma' };

function abrirModal(nome, preco) {
    produtoAtual.nome = nome;
    produtoAtual.precoBase = preco;
    produtoAtual.tamanho = 'M';
    produtoAtual.adicionalPreco = 10; // Padrão M (+10)
    produtoAtual.borda = 'Nenhuma';

    document.getElementById('modal-title').innerText = nome;
    document.getElementById('pizza-modal').style.display = 'flex';
    atualizarPrecoModal();
}

function fecharModal() {
    document.getElementById('pizza-modal').style.display = 'none';
}

function mudarTamanho(tamanho, valorExtra) {
    produtoAtual.tamanho = tamanho;
    produtoAtual.adicionalPreco = valorExtra;
    
    // Atualiza botões visuais
    const botoes = document.querySelectorAll('.size-options button');
    botoes.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    atualizarPrecoModal();
}

function atualizarPrecoModal() {
    const bordaSelect = document.getElementById('borda-select').value;
    produtoAtual.borda = bordaSelect;

    let valorBorda = 0;
    if(bordaSelect.includes('Catupiry') || bordaSelect.includes('Cheddar')) valorBorda = 8;
    if(bordaSelect.includes('Chocolate')) valorBorda = 10;

    const total = produtoAtual.precoBase + produtoAtual.adicionalPreco + valorBorda;
    document.getElementById('modal-preco-total').innerText = `R$ ${total.toFixed(2)}`;
}

function adicionarAoCarrinhoModal() {
    const bordaSelect = document.getElementById('borda-select').value;
    let valorBorda = 0;
    if(bordaSelect.includes('Catupiry') || bordaSelect.includes('Cheddar')) valorBorda = 8;
    if(bordaSelect.includes('Chocolate')) valorBorda = 10;

    const precoFinal = produtoAtual.precoBase + produtoAtual.adicionalPreco + valorBorda;

    const itemPedido = {
        nome: `${produtoAtual.nome} (Tam: ${produtoAtual.tamanho} | Borda: ${produtoAtual.borda})`,
        preco: precoFinal
    };

    carrinho.push(itemPedido);
    atualizarContadorCarrinho();
    fecharModal();
    alert('Pizza adicionada ao carrinho! 🛒');
}

function atualizarContadorCarrinho() {
    document.getElementById('cart-counter').innerText = carrinho.length;
    renderizarItensCarrinho();
}

function abrirCarrinho() {
    document.getElementById('cart-drawer').style.display = 'flex';
}

function fecharCarrinho() {
    document.getElementById('cart-drawer').style.display = 'none';
}

function renderizarItensCarrinho() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    if(carrinho.length === 0) {
        container.innerHTML = '<p style="color: #777; text-align: center;">Seu carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.nome}</strong>
                    <p style="color: #4caf50;">R$ ${item.preco.toFixed(2)}</p>
                </div>
                <button onclick="removerItem(${index})" style="background:none; border:none; color:#ff5722; cursor:pointer; font-size:1.2rem;">🗑️</button>
            </div>
        `;
    });
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarContadorCarrinho();
}

function finalizarPedidoWhatsApp() {
    if(carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const endereco = document.getElementById('endereco-cliente').value;
    const pagamento = document.getElementById('pagamento-cliente').value;

    if(!endereco) {
        alert('Por favor, preencha o endereço de entrega.');
        return;
    }

    let mensagem = `*NOVO PEDIDO - PRIME PIZZA* 🍕\n\n`;
    let totalGeral = 0;

    carrinho.forEach((item, index) => {
        mensagem += `${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        totalGeral += item.preco;
    });

    mensagem += `\n*Total dos Produtos:* R$ ${totalGeral.toFixed(2)}`;
    mensagem += `\n*Endereço:* ${endereco}`;
    mensagem += `\n*Forma de Pagamento:* ${pagamento}`;

    const numeroWhatsApp = "5511999999999"; // Substitua pelo número real da pizzaria (DDI + DDD + Número)
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
}

