// ===== BRIGADIER VIRTUAL CMGS - LÓGICA PRINCIPAL =====
// Chatbot especializado para el Colegio Militar General Santander

// ===== VARIABLES GLOBALES =====
let chatMessages = null;
let chatInput = null;
let sendButton = null;
let typingIndicator = null;
let isTyping = false;
let messageCounter = 0;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeBrigadier();
});

function initializeBrigadier() {
    // Obtener referencias a elementos del DOM
    chatMessages = document.getElementById('chatMessages');
    chatInput = document.getElementById('chatInput');
    sendButton = document.getElementById('sendButton');
    typingIndicator = document.getElementById('typingIndicator');
    
    // Configurar event listeners
    setupEventListeners();
    
    // Enfocar el input
    chatInput.focus();
    
    // Mensaje de bienvenida personalizado después de un momento
    setTimeout(() => {
        showMilitaryWelcome();
    }, 2000);
    
    console.log('🎖️ Brigadier Virtual CMGS inicializado correctamente');
}

// ===== MENSAJE DE BIENVENIDA MILITAR =====
function showMilitaryWelcome() {
    const welcomeExtended = `⚔️ **REPORTE DE SERVICIO**

Cadete, me complace informarle que estoy **operativo** y listo para asistirle con información oficial del **Colegio Militar General Santander**.

Con **59 años de tradición** formando líderes bajo el lema **"Patria, Superación y Orden"**, nuestro compromiso es la excelencia educativa y la formación disciplinaria.

**¿Cuál es su misión de consulta hoy, cadete?**`;

    setTimeout(() => {
        const extendedMessage = createMessage(welcomeExtended, false, false);
        chatMessages.appendChild(extendedMessage);
        scrollToBottom();
    }, 500);
}

// ===== CONFIGURACIÓN DE EVENT LISTENERS =====
function setupEventListeners() {
    // Enter para enviar mensaje (comportamiento militar - firme y directo)
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isTyping) {
                sendMessage();
            }
        }
    });
    
    // Auto-resize del textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
    
    // Botón de envío
    sendButton.addEventListener('click', function() {
        if (!isTyping) {
            sendMessage();
        }
    });
    
    // Placeholder dinámico militar
    const placeholders = [
        "Escribe tu consulta, cadete...",
        "¿En qué puedo asistirte?",
        "Tu misión de consulta...",
        "Reporte su consulta..."
    ];
    
    let placeholderIndex = 0;
    setInterval(() => {
        if (!chatInput.value && document.activeElement !== chatInput) {
            chatInput.placeholder = placeholders[placeholderIndex];
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        }
    }, 4000);
}

// ===== FUNCIONES DE NORMALIZACIÓN DE TEXTO =====
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^\w\s]/g, ' ') // Remover puntuación
        .replace(/\s+/g, ' ') // Normalizar espacios
        .trim();
}

function removeStopWords(text) {
    const stopWords = [
        'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le',
        'da', 'su', 'por', 'son', 'con', 'para', 'como', 'las', 'del', 'los', 'una', 'sobre',
        'me', 'tu', 'al', 'mi', 'pero', 'si', 'yo', 'este', 'esta', 'esto', 'donde', 'cuando'
    ];
    
    const words = text.split(' ');
    return words.filter(word => !stopWords.includes(word) && word.length > 2).join(' ');
}

// ===== ALGORITMO DE BÚSQUEDA MILITAR AVANZADO =====
function findBestResponse(userMessage) {
    const normalizedMessage = normalizeText(userMessage);
    const filteredMessage = removeStopWords(normalizedMessage);
    const words = filteredMessage.split(' ');
    
    // Verificar respuestas especiales primero (protocolos militares)
    const specialResponse = checkSpecialResponses(normalizedMessage);
    if (specialResponse) {
        return specialResponse;
    }
    
    let bestMatch = null;
    let maxScore = 0;
    let secondBestMatch = null;
    let secondMaxScore = 0;
    
    // Buscar en la base de conocimientos CMGS
    for (const [topic, data] of Object.entries(knowledgeBase)) {
        let score = 0;
        
        // Puntuación por palabras clave exactas (precisión militar)
        for (const keyword of data.keywords) {
            const normalizedKeyword = normalizeText(keyword);
            
            // Coincidencia exacta de palabra clave (máxima prioridad)
            if (normalizedMessage.includes(normalizedKeyword)) {
                score += 5;
            }
            
            // Coincidencia parcial en palabras individuales
            for (const word of words) {
                if (word.length > 3) {
                    if (normalizedKeyword.includes(word)) {
                        score += 3;
                    } else if (word.includes(normalizedKeyword) && normalizedKeyword.length > 3) {
                        score += 2;
                    }
                    
                    // Similitud fonética básica (para errores de escritura)
                    if (calculateSimilarity(word, normalizedKeyword) > 0.7) {
                        score += 1;
                    }
                }
            }
        }
        
        // Bonus por múltiples coincidencias (operación conjunta)
        if (score > 5) {
            score *= 1.3;
        }
        
        // Bonus especial para temas prioritarios militares
        if (['admisiones', 'formacion', 'directivos'].includes(topic) && score > 0) {
            score *= 1.2;
        }
        
        if (score > maxScore) {
            secondBestMatch = bestMatch;
            secondMaxScore = maxScore;
            maxScore = score;
            bestMatch = data;
        } else if (score > secondMaxScore) {
            secondBestMatch = data;
            secondMaxScore = score;
        }
    }
    
    // Retornar la mejor coincidencia si supera el umbral militar
    return maxScore > 3 ? bestMatch : null;
}

// ===== FUNCIÓN DE SIMILITUD BÁSICA =====
function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
}

function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// ===== VERIFICAR RESPUESTAS ESPECIALES MILITARES =====
function checkSpecialResponses(normalizedMessage) {
    // Saludos militares
    if (specialKeywords.saludo.some(keyword => normalizedMessage.includes(keyword))) {
        return {
            response: getRandomMilitaryResponse(predefinedResponses.saludo),
            links: []
        };
    }
    
    // Despedidas militares
    if (specialKeywords.despedida.some(keyword => normalizedMessage.includes(keyword))) {
        return {
            response: getRandomMilitaryResponse(predefinedResponses.despedida),
            links: []
        };
    }
    
    // Agradecimientos militares
    if (specialKeywords.agradecimiento.some(keyword => normalizedMessage.includes(keyword))) {
        return {
            response: getRandomMilitaryResponse(predefinedResponses.agradecimiento),
            links: []
        };
    }
    
    // Respuestas específicas de identidad
    if (normalizedMessage.includes('quien eres') || normalizedMessage.includes('que eres')) {
        return {
            response: `🎖️ **IDENTIFICACIÓN OFICIAL**
            
Soy el **Brigadier Virtual** del Colegio Militar General Santander, su asistente digital oficial con **59 años de tradición institucional** respaldándome.

Mi misión es proporcionarle información precisa y actualizada sobre nuestros procesos educativos, administrativos y de formación militar.

**¿En qué operación puedo asistirle, cadete?**`,
            links: []
        };
    }
    
    return null;
}

// ===== OBTENER RESPUESTA MILITAR ALEATORIA =====
function getRandomMilitaryResponse(responses) {
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Personalizar con hora del día
    const hour = new Date().getHours();
    let timeGreeting = '';
    
    if (hour < 12) {
        timeGreeting = 'Buenos días';
    } else if (hour < 18) {
        timeGreeting = 'Buenas tardes';  
    } else {
        timeGreeting = 'Buenas noches';
    }
    
    return response.replace(/Buenos días\/tardes/g, timeGreeting);
}

// ===== CREACIÓN DE ELEMENTOS DE MENSAJE =====
function createMessage(content, isUser = false, includeLinks = false, links = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    if (!isUser) {
        // Crear avatar del brigadier para mensajes del bot
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        const avatarImg = document.createElement('img');
        avatarImg.src = chatbotConfig.uiSettings.avatarUrl;
        avatarImg.alt = 'Brigadier CMGS';
        avatarImg.className = 'msg-avatar';
        avatarDiv.appendChild(avatarImg);
        messageDiv.appendChild(avatarDiv);
    }
    
    // Crear contenido del mensaje
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Procesar contenido con formato militar
    const formattedContent = formatMilitaryContent(content, isUser);
    contentDiv.innerHTML = formattedContent;
    
    // Agregar enlaces si existen
    if (includeLinks && links && links.length > 0) {
        const linksContainer = document.createElement('div');
        linksContainer.style.marginTop = '12px';
        
        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'link-button';
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.textContent = link.text;
            linksContainer.appendChild(linkElement);
        });
        
        contentDiv.appendChild(linksContainer);
    }
    
    messageDiv.appendChild(contentDiv);
    
    return messageDiv;
}

// ===== FORMATEAR CONTENIDO MILITAR =====
function formatMilitaryContent(content, isUser = false) {
    if (isUser) {
        return content.replace(/\n/g, '<br>');
    }
    
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrita
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Cursiva
        .replace(/\n/g, '<br>') // Saltos de línea
        .replace(/•/g, '&bull;') // Viñetas
        .replace(/🎖️/g, '<span class="rank-indicator">🎖️</span>') // Insignias especiales
        .replace(/⚔️/g, '<span class="military-symbol">⚔️</span>'); // Símbolos militares
}

// ===== CREAR OPCIONES RÁPIDAS MILITARES =====
function createMilitaryQuickOptions() {
    const quickOptionsDiv = document.createElement('div');
    quickOptionsDiv.className = 'quick-options';
    
    const options = [
        { text: '📋 Admisiones 2025', value: 'admisiones' },
        { text: '⏰ Horarios', value: 'horarios' },
        { text: '📞 Contacto', value: 'contacto' },
        { text: '⚔️ Formación Militar', value: 'formacion' },
        { text: '📚 Académico', value: 'academico' },
        { text: '🏆 Actividades', value: 'actividades' },
        { text: '👥 Directivos', value: 'directivos' }
    ];
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quick-option';
        optionElement.textContent = option.text;
        optionElement.onclick = () => selectQuickOption(option.value);
        quickOptionsDiv.appendChild(optionElement);
    });
    
    return quickOptionsDiv;
}

// ===== FUNCIONES DE INDICADOR DE ESCRITURA =====
async function showMilitaryTyping() {
    if (!chatbotConfig.responseSettings.showTypingIndicator) return;
    
    isTyping = true;
    sendButton.disabled = true;
    sendButton.style.opacity = '0.6';
    typingIndicator.style.display = 'flex';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return new Promise(resolve => {
        setTimeout(resolve, chatbotConfig.responseSettings.typingDelay);
    });
}

function hideMilitaryTyping() {
    isTyping = false;
    sendButton.disabled = false;
    sendButton.style.opacity = '1';
    typingIndicator.style.display = 'none';
}

// ===== FUNCIÓN PRINCIPAL PARA ENVIAR MENSAJE =====
async function sendMessage(message = null) {
    const userMessage = message || chatInput.value.trim();
    
    if (!userMessage || isTyping) return;
    
    messageCounter++;
    
    // Limpiar el input si no es un mensaje automático
    if (!message) {
        chatInput.value = '';
        chatInput.style.height = 'auto';
        chatInput.placeholder = "Escribe tu consulta, cadete...";
    }
    
    // Añadir mensaje del usuario
    const userMessageElement = createMessage(userMessage, true);
    chatMessages.appendChild(userMessageElement);
    
    // Scroll inmediato
    scrollToBottom();
    
    // Mostrar indicador de escritura militar
    await showMilitaryTyping();
    
    // Buscar respuesta en base de conocimientos CMGS
    const response = findBestResponse(userMessage);
    
    // Ocultar indicador de escritura
    hideMilitaryTyping();
    
    if (response) {
        // Respuesta encontrada en base de conocimientos
        const botMessageElement = createMessage(
            response.response, 
            false, 
            true, 
            response.links || []
        );
        chatMessages.appendChild(botMessageElement);
    } else {
        // Respuesta por defecto con opciones rápidas
        const defaultMessageElement = createMessage(predefinedResponses.default, false);
        const quickOptions = createMilitaryQuickOptions();
        defaultMessageElement.querySelector('.message-content').appendChild(quickOptions);
        chatMessages.appendChild(defaultMessageElement);
    }
    
    // Scroll al final con animación
    scrollToBottom();
    
    // Mensaje motivacional cada 10 interacciones
    if (messageCounter % 10 === 0) {
        setTimeout(() => {
            showMotivationalMessage();
        }, 2000);
    }
    
    // Log para análisis
    console.log(`🎖️ Consulta procesada: "${userMessage}" | Respuesta: ${response ? 'Encontrada' : 'Por defecto'}`);
}

// ===== MENSAJE MOTIVACIONAL MILITAR =====
function showMotivationalMessage() {
    const motivationalMessages = [
        "🎖️ **Excelente trabajo, cadete!** Su disciplina en la consulta es digna de reconocimiento.",
        "⚔️ **¡Por la excelencia!** Continuemos forjando el futuro de Colombia juntos.",
        "🏛️ **59 años de tradición** nos respaldan. Su interés honra al CMGS.",
        "🏆 **¡Firmes en la misión!** La educación militar es el camino hacia el liderazgo."
    ];
    
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    
    const motivationalElement = createMessage(randomMessage, false);
    chatMessages.appendChild(motivationalElement);
    scrollToBottom();
}

// ===== FUNCIÓN PARA OPCIONES RÁPIDAS =====
function selectQuickOption(topic) {
    const response = knowledgeBase[topic];
    if (response && response.keywords && response.keywords.length > 0) {
        // Usar la primera palabra clave como mensaje simulado
        sendMessage(response.keywords[0]);
    }
}

// ===== FUNCIÓN PARA SCROLL AUTOMÁTICO SUAVE =====
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

// ===== FUNCIONES DE UTILIDAD MILITAR =====
function clearMilitaryChat() {
    // Mantener solo el mensaje inicial del brigadier
    while (chatMessages.children.length > 1) {
        chatMessages.removeChild(chatMessages.lastChild);
    }
    messageCounter = 0;
    console.log('🎖️ Chat limpiado - Manteniendo protocolo inicial');
}

function exportChatHistory() {
    const messages = Array.from(chatMessages.children);
    const history = messages.map((msg, index) => ({
        id: index,
        type: msg.classList.contains('user') ? 'cadete' : 'brigadier',
        content: msg.querySelector('.message-content').textContent,
        timestamp: new Date().toISOString(),
        institution: 'CMGS'
    }));
    
    return JSON.stringify({
        institution: chatbotConfig.institution,
        session: {
            start: new Date().toISOString(),
            messages: history.length,
            history: history
        }
    }, null, 2);
}

// ===== MANEJO DE ERRORES MILITAR =====
function handleMilitaryError(error) {
    console.error('🚨 Error en sistema Brigadier:', error);
    
    const errorMessage = createMessage(
        '🚨 **REPORTE DE INCIDENCIA**\n\nCadete, se ha presentado una falla técnica en el sistema. Por favor, reintente su consulta o contacte directamente con la institución.\n\n📞 **Tel:** (607) 7008460 Ext. 2006',
        false
    );
    chatMessages.appendChild(errorMessage);
    scrollToBottom();
}

// ===== FUNCIONES DE ACCESIBILIDAD MILITAR =====
function initializeMilitaryAccessibility() {
    // Configurar atributos ARIA con terminología militar
    chatMessages.setAttribute('role', 'log');
    chatMessages.setAttribute('aria-live', 'polite');
    chatMessages.setAttribute('aria-label', 'Historial de comunicación con Brigadier Virtual CMGS');
    
    chatInput.setAttribute('aria-label', 'Consulta para el Brigadier Virtual');
    sendButton.setAttribute('aria-label', 'Enviar consulta al Brigadier');
    
    // Atajos de teclado militares (Alt + C para chat)
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            chatInput.focus();
        }
        
        // Ctrl + L para limpiar (con confirmación)
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            if (confirm('¿Limpiar historial de comunicación, cadete?')) {
                clearMilitaryChat();
            }
        }
    });
}

// ===== INICIALIZACIÓN DE SISTEMAS =====
document.addEventListener('DOMContentLoaded', function() {
    initializeMilitaryAccessibility();
    
    // Verificar integridad del sistema
    if (!knowledgeBase || !chatbotConfig) {
        console.error('🚨 Error crítico: Base de conocimientos no cargada');
        return;
    }
    
    console.log('🎖️ Todos los sistemas operativos - Brigadier Virtual CMGS listo para servir');
});