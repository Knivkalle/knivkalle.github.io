(function ($) {
  var $window = $(window),
    $body = $("body");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Mobile?
  if (browser.mobile) $body.addClass("is-mobile");
  else {
    breakpoints.on(">medium", function () {
      $body.removeClass("is-mobile");
    });

    breakpoints.on("<=medium", function () {
      $body.addClass("is-mobile");
    });
  }
  let scrollingToAnchor = false;

  // Känn av när användaren klickar på en .scrolly-länk
  $(".scrolly").on("click", function () {
    scrollingToAnchor = true;
    setTimeout(() => {
      scrollingToAnchor = false;
    }, 1500); // Samma som scrollhastigheten
  });

  $(window).on("load", function () {
    $(".scrolly").scrolly({
      speed: 1500,
      offset: 0,
      pollOnce: false,
    });
  });
  let lastScrollTop = 0;
  const topbar = document.getElementById("topbar");

  window.addEventListener("scroll", () => {
    if (scrollingToAnchor) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 80) {
      topbar.style.top = "-80px";
    } else {
      topbar.style.top = "0";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
})(jQuery);
