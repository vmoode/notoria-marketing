// Variável global para armazenar os ícones carregados do JSON
let ICONS_LIBRARY = {};

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetchIcons(),
        includeHTML('main-header', 'components/header.html'),
        includeHTML('main-footer', 'components/footer.html')
    ]).then(() => {
        renderAllIcons();
        initMobileMenu();
        injectVmoodeBadge();
        updateYear();
        initThemeToggle();
    });
});

async function fetchIcons() {
    try {
        const response = await fetch('assets/icons.json');
        if (response.ok) {
            ICONS_LIBRARY = await response.json();
        } else {
            console.error('Erro ao carregar icons.json');
        }
    } catch (error) {
        console.error('Erro na requisição dos ícones:', error);
    }
}

function renderAllIcons() {
    document.querySelectorAll('[data-icon]').forEach(el => updateIconElement(el));
}

function updateIconElement(el, iconNameOverride = null) {
    const name = iconNameOverride || el.getAttribute('data-icon');
    const iconData = ICONS_LIBRARY[name];

    if (iconData) {
        let svgContent = iconData;
        let viewBox = '0 0 24 24';

        if (typeof iconData === 'object' && iconData.path) {
            svgContent = iconData.path;
            if (iconData.viewBox) viewBox = iconData.viewBox;
        }

        el.innerHTML = `
            <svg class="icon" viewBox="${viewBox}" aria-hidden="true" fill="currentColor">
                ${svgContent}
            </svg>
        `;
    }
}
// -------------------------------------------------------------------------------------

// FUNÇÃO: Atualizar Ano do Rodapé ---
function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// FUNÇÃO: Injetar HTML (Header/Footer) ---
async function includeHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            element.innerHTML = await response.text();
        }
    } catch (error) {
        console.error(`Erro ao carregar ${filePath}:`, error);
    }
}

// FUNÇÃO: Menu Mobile ---
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-btn');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('main-header'); // Selecionamos o header para fixá-lo
    const iconContainer = mobileBtn ? mobileBtn.querySelector('[data-icon]') : null;

    if (!mobileBtn || !navMenu) return;

    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        
        // Calcula a largura da barra de rolagem (diferença entre a janela total e a área útil)
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (!isActive) {
            // --- ABRIR MENU ---
            navMenu.classList.add('active');
            mobileBtn.classList.add('active');
            
            // Trava o scroll
            document.body.style.overflow = 'hidden';
            
            // COMPENSAÇÃO DO PULO: Adiciona padding igual à largura da barra que sumiu
            if (scrollBarWidth > 0) {
                document.body.style.paddingRight = `${scrollBarWidth}px`;
                // Importante: O header é 'fixed', então ele também precisa desse padding
                if (header) header.style.paddingRight = `${scrollBarWidth}px`;
            }
            
            if (iconContainer) updateIconElement(iconContainer, 'close');
            
        } else {
            // --- FECHAR MENU ---
            navMenu.classList.remove('active');
            mobileBtn.classList.remove('active');
            
            // Destrava o scroll e remove a compensação suavemente (timeout opcional ou direto)
            setTimeout(() => {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                if (header) header.style.paddingRight = '';
            }, 0); // O delay 0 garante que a renderização ocorra na ordem certa
            
            if (iconContainer) updateIconElement(iconContainer, 'menu');
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

// FUNÇÃO: Badge Vmoode ---
function injectVmoodeBadge() {
    const container = document.getElementById('vmoode-container');
    if (!container) return;

    container.innerHTML = `
        <div class="vmoode-wrapper">
            <a class="vmoode-signature" aria-label="vmoode" style="--vm-color: #A0A0A0; --vm-hover: #b0a388; cursor: pointer;">
                <svg width="25" height="25" viewBox="0 0 354.49 259.91">
                    <path d="M122.88,130.1c14.75,20.11,29.29,40,43.79,59.74-7,7.59-24.94,16.14-34.15,15.89L77.24,130.2c.55-.86,1-1.74,1.63-2.54q23.59-32.41,47.23-64.8c5-6.83,9.89-13.77,15.39-20.18,19.17-22.35,43.17-36.55,72.37-41.24,25.41-4.07,49.4.51,71.69,13.4,27,15.63,46.56,38,58.72,66.69,11.43,26.91,13.46,54.66,5.15,82.77a135.68,135.68,0,0,1-31.13,54.42c-16.65,17.92-36.26,31.08-60,37.58A98.52,98.52,0,0,1,197,253.52a14.58,14.58,0,0,1-1.49-.83c2.13-1.49,4-2.8,5.93-4.16a135.91,135.91,0,0,0,25.25-23.73,6.25,6.25,0,0,1,5.22-2.7c17.62,0,33.17-6.2,46.94-16.82,22.42-17.3,35.39-40.11,38.16-68.36,1.45-14.77-1.35-29-7.3-42.6C301,74.25,287.22,58.45,268,47.72c-11.74-6.56-24.38-10.28-37.92-9.95-19.24.46-36.19,7.07-51,19.49-7.25,6.1-13,13.41-18.52,21q-17.21,23.56-34.39,47.15C125.15,126.82,124.15,128.29,122.88,130.1Z"/>
                    <path d="M159.34,6.49c-11.12,7.5-21.12,15.25-29,25.19-3.41,4.28-7,6.08-12.54,6.44-20.34,1.31-37.2,10.55-51.47,24.69-15.08,15-25.06,32.71-28.13,53.93a87.66,87.66,0,0,0,9.26,54.83c7.71,14.58,18,26.94,31.64,36.22,19.85,13.51,41.48,17.76,64.91,11.42,20.09-5.43,35.56-17.27,47.62-34q18.66-25.8,37.4-51.56c.78-1.08,1.49-2.2,2.53-3.75l-44-60.18a66.82,66.82,0,0,1,34-15.94L277.3,130c-3.61,5-7.2,10.08-10.85,15.09q-15,20.52-30,41c-7,9.57-13.77,19.39-21.25,28.6a123,123,0,0,1-37.79,30.72,118.82,118.82,0,0,1-34.66,12.43,103.73,103.73,0,0,1-61.9-7C52.42,238.41,31.44,218,16.41,191.1A129.19,129.19,0,0,1,2.25,152.84a118.89,118.89,0,0,1,3.2-58.56,136.94,136.94,0,0,1,44.8-66.72C72.59,9.16,98-.92,127.38.13a119.39,119.39,0,0,1,28,4.78C156.52,5.23,157.57,5.77,159.34,6.49Z"/>
                </svg>
            </a>
        </div>
    `;

    if (!document.querySelector('script[src*="vmoode"]')) {
        const script = document.createElement('script');
        script.src = "https://vmoode.com/scripts/badge.js";
        script.async = true;
        document.body.appendChild(script);
    }
}

// FUNÇÃO: Alternar Tema Claro/Escuro ---
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const iconSpan = toggleBtn ? toggleBtn.querySelector('[data-icon]') : null;

    // 1. Verificar preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Define o tema inicial (Padrão é dark se nada estiver salvo)
    let currentTheme = savedTheme || 'dark';
    
    // Aplica o tema inicial
    applyTheme(currentTheme);

    if (!toggleBtn) return;

    // 2. Evento de Clique
    toggleBtn.addEventListener('click', () => {
        // Inverte o tema
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        
        // Salva no navegador
        localStorage.setItem('theme', currentTheme);
    });

    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        
        // Troca o ícone: Se tá claro, mostra o Sol. Se tá escuro, mostra a Lua.
        // Ou o contrário: "Clique no Sol para ficar claro". 
        // Padrão comum: Ícone representa o estado ATUAL ou o DESTINO?
        // Vamos usar: Ícone representa o que vai acontecer (Sol = mudar para claro)
        // Se o tema ATUAL é dark, mostra SOL. Se é light, mostra LUA.
        
        if (iconSpan) {
            const newIcon = theme === 'dark' ? 'sun' : 'moon';
            updateIconElement(iconSpan, newIcon);
        }
    }
}