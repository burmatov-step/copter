$(function(){

$(".products__slider").slick({
  prevArrow:
    '<button class="slider-btn slider-btn__left"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.21839 1L1 9L9.21839 17"/></svg></button>',
  nextArrow:
    '<button class="slider-btn slider-btn__right"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.78161 17L9 9L0.78161 1"/></svg></button>',
    infinite: false,
});

$(".questions__item-title").on('click', function(){
  $(".questions__item").removeClass("questions__item--active");
  $(this).parent().addClass("questions__item--active");
});

$("#fullpage").fullpage({
  //options here
  autoScrolling: true,
  scrollHorizontally: true,
  sectionSelector: ".page-section",
  scrollOverflow: true,
  anchors: ["top", "products", "benefits", "specification", "questions", "contacts"],
  menu: "#header__nav",
});

$('.menu__btn').on('click', function () {
  $(".menu__btn").toggleClass('menu__btn--active');
  $(".menu__list").toggleClass("menu__list--active");
})

$(".menu__list-link").on("click", function () {
  $(".menu__btn").removeClass("menu__btn--active");
  $(".menu__list").removeClass("menu__list--active");
});


$('.header__btn').on('click', ()=>{
  $(".popup-product").addClass("popup-product-active");
})

$('body').on('click', (e) =>{
  const target = e.target;
  if (
    (!target.closest(".popup__content") &&
      target.classList.contains("popup-product-active")) ||
    target.closest(".popup__btn")
  ) {
    $(".popup-product").removeClass("popup-product-active");
  }

})

});

const formAll = document.querySelectorAll("form");

const postData = (body) => {
  return fetch("server.php", {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(body),
  });
};



formAll.forEach((item) => {

  item.addEventListener("submit", (e) => {
    const input = item.querySelectorAll("input");

    e.preventDefault();
console.log(new FormData(item));
    const formData = new FormData(item);
    let body = {};
    formData.forEach((val, key) => {
      console.log(val, key);
      body[key] = val;

    });


    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        console.log(body);
      })
      .catch((error) => {
        console.log(error);
      });
    input.forEach((e) => {
      e.value = "";
    });
  });
});

