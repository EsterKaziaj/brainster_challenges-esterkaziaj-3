document.querySelectorAll('.image-grid a').forEach(anchor => {
    const img = anchor.querySelector('img');
    const hoverSrc = img.getAttribute('data-hover');

    anchor.addEventListener('mouseenter', () => {
        img.setAttribute('src', hoverSrc);
    });

    anchor.addEventListener('mouseleave', () => {
        img.setAttribute('src', img.getAttribute('alt').toLowerCase().replace(' ', '') + '.jpg');
    });
});
