document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            } else {
                entry.target.classList.remove('fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.slider').forEach(initSlider);
});
const nav=document.querySelector("#barra_principal");
const abrir = document.querySelector("#abrir_menu");
const cerrar = document.querySelector("#cerrar_menu");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

function initSlider(ulEl) {
    const originalItems = Array.from(ulEl.children);
    const n = originalItems.length;
    if (n === 0) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'slider-wrapper';
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-roledescription', 'carousel');
    wrapper.setAttribute('aria-label', 'Galería de productos');

    const viewport = document.createElement('div');
    viewport.className = 'slider-viewport';

    ulEl.parentNode.insertBefore(wrapper, ulEl);
    wrapper.appendChild(viewport);
    viewport.appendChild(ulEl);

    ulEl.setAttribute('aria-live', 'polite');
    ulEl.setAttribute('aria-atomic', 'true');

    const firstClone = originalItems[0].cloneNode(true);
    const lastClone = originalItems[n - 1].cloneNode(true);
    ulEl.insertBefore(lastClone, originalItems[0]);
    ulEl.appendChild(firstClone);

    const allItems = Array.from(ulEl.children);
    allItems.forEach((item, idx) => {
        item.setAttribute('role', 'group');
        item.setAttribute('aria-roledescription', 'slide');
        const realIdx = idx === 0 ? n : (idx === n + 1 ? 1 : idx);
        item.setAttribute('aria-label', `Imagen ${realIdx} de ${n}`);
    });

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'slider-arrow slider-arrow--prev';
    prevBtn.setAttribute('aria-label', 'Anterior');
    prevBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
    viewport.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'slider-arrow slider-arrow--next';
    nextBtn.setAttribute('aria-label', 'Siguiente');
    nextBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>';
    viewport.appendChild(nextBtn);

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    const dots = [];
    for (let i = 0; i < n; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
        dot.addEventListener('click', () => goTo(i, true));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    }
    wrapper.appendChild(dotsContainer);

    let realIndex = 0;
    let trackIndex = 1;
    let slideWidth = 0;

    function measureSlideWidth() {
        slideWidth = viewport.offsetWidth;
    }
    measureSlideWidth();

    // Schedule a second measurement after layout has fully settled
    // (handles cases where CSS @media rules resolve slightly later).
    requestAnimationFrame(() => {
        measureSlideWidth();
        update(false);
    });

    window.addEventListener('load', () => {
        const prev = slideWidth;
        measureSlideWidth();
        if (slideWidth !== prev) update(false);
    });

    // Wrap-snap state. When the carousel is mid-animation to a cloned slide
    // (i.e. a wrap-around step), we want to teleport back to the real slide
    // *after* the visible animation finishes. Driven by `transitionend`, with
    // a 550ms safety-net timeout in case `transitionend` doesn't fire.
    let pendingSnap = null;     // function to run once the wrap animation ends
    let snapFallbackTimer = null;

    function clearPendingSnap() {
        pendingSnap = null;
        if (snapFallbackTimer !== null) {
            clearTimeout(snapFallbackTimer);
            snapFallbackTimer = null;
        }
    }

    function onTransitionEnd(e) {
        // Only react to the transform on the track itself, not bubbling children.
        if (e.target !== ulEl || e.propertyName !== 'transform') return;
        if (pendingSnap) {
            const snap = pendingSnap;
            clearPendingSnap();
            snap();
        }
    }
    ulEl.addEventListener('transitionend', onTransitionEnd);

    function update(animate) {
        ulEl.style.transition = animate ? '' : 'none';
        ulEl.style.transform = `translateX(${-trackIndex * slideWidth}px)`;
        dots.forEach((d, i) => {
            const isActive = i === realIndex;
            d.classList.toggle('is-active', isActive);
            if (isActive) d.setAttribute('aria-current', 'true');
            else d.removeAttribute('aria-current');
        });
    }

    function goTo(target, animate) {
        // Cancel any in-flight wrap-snap so a rapid second click doesn't race
        // with a previously queued snap.
        clearPendingSnap();

        const wrapped = target < 0 || target >= n;
        realIndex = ((target % n) + n) % n;
        trackIndex = realIndex + 1;
        update(animate !== false);
        if (wrapped) {
            pendingSnap = () => {
                if (target < 0) trackIndex = n;
                else trackIndex = 1;
                update(false);
            };
            // Safety net in case `transitionend` never fires (e.g. the animation
            // was cancelled mid-flight by another click). 550ms > the CSS 500ms
            // transition so it only kicks in if the event-based path fails.
            snapFallbackTimer = setTimeout(() => {
                snapFallbackTimer = null;
                if (pendingSnap) {
                    const snap = pendingSnap;
                    clearPendingSnap();
                    snap();
                }
            }, 550);
        }
        // Any actual slide change (user interaction or autoplay tick) resets the autoplay timer.
        startAutoplay();
    }

    let autoplayTimer = null;
    const AUTOPLAY_MS = 4000;
    function startAutoplay() {
        stopAutoplay();
        if (document.hidden) return;
        autoplayTimer = setTimeout(() => {
            goTo(realIndex + 1, true);
        }, AUTOPLAY_MS);
    }
    function stopAutoplay() {
        if (autoplayTimer !== null) {
            clearTimeout(autoplayTimer);
            autoplayTimer = null;
        }
    }
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoplay();
        else startAutoplay();
    });

    prevBtn.addEventListener('click', () => goTo(realIndex - 1, true));
    nextBtn.addEventListener('click', () => goTo(realIndex + 1, true));

    // Prevent the viewport's pointerdown drag handler from hijacking arrow clicks.
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('pointerdown', (e) => e.stopPropagation());
    });

    let dragStartX = 0;
    let dragStartTranslate = 0;
    let isDragging = false;
    let didMove = false;

    function getTranslateX() {
        const m = new DOMMatrixReadOnly(getComputedStyle(ulEl).transform);
        return m.m41;
    }

    viewport.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.slider-arrow')) return;
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        isDragging = true;
        didMove = false;
        dragStartX = e.clientX;
        dragStartTranslate = getTranslateX();
        viewport.classList.add('is-dragging');
        ulEl.classList.add('is-dragging');
        viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const delta = e.clientX - dragStartX;
        if (Math.abs(delta) > 3) didMove = true;
        ulEl.style.transition = 'none';
        ulEl.style.transform = `translateX(${dragStartTranslate + delta}px)`;
    });

    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        viewport.classList.remove('is-dragging');
        ulEl.classList.remove('is-dragging');
        const delta = e.clientX - dragStartX;
        if (Math.abs(delta) > 50) {
            goTo(delta < 0 ? realIndex + 1 : realIndex - 1, true);
        } else {
            update(true);
        }
        try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    viewport.addEventListener('click', (e) => {
        if (didMove) {
            e.preventDefault();
            e.stopPropagation();
            didMove = false;
        }
    }, true);

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            measureSlideWidth();
            update(false);
        }, 100);
    });

    update(false);
    startAutoplay();
}
