document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Animação de Scroll (Fade Up) ---
    const elementsToAnimate = document.querySelectorAll('.fade-up');

    const observerOptions = {
        threshold: 0.1, // Dispara logo que aparece um pedacinho
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });

    // --- 2. Iniciar Contadores ---
    initCounters();
});

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000; // Tempo total da animação

    if (counters.length === 0) {
        console.warn("Nenhum elemento com a classe .counter encontrado!");
        return;
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            
            // Pega os dados do HTML ou usa 0 como padrão se falhar
            const target = +counter.getAttribute('data-target');
            const prefix = counter.getAttribute('data-prefix') || "";
            const suffix = counter.getAttribute('data-suffix') || "";

            if (target === 0 || isNaN(target)) {
                console.warn("Atenção: data-target não encontrado ou é 0 neste elemento:", counter);
            }

            const animate = () => {
                const startTime = performance.now();
                
                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / speed, 1);

                    // Easing suave (começa rápido, termina devagar)
                    const easeProgress = 1 - Math.pow(2, -5 * progress);
                    
                    const currentNumber = Math.floor(easeProgress * target);

                    counter.innerText = `${prefix}${currentNumber}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = `${prefix}${target}${suffix}`;
                    }
                };

                requestAnimationFrame(updateCount);
            };

            // Pequeno delay para esperar o card aparecer (500ms)
            setTimeout(() => {
                animate();
            }, 500);

            observer.unobserve(counter);
        });
    }, { 
        threshold: 0.1 // Alterado para 0.1 (Mais sensível, garante que dispare)
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}