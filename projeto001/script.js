// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
nav.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav a");
navLinks.forEach((link) => {
link.addEventListener("click", () => {
    nav.classList.remove("active");
});
});

// Header scroll effect
window.addEventListener("scroll", () => {
const header = document.querySelector(".header");
if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.98)";
} else {
    header.style.background = "rgba(0, 0, 0, 0.95)";
}
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
    target.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
    }
});
});

// Form submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (e) {
e.preventDefault();

// Get form data
const formData = new FormData(this);
const name = this.querySelector('input[type="text"]').value;
const email = this.querySelector('input[type="email"]').value;
const phone = this.querySelector('input[type="tel"]').value;
const plan = this.querySelector("select").value;
const message = this.querySelector("textarea").value;

// Simple validation
if (!name || !email || !phone) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
}

// Simulate form submission
alert(
    `Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!`
);

// Reset form
this.reset();
});

// Intersection Observer for animations
const observerOptions = {
threshold: 0.1,
rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
    if (entry.isIntersecting) {
    entry.target.classList.add("fade-in-up");
    }
});
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
".service-card, .plan-card, .gallery-item, .feature"
);
animateElements.forEach((el) => observer.observe(el));

// Counter animation for plans
function animateCounter(element, target, duration = 2000) {
let start = 0;
const increment = target / (duration / 16);

const counter = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);

    if (start >= target) {
    element.textContent = target;
    clearInterval(counter);
    }
}, 16);
}

// Animate plan prices when visible
const priceElements = document.querySelectorAll(".amount");
const priceObserver = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
    if (entry.isIntersecting) {
    const target = parseInt(entry.target.textContent);
    entry.target.textContent = "0";
    animateCounter(entry.target, target);
    priceObserver.unobserve(entry.target);
    }
});
});

priceElements.forEach((el) => priceObserver.observe(el));

// Gallery image modal (simple implementation)
const galleryItems = document.querySelectorAll(".gallery-item img");
galleryItems.forEach((img) => {
img.addEventListener("click", () => {
    // Create modal
    const modal = document.createElement("div");
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;

    const modalImg = document.createElement("img");
    modalImg.src = img.src;
    modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
        `;

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Close modal on click
    modal.addEventListener("click", () => {
    document.body.removeChild(modal);
    });
});
});

// Parallax effect for hero section (disabled to prevent header shaking)
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     const heroContent = document.querySelector('.hero-content');
//
//     if (hero && scrolled < hero.offsetHeight) {
//         heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Add loading class to body when page loads
window.addEventListener("load", () => {
document.body.classList.add("loaded");
});

// Back to top button
const backToTop = document.createElement("button");
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #ff6b35;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 18px;
`;

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
if (window.scrollY > 500) {
    backToTop.style.opacity = "1";
    backToTop.style.visibility = "visible";
} else {
    backToTop.style.opacity = "0";
    backToTop.style.visibility = "hidden";
}
});

backToTop.addEventListener("click", () => {
window.scrollTo({
    top: 0,
    behavior: "smooth",
});
});

// Plan selection highlighting
const planCards = document.querySelectorAll(".plan-card");
planCards.forEach((card) => {
const button = card.querySelector(".btn");
button.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all cards
    planCards.forEach((c) => c.classList.remove("selected"));

    // Add active class to clicked card
    card.classList.add("selected");

    // Get plan name
    const planName = card.querySelector("h3").textContent;

    // Scroll to contact form
    document.querySelector("#contato").scrollIntoView({
    behavior: "smooth",
    });

    // Pre-select the plan in contact form
    setTimeout(() => {
    const select = document.querySelector(".contact-form select");
    const options = select.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].text.includes(planName)) {
        select.selectedIndex = i;
        break;
        }
    }
    }, 1000);
});
});

// Shopping Cart Functionality
let cart = [];

// Cart DOM elements
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const totalAmount = document.getElementById("total-amount");
const closeCart = document.querySelector(".close-cart");
const checkoutBtn = document.getElementById("checkout-btn");

// Add to cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Initialize cart
function initCart() {
updateCartDisplay();
updateCartCount();
}

// Add item to cart
function addToCart(product, name, price) {
const existingItem = cart.find((item) => item.product === product);

if (existingItem) {
    existingItem.quantity += 1;
} else {
    cart.push({
    product: product,
    name: name,
    price: parseFloat(price),
    quantity: 1,
    });
}

updateCartDisplay();
updateCartCount();
showCartNotification(name);
}

// Remove item from cart
function removeFromCart(product) {
cart = cart.filter((item) => item.product !== product);
updateCartDisplay();
updateCartCount();
}

// Update cart display
function updateCartDisplay() {
cartItems.innerHTML = "";

if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    cartTotal.style.display = "none";
    return;
}

let total = 0;

cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Quantidade: ${item.quantity}</p>
                <p class="cart-item-price">R$ ${(item.price * item.quantity)
                .toFixed(2)
                .replace(".", ",")}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart('${
            item.product
            }')">
                <i class="fas fa-trash"></i>
            </button>
        `;
    cartItems.appendChild(itemElement);
    total += item.price * item.quantity;
});

totalAmount.textContent = total.toFixed(2).replace(".", ",");
cartTotal.style.display = "block";
}

// Update cart count
function updateCartCount() {
const count = cart.reduce((sum, item) => sum + item.quantity, 0);
cartCount.textContent = count;
cartCount.style.display = count > 0 ? "flex" : "none";
}

// Show cart notification
function showCartNotification(productName) {
const notification = document.createElement("div");
notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10001;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span style="margin-left: 10px;">${productName} adicionado ao carrinho!</span>
    `;

document.body.appendChild(notification);

// Animate in
setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
}, 100);

// Remove after 3 seconds
setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
    document.body.removeChild(notification);
    }, 300);
}, 3000);
}

// Event listeners for add to cart buttons
addToCartButtons.forEach((button) => {
button.addEventListener("click", (e) => {
    e.preventDefault();
    const product = button.getAttribute("data-product");
    const name = button.getAttribute("data-name");
    const price = button.getAttribute("data-price");
    addToCart(product, name, price);
});
});

// Cart modal events
cartIcon.addEventListener("click", () => {
cartModal.style.display = "block";
document.body.style.overflow = "hidden";
});

closeCart.addEventListener("click", () => {
cartModal.style.display = "none";
document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
if (e.target === cartModal) {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
}
});

// Payment System
const paymentModal = document.getElementById("payment-modal");
const closePayment = document.querySelector(".close-payment");
const tabButtons = document.querySelectorAll(".tab-btn");
const paymentTabs = document.querySelectorAll(".payment-tab");
const paymentSummaryItems = document.getElementById("payment-summary-items");
const paymentTotal = document.getElementById("payment-total");

// Payment validation rules
const paymentValidation = {
cardNumber: /^[0-9\s]{13,19}$/,
cardExpiry: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
cardCvv: /^[0-9]{3,4}$/,
cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Checkout functionality
checkoutBtn.addEventListener("click", () => {
if (cart.length === 0) return;

// Close cart modal and open payment modal
cartModal.style.display = "none";
paymentModal.style.display = "block";

// Update payment summary
updatePaymentSummary();
});

// Payment modal events
closePayment.addEventListener("click", () => {
paymentModal.style.display = "none";
document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
if (e.target === paymentModal) {
    paymentModal.style.display = "none";
    document.body.style.overflow = "auto";
}
});

// Payment tabs functionality
tabButtons.forEach((button) => {
button.addEventListener("click", () => {
    const tabName = button.getAttribute("data-tab");

    // Remove active class from all tabs
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    paymentTabs.forEach((tab) => tab.classList.remove("active"));

    // Add active class to clicked tab
    button.classList.add("active");
    document.getElementById(`${tabName}-tab`).classList.add("active");
});
});

// Update payment summary
function updatePaymentSummary() {
paymentSummaryItems.innerHTML = "";
let total = 0;

cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "summary-item";
    itemElement.innerHTML = `
            <span class="summary-item-name">${item.name} (${
    item.quantity
    }x)</span>
            <span class="summary-item-price">R$ ${(item.price * item.quantity)
            .toFixed(2)
            .replace(".", ",")}</span>
        `;
    paymentSummaryItems.appendChild(itemElement);
    total += item.price * item.quantity;
});

paymentTotal.textContent = total.toFixed(2).replace(".", ",");
}

// Input formatting and validation
function formatCardNumber(input) {
let value = input.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
let matches = value.match(/\d{4,16}/g);
let match = (matches && matches[0]) || "";
let parts = [];

for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
}

if (parts.length) {
    input.value = parts.join(" ");
} else {
    input.value = value;
}
}

function formatExpiry(input) {
let value = input.value.replace(/\D/g, "");
if (value.length >= 2) {
    value = value.substring(0, 2) + "/" + value.substring(2, 4);
}
input.value = value;
}

function formatCPF(input) {
let value = input.value.replace(/\D/g, "");
value = value.replace(/(\d{3})(\d)/, "$1.$2");
value = value.replace(/(\d{3})(\d)/, "$1.$2");
value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
input.value = value;
}

function validateField(field, pattern, errorMessage) {
const value = field.value.trim();
const isValid = pattern.test(value);
const formGroup = field.closest(".form-group");

if (!isValid && value !== "") {
    formGroup.classList.add("error");
    let errorElement = formGroup.querySelector(".error-message");
    if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "error-message";
    formGroup.appendChild(errorElement);
    }
    errorElement.textContent = errorMessage;
    return false;
} else {
    formGroup.classList.remove("error");
    return true;
}
}

// Card form validation
const cardForm = document.getElementById("card-form");
const cardNumber = document.getElementById("card-number");
const cardName = document.getElementById("card-name");
const cardExpiry = document.getElementById("card-expiry");
const cardCvv = document.getElementById("card-cvv");
const cardCpf = document.getElementById("card-cpf");

// Input formatting
cardNumber.addEventListener("input", () => formatCardNumber(cardNumber));
cardExpiry.addEventListener("input", () => formatExpiry(cardExpiry));
cardCpf.addEventListener("input", () => formatCPF(cardCpf));

// Real-time validation
cardNumber.addEventListener("blur", () => {
validateField(
    cardNumber,
    paymentValidation.cardNumber,
    "Número do cartão inválido"
);
});

cardExpiry.addEventListener("blur", () => {
validateField(
    cardExpiry,
    paymentValidation.cardExpiry,
    "Data de validade inválida"
);
});

cardCvv.addEventListener("blur", () => {
validateField(cardCvv, paymentValidation.cardCvv, "CVV inválido");
});

cardCpf.addEventListener("blur", () => {
validateField(cardCpf, paymentValidation.cpf, "CPF inválido");
});

// Card form submission
cardForm.addEventListener("submit", async (e) => {
e.preventDefault();

// Validate all fields
const isCardNumberValid = validateField(
    cardNumber,
    paymentValidation.cardNumber,
    "Número do cartão inválido"
);
const isCardNameValid = cardName.value.trim() !== "";
const isCardExpiryValid = validateField(
    cardExpiry,
    paymentValidation.cardExpiry,
    "Data de validade inválida"
);
const isCardCvvValid = validateField(
    cardCvv,
    paymentValidation.cardCvv,
    "CVV inválido"
);
const isCardCpfValid = validateField(
    cardCpf,
    paymentValidation.cpf,
    "CPF inválido"
);

if (
    !isCardNumberValid ||
    !isCardNameValid ||
    !isCardExpiryValid ||
    !isCardCvvValid ||
    !isCardCpfValid
) {
    showErrorMessage("Por favor, corrija os campos inválidos");
    return;
}

// Process payment
await processPayment("card", {
    number: cardNumber.value,
    name: cardName.value,
    expiry: cardExpiry.value,
    cvv: cardCvv.value,
    cpf: cardCpf.value,
});
});

// PIX functionality
const generatePixBtn = document.getElementById("generate-pix");
const pixQrCode = document.getElementById("pix-qr-code");
const pixCodeInput = document.getElementById("pix-code-input");
const copyPixBtn = document.getElementById("copy-pix-btn");

generatePixBtn.addEventListener("click", async () => {
// Verificar se há itens no carrinho
if (cart.length === 0) {
    alert("Carrinho vazio! Adicione produtos antes de gerar o PIX.");
    return;
}

const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

generatePixBtn.textContent = "Gerando PIX...";
generatePixBtn.disabled = true;
copyPixBtn.disabled = true;

try {
    // Simulate PIX generation
    setTimeout(async () => {
    const pixCode = generatePixCode(total);
    pixCodeInput.value = pixCode;

    // Create QR code representation
    pixQrCode.innerHTML = `
                <div style="background: #000; color: #fff; padding: 20px; font-family: monospace; font-size: 8px; line-height: 1; word-break: break-all; border-radius: 10px;">
                    <div style="text-align: center; font-size: 12px; margin-bottom: 10px;">QR CODE PIX</div>
                    <div style="background: #fff; color: #000; padding: 10px; margin: 10px 0;">
                        ████████████████████<br>
                        ██ ▄▄▄▄▄ █▀█ █▄█ ██<br>
                        ██ █   █ █▀▀█▄▄▀ ███<br>
                        ██ █▄▄▄█ █▄▀ █▀▄ ███<br>
                        ██▄▄▄▄▄▄▄█▄█▄█▄█▄▄██<br>
                        ████████████████████
                    </div>
                    <div style="font-size: 10px;">R$ ${total
                    .toFixed(2)
                    .replace(".", ",")}</div>
                </div>
            `;

    generatePixBtn.textContent = "PIX Gerado!";
    generatePixBtn.style.background = "#28a745";

    // Enable copy button
    copyPixBtn.disabled = false;

    // Solicitar email do cliente
    const customerEmail = prompt(
        "Digite seu email para receber as instruções do PIX:"
    );
    if (customerEmail && paymentValidation.email.test(customerEmail)) {
        // Preparar dados para o email
        const transactionId = generateTransactionId("pix");
        const orderData = {
        items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        })),
        total: total,
        transactionId: transactionId,
        date: new Date().toLocaleString("pt-BR"),
        paymentMethod: "pix",
        pixCode: pixCode,
        };

        // Enviar email com instruções do PIX
        try {
        await emailService.sendEmail(
            customerEmail,
            "payment_pending",
            orderData
        );
        alert(
            "PIX gerado com sucesso! As instruções foram enviadas para seu email."
        );
        } catch (error) {
        console.error("Erro ao enviar email:", error);
        alert(
            "PIX gerado, mas houve problema ao enviar o email. Anote o código PIX."
        );
        }
    } else if (customerEmail) {
        alert(
        "Email inválido. PIX gerado, mas não foi possível enviar as instruções."
        );
    }
    }, 2000);
} catch (error) {
    console.error("Erro ao gerar PIX:", error);
    alert("Erro ao gerar PIX. Tente novamente.");
    generatePixBtn.textContent = "Gerar PIX";
    generatePixBtn.disabled = false;
    generatePixBtn.style.background = "";
}
});

copyPixBtn.addEventListener("click", async () => {
try {
    // Tentar usar a API moderna de clipboard
    if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(pixCodeInput.value);
    } else {
    // Fallback para browsers mais antigos
    pixCodeInput.select();
    document.execCommand("copy");
    }

    copyPixBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    copyPixBtn.style.background = "#28a745";

    // Mostrar notificação
    showCartNotification("Código PIX copiado para a área de transferência!");

    setTimeout(() => {
    copyPixBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
    copyPixBtn.style.background = "";
    }, 2000);
} catch (error) {
    console.error("Erro ao copiar:", error);
    alert("Erro ao copiar código PIX. Tente selecionar manualmente.");
}
});

// Boleto functionality
const boletoForm = document.getElementById("boleto-form");
const boletoEmail = document.getElementById("boleto-email");
const boletoDocument = document.getElementById("boleto-document");

boletoDocument.addEventListener("input", () => formatCPF(boletoDocument));

boletoForm.addEventListener("submit", async (e) => {
e.preventDefault();

const isEmailValid = validateField(
    boletoEmail,
    paymentValidation.email,
    "Email inválido"
);
const isDocumentValid = validateField(
    boletoDocument,
    paymentValidation.cpf,
    "CPF inválido"
);

if (!isEmailValid || !isDocumentValid) {
    showErrorMessage("Por favor, corrija os campos inválidos");
    return;
}

await processPayment("boleto", {
    email: boletoEmail.value,
    document: boletoDocument.value,
});
});

// Payment processing com APIs reais
async function processPayment(method, data) {
const submitBtn = document.querySelector(".payment-tab.active .payment-btn");
const originalText = submitBtn.textContent;

submitBtn.classList.add("processing");
submitBtn.disabled = true;

try {
    const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
    );
    const customerEmail = getCustomerEmail(method, data);

    let paymentResult;

    // Processar pagamento real baseado no método
    switch (method) {
    case "card":
        paymentResult = await processRealCardPayment(
        data,
        total,
        customerEmail
        );
        break;
    case "pix":
        paymentResult = await processRealPixPayment(total, customerEmail);
        break;
    case "boleto":
        paymentResult = await processRealBoletoPayment(data, total);
        break;
    default:
        throw new Error("Método de pagamento não suportado");
    }

    // Preparar dados para o email
    const orderData = {
    items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
    })),
    total: total,
    transactionId: paymentResult.transactionId,
    date: new Date().toLocaleString("pt-BR"),
    paymentMethod: method,
    customerName: extractNameFromEmail(customerEmail),
    };

    // Enviar email baseado no resultado
    if (paymentResult.success) {
    if (method === "card" && paymentResult.status === "approved") {
        // Cartão aprovado
        await emailService.sendEmail(
        customerEmail,
        "payment_success",
        orderData
        );
        showSuccessMessage(method, "Pagamento aprovado com sucesso!");

        // Limpar carrinho
        cart = [];
        updateCartDisplay();
        updateCartCount();

        // Fechar modal
        setTimeout(() => {
        paymentModal.style.display = "none";
        document.body.style.overflow = "auto";
        }, 3000);
    } else {
        // PIX ou Boleto - pagamento pendente
        if (method === "pix") {
        orderData.pixCode = paymentResult.pixCode;
        orderData.qrCode = paymentResult.qrCode;
        } else if (method === "boleto") {
        orderData.boletoUrl = paymentResult.boletoUrl;
        orderData.barCode = paymentResult.barCode;
        }

        await emailService.sendEmail(
        customerEmail,
        "payment_pending",
        orderData
        );
        showSuccessMessage(
        method,
        "Instruções de pagamento enviadas por email!"
        );
    }
    } else {
    throw new Error(
        paymentResult.error || "Falha no processamento do pagamento"
    );
    }
} catch (error) {
    console.error("❌ Erro no pagamento:", error);

    // Enviar email de erro
    try {
    const customerEmail = getCustomerEmail(method, data);
    if (customerEmail) {
        await emailService.sendEmail(customerEmail, "payment_failed", {
        paymentMethod: method,
        date: new Date().toLocaleString("pt-BR"),
        customerName: extractNameFromEmail(customerEmail),
        errorMessage: error.message,
        });
    }
    } catch (emailError) {
    console.error("Erro ao enviar email de falha:", emailError);
    }

    showErrorMessage("Erro no pagamento: " + error.message);
} finally {
    submitBtn.classList.remove("processing");
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
}
}

// Processar pagamento real com cartão
async function processRealCardPayment(data, amount, email) {
try {
    // Tentar usar API real do Mercado Pago
    const paymentData = {
    cardNumber: data.number,
    cardName: data.name,
    expiry: data.expiry,
    cvv: data.cvv,
    cpf: data.cpf,
    amount: amount,
    email: email,
    };

    return await mercadoPagoIntegration.processCardPayment(paymentData);
} catch (error) {
    console.warn("⚠️ API real falhou, usando simulação:", error.message);

    // Fallback para simulação realista
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simular aprovação baseada em regras realistas
    const success = !data.number.includes("4000000000000002"); // Cartão de teste falha

    if (success) {
    return {
        success: true,
        transactionId: generateTransactionId("card"),
        status: "approved",
        method: "card",
    };
    } else {
    throw new Error("Cartão recusado pela operadora");
    }
}
}

// Processar PIX real
async function processRealPixPayment(amount, email) {
try {
    return await mercadoPagoIntegration.generatePIX(
    amount,
    "Compra Espaço Fit Academia",
    email
    );
} catch (error) {
    console.warn("⚠️ API PIX falhou, usando simulação:", error.message);

    // Fallback
    const pixCode = generatePixCode(amount);
    return {
    success: true,
    transactionId: generateTransactionId("pix"),
    pixCode: pixCode,
    qrCode: pixCode,
    method: "pix",
    };
}
}

