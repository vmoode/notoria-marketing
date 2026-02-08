/* js/main.js */
/* js/main.js */

document.addEventListener("DOMContentLoaded", () => {
    // Carrega os componentes e depois inicializa as funções de interface
    Promise.all([
        includeHTML('main-header', 'components/header.html'),
        includeHTML('main-footer', 'components/footer.html')
    ]).then(() => {
        // Só inicializa o menu mobile após o header existir no DOM
        initMobileMenu(); 
    });
});

// Função educativa: Faz o "fetch" (busca) do arquivo HTML e insere no elemento alvo
async function includeHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            element.innerHTML = content;
        } else {
            console.error(`Erro ao carregar ${filePath}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Erro na requisição: ${error}`);
    }
}

function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-btn');
    const navMenu = document.getElementById('nav-menu');
    const icon = mobileBtn?.querySelector('span');

    if (!mobileBtn || !navMenu) return; // Segurança caso o elemento não exista

    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        if (!isActive) {
            navMenu.classList.add('active');
            mobileBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
            icon.textContent = 'close';
        } else {
            navMenu.classList.remove('active');
            mobileBtn.classList.remove('active');
            document.body.style.overflow = '';
            icon.textContent = 'menu';
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggleMenu();
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
});

function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-btn');
    const navMenu = document.getElementById('nav-menu');
    const icon = mobileBtn.querySelector('span'); // Seleciona o ícone dentro do botão
    const menuLinks = navMenu.querySelectorAll('a'); // Links do menu

    // Função para alternar o estado do menu
    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (!isActive) {
            // ABRIR MENU
            navMenu.classList.add('active');
            mobileBtn.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava o scroll do site
            
            // Troca o ícone para 'close' (o X)
            icon.textContent = 'close';
        } else {
            // FECHAR MENU
            navMenu.classList.remove('active');
            mobileBtn.classList.remove('active');
            document.body.style.overflow = ''; // Destrava o scroll
            
            // Troca o ícone de volta para 'menu'
            icon.textContent = 'menu';
        }
    }

    // Evento de clique no botão hambúrguer
    mobileBtn.addEventListener('click', toggleMenu);

    // Fechar o menu automaticamente ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}