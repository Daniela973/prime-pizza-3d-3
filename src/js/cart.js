// Lógica do Carrinho e Montagem da Mensagem do WhatsApp
const carrinho = {
    itens: [],
    adicionar(item) {
        this.itens.push(item);
        this.atualizarCarrinho();
    },
    atualizarCarrinho() {
        console.log("Carrinho atualizado:", this.itens);
    },
    gerarMensagemWhatsApp(endereco, pagamento) {
        let texto = "🍕 *NOVO PEDIDO - PRIME PIZZA*\n\n";
        
        this.itens.forEach(i => {
            texto += `• ${i.qtd}x ${i.nome} (${i.tamanho})\n`;
            if(i.borda) texto += `  Borda: ${i.borda}\n`;
            if(i.extras) texto += `  Extras: ${i.extras}\n`;
        });

        let total = this.itens.reduce((acc, item) => acc + item.preco, 0);
        texto += `\n💰 *Total:* R$ ${total.toFixed(2)}`;
        texto += `\n\n📍 *Entrega:* ${endereco}`;
        texto += `\n💳 *Pagamento:* ${pagamento}`;

        const telefonePizzaria = "5511999999999"; // Substituir pelo número real
        return `https://api.whatsapp.com/send?phone=${telefonePizzaria}&text=${encodeURIComponent(texto)}`;
    }
};