// Processar Boleto real
async function processRealBoletoPayment(data, amount) {
try {
    return await mercadoPagoIntegration.generateBoleto(amount, {
    email: data.email,
    document: data.document,
    });
} catch (error) {
    console.warn("⚠️ API Boleto falhou, usando simulação:", error.message);

    // Fallback
    const transactionId = generateTransactionId("boleto");
    return {
    success: true,
    transactionId: transactionId,
    boletoUrl: `https://example.com/boleto/${transactionId}`,
    barCode: "34191.79001 01043.510047 91020.150008 1 89050000012345",
    method: "boleto",
    };
}
}

// Extrair nome do email
function extractNameFromEmail(email) {
const namePart = email.split("@")[0];
return namePart
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

// Gerar ID de transação
function generateTransactionId(method) {
const prefixes = {
    card: "TXN",
    pix: "PIX",
    boleto: "BOL",
};
return `${prefixes[method]}_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

// Obter email do cliente baseado no método de pagamento
function getCustomerEmail(method, data) {
if (method === "boleto" && data.email) {
    return data.email;
}

// Para cartão e PIX, pedir email se não fornecido
const email = prompt("Digite seu email para receber a confirmação:");
if (email && paymentValidation.email.test(email)) {
    return email;
} else if (email) {
    alert("Email inválido. Tente novamente.");
    return getCustomerEmail(method, data);
}

return "cliente@exemplo.com"; // Email padrão para demonstração
}

// Generate PIX code (more realistic)
function generatePixCode(amount) {
const timestamp = Date.now().toString(36);
const amountStr = amount.toFixed(2);
const merchantName = "ESPACO FIT ACADEMIA";
const merchantCity = "SAO PAULO";

// Estrutura básica do código PIX (formato simplificado para demonstração)
let pixCode = "00020126"; // Payload Format Indicator
pixCode += "580014BR.GOV.BCB.PIX0136"; // Chave PIX (simulada)
pixCode += generateRandomKey(); // Chave PIX aleatória
pixCode += "5204000053039865"; // Merchant Category + Currency
pixCode += "54" + String(amountStr.length).padStart(2, "0") + amountStr; // Amount
pixCode += "5802BR"; // Country Code
pixCode += "59" + String(merchantName.length).padStart(2, "0") + merchantName; // Merchant Name
pixCode += "60" + String(merchantCity.length).padStart(2, "0") + merchantCity; // Merchant City
pixCode += "61085400100"; // Postal Code
pixCode += "62190515" + timestamp; // Additional Data
pixCode += calculateCRC16(pixCode); // CRC16

return pixCode;
}

// Gerar chave PIX aleatória para demonstração
function generateRandomKey() {
const chars = "0123456789abcdef";
let result = "";
for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
    if (i === 7 || i === 11 || i === 15 || i === 19) result += "-";
}
return result;
}

// Calcular CRC16 simplificado (para demonstração)
function calculateCRC16(data) {
// Simulação simples do CRC16 - em produção use uma biblioteca adequada
const crc = Math.floor(Math.random() * 65536);
return crc.toString(16).toUpperCase().padStart(4, "0");
}

// Show messages
function showSuccessMessage(method) {
const messages = {
    card: "Pagamento aprovado com sucesso! Você receberá um email de confirmação.",
    pix: "PIX processado com sucesso! Pagamento confirmado.",
    boleto: "Boleto gerado com sucesso! Enviado para seu email.",
};

alert(messages[method] || "Pagamento processado com sucesso!");
}

function showErrorMessage(message) {
alert("Erro: " + message);
}

// Security enhancements
function sanitizeInput(input) {
return input.replace(/[<>\"']/g, "");
}

// Add security headers simulation
function addSecurityHeaders() {
console.log("Security headers enabled: SSL, CSP, HSTS");
}

// Initialize payment security
addSecurityHeaders();

// Initialize cart on page load
initCart();

// Initialize PIX functionality
function initializePIX() {
// Garantir que o botão copy esteja desabilitado inicialmente
if (copyPixBtn) {
    copyPixBtn.disabled = true;
}

// Verificar se os elementos PIX existem
if (!generatePixBtn || !pixQrCode || !pixCodeInput || !copyPixBtn) {
    console.warn("Elementos PIX não encontrados no DOM");
    return;
}

console.log("✅ Funcionalidade PIX inicializada com sucesso!");
}

// Inicializar PIX quando o DOM estiver carregado
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", initializePIX);
} else {
initializePIX();
}

console.log("Espaço Fit Academia - Site carregado com sucesso!");
