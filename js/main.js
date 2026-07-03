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

  // Vérifier les préférences
  const savedTheme = localStorage.getItem('afritalent-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Déterminer le thème initial
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  // Appliquer le thème initial et l'icône
  applyTheme(theme);
  updateDarkModeIcon(toggleBtn, theme);

  // Écouter le clic
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // CORRECTION : On vérifie la valeur actuelle, si null ou absent, on considère que c'est 'light'
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    updateDarkModeIcon(toggleBtn, newTheme);
    localStorage.setItem('afritalent-theme', newTheme);

    // Animation de transition
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 500);
  });
}

// Appliquer le thème
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.style.backgroundColor = '#0F172A';
    document.body.style.color = '#022b54';
  } else {
    // CORRECTION : On force la valeur 'light' au lieu de supprimer l'attribut
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }
}

// Mettre à jour l'icône (Optimisation : toggleBtn passé en paramètre)
function updateDarkModeIcon(toggleBtn, theme) {
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
  
 /* ============================================
   AfriTalent - MAIN.JS
   Commit 7 : Compteurs animés & Fade-in sections
   Auteur: [Votre Nom]
   Version: 1.0
============================================ */

'use strict';

// ============================================
// 10. COMPTEURS ANIMÉS AU SCROLL
// ============================================
function initAnimatedCounters() {
    // Sélectionner tous les compteurs
    const counters = document.querySelectorAll('.stat-number, .stat-number-bento');
    
    if (counters.length === 0) {
        console.log('ℹ️ Aucun compteur trouvé sur cette page');
        return;
    }
    
    console.log(`🔄 ${counters.length} compteurs trouvés, initialisation...`);
    
    // Options pour l'IntersectionObserver
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.3 // 30% visible pour déclencher
    };
    
    // Fonction pour animer un compteur
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        if (isNaN(target)) {
            console.warn('⚠️ data-target invalide pour', element);
            return;
        }
        
        // Si le compteur a déjà été animé, ne pas recommencer
        if (element.dataset.animated === 'true') {
            return;
        }
        
        // Marquer comme animé
        element.dataset.animated = 'true';
        
        // Variables pour l'animation
        const duration = 2000; // 2 secondes
        const startTime = performance.now();
        const startValue = 0;
        
        // Fonction d'animation
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing cubic-bezier pour un effet plus naturel
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
            
            // Mettre à jour l'affichage
            element.textContent = currentValue;
            
            // Ajouter un effet visuel
            if (progress < 1) {
                element.classList.add('counter-animate');
            } else {
                element.textContent = target; // Valeur finale exacte
                element.classList.remove('counter-animate');
                
                // Ajouter un "+" après l'animation
                if (target > 100) {
                    element.textContent = target + '+';
                }
            }
            
            // Continuer l'animation
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        // Démarrer l'animation
        requestAnimationFrame(updateCounter);
    }
    
    // Créer l'observateur
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                // Une fois animé, on peut arrêter d'observer
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    // Observer chaque compteur
    counters.forEach(counter => {
        // Vérifier si le compteur a déjà été animé (page reload)
        if (counter.dataset.animated === 'true') {
            return;
        }
        observer.observe(counter);
    });
}

// ============================================
// 11. ANIMATIONS FADE-IN DES SECTIONS
// ============================================
function initFadeInSections() {
    // Sélectionner toutes les sections à animer
    const sections = document.querySelectorAll('section, .hero-section, .stats-container, .cta-section');
    
    if (sections.length === 0) {
        console.log('ℹ️ Aucune section trouvée pour les animations fade-in');
        return;
    }
    
    console.log(`✨ ${sections.length} sections prêtes pour les animations fade-in`);
    
    // Options pour l'IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Déclencher un peu avant que la section ne soit visible
        threshold: 0.1 // 10% visible pour déclencher
    };
    
    // Créer l'observateur
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la classe 'visible' pour déclencher l'animation
                entry.target.classList.add('visible');
                
                // Si c'est la section hero, on peut aussi ajouter une classe spéciale
                if (entry.target.classList.contains('hero-section')) {
                    entry.target.classList.add('hero-visible');
                }
                
                // Une fois l'animation déclenchée, on peut arrêter d'observer
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer chaque section
    sections.forEach((section, index) => {
        // Ajouter une classe de base pour l'animation
        section.classList.add('fade-in');
        
        // Ajouter un délai progressif pour un effet cascade
        const delay = Math.min(index * 100, 600);
        section.style.transitionDelay = `${delay}ms`;
        
        // Observer la section
        observer.observe(section);
    });
}

// ============================================
// 12. ANIMATION DES SECTIONS EN FONDU POUR ABOUT
// ============================================
function initAboutAnimations() {
    // Éléments spécifiques à la page About
    const aboutElements = document.querySelectorAll('.about-story, .value-card, .team-card');
    
    if (aboutElements.length === 0) {
        return;
    }
    
    console.log(`🎯 ${aboutElements.length} éléments about détectés`);
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ajouter un délai progressif
                const delay = Math.min(index * 100, 500);
                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    aboutElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ============================================
// 13. ANIMATION DES CARTES CATÉGORIES
// ============================================
function initCategoryAnimations() {
    const categories = document.querySelectorAll('.category-card');
    
    if (categories.length === 0) {
        return;
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    categories.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// ============================================
// 14. ANIMATION DES STATS BENTO ABOUT
// ============================================
function initBentoStatsAnimation() {
    const stats = document.querySelectorAll('.stat-bento-card');
    
    if (stats.length === 0) {
        return;
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        stat.classList.add('fade-in');
        observer.observe(stat);
    });
}

// ============================================
// 15. INITIALISATION GÉNÉRALE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ AfriTalent - JavaScript chargé avec succès !');
    
    // Initialiser les fonctionnalités du Commit 6
    initDarkMode();
    initNavbarScroll();
    initBackToTop();
    initCopyrightYear();
    
    // Initialiser les fonctionnalités du Commit 7
    initAnimatedCounters();
    initFadeInSections();
    initAboutAnimations();
    initCategoryAnimations();
    initBentoStatsAnimation();
    
    console.log('✅ Toutes les fonctionnalités sont initialisées !');
});
  
   /* ============================================
   AfriTalent - MAIN.JS
   Commit 8 : Filtrage dynamique & Validation formulaire
   Auteur: [Votre Nom]
   Version: 1.0
============================================ */

'use strict';

// ============================================
// 16. FILTRAGE DYNAMIQUE DES FREELANCES
// ============================================
function initFreelanceFilter() {
    // Sélectionner les boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Sélectionner toutes les cartes de freelances
    const freelanceCards = document.querySelectorAll('.freelance-card-item');
    
    // Vérifier si on est sur la page freelances
    if (filterButtons.length === 0 || freelanceCards.length === 0) {
        console.log('ℹ️ Page freelances : aucun filtre ou carte trouvé');
        return;
    }
    
    console.log(`🔍 ${filterButtons.length} filtres et ${freelanceCards.length} freelances trouvés`);
    
    // Fonction pour filtrer les freelances
    function filterFreelances(category) {
        let visibleCount = 0;
        
        freelanceCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                // Afficher la carte avec animation
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.4s ease forwards';
                visibleCount++;
            } else {
                // Masquer la carte
                card.style.display = 'none';
            }
        });
        
        // Mettre à jour le compteur de résultats
        updateResultsCount(visibleCount, freelanceCards.length);
    }
    
    // Fonction pour mettre à jour le compteur de résultats
    function updateResultsCount(visible, total) {
        // Créer ou mettre à jour le compteur
        let counter = document.getElementById('resultsCount');
        
        if (!counter) {
            counter = document.createElement('p');
            counter.id = 'resultsCount';
            counter.className = 'text-muted text-center mt-3';
            const container = document.querySelector('.filter-section');
            if (container) {
                container.appendChild(counter);
            }
        }
        
        if (visible === total) {
            counter.textContent = `📊 ${total} freelances disponibles`;
        } else {
            counter.textContent = `📊 ${visible} freelances trouvés sur ${total}`;
        }
    }
    
    // Ajouter les événements aux boutons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la catégorie
            const category = this.dataset.category;
            
            // Filtrer les freelances
            filterFreelances(category);
        });
    });
    
    // Initialiser : afficher tous les freelances
    filterFreelances('all');
}

// ============================================
// 17. VALIDATION DU FORMULAIRE DE CONTACT
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    // Vérifier si on est sur la page contact
    if (!form) {
        console.log('ℹ️ Page contact : formulaire non trouvé');
        return;
    }
    
    console.log('📝 Formulaire de contact initialisé');
    
    // Sélectionner tous les champs
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const sujet = document.getElementById('sujet');
    const message = document.getElementById('message');
    
    // Sélectionner les conteneurs d'erreur
    const nomError = document.getElementById('nomError');
    const prenomError = document.getElementById('prenomError');
    const emailError = document.getElementById('emailError');
    const sujetError = document.getElementById('sujetError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');
    
    // Ajouter les événements de validation en temps réel
    if (nom) nom.addEventListener('input', () => validateField(nom, nomError, validateNom));
    if (prenom) prenom.addEventListener('input', () => validateField(prenom, prenomError, validatePrenom));
    if (email) email.addEventListener('input', () => validateField(email, emailError, validateEmail));
    if (sujet) sujet.addEventListener('change', () => validateField(sujet, sujetError, validateSujet));
    if (message) message.addEventListener('input', () => validateField(message, messageError, validateMessage));
    
    // Fonctions de validation individuelles
    function validateNom(value) {
        return value.trim().length >= 2 ? '' : 'Le nom doit contenir au moins 2 caractères';
    }
    
    function validatePrenom(value) {
        return value.trim().length >= 2 ? '' : 'Le prénom doit contenir au moins 2 caractères';
    }
    
    function validateEmail(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) return 'L\'email est requis';
        if (!emailRegex.test(value.trim())) return 'Veuillez entrer une adresse email valide (ex: nom@domaine.com)';
        return '';
    }
    
    function validateSujet(value) {
        return value ? '' : 'Veuillez sélectionner un sujet';
    }
    
    function validateMessage(value) {
        if (!value.trim()) return 'Le message est requis';
        if (value.trim().length < 20) return 'Le message doit contenir au moins 20 caractères';
        return '';
    }
    
    // Fonction de validation générique
    function validateField(input, errorElement, validator) {
        const error = validator(input.value);
        
        if (error) {
            input.classList.add('error');
            input.classList.remove('success');
            errorElement.textContent = error;
            errorElement.style.display = 'block';
            return false;
        } else {
            input.classList.remove('error');
            input.classList.add('success');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            return true;
        }
    }
    
    // Fonction pour valider tout le formulaire
    function validateForm() {
        const isNomValid = validateField(nom, nomError, validateNom);
        const isPrenomValid = validateField(prenom, prenomError, validatePrenom);
        const isEmailValid = validateField(email, emailError, validateEmail);
        const isSujetValid = validateField(sujet, sujetError, validateSujet);
        const isMessageValid = validateField(message, messageError, validateMessage);
        
        return isNomValid && isPrenomValid && isEmailValid && isSujetValid && isMessageValid;
    }
    
    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('📤 Tentative de soumission du formulaire...');
        
        // Valider tous les champs
        if (validateForm()) {
            // Succès ! Afficher le message de succès
            successMessage.classList.remove('d-none');
            successMessage.style.display = 'block';
            
            // Ajouter une animation
            successMessage.style.animation = 'fadeInUp 0.5s ease';
            
            // Réinitialiser les champs
            form.reset();
            
            // Retirer les classes de succès
            document.querySelectorAll('#contactForm .form-control, #contactForm .form-select')
                .forEach(input => {
                    input.classList.remove('success', 'error');
                });
            
            // Cacher le message après 5 secondes
            setTimeout(() => {
                successMessage.style.display = 'none';
                successMessage.classList.add('d-none');
            }, 5000);
            
            console.log('✅ Formulaire envoyé avec succès !');
        } else {
            // Erreur : faire défiler jusqu'au premier champ invalide
            const firstError = document.querySelector('#contactForm .form-control.error, #contactForm .form-select.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Ajouter un effet de shake
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500);
            
            console.warn('⚠️ Formulaire invalide, veuillez corriger les erreurs');
        }
    });
    
    // Fonction pour réinitialiser le formulaire
    function resetForm() {
        form.reset();
        document.querySelectorAll('#contactForm .form-control, #contactForm .form-select')
            .forEach(input => {
                input.classList.remove('success', 'error');
            });
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        successMessage.style.display = 'none';
        successMessage.classList.add('d-none');
    }
    
    // Ajouter un bouton de réinitialisation (optionnel)
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn-outline-secondary mt-2';
    resetBtn.textContent = '🔄 Réinitialiser';
    resetBtn.addEventListener('click', resetForm);
    
    // Ajouter le bouton après le formulaire
    form.appendChild(resetBtn);
}

// ============================================
// 18. ANIMATION SHAKE POUR FORMULAIRE
// ============================================
function addShakeAnimation() {
    // Ajouter l'animation shake au CSS si elle n'existe pas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// 19. INITIALISATION DU COMMIT 8
// ============================================
// Ajouter l'animation shake
addShakeAnimation();

// Initialiser les fonctionnalités du Commit 8
document.addEventListener('DOMContentLoaded', function() {
    // ... vos autres initialisations ...
    
    // Initialiser le filtrage des freelances
    initFreelanceFilter();
    
    // Initialiser la validation du formulaire
    initContactForm();
    
    console.log('✅ Commit 8 : Filtrage et validation initialisés !');
});