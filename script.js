$(document).ready(function () {
    // Animacja przewijania do sekcji
    $('.nav-links a').on('click', function (event) {
        event.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({ scrollTop: target.offset().top }, 800);
        }
    });
});
