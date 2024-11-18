$(document).ready(function () {
  const heightDevice = $(window).height();

  let top = $(window).scrollTop();

  // Fixed header
  function fixedHeader(top) {
    if (top > heightDevice) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  }
  fixedHeader(top);

  //Burger menu
  $(".header__burger").click(function (e) {
    $(this).toggleClass("active");
    $(".header").toggleClass("active");
    $(".header-mobile").toggleClass("active");
    $("body").toggleClass("lock");
    e.preventDefault();
  });
  $(".header-mobile").click(function (e) {
    e.stopPropagation();
  });
  $(document).click(function (e) {
    if (
      !$(e.target).closest(".header, .header-mobile").length &&
      $(".header-mobile").hasClass("active")
    ) {
      $(".header__burger").removeClass("active");
      $(".header").removeClass("active");
      $(".header-mobile").removeClass("active");
      $("body").removeClass("lock");
    }
  });

  // Scroll top
  $(".btn-up").click(function (e) {
    $(".header__burger").removeClass("active");
    $(".header").removeClass("active");
    $(".header-mobile").removeClass("active");
    $("body").removeClass("lock");
    $("html, body").animate({ scrollTop: 0 }, 800);
    e.preventDefault();
  });

  // Scrolling
  $(".header-menu__link").click(function (e) {
    const hrefId = $(this).attr("href");
    const headerHeight = $(".header").height();

    $("body,html").animate(
      { scrollTop: $(hrefId).offset().top - headerHeight - 10 },
      500,
      function () {}
    );
    e.preventDefault();
  });
  $(".header-mobile-menu__link").click(function (e) {
    const hrefId = $(this).attr("href");
    const headerHeight = $(".header").height();

    $(".header__burger").removeClass("active");
    $(".header").removeClass("active");
    $(".header-mobile").removeClass("active");
    $("body").removeClass("lock");

    $("body,html").animate(
      { scrollTop: $(hrefId).offset().top - headerHeight - 10 },
      500,
      function () {}
    );
    e.preventDefault();
  });
  $(".footer-menu li a").click(function (e) {
    const hrefId = $(this).attr("href");
    const headerHeight = $(".header").height();

    if (hrefId.replace("#", "") == "main") {
      $("html, body").animate({ scrollTop: 0 }, 800);
    } else {
      $("body,html").animate(
        { scrollTop: $(hrefId).offset().top - headerHeight - 10 },
        500,
        function () {}
      );
    }

    e.preventDefault();
  });

  // Reservation
  function reservation() {
    $(".reservation__element").each(function () {
      const thisItem = $(this);
      const header = thisItem.find(".reservation__header");
      const headerText = header.find("p");
      const content = thisItem.find(".reservation__content");
      const contentItem = content.find("li");
      const heightItem = content.find("ul").outerHeight(true);
      const maxHeight = 44;

      contentItem.first().addClass("active");
      headerText.text(contentItem.first().text());

      function openClose(content, maxHeight, heightItem) {
        const isActive = thisItem.hasClass("active");

        $(".reservation__content").animate(
          {
            "max-height": maxHeight,
          },
          300
        );
        $(".reservation__element").removeClass("active");

        if (!isActive) {
          content.animate(
            {
              "max-height": heightItem,
            },
            300
          );
          thisItem.addClass("active");
        }
      }

      header.off("click").on("click", function () {
        openClose(content, maxHeight, heightItem);
      });

      contentItem.off("click").on("click", function () {
        contentItem.removeClass("active");
        $(this).addClass("active");
        headerText.text($(this).text());
        openClose(content, maxHeight, heightItem);
      });

      thisItem.off("click").on("click", function (e) {
        e.stopPropagation();
      });
    });
  }

  $(document).click(function (e) {
    if (e.target != $(".reservation__element")) {
      $(".reservation__content").animate(
        {
          "max-height": 44,
        },
        300
      );
      $(".reservation__element").removeClass("active");
    }
  });

  $(document).keyup(function (e) {
    if (e.key == "Escape") {
      $(".reservation__content").animate(
        {
          "max-height": 44,
        },
        300
      );
      $(".reservation__element").removeClass("active");
    }
  });

  function reservationMaxWidth() {
    if ($(window).width() <= 800) {
      let widthRow = $(".reservation__row").width();
      $(".reservation__header").css({
        "max-width": widthRow,
      });
    }
  }
  reservation();
  reservationMaxWidth();

  // More block
  $(".more-block").each(function () {
    const thisItem = $(this);
    const item = thisItem.find(".more-item");
    const button = thisItem.find(".more-btn");
    const buttonText = button.text();
    const count = +thisItem.data("count");

    if (item.length <= count) {
      button.hide();
    }

    item
      .slice(0, count)
      .wrapAll(
        '<div class="more-top"><div class="more-top-content"></div></div>'
      );
    item
      .slice(count)
      .wrapAll(
        '<div class="more-body"><div class="more-body-content"></div></div>'
      );

    const body = thisItem.find(".more-body");

    button.click(function (e) {
      const spanText = button.find("span").text().trim();
      const newText = spanText === "Свернуть" ? buttonText : "Свернуть";
      button.find("span").text(newText);
      body.slideToggle();
      e.preventDefault();
    });
  });

  // Gallery
  const galleryItem = $(".gallery .gallery__item");

  galleryItem.each(function (index) {
    const bigCard = (index + 1) % 5 === 1 || (index + 1) % 5 === 2;
    if (bigCard) {
      $(this).addClass("big");
    }
  });

  // Working
  const items = $(".working__item");

  for (var i = 0; i < items.length; i += 2) {
    items.slice(i, i + 2).wrapAll("<div class='working__group'></div>");
  }

  // Purks the review completely
  $(".reviews__item").each(function () {
    const thisItem = $(this);
    const blockText = thisItem.find(".reviews__text");
    const text = blockText.text();
    const words = text.split(" ").filter(Boolean);
    const maxWords = 20;
    const button = thisItem.find(".reviews__more");
    const buttonText = button.find("span").text();

    let newText = text;

    if (words.length > maxWords) {
      blockText.text(words.slice(maxWords).join(" "));
      newText = blockText.text();
    } else {
      button.remove();
    }

    button.click(function (e) {
      button.toggleClass("active");
      if (button.hasClass("active")) {
        blockText.text(text);
        button.find("span").text("Свернуть");
      } else {
        blockText.text(newText);
        button.find("span").text(buttonText);
      }

      e.preventDefault();
    });
  });

  // FAQ
  $(".faq__header").click(function (event) {
    if (!$(".faq").hasClass("no")) {
      $(".faq__header").not($(this)).removeClass("active");
      $(".faq__body").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass("active").next().slideToggle(300);
  });

  // Map
  ymaps.ready(function () {
    if ($("#map").length > 0) {
      const map = new ymaps.Map("map", {
        center: [45.049940437101334, 38.963571822090046],
        zoom: 15,
      });
      map.behaviors.disable("scrollZoom");
      const placemarks = [[45.049940437101334, 38.963571822090046]];

      placemarks.forEach(function (coords) {
        const myPlacemark = new ymaps.Placemark(
          coords,
          {},
          {
            iconLayout: "default#image",
            iconImageHref: "./img/contacts/point.png",
            iconImageSize: [49, 63],
            iconImageOffset: [-20, -30],
          }
        );
        map.geoObjects.add(myPlacemark);
      });
      map.controls.remove("geolocationControl");
      map.controls.remove("searchControl");
      map.controls.remove("trafficControl");
      map.controls.remove("typeSelector");
      map.controls.remove("rulerControl");
    }
  });

  // Modal
  const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
  });

  // Slider
  $(".hero.slider").slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
  });

  $(".catalog__slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  });

  $(".services__slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          variableWidth: true,
        },
      },
    ],
  });

  $(".discounts").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "30px",
  });

  $(".team__slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          variableWidth: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
  });

  $(".partners").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 641,
        settings: {
          arrows: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          centerMode: false,
          arrows: true,
        },
      },
    ],
  });

  $(".licenses-documents").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 501,
        settings: {
          centerMode: false,
        },
      },
    ],
  });

  $(window).resize(function () {
    reservation();
    reservationMaxWidth();
  });
  $(window).scroll(function () {
    top = $(window).scrollTop();
    fixedHeader(top);
  });
});
