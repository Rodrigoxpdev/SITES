// Configuração do EmailJS para Espaço Fit Academia
// Configure suas credenciais reais aqui

const EmailJSConfig = {
  // SUBSTITUA PELAS SUAS CREDENCIAIS REAIS DO EMAILJS
  publicKey: "kM4UMCqxcMVOQtmyn", // Sua chave pública real do EmailJS
  serviceId: "YOUR_SERVICE_ID", // ID do seu serviço (ex: service_gmail)

  // IDs dos templates - crie estes templates no EmailJS
  templates: {
    payment_success: "template_success", // Template para pagamento aprovado
    payment_pending: "template_pending", // Template para pagamento pendente
    payment_failed: "template_failed", // Template para pagamento falhou
  },

  // Modo de produção
  testMode: false,

  // Email da empresa
  fallbackEmail: "rodrigosantos2190r@gmail.com",
};

// Validar se as configurações estão corretas
function validateEmailJSConfig() {
const required = ["publicKey", "serviceId"];
const missing = required.filter(
    (key) =>
    !EmailJSConfig[key] ||
    EmailJSConfig[key].startsWith("YOUR_") ||
    EmailJSConfig[key] === "LYourRealPublicKey"
);

if (missing.length > 0) {
    console.warn("⚠️ EmailJS não configurado. Acesse: https://emailjs.com");
    console.warn("📋 Configure:", missing);
    return false;
}

return true;
}

// Instruções de configuração
function showEmailJSSetupInstructions() {
console.log(`
🔧 CONFIGURE O EMAILJS PARA EMAILS REAIS:

1. 📧 Acesse: https://emailjs.com
2. 🆓 Crie conta gratuita
3. ➕ Adicione serviço (Gmail recomendado)
4. 📝 Crie 3 templates:
- template_success (pagamento aprovado)
- template_pending (aguardando pagamento)
- template_failed (pagamento falhou)
5. 🔑 Copie suas credenciais
6. ✏️ Substitua em emailjs-config.js:
- publicKey: 'sua_chave_aqui'
- serviceId: 'service_gmail'

📋 VARIÁVEIS DOS TEMPLATES:
- {{to_email}} - Email do cliente
- {{customer_name}} - Nome do cliente
- {{transaction_id}} - ID da transação
- {{total_amount}} - Valor total
- {{payment_method}} - Método de pagamento
- {{items_list}} - Lista de itens
- {{payment_instructions}} - Instruções do pagamento
    `);
}

// Exportar configuração
window.EmailJSConfig = EmailJSConfig;
window.validateEmailJSConfig = validateEmailJSConfig;
window.showEmailJSSetupInstructions = showEmailJSSetupInstructions;
window.emailTemplates = emailTemplates;

console.log("📧 EmailJS Configuration loaded");
if (!validateEmailJSConfig()) {
showEmailJSSetupInstructions();
}
