/* ============================================
   AfriTalent - MAIN.JS
   Commit 6 : Dark Mode, Navbar dynamique, Retour en haut
   Auteur: [Votre Nom]
   Version: 1.0
============================================ */

'use strict';

// ============================================
// 1. ATTENDRE LE CHARGEMENT DU DOM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ AfriTalent - JavaScript chargé avec succès !');
    
    // Initialiser toutes les fonctionnalités
    initDarkMode();
    initNavbarScroll();
    initBackToTop();
    initCopyrightYear();
});

// ============================================
// 2. DARK MODE / LIGHT MODE TOGGLE
// ============================================
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    
    // Vérifier si une préférence est sauvegardée dans localStorage
    const savedTheme = localStorage.getItem('afritalent-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Déterminer le thème initial
    let theme = savedTheme;
    if (!theme) {
        // Si pas de sauvegarde, utiliser la préférence système
        theme = prefersDark ? 'dark' : 'light';
    }
    
    // Appliquer le thème
    applyTheme(theme);
    
    // Mettre à jour l'icône du bouton
    updateDarkModeIcon(theme);
    
    // Écouter le clic sur le bouton
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        updateDarkModeIcon(newTheme);
        
        // Sauvegarder la préférence
        localStorage.setItem('afritalent-theme', newTheme);
        
        // Animation de transition
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
}

// Appliquer le thème sur l'élément HTML
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.style.backgroundColor = '#0F172A';
        document.body.style.color = '#F1F5F9';
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
    }
}

// Mettre à jour l'icône du bouton Dark Mode
function updateDarkModeIcon(theme) {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    
    if (theme === 'dark') {
        toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
        toggleBtn.classList.remove('btn-outline-secondary');
        toggleBtn.classList.add('btn-warning');
        toggleBtn.setAttribute('aria-label', 'Passer en mode clair');
    } else {
        toggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
        toggleBtn.classList.remove('btn-warning');
        toggleBtn.classList.add('btn-outline-secondary');
        toggleBtn.setAttribute('aria-label', 'Passer en mode sombre');
    }
}

// ============================================
// 3. NAVBAR DYNAMIQUE AU SCROLL
// ============================================
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    if (!navbar) return;
    
    // Seuil de défilement pour activer l'effet
    const SCROLL_THRESHOLD = 50;
    
    // Fonction pour gérer le scroll
    function handleScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.transition = 'all 0.3s ease';
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    // Écouter l'événement scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Vérifier au chargement initial
    handleScroll();
    
    // Effet de shrink sur la navbar (réduction de taille)
    function handleShrink() {
        if (window.scrollY > SCROLL_THRESHOLD * 2) {
            navbar.style.paddingTop = '0.25rem';
            navbar.style.paddingBottom = '0.25rem';
        } else {
            navbar.style.paddingTop = '';
            navbar.style.paddingBottom = '';
        }
    }
    
    window.addEventListener('scroll', handleShrink, { passive: true });
}

// ============================================
// 4. BOUTON RETOUR EN HAUT
// ============================================
function initBackToTop() {
    // Créer le bouton s'il n'existe pas
    let backBtn = document.getElementById('backToTop');
    
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.id = 'backToTop';
        backBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        backBtn.setAttribute('aria-label', 'Retour en haut de la page');
        backBtn.className = 'back-to-top';
        document.body.appendChild(backBtn);
    }
    
    // Fonction pour afficher/masquer le bouton
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backBtn.classList.add('show');
            backBtn.style.display = 'flex';
        } else {
            backBtn.classList.remove('show');
            backBtn.style.display = 'none';
        }
    }
    
    // Écouter le scroll
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    
    // Vérifier au chargement
    toggleBackToTop();
    
    // Clic pour remonter en haut
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Ajouter un effet de survol au bouton
    backBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    backBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// ============================================
// 5. COPYRIGHT DYNAMIQUE
// ============================================
function initCopyrightYear() {
    const copyrightElement = document.getElementById('copyright');
    if (!copyrightElement) return;
    
    const currentYear = new Date().getFullYear();
    const text = copyrightElement.textContent;
    
    // Remplacer l'année si elle existe déjà
    if (text.includes('2024') || text.includes('2025') || text.includes('2026')) {
        copyrightElement.textContent = text.replace(/\d{4}/, currentYear);
    } else {
        // Ajouter l'année si elle n'existe pas
        copyrightElement.textContent = `© ${currentYear} ${text.replace('© ', '').trim()}`;
    }
}

// ============================================
// 6. UTILITAIRES - DÉTECTION DE NAVIGATEUR
// ============================================
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// ============================================
// 7. GESTION DES ERREURS (Global)
// ============================================
window.addEventListener('error', function(e) {
    console.error('❌ Une erreur est survenue:', e.message);
});

// ============================================
// 8. PERFORMANCE - DÉBOUNCE POUR LE SCROLL
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 9. EXPOSER LES FONCTIONS POUR LE DEBUG (optionnel)
// ============================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.__afritalent = {
        applyTheme: applyTheme,
        updateDarkModeIcon: updateDarkModeIcon,
        isMobileDevice: isMobileDevice,
        isSafari: isSafari
    };
    console.log('🛠️ Mode debug actif - Fonctions exposées dans window.__afritalent');
}