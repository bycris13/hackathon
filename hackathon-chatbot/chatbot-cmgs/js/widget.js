// ===== WIDGET BRIGADIER VIRTUAL CMGS =====
// Widget flotante para integración en sitio web del colegio

(function() {
    'use strict';
    
    // ===== CONFIGURACIÓN DEL WIDGET CMGS =====
    const WIDGET_CONFIG = {
        // Configuración visual militar
        position: 'bottom-right',
        theme: 'military-cmgs',
        size: 'medium',
        
        // Configuración funcional
        autoOpen: false,
        showWelcomeMessage: true,
        persistChat: true,
        
        // URLs del CMGS
        baseUrl: 'https://colmilgeneralsantander.edu.co',
        
        // Textos personalizables CMGS
        texts: {
            toggleButton: '🎖️',
            closeButton: '✖',
            title: 'Brigadier Virtual CMGS',
            subtitle: 'Colegio Militar General Santander',
            lema: '"Patria, Superación y Orden"',
            placeholder: 'Escribe tu consulta, cadete...',
            welcomeMessage: '¡Saludo militar, cadete! 🎖️ ¿En qué puedo asistirte con información del CMGS?'
        },
        
        // Avatar del brigadier
        avatarUrl: 'https://colmilgeneralsantander.edu.co/images/icon2023.png'
    };
    
    // ===== ESTILOS DEL WIDGET MILITAR =====
    const WIDGET_STYLES = `
        .cmgs-chatbot-widget {
            position: fixed;
            z-index: 999999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .cmgs-chatbot-widget.bottom-right {
            bottom: 20px;
            right: 20px;
        }
        
        .cmgs-chatbot-widget.bottom-left {
            bottom: 20px;
            left: 20px;
        }
        
        .cmgs-chatbot-widget.top-right {
            top: 20px;
            right: 20px;
        }
        
        .cmgs-chatbot-widget.top-left {
            top: 20px;
            left: 20px;
        }
        
        .cmgs-chat-toggle-btn {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%);
            color: white;
            border: 3px solid #FFD700;
            font-size: 1.8rem;
            cursor: pointer;
            box-shadow: 
                0 6px 20px rgba(196, 30, 58, 0.4),
                0 0 0 0 rgba(255, 215, 0, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: militaryPulse 2s infinite;
        }
        
        .cmgs-chat-toggle-btn:hover {
            transform: scale(1.1);
            background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
            color: #2F2F2F;
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
        }
        
        .cmgs-chat-toggle-btn.active {
            background: linear-gradient(135deg, #8B0000 0%, #654321 100%);
            animation: none;
        }
        
        .cmgs-chat-toggle-btn img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #FFD700;
        }
        
        .cmgs-chatbot-container {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 380px;
            height: 550px;
            background: white;
            border: 3px solid #FFD700;
            border-radius: 20px;
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(255, 215, 0, 0.3);
            display: none;
            flex-direction: column;
            overflow: hidden;
        }
        
        .cmgs-chatbot-container.show {
            display: flex;
            animation: slideUpFadeIn 0.4s ease;
        }
        
        @keyframes slideUpFadeIn {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes militaryPulse {
            0%, 100% { 
                box-shadow: 0 6px 20px rgba(196, 30, 58, 0.4), 0 0 0 0 rgba(255, 215, 0, 0.4);
            }
            50% { 
                box-shadow: 0 6px 20px rgba(196, 30, 58, 0.4), 0 0 0 10px rgba(255, 215, 0, 0);
            }
        }
        
        .cmgs-chatbot-container.size-small {
            width: 320px;
            height: 450px;
        }
        
        .cmgs-chatbot-container.size-large {
            width: 420px;
            height: 650px;
        }
        
        /* Header militar del widget */
        .cmgs-widget-header {
            background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%);
            color: white;
            padding: 15px;
            display: flex;
            align-items: center;
            border-bottom: 2px solid #FFD700;
            position: relative;
        }
        
        .cmgs-widget-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
            z-index: 1;
        }
        
        .cmgs-widget-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 2px solid #FFD700;
            margin-right: 12px;
            position: relative;
            z-index: 2;
        }
        
        .cmgs-widget-info {
            flex: 1;
            position: relative;
            z-index: 2;
        }
        
        .cmgs-widget-title {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 2px;
        }
        
        .cmgs-widget-subtitle {
            font-size: 0.8rem;
            opacity: 0.9;
        }
        
        .cmgs-widget-lema {
            font-size: 0.7rem;
            color: #FFD700;
            font-style: italic;
            margin-top: 1px;
        }
        
        @media (max-width: 480px) {
            .cmgs-chatbot-container {
                width: calc(100vw - 40px);
                height: calc(100vh - 120px);
                bottom: 80px;
                right: -10px;
            }
            
            .cmgs-chat-toggle-btn {
                width: 60px;
                height: 60px;
                font-size: 1.5rem;
            }
            
            .cmgs-chat-toggle-btn img {
                width: 35px;
                height: 35px;
            }
        }
    `;
    
    // ===== CLASE PRINCIPAL DEL WIDGET CMGS =====
    class CMGSBrigadierWidget {
        constructor(config = {}) {
            this.config = Object.assign({}, WIDGET_CONFIG, config);
            this.isOpen = false;
            this.widget = null;
            this.toggleButton = null;
            this.chatContainer = null;
            
            this.init();
        }
        
        // ===== INICIALIZACIÓN =====
        init() {
            this.injectStyles();
            this.createWidget();
            this.attachEventListeners();
            
            if (this.config.autoOpen) {
                this.open();
            }
            
            console.log('🎖️ Brigadier Virtual CMGS Widget inicializado');
        }
        
        // ===== INYECTAR ESTILOS MILITARES =====
        injectStyles() {
            if (document.getElementById('cmgs-brigadier-styles')) return;
            
            const styleSheet = document.createElement('style');
            styleSheet.id = 'cmgs-brigadier-styles';
            styleSheet.textContent = WIDGET_STYLES;
            document.head.appendChild(styleSheet);
        }
        
        // ===== CREAR WIDGET =====
        createWidget() {
            // Crear contenedor principal
            this.widget = document.createElement('div');
            this.widget.className = `cmgs-chatbot-widget ${this.config.position}`;
            
            // Crear botón de toggle con avatar del brigadier
            this.toggleButton = document.createElement('button');
            this.toggleButton.className = 'cmgs-chat-toggle-btn';
            this.toggleButton.innerHTML = `<img src="${this.config.avatarUrl}" alt="Brigadier CMGS">`;
            this.toggleButton.setAttribute('aria-label', 'Abrir Brigadier Virtual CMGS');
            
            // Crear contenedor del chat
            this.chatContainer = document.createElement('div');
            this.chatContainer.className = `cmgs-chatbot-container size-${this.config.size}`;
            
            // Cargar contenido del brigadier
            this.loadBrigadierContent();
            
            // Agregar elementos al widget
            this.widget.appendChild(this.toggleButton);
            this.widget.appendChild(this.chatContainer);
            
            // Agregar widget al DOM
            document.body.appendChild(this.widget);
        }
        
        // ===== CARGAR CONTENIDO DEL BRIGADIER =====
        loadBrigadierContent() {
            const brigadierHTML = `
                <div class="cmgs-widget-header">
                    <img src="${this.config.avatarUrl}" alt="Brigadier CMGS" class="cmgs-widget-avatar">
                    <div class="cmgs-widget-info">
                        <div class="cmgs-widget-title">${this.config.texts.title}</div>
                        <div class="cmgs-widget-subtitle">${this.config.texts.subtitle}</div>
                        <div class="cmgs-widget-lema">${this.config.texts.lema}</div>
                    </div>
                </div>
                
                <div class="chat-messages" id="widgetChatMessages" style="flex: 1; padding: 15px; overflow-y: auto; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;">
                    <div class="message bot" style="display: flex; align-items: flex-start; gap: 8px; max-width: 90%;">
                        <img src="${this.config.avatarUrl}" alt="Brigadier" style="width: 30px; height: 30px; border-radius: 50%; border: 2px solid #FFD700; flex-shrink: 0;">
                        <div style="background: white; border: 2px solid #C41E3A; border-radius: 12px; padding: 10px 12px; font-size: 0.9rem; line-height: 1.3; color: #2F2F2F; position: relative;">
                            ${this.config.texts.welcomeMessage}
                            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px;">
                                <div class="quick-option" onclick="window.cmgsWidget.selectQuickOption('admisiones')" style="background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%); color: #2F2F2F; border: 1px solid #B8860B; padding: 6px 10px; border-radius: 15px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">📋 Admisiones</div>
                                <div class="quick-option" onclick="window.cmgsWidget.selectQuickOption('horarios')" style="background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%); color: #2F2F2F; border: 1px solid #B8860B; padding: 6px 10px; border-radius: 15px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">⏰ Horarios</div>
                                <div class="quick-option" onclick="window.cmgsWidget.selectQuickOption('contacto')" style="background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%); color: #2F2F2F; border: 1px solid #B8860B; padding: 6px 10px; border-radius: 15px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">📞 Contacto</div>
                                <div class="quick-option" onclick="window.cmgsWidget.selectQuickOption('formacion')" style="background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%); color: #2F2F2F; border: 1px solid #B8860B; padding: 6px 10px; border-radius: 15px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">🎖️ Formación</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="typing-indicator" id="widgetTypingIndicator" style="display: none; align-items: center; gap: 8px; margin: 0 15px 8px 15px; padding: 8px; background: rgba(255, 255, 255, 0.9); border-radius: 12px; border: 1px solid #FFD700;">
                    <img src="${this.config.avatarUrl}" alt="Brigadier" style="width: 25px; height: 25px; border-radius: 50%; border: 2px solid #FFD700;">
                    <div style="display: flex; align-items: center; gap: 6px; color: #2F2F2F; font-style: italic; font-size: 0.85rem;">
                        <span>El Brigadier está escribiendo</span>
                        <div style="display: flex; gap: 3px;">
                            <div style="width: 6px; height: 6px; background: #C41E3A; border-radius: 50%; animation: typing 1.4s infinite ease-in-out;"></div>
                            <div style="width: 6px; height: 6px; background: #C41E3A; border-radius: 50%; animation: typing 1.4s infinite ease-in-out; animation-delay: -0.16s;"></div>
                            <div style="width: 6px; height: 6px; background: #C41E3A; border-radius: 50%; animation: typing 1.4s infinite ease-in-out; animation-delay: -0.32s;"></div>
                        </div>
                    </div>
                </div>
                
                <div style="padding: 15px; background: white; border-top: 2px solid #FFD700;">
                    <div style="display: flex; gap: 8px; align-items: flex-end;">
                        <textarea 
                            id="widgetChatInput" 
                            placeholder="${this.config.texts.placeholder}"
                            rows="1"
                            style="flex: 1; padding: 10px 12px; border: 2px solid #C41E3A; border-radius: 20px; font-size: 0.9rem; outline: none; transition: all 0.3s ease; resize: none; min-height: 18px; max-height: 80px; font-family: inherit; background: #F5F5DC;"
                        ></textarea>
                        <button 
                            id="widgetSendButton"
                            style="background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%); color: white; border: 2px solid #FFD700; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; font-size: 1rem; font-weight: bold;">
                            ➤
                        </button>
                    </div>
                </div>
                
                <style>
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }
                .quick-option:hover {
                    background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%) !important;
                    color: white !important;
                    transform: translateY(-1px);
                }
                #widgetChatInput:focus {
                    border-color: #FFD700;
                    background: white;
                    box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
                }
                #widgetSendButton:hover {
                    background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
                    color: #2F2F2F;
                    transform: scale(1.05);
                }
                </style>
            `;
            
            this.chatContainer.innerHTML = brigadierHTML;
            
            // Inicializar funcionalidad del chat
            this.initializeChatFunctionality();
        }
        
        // ===== INICIALIZAR FUNCIONALIDAD DEL CHAT =====
        initializeChatFunctionality() {
            const chatInput = this.chatContainer.querySelector('#widgetChatInput');
            const sendButton = this.chatContainer.querySelector('#widgetSendButton');
            const chatMessages = this.chatContainer.querySelector('#widgetChatMessages');
            
            // Event listeners
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            chatInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 80) + 'px';
            });
            
            sendButton.addEventListener('click', () => this.sendMessage());
            
            // Auto-scroll personalizado
            const observer = new MutationObserver(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
            observer.observe(chatMessages, { childList: true, subtree: true });
        }
        
        // ===== ENVIAR MENSAJE =====
        async sendMessage(message = null) {
            const chatInput = this.chatContainer.querySelector('#widgetChatInput');
            const chatMessages = this.chatContainer.querySelector('#widgetChatMessages');
            const userMessage = message || chatInput.value.trim();
            
            if (!userMessage) return;
            
            // Limpiar input
            if (!message) {
                chatInput.value = '';
                chatInput.style.height = 'auto';
            }
            
            // Agregar mensaje del usuario
            this.addMessage(userMessage, true);
            
            // Simular respuesta del brigadier
            await this.simulateBrigadierResponse(userMessage);
        }
        
        // ===== SIMULAR RESPUESTA DEL BRIGADIER =====
        async simulateBrigadierResponse(userMessage) {
            const typingIndicator = this.chatContainer.querySelector('#widgetTypingIndicator');
            
            // Mostrar indicador de escritura
            typingIndicator.style.display = 'flex';
            
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            // Ocultar indicador
            typingIndicator.style.display = 'none';
            
            // Obtener respuesta del brigadier
            const response = this.getBrigadierResponse(userMessage);
            this.addMessage(response.text, false, response.links);
        }
        
        // ===== OBTENER RESPUESTA DEL BRIGADIER =====
        getBrigadierResponse(message) {
            const normalizedMessage = message.toLowerCase();
            
            if (normalizedMessage.includes('admis') || normalizedMessage.includes('inscr') || normalizedMessage.includes('matric')) {
                return {
                    text: '🎖️ **ADMISIONES CMGS 2025**\n\nPara inscripciones necesitas: registro civil, cédulas de padres, certificados académicos y examen médico. Las inscripciones están abiertas - serás citado cuando entregues documentos en Secretaría Académica.',
                    links: [{ text: '📞 Llamar Secretaría', url: 'tel:+576070084602006' }]
                };
            } else if (normalizedMessage.includes('horar') || normalizedMessage.includes('clase') || normalizedMessage.includes('tiempo')) {
                return {
                    text: '⏰ **HORARIOS CMGS**\n\nFormación: 6:30 AM | Clases: 7:00 AM - 3:30 PM | Descanso: 9:30-10:00 AM | Almuerzo: 12:00-1:00 PM\n\nAtención administrativa: Lunes a viernes 7:00 AM - 4:00 PM',
                    links: []
                };
            } else if (normalizedMessage.includes('contact') || normalizedMessage.includes('telefon') || normalizedMessage.includes('direcc')) {
                return {
                    text: '📞 **CONTACTO CMGS**\n\n📍 Diagonal 32 #30a-05, Salida a Pamplona, Bucaramanga\n☎️ (607) 7008460 Ext. 2006\n📱 +57 301 718 9949\n📧 info@colmilgeneralsantander.edu.co',
                    links: [
                        { text: '🗺️ Ver ubicación', url: 'https://maps.google.com/?q=Diagonal+32+30a-05+Bucaramanga' },
                        { text: '📱 WhatsApp', url: 'https://wa.me/573017189949' }
                    ]
                };
            } else if (normalizedMessage.includes('formac') || normalizedMessage.includes('militar') || normalizedMessage.includes('discipl')) {
                return {
                    text: '⚔️ **FORMACIÓN MILITAR CMGS**\n\nLema: "Patria, Superación y Orden"\n\nFundado en 1965 con 59 años de tradición. Formación integral con énfasis militar, valores patrióticos y excelencia académica bajo supervisión del Batallón de Infantería Nro.14.',
                    links: []
                };
            } else if (normalizedMessage.includes('hola') || normalizedMessage.includes('salud')) {
                return {
                    text: '🎖️ ¡Saludo militar, cadete! Es un honor servirle. ¿En qué información del CMGS puedo asistirle?',
                    links: []
                };
            } else if (normalizedMessage.includes('gracias')) {
                return {
                    text: '🏛️ ¡Es mi deber y honor, cadete! Para eso estamos. ¿Hay algo más en lo que pueda asistirle?',
                    links: []
                };
            } else {
                return {
                    text: '🎖️ **Brigadier a su servicio, cadete!**\n\nPuedo ayudarle con información sobre:\n• Admisiones 2025\n• Horarios académicos\n• Contacto institucional\n• Formación militar\n\n¿Qué necesita saber del CMGS?',
                    links: []
                };
            }
        }
        
        // ===== AGREGAR MENSAJE =====
        addMessage(content, isUser = false, links = []) {
            const chatMessages = this.chatContainer.querySelector('#widgetChatMessages');
            const messageDiv = document.createElement('div');
            
            if (isUser) {
                messageDiv.style.cssText = 'display: flex; align-items: flex-start; gap: 8px; max-width: 90%; align-self: flex-end; flex-direction: row-reverse;';
                messageDiv.innerHTML = `
                    <div style="background: #C41E3A; color: white; border: 2px solid #8B0000; border-radius: 12px; padding: 10px 12px; font-size: 0.9rem; line-height: 1.3; position: relative;">
                        ${content.replace(/\n/g, '<br>')}
                    </div>
                `;
            } else {
                messageDiv.style.cssText = 'display: flex; align-items: flex-start; gap: 8px; max-width: 90%;';
                
                const linksHtml = links && links.length > 0 ? 
                    `<div style="margin-top: 8px;">${links.map(link => 
                        `<a href="${link.url}" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%); color: white; text-decoration: none; padding: 6px 12px; border-radius: 15px; font-size: 0.8rem; font-weight: 600; display: inline-block; margin: 3px 3px 0 0; transition: all 0.3s ease; border: 1px solid #FFD700;">${link.text}</a>`
                    ).join('')}</div>` : '';
                
                messageDiv.innerHTML = `
                    <img src="${this.config.avatarUrl}" alt="Brigadier" style="width: 30px; height: 30px; border-radius: 50%; border: 2px solid #FFD700; flex-shrink: 0;">
                    <div style="background: white; border: 2px solid #C41E3A; border-radius: 12px; padding: 10px 12px; font-size: 0.9rem; line-height: 1.3; color: #2F2F2F; position: relative;">
                        ${content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                        ${linksHtml}
                    </div>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // ===== SELECCIONAR OPCIÓN RÁPIDA =====
        selectQuickOption(topic) {
            const topicMap = {
                'admisiones': 'información sobre admisiones',
                'horarios': 'horarios del colegio',
                'contacto': 'información de contacto',
                'formacion': 'formación militar del colegio'
            };
            
            this.sendMessage(topicMap[topic] || topic);
        }
        
        // ===== AGREGAR EVENT LISTENERS =====
        attachEventListeners() {
            this.toggleButton.addEventListener('click', () => this.toggle());
            
            // Cerrar con ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }
        
        // ===== ABRIR WIDGET =====
        open() {
            this.chatContainer.classList.add('show');
            this.toggleButton.classList.add('active');
            this.toggleButton.innerHTML = '✖';
            this.toggleButton.setAttribute('aria-label', 'Cerrar Brigadier Virtual CMGS');
            this.isOpen = true;
            
            // Enfocar input
            setTimeout(() => {
                const chatInput = this.chatContainer.querySelector('#widgetChatInput');
                if (chatInput) chatInput.focus();
            }, 100);
        }
        
        // ===== CERRAR WIDGET =====
        close() {
            this.chatContainer.classList.remove('show');
            this.toggleButton.classList.remove('active');
            this.toggleButton.innerHTML = `<img src="${this.config.avatarUrl}" alt="Brigadier CMGS" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #FFD700;">`;
            this.toggleButton.setAttribute('aria-label', 'Abrir Brigadier Virtual CMGS');
            this.isOpen = false;
        }
        
        // ===== ALTERNAR WIDGET =====
        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }
        
        // ===== DESTRUIR WIDGET =====
        destroy() {
            if (this.widget && this.widget.parentNode) {
                this.widget.parentNode.removeChild(this.widget);
            }
            
            const styles = document.getElementById('cmgs-brigadier-styles');
            if (styles && styles.parentNode) {
                styles.parentNode.removeChild(styles);
            }
            
            delete window.cmgsWidget;
        }
    }
    
    // ===== FUNCIÓN DE INICIALIZACIÓN AUTOMÁTICA =====
    function initCMGSWidget(config = {}) {
        if (window.cmgsWidget) {
            console.warn('🎖️ Brigadier Virtual CMGS ya está inicializado');
            return window.cmgsWidget;
        }
        
        window.cmgsWidget = new CMGSBrigadierWidget(config);
        return window.cmgsWidget;
    }
    
    // ===== INICIALIZACIÓN AUTOMÁTICA =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Buscar configuración en atributos del script
            const scriptTag = document.querySelector('script[src*="widget.js"]');
            const config = {};
            
            if (scriptTag) {
                // Leer configuración de atributos data-*
                const dataset = scriptTag.dataset;
                if (dataset.position) config.position = dataset.position;
                if (dataset.theme) config.theme = dataset.theme;
                if (dataset.size) config.size = dataset.size;
                if (dataset.autoOpen) config.autoOpen = dataset.autoOpen === 'true';
            }
            
            initCMGSWidget(config);
        });
    } else {
        initCMGSWidget();
    }
    
    // ===== EXPORTAR PARA USO MANUAL =====
    window.CMGSBrigadierWidget = CMGSBrigadierWidget;
    window.initCMGSWidget = initCMGSWidget;
    
})();