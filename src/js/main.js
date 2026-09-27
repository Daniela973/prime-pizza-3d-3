// Inicialização geral do site
document.addEventListener('DOMContentLoaded', () => {
    console.log("Prime Pizza 3D carregada com sucesso!");

    // Configurar link flutuante do WhatsApp dinamicamente
    const btnWhatsapp = document.getElementById('whatsapp-float');
    if(btnWhatsapp) {
        const numeroDesejado = "5511999999999"; // Substituir pelo número
        btnWhatsapp.href = `https://api.whatsapp.com/send?phone=${numeroDesejado}&text=Olá! Vim pelo cardápio 3D e quero fazer um pedido.`;
    }
});
