/* js/main.js */

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