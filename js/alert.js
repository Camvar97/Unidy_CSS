var $alertClose = getAll('.alert-closable .close');

if ($alertClose.length > 0) {
    $alertClose.forEach(function($el) {
        $el.addEventListener('click', function(event) {
            event.stopPropagation();
            $($el)
                .parent()
                .fadeOut(300, function($el) {
                    $($el)
                        .parent()
                        .remove();
                });
        });
    });
}
function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}
