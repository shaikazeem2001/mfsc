(function () {
  // Mobile menu
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
  }

  // "How it works" steps: each rule fills over 2 seconds (CSS), then the next step lights up.
  // Hovering a list pauses it. Reduced-motion visitors get the static first step.
  document.querySelectorAll('.steps').forEach(function (list) {
    var items = Array.prototype.slice.call(list.children);
    if (items.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var i = 0;
    function show(n) {
      i = n;
      items.forEach(function (li, k) {
        li.classList.toggle('is-done', k < n);
        li.classList.toggle('is-active', k === n);
      });
    }
    list.setAttribute('data-play', '');
    items.forEach(function (li) {
      li.addEventListener('animationend', function (e) {
        if (e.animationName !== 'fill' || !li.classList.contains('is-active')) return;
        show((i + 1) % items.length);
      });
    });
    show(0);
  });
})();
