// Configurações de Pagamento Real - Espaço Fit Academia

const PaymentConfig = {
// Ambiente de produção
environment: "sandbox", // Mude para 'production' quando estiver pronto

// Configurações de segurança
security: {
    encryption: {
    algorithm: "AES-256-GCM",
    keyLength: 256,
    },

    headers: {
    "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' https://sdk.mercadopago.com; style-src 'self' 'unsafe-inline'",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    },

    inputValidation: {
    maxLength: {
        cardNumber: 19,
        cardName: 50,
        cvv: 4,
        cpf: 14,
        email: 100,
    },

    patterns: {
        cardNumber: /^[0-9\s]{13,19}$/,
        cardExpiry: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        cardCvv: /^[0-9]{3,4}$/,
        cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    },
},

// CONFIGURE SUAS CREDENCIAIS REAIS DO MERCADO PAGO AQUI
gateways: {
    credit_card: {
    enabled: true,
    provider: "mercadopago",
    // SUBSTITUA PELAS SUAS CREDENCIAIS REAIS
    publicKey: "TEST-YOUR_PUBLIC_KEY_HERE", // Sua chave pública de teste
    accessToken: "TEST-YOUR_ACCESS_TOKEN_HERE", // Seu token de acesso de teste

    settings: {
        currency: "BRL",
        capture_method: "automatic",
        confirmation_method: "automatic",
        installments: 12,
        webhook_url: window.location.origin + "/webhook/mercadopago",
    },
    },

    pix: {
    enabled: true,
    provider: "mercadopago",
    // SUBSTITUA PELO SEU TOKEN REAL
    accessToken: "TEST-YOUR_ACCESS_TOKEN_HERE",

    // CONFIGURE SUA CHAVE PIX REAL AQUI
    pixKey: "rodrigosantos2190r@gmail.com", // Sua chave PIX real

    settings: {
        expiration: 3600, // 1 hora
        description: "Pagamento Espaço Fit Academia",
        webhook_url: window.location.origin + "/webhook/pix",
    },
    },

    boleto: {
    enabled: true,
    provider: "mercadopago",
    // SUBSTITUA PELO SEU TOKEN REAL
    accessToken: "TEST-YOUR_ACCESS_TOKEN_HERE",

    settings: {
        expiration_days: 3,
        instructions: "Pagamento referente à compra na Espaço Fit Academia",
        webhook_url: window.location.origin + "/webhook/boleto",
    },
    },
},

logging: {
    enabled: true,
    level: "info",
    sensitive_fields: ["card_number", "cvv", "cpf", "full_name", "email"],
},

rateLimiting: {
    enabled: true,
    maxAttempts: 5,
    windowMs: 900000, // 15 minutos
    blockDuration: 3600000, // 1 hora
},

webhooks: {
    enabled: false,
},

notifications: {
    email: {
    enabled: false,
    },
},
};

// Funções de segurança e validação
const PaymentSecurity = {
validateInput: function (field, value) {
    const config = PaymentConfig.security.inputValidation;

    if (value.length > config.maxLength[field]) {
    return { valid: false, error: "Valor muito longo" };
    }

    if (config.patterns[field] && !config.patterns[field].test(value)) {
    return { valid: false, error: "Formato inválido" };
    }

    return { valid: true };
},

sanitizeInput: function (input) {
    return input.replace(/[<>\"'&]/g, function (match) {
    const map = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "&": "&amp;",
    };
    return map[match];
    });
},

generateSecureHash: function (data) {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2);
    return btoa(JSON.stringify(data) + timestamp + randomStr);
},

checkRateLimit: function (identifier) {
    const key = `rate_limit_${identifier}`;
    const attempts = localStorage.getItem(key);
    const config = PaymentConfig.rateLimiting;

    if (!attempts) {
    localStorage.setItem(
        key,
        JSON.stringify({
        count: 1,
        timestamp: Date.now(),
        })
    );
    return { allowed: true };
    }

    const data = JSON.parse(attempts);
    const now = Date.now();

    if (now - data.timestamp > config.windowMs) {
    localStorage.setItem(
        key,
        JSON.stringify({
        count: 1,
        timestamp: now,
        })
    );
    return { allowed: true };
    }

    if (data.count >= config.maxAttempts) {
    return {
        allowed: false,
        error: "Muitas tentativas. Tente novamente mais tarde.",
    };
    }

    data.count++;
    localStorage.setItem(key, JSON.stringify(data));

    return { allowed: true };
},

logSecurityEvent: function (event, data) {
    if (PaymentConfig.logging.enabled) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        event: event,
        data: this.sanitizeLogData(data),
        userAgent: navigator.userAgent,
        url: window.location.href,
    };

    console.log("Security Event:", logEntry);
    }
},

sanitizeLogData: function (data) {
    const sanitized = { ...data };
    const sensitiveFields = PaymentConfig.logging.sensitive_fields;

    sensitiveFields.forEach((field) => {
    if (sanitized[field]) {
        sanitized[field] = "[REDACTED]";
    }
    });

    return sanitized;
},
};

// Validar configurações
function validatePaymentConfig() {
const gateways = PaymentConfig.gateways;

// Verificar Mercado Pago
const mpCard = gateways.credit_card;
const mpPix = gateways.pix;

if (
    mpCard.publicKey.includes("YOUR_") ||
    mpCard.accessToken.includes("YOUR_")
) {
    console.warn("⚠️ Configure suas credenciais do Mercado Pago!");
    console.warn("📋 Acesse: https://developers.mercadopago.com.br/");
    console.warn("🔑 Configure publicKey e accessToken em payment-config.js");
    return false;
}

return true;
}

// Instruções de configuração
function showPaymentSetupInstructions() {
console.log(`
🔧 CONFIGURE O MERCADO PAGO PARA PAGAMENTOS REAIS:

1. 🌐 Acesse: https://developers.mercadopago.com.br/
2. 📝 Crie conta de desenvolvedor
3. ➕ Crie uma aplicação
4. 🔑 Copie as credenciais de TESTE:
- Public Key (começa com TEST-)
- Access Token (começa com TEST-)
5. ✏️ Substitua em payment-config.js
6. 📱 Configure sua chave PIX real
7. 🧪 Teste com cartões de teste
8. 🚀 Depois mude para credenciais de PRODUÇÃO

💳 CARTÕES DE TESTE:
- Aprovado: 4111 1111 1111 1111
- Recusado: 4000 0000 0000 0002
- CVV: qualquer 3 dígitos
- Vencimento: qualquer data futura

📱 CHAVE PIX:
- Email, telefone ou chave aleatória
- Configure no Mercado Pago
    `);
}

// Instanciar gerenciador de pagamentos seguro
class SecurePaymentManager {
constructor() {
    this.config = PaymentConfig;
    this.security = PaymentSecurity;
    this.initializeSecurity();
}

initializeSecurity() {
    // Aplicar headers de segurança
    this.applySecurityHeaders();

    // Inicializar monitoramento
    this.initializeMonitoring();

    console.log("Sistema de pagamento seguro inicializado");
}

applySecurityHeaders() {
    const headers = this.config.security.headers;

    // Simular aplicação de headers (em produção, seria no servidor)
    Object.entries(headers).forEach(([key, value]) => {
    console.log(`Security Header: ${key} = ${value}`);
    });
}

initializeMonitoring() {
    // Monitorar tentativas de pagamento
    window.addEventListener("beforeunload", () => {
    this.security.logSecurityEvent("page_unload", {
        action: "payment_session_end",
    });
    });
}

// Processar pagamento com segurança
async processSecurePayment(method, paymentData) {
    try {
    // Verificar rate limiting
    const rateLimitCheck = this.security.checkRateLimit(
        paymentData.identifier || "anonymous"
    );

    if (!rateLimitCheck.allowed) {
        throw new Error(rateLimitCheck.error);
    }

    // Validar dados de entrada
    const validationResult = this.validatePaymentData(paymentData);
    if (!validationResult.valid) {
        throw new Error(validationResult.error);
    }

    // Log do evento de tentativa de pagamento
    this.security.logSecurityEvent("payment_attempt", {
        method: method,
        amount: paymentData.amount,
        timestamp: Date.now(),
    });

    // Processar pagamento baseado no método
    const result = await this.processPaymentByMethod(method, paymentData);

    // Log de sucesso
    this.security.logSecurityEvent("payment_success", {
        method: method,
        transaction_id: result.transactionId,
    });

    return result;
    } catch (error) {
    // Log de erro
    this.security.logSecurityEvent("payment_error", {
        method: method,
        error: error.message,
    });

    throw error;
    }
}

validatePaymentData(data) {
    // Validar cada campo
    for (const [field, value] of Object.entries(data)) {
    const validation = this.security.validateInput(field, value);
    if (!validation.valid) {
        return validation;
    }
    }

    return { valid: true };
}

async processPaymentByMethod(method, data) {
    // Simular processamento por método
    switch (method) {
    case "card":
        return this.processCardPayment(data);
    case "pix":
        return this.processPixPayment(data);
    case "boleto":
        return this.processBoletoPayment(data);
    default:
        throw new Error("Método de pagamento não suportado");
    }
}

async processCardPayment(data) {
    // Simular processamento de cartão
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.1) {
        resolve({
            success: true,
            transactionId: "TXN_" + Date.now(),
            method: "card",
            status: "approved",
        });
        } else {
        reject(new Error("Cartão recusado"));
        }
    }, 2000);
    });
}

async processPixPayment(data) {
    // Simular processamento PIX
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve({
        success: true,
        transactionId: "PIX_" + Date.now(),
        method: "pix",
        status: "pending",
        qrCode: this.generatePixQR(data.amount),
        });
    }, 1000);
    });
}

async processBoletoPayment(data) {
    // Simular processamento boleto
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve({
        success: true,
        transactionId: "BOL_" + Date.now(),
        method: "boleto",
        status: "pending",
        boletoUrl: "https://example.com/boleto/" + Date.now(),
        });
    }, 1500);
    });
}

generatePixQR(amount) {
    // Gerar QR Code PIX simplificado
    const timestamp = Date.now().toString(36);
    return `PIX_QR_${amount}_${timestamp}`;
}
}

// Instanciar gerenciador de pagamentos seguro
const securePaymentManager = new SecurePaymentManager();

// Exportar para uso global
window.PaymentConfig = PaymentConfig;
window.PaymentSecurity = PaymentSecurity;
window.validatePaymentConfig = validatePaymentConfig;
window.showPaymentSetupInstructions = showPaymentSetupInstructions;
window.securePaymentManager = securePaymentManager;

console.log("💳 Payment Config loaded");
if (!validatePaymentConfig()) {
showPaymentSetupInstructions();
}
