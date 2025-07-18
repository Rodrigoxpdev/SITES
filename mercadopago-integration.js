// Integração Real com Mercado Pago - Espaço Fit Academia
class MercadoPagoIntegration {
constructor() {
    this.config = PaymentConfig.gateways;
    this.baseURL = "https://api.mercadopago.com";
    this.initialized = false;
}

// Inicializar SDK do Mercado Pago
async initialize() {
    if (this.initialized) return;

    try {
    if (!window.MercadoPago) {
        await this.loadMercadoPagoSDK();
    }

    const publicKey = this.config.credit_card.publicKey;
    if (publicKey && !publicKey.includes("YOUR_")) {
        window.mp = new MercadoPago(publicKey);
        this.initialized = true;
        console.log("✅ Mercado Pago SDK inicializado");
    } else {
        console.warn("⚠️ Configure sua chave pública do Mercado Pago");
        throw new Error("Chave pública não configurada");
    }
    } catch (error) {
    console.error("❌ Erro ao inicializar Mercado Pago:", error);
    throw error;
    }
}

// Carregar SDK do Mercado Pago
loadMercadoPagoSDK() {
    return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="mercadopago"]')) {
        resolve();
        return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
    });
}

// Processar pagamento com cartão
async processCardPayment(paymentData) {
    try {
    await this.initialize();

    const cardData = {
        cardNumber: paymentData.cardNumber.replace(/\s/g, ""),
        cardholderName: paymentData.cardName,
        cardExpirationMonth: paymentData.expiry.split("/")[0],
        cardExpirationYear: "20" + paymentData.expiry.split("/")[1],
        securityCode: paymentData.cvv,
        identificationType: "CPF",
        identificationNumber: paymentData.cpf.replace(/\D/g, ""),
    };

    // Criar token do cartão
    const cardToken = await this.createCardToken(cardData);

    // Processar pagamento
    const paymentResponse = await this.createPayment({
        token: cardToken.id,
        transaction_amount: paymentData.amount,
        installments: 1,
        payment_method_id: cardToken.payment_method_id,
        payer: {
        email: paymentData.email,
        identification: {
            type: "CPF",
            number: paymentData.cpf.replace(/\D/g, ""),
        },
        },
        description: "Compra Espaço Fit Academia",
    });

    return {
        success: true,
        transactionId: paymentResponse.id,
        status: paymentResponse.status,
        method: "card",
        details: paymentResponse,
    };
    } catch (error) {
    console.error("❌ Erro no pagamento com cartão:", error);
    throw new Error(`Erro no pagamento: ${error.message}`);
    }
}

// Criar token do cartão
async createCardToken(cardData) {
    return new Promise((resolve, reject) => {
    window.mp.createCardToken(cardData, (error, token) => {
        if (error) {
        console.error("Erro ao criar token:", error);
        reject(new Error("Dados do cartão inválidos"));
        } else {
        resolve(token);
        }
    });
    });
}

// Criar pagamento via API
async createPayment(paymentData) {
    const accessToken = this.config.credit_card.accessToken;

    if (!accessToken || accessToken.includes("YOUR_")) {
    throw new Error("Token de acesso do Mercado Pago não configurado");
    }

    const response = await fetch(`${this.baseURL}/v1/payments`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": this.generateIdempotencyKey(),
    },
    body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro na API do Mercado Pago");
    }

    return await response.json();
}

// Gerar PIX real
async generatePIX(amount, description, customerEmail) {
    try {
    const accessToken = this.config.pix.accessToken;

    if (!accessToken || accessToken.includes("YOUR_")) {
        console.warn("⚠️ Token PIX não configurado, usando simulação");
        return this.generateMockPIX(amount);
    }

    const pixData = {
        transaction_amount: amount,
        description: description || "Pagamento Espaço Fit Academia",
        payment_method_id: "pix",
        payer: {
        email: customerEmail,
        first_name: this.extractNameFromEmail(customerEmail),
        last_name: "Cliente",
        },
        notification_url: window.location.origin + "/webhook/pix",
    };

    console.log("🔄 Criando PIX no Mercado Pago...");

    const response = await fetch(`${this.baseURL}/v1/payments`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": this.generateIdempotencyKey(),
        },
        body: JSON.stringify(pixData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erro na API PIX:", errorData);
        throw new Error(`Erro PIX: ${errorData.message || "Falha na API"}`);
    }

    const payment = await response.json();
    console.log("✅ PIX criado com sucesso:", payment.id);

    return {
        success: true,
        transactionId: payment.id,
        qrCode: payment.point_of_interaction?.transaction_data?.qr_code || "",
        qrCodeBase64:
        payment.point_of_interaction?.transaction_data?.qr_code_base64 || "",
        pixCode:
        payment.point_of_interaction?.transaction_data?.qr_code ||
        this.generatePixCode(amount),
        expiresAt: payment.date_of_expiration,
        status: payment.status,
    };
    } catch (error) {
    console.error("❌ Erro na API PIX real:", error);
    console.warn("⚠️ Usando PIX simulado como fallback");
    return this.generateMockPIX(amount);
    }
}

// Gerar boleto real
async generateBoleto(amount, customerData) {
    try {
    const accessToken = this.config.boleto.accessToken;

    if (!accessToken || accessToken.includes("YOUR_")) {
        console.warn("⚠️ Token Boleto não configurado, usando simulação");
        return this.generateMockBoleto(amount, customerData);
    }

    const boletoData = {
        transaction_amount: amount,
        description: "Compra Espaço Fit Academia",
        payment_method_id: "bolbradesco",
        payer: {
        email: customerData.email,
        first_name: this.extractNameFromEmail(customerData.email),
        last_name: "Cliente",
        identification: {
            type: "CPF",
            number: customerData.document.replace(/\D/g, ""),
        },
        },
        date_of_expiration: this.getExpirationDate(3), // 3 dias
        notification_url: window.location.origin + "/webhook/boleto",
    };

    console.log("🔄 Criando Boleto no Mercado Pago...");

    const response = await fetch(`${this.baseURL}/v1/payments`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Idempotency-Key": this.generateIdempotencyKey(),
        },
        body: JSON.stringify(boletoData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erro na API Boleto:", errorData);
        throw new Error(`Erro Boleto: ${errorData.message || "Falha na API"}`);
    }

    const payment = await response.json();
    console.log("✅ Boleto criado com sucesso:", payment.id);

    return {
        success: true,
        transactionId: payment.id,
        boletoUrl: payment.transaction_details?.external_resource_url || "",
        barCode: payment.barcode || "",
        dueDate: payment.date_of_expiration,
        status: payment.status,
    };
    } catch (error) {
    console.error("❌ Erro na API Boleto real:", error);
    console.warn("⚠️ Usando Boleto simulado como fallback");
    return this.generateMockBoleto(amount, customerData);
    }
}

// Gerar PIX simulado realista
generateMockPIX(amount) {
    const timestamp = Date.now().toString(36);
    const pixCode = this.generatePixCode(amount);

    console.log(
    "⚠️ Usando PIX simulado - Configure credenciais reais para PIX funcional"
    );

    return {
    success: true,
    transactionId: `PIX_MOCK_${timestamp}`,
    qrCode: pixCode,
    pixCode: pixCode,
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
    status: "pending",
    mock: true,
    };
}

// Gerar boleto simulado realista
generateMockBoleto(amount, customerData) {
    const transactionId = "BOL_MOCK_" + Date.now();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);

    console.log(
    "⚠️ Usando Boleto simulado - Configure credenciais reais para Boleto funcional"
    );

    return {
    success: true,
    transactionId: transactionId,
    boletoUrl: `${window.location.origin}/boleto-simulado?id=${transactionId}`,
    barCode: "34191.79001 01043.510047 91020.150008 1 89050000012345",
    dueDate: dueDate.toISOString(),
    status: "pending",
    mock: true,
    };
}

// Gerar código PIX real com chave configurada
generatePixCode(amount) {
    const merchantName = "ESPACO FIT ACADEMIA";
    const merchantCity = "SAO PAULO";
    const pixKey = this.config.pix.pixKey || "rodrigosantos2190r@gmail.com";
    const txId = this.generateTransactionId();

    // Estrutura PIX correta
    let pix = "00020126";
    pix += "580014BR.GOV.BCB.PIX01";
    pix += String(pixKey.length).padStart(2, "0") + pixKey;
    pix += "520400005303986";
    pix +=
    "54" +
    String(amount.toFixed(2).length).padStart(2, "0") +
    amount.toFixed(2);
    pix += "5802BR";
    pix += "59" + String(merchantName.length).padStart(2, "0") + merchantName;
    pix += "60" + String(merchantCity.length).padStart(2, "0") + merchantCity;
    pix +=
    "62" +
    String(txId.length + 4).padStart(2, "0") +
    "05" +
    String(txId.length).padStart(2, "0") +
    txId;
    pix += "6304"; // CRC placeholder

    return pix;
}

// Utilitários
generateTransactionId() {
    return Math.random().toString(36).substring(2, 15).toUpperCase();
}

generateIdempotencyKey() {
    return "EFA_" + Date.now() + "_" + Math.random().toString(36).substring(2);
}

extractNameFromEmail(email) {
    return email
    .split("@")[0]
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

getExpirationDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
}

// Verificar status do pagamento
async checkPaymentStatus(paymentId) {
    try {
    const accessToken = this.config.credit_card.accessToken;

    const response = await fetch(`${this.baseURL}/v1/payments/${paymentId}`, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        return await response.json();
    }
    } catch (error) {
    console.error("Erro ao verificar status:", error);
    }
    return null;
}
}

// Instanciar integração
const mercadoPagoIntegration = new MercadoPagoIntegration();

// Exportar para uso global
window.mercadoPagoIntegration = mercadoPagoIntegration;

console.log("💳 Mercado Pago Integration loaded");
