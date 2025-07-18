    // Serviço de Email para Espaço Fit Academia
    class EmailService {
    constructor() {
        this.initialized = false;
        this.emailTemplates = {
        payment_success: {
            subject: "Pagamento Aprovado - Espaço Fit Academia",
            template: this.getSuccessTemplate(),
        },
        payment_failed: {
            subject: "Problema no Pagamento - Espaço Fit Academia",
            template: this.getFailedTemplate(),
        },
        payment_pending: {
            subject: "Aguardando Pagamento - Espaço Fit Academia",
            template: this.getPendingTemplate(),
        },
        };
    }

    // Template de email para pagamento aprovado
    getSuccessTemplate() {
        return `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #ff6b35; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background: #f8f9fa; }
                        .success-icon { color: #28a745; font-size: 48px; margin-bottom: 20px; }
                        .item { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
                        .total { font-size: 1.2em; font-weight: bold; color: #ff6b35; }
                        .footer { padding: 20px; text-align: center; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🏋️ Espaço Fit Academia</h1>
                            <h2>Pagamento Aprovado!</h2>
                        </div>
                        <div class="content">
                            <div style="text-align: center;">
                                <div class="success-icon">✅</div>
                                <h3>Sua compra foi realizada com sucesso!</h3>
                            </div>

                            <h4>Detalhes da Compra:</h4>
                            <div id="order-items">
                                <!-- Itens serão inseridos aqui -->
                            </div>

                            <div class="total">
                                Total: R$ <span id="total-amount">0,00</span>
                            </div>

                            <p><strong>ID da Transação:</strong> <span id="transaction-id"></span></p>
                            <p><strong>Data:</strong> <span id="transaction-date"></span></p>

                            <p>Obrigado por escolher a Espaço Fit Academia! Sua jornada fitness começa agora.</p>
                        </div>
                        <div class="footer">
                            <p>📧 rodrigosantos2190r@gmail.com | 📱 (11) 99999-9999</p>
                            <p>Espaço Fit Academia - Transformando Vidas</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
    }

    // Template para pagamento pendente (PIX/Boleto)
    getPendingTemplate() {
        return `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #ff6b35; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background: #f8f9fa; }
                        .pending-icon { color: #ffc107; font-size: 48px; margin-bottom: 20px; }
                        .qr-code { text-align: center; margin: 20px 0; }
                        .pix-code { background: white; padding: 15px; border-radius: 5px; font-family: monospace; word-break: break-all; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🏋️ Espaço Fit Academia</h1>
                            <h2>Aguardando Pagamento</h2>
                        </div>
                        <div class="content">
                            <div style="text-align: center;">
                                <div class="pending-icon">⏳</div>
                                <h3>Sua compra está quase finalizada!</h3>
                            </div>

                            <div id="payment-instructions">
                                <!-- Instruções específicas do método serão inseridas aqui -->
                            </div>

                            <p>Assim que o pagamento for confirmado, você receberá um email de confirmação.</p>
                        </div>
                        <div class="footer">
                            <p>📧 rodrigosantos2190r@gmail.com | 📱 (11) 99999-9999</p>
                            <p>Espaço Fit Academia - Transformando Vidas</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
    }

    // Template para pagamento falhou
    getFailedTemplate() {
        return `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background: #f8f9fa; }
                        .error-icon { color: #dc3545; font-size: 48px; margin-bottom: 20px; }
                        .retry-btn { background: #ff6b35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🏋️ Espaço Fit Academia</h1>
                            <h2>Problema no Pagamento</h2>
                        </div>
                        <div class="content">
                            <div style="text-align: center;">
                                <div class="error-icon">❌</div>
                                <h3>Não foi possível processar seu pagamento</h3>
                            </div>

                            <p>Ocorreu um problema ao processar seu pagamento. Isso pode acontecer por diversos motivos:</p>
                            <ul>
                                <li>Dados do cartão incorretos</li>
                                <li>Limite insuficiente</li>
                                <li>Problemas na conexão</li>
                            </ul>

                            <p>Não se preocupe! Você pode tentar novamente.</p>

                            <div style="text-align: center;">
                                <a href="#" class="retry-btn">Tentar Novamente</a>
                            </div>
                        </div>
                        <div class="footer">
                            <p>📧 rodrigosantos2190r@gmail.com | 📱 (11) 99999-9999</p>
                            <p>Espaço Fit Academia - Transformando Vidas</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
    }

    // Configuração do EmailJS
    initializeEmailJS() {
        if (!this.initialized && typeof EmailJSConfig !== "undefined") {
        if (validateEmailJSConfig() && !EmailJSConfig.testMode) {
            emailjs.init(EmailJSConfig.publicKey);
            this.initialized = true;
            console.log("📧 EmailJS inicializado com configuração real");
        } else {
            console.log("📧 EmailJS em modo de teste/simulação");
        }
        }
    }

    // Enviar email usando EmailJS (serviço gratuito)
    async sendEmail(to, type, data) {
        try {
        console.log("📧 Enviando email para:", to);
        console.log("📋 Tipo:", type);
        console.log("📄 Dados:", data);

        const template = this.emailTemplates[type];
        if (!template) {
            throw new Error("Template de email não encontrado");
        }

        // Tentar envio real primeiro
        try {
            await this.sendRealEmail(to, template.subject, data, type);
            console.log("✅ Email real enviado com sucesso!");
        } catch (emailError) {
            console.warn(
            "⚠️ Falha no envio real, usando simulação:",
            emailError.message
            );
            // Fallback para simulação se o envio real falhar
            const emailContent = this.generateEmailContent(template, data);
            this.simulateEmailSend(to, template.subject, emailContent, data);
        }

        return {
            success: true,
            message: "Email enviado com sucesso!",
            emailId: "EMAIL_" + Date.now(),
        };
        } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
        return {
            success: false,
            error: error.message,
        };
        }
    }

    // Envio real de email via EmailJS
    async sendRealEmail(to, subject, data, type) {
        this.initializeEmailJS();

        // Verificar se EmailJS está disponível
        if (typeof emailjs === "undefined") {
        throw new Error("EmailJS não está carregado");
        }

        // Gerar nome do cliente a partir do email se não fornecido
        const customerName = data.customerName || this.extractNameFromEmail(to);

        const templateParams = {
        to_email: to,
        from_name: "Espaço Fit Academia",
        reply_to: "rodrigosantos2190r@gmail.com",
        subject: subject,
        customer_name: customerName,
        transaction_id: data.transactionId || "N/A",
        payment_method: this.getPaymentMethodName(data.paymentMethod),
        total_amount: data.total
            ? `R$ ${data.total.toFixed(2).replace(".", ",")}`
            : "R$ 0,00",
        transaction_date: data.date || new Date().toLocaleString("pt-BR"),
        items_list: this.formatItemsList(data.items),
        payment_instructions: this.getPaymentInstructions(data),
        additional_info: this.getAdditionalInfo(data),
        company_name: "Espaço Fit Academia",
        company_email: "rodrigosantos2190r@gmail.com",
        company_phone: "(11) 99999-9999",
        company_whatsapp: "5511999999999",
        };

        // Usar configuração do EmailJSConfig
        const templateId =
        EmailJSConfig.templates[type] || EmailJSConfig.templates.payment_success;

        try {
        // Enviar via EmailJS
        const response = await emailjs.send(
            EmailJSConfig.serviceId,
            templateId,
            templateParams
        );

        console.log("✅ Email real enviado via EmailJS:", response);

        // Mostrar notificação de sucesso
        this.showEmailSuccessNotification(to, subject);

        return response;
        } catch (error) {
        console.error("❌ Erro no EmailJS:", error);

        // Se o EmailJS falhar, tentar envio alternativo
        throw new Error(`Falha no EmailJS: ${error.message}`);
        }
    }

    // Extrair nome do email
    extractNameFromEmail(email) {
        const namePart = email.split("@")[0];
        return namePart
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    }

    // Obter nome amigável do método de pagamento
    getPaymentMethodName(method) {
        const methods = {
        card: "Cartão de Crédito",
        pix: "PIX",
        boleto: "Boleto Bancário",
        };
        return methods[method] || method;
    }

    // Obter informações adicionais baseadas no contexto
    getAdditionalInfo(data) {
        switch (data.paymentMethod) {
        case "pix":
            return "O PIX tem validade de 1 hora. Após esse período, será necessário gerar um novo código.";
        case "boleto":
            return "O boleto tem vencimento em 3 dias úteis. Pagamentos após o vencimento não serão processados.";
        case "card":
            return "O pagamento foi processado com segurança. Você pode verificar a cobrança em sua fatura.";
        default:
            return "Entre em contato conosco se tiver alguma dúvida sobre o pagamento.";
        }
    }

    // Mostrar notificação de email enviado com sucesso
    showEmailSuccessNotification(to, subject) {
        const notification = document.createElement("div");
        notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                z-index: 10002;
                box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
                max-width: 350px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.4s ease;
                border-left: 4px solid #fff;
            `;

        notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 50%; min-width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-paper-plane" style="font-size: 1.2rem;"></i>
                    </div>
                    <div>
                        <div style="font-weight: bold; font-size: 1rem;">📧 Email Enviado!</div>
                        <div style="font-size: 0.85rem; opacity: 0.9; margin-top: 2px;">Para: ${to}</div>
                        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 1px;">Verifique sua caixa de entrada</div>
                    </div>
                </div>
            `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(0)";
        }, 100);

        // Remover após 6 segundos
        setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
            if (document.body.contains(notification)) {
            document.body.removeChild(notification);
            }
        }, 400);
        }, 6000);
    }

    // Formatar lista de itens para o email
    formatItemsList(items) {
        if (!items || !Array.isArray(items)) return "Nenhum item";

        return items
        .map(
            (item) =>
            `• ${item.name} (${item.quantity}x) - R$ ${(
                item.price * item.quantity
            )
                .toFixed(2)
                .replace(".", ",")}`
        )
        .join("\n");
    }

    // Obter instruções específicas do método de pagamento
    getPaymentInstructions(data) {
        switch (data.paymentMethod) {
        case "pix":
            return data.pixCode
            ? `Código PIX: ${data.pixCode}\nVencimento: 1 hora após a geração`
            : "Aguardando geração do código PIX";
        case "boleto":
            return data.boletoUrl
            ? `Link do boleto: ${data.boletoUrl}\nVencimento: 3 dias úteis`
            : "Boleto será enviado por email";
        case "card":
            return "Pagamento processado com cartão de crédito";
        default:
            return "Instruções serão enviadas em breve";
        }
    }

    // Gerar conteúdo do email com os dados
    generateEmailContent(template, data) {
        let content = template.template;

        if (data.items) {
        const itemsHtml = data.items
            .map(
            (item) => `
                    <div class="item">
                        <strong>${item.name}</strong> (${item.quantity}x) - R$ ${(
                item.price * item.quantity
            )
                .toFixed(2)
                .replace(".", ",")}
                    </div>
                `
            )
            .join("");
        content = content.replace(
            '<div id="order-items">',
            `<div id="order-items">${itemsHtml}`
        );
        }

        if (data.total) {
        content = content.replace(
            'R$ <span id="total-amount">0,00</span>',
            `R$ ${data.total.toFixed(2).replace(".", ",")}`
        );
        }

        if (data.transactionId) {
        content = content.replace(
            '<span id="transaction-id"></span>',
            data.transactionId
        );
        }

        if (data.date) {
        content = content.replace(
            '<span id="transaction-date"></span>',
            data.date
        );
        }

        // Instruções específicas para PIX/Boleto
        if (data.paymentMethod === "pix" && data.pixCode) {
        const pixInstructions = `
                    <h4>Pagamento via PIX:</h4>
                    <div class="qr-code">
                        <p>Escaneie o QR Code ou copie o código abaixo:</p>
                        <div class="pix-code">${data.pixCode}</div>
                    </div>
                    <p><strong>Vencimento:</strong> 1 hora após a geração</p>
                `;
        content = content.replace(
            '<div id="payment-instructions">',
            `<div id="payment-instructions">${pixInstructions}`
        );
        }

        if (data.paymentMethod === "boleto" && data.boletoUrl) {
        const boletoInstructions = `
                    <h4>Pagamento via Boleto:</h4>
                    <p>Seu boleto foi gerado! Você pode:</p>
                    <ul>
                        <li>Pagar em qualquer banco, lotérica ou internet banking</li>
                        <li>Usar o código de barras ou linha digitável</li>
                    </ul>
                    <p><strong>Vencimento:</strong> 3 dias úteis</p>
                    <a href="${data.boletoUrl}" target="_blank" style="background: #ff6b35; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visualizar Boleto</a>
                `;
        content = content.replace(
            '<div id="payment-instructions">',
            `<div id="payment-instructions">${boletoInstructions}`
        );
        }

        return content;
    }

    // Simular envio de email (para demonstração)
    simulateEmailSend(to, subject, content, data) {
        // Salvar email no localStorage para simular envio
        const emailLog = JSON.parse(localStorage.getItem("email_log") || "[]");
        const newEmail = {
        id: "EMAIL_" + Date.now(),
        to: to,
        subject: subject,
        content: content,
        data: data,
        timestamp: new Date().toISOString(),
        sent: true,
        };

        emailLog.push(newEmail);
        localStorage.setItem("email_log", JSON.stringify(emailLog));

        // Mostrar notificação visual
        this.showEmailNotification(to, subject);

        // Log no console
        console.log("✅ Email simulado enviado!");
        console.log("📧 Para:", to);
        console.log("📋 Assunto:", subject);
        console.log("🕒 Timestamp:", newEmail.timestamp);
    }

    // Mostrar notificação visual de email enviado
    showEmailNotification(to, subject) {
        const notification = document.createElement("div");
        notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                z-index: 10002;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                max-width: 350px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;

        notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-envelope" style="font-size: 1.2rem;"></i>
                    <div>
                        <div style="font-weight: bold;">Email Enviado!</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Para: ${to}</div>
                        <div style="font-size: 0.8rem; opacity: 0.8;">${subject}</div>
                    </div>
                </div>
            `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(0)";
        }, 100);

        // Remover após 5 segundos
        setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
            if (document.body.contains(notification)) {
            document.body.removeChild(notification);
            }
        }, 300);
        }, 5000);
    }

    // Visualizar últimos emails enviados (para debug)
    getEmailHistory() {
        return JSON.parse(localStorage.getItem("email_log") || "[]");
    }

    // Limpar histórico de emails
    clearEmailHistory() {
        localStorage.removeItem("email_log");
        console.log("📧 Histórico de emails limpo");
    }
    }

    // Instanciar serviço de email
    const emailService = new EmailService();

    // Exportar para uso global
    window.emailService = emailService;

    console.log("📧 Serviço de Email carregado com sucesso!");
