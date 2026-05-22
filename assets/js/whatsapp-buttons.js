/**
 * ============================================================
 * WHATSAPP-BUTTONS.JS
 * Gestion dynamique des boutons WhatsApp avec messages
 * personnalisés selon le service
 * ============================================================
 */

(function () {
    'use strict';

    // ----- CONFIGURATION -----
    const WHATSAPP_NUMBER = '22605006789'; // Numéro WhatsApp principal
    const BUSINESS_NAME = 'RB Digital & Tech Services';

    /**
     * Génère un message WhatsApp automatique
     * @param {string} serviceName - Nom du service concerné
     * @returns {string} Message encodé pour URL
     */
    function generateWhatsAppMessage(serviceName) {
        const message = 
            `Bonjour ${BUSINESS_NAME}, je suis intéressé par votre offre ${serviceName}. Je voudrais plus d'informations.`;
        return encodeURIComponent(message);
    }

    /**
     * Crée l'URL WhatsApp complète
     * @param {string} serviceName - Nom du service
     * @param {string} customNumber - Numéro optionnel (utilise le défaut si non fourni)
     * @returns {string} URL WhatsApp
     */
    function createWhatsAppURL(serviceName, customNumber) {
        const number = customNumber || WHATSAPP_NUMBER;
        const message = generateWhatsAppMessage(serviceName);
        return `https://wa.me/${number}?text=${message}`;
    }

    // ----- MISE À JOUR DES BOUTONS WHATSAPP -----
    // Détecte automatiquement le service depuis l'attribut data-service
    const whatsappButtons = document.querySelectorAll('[data-whatsapp-service]');

    whatsappButtons.forEach(function (button) {
        const serviceName = button.getAttribute('data-whatsapp-service');
        const customNumber = button.getAttribute('data-whatsapp-number');
        const whatsappURL = createWhatsAppURL(serviceName, customNumber);

        // Mise à jour du href
        button.setAttribute('href', whatsappURL);

        // Si le bouton n'a pas déjà de target, on l'ajoute
        if (!button.hasAttribute('target')) {
            button.setAttribute('target', '_blank');
            button.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ----- EXPOSER LA FONCTION GLOBALEMENT -----
    // Pour permettre l'utilisation dynamique dans d'autres scripts
    window.RBDigitalWhatsApp = {
        createURL: createWhatsAppURL,
        generateMessage: generateWhatsAppMessage,
        defaultNumber: WHATSAPP_NUMBER
    };

    console.log('✅ WhatsApp buttons initialisés pour', BUSINESS_NAME);

})();