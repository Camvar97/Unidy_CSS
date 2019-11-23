var $dropdowns = getAll('.dropdown');

if ($dropdowns.length > 0) {
    $dropdowns.forEach(function($el) {
        $el.addEventListener('click', function(event) {
            event.stopPropagation();
            $($el)
                .toggleClass('show')
                .siblings('.show')
                .removeClass('show');
        });
    });

    document.addEventListener('click', function(event) {
        closeDropdowns();
    });
}

function closeDropdowns() {
    $dropdowns.forEach(function($el) {
        $el.classList.remove('show');
    });
}
function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}
