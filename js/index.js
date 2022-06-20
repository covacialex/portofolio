"use strict";

// Projects data list
let projectsList = [];

const data = await fetch("./data.json")
  .then((res) => res.json())
  .then((el) => {
    projectsList = el;
  });

// Carousel for Projects list
const carouselize = function () {
  const gap = 30,
    carousel = document.querySelector(".carousel"),
    content = document.querySelector(".works__container__completed__list"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev");

  next.addEventListener("click", function (e) {
    carousel.scrollBy(width + gap, 0);

    if (carousel.scrollWidth !== 0) {
      prev.style.display = "flex";
    }

    if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
      next.style.display = "none";
    }
  });

  prev.addEventListener("click", function (e) {
    carousel.scrollBy(-(width + gap), 0);

    if (carousel.scrollLeft - width - gap <= 0) {
      prev.style.display = "none";
    }

    if (carousel.scrollWidth - width - gap <= carousel.scrollLeft + width) {
      next.style.display = "flex";
    }
  });

  let width = carousel.offsetWidth;
  window.addEventListener("resize", (e) => (width = carousel.offsetWidth));
};

// Modal for Projects
const modal = function () {
  const overlay = document.querySelector(".overlay"),
    modal = document.querySelector(".modal"),
    btnCloseModal = document.querySelectorAll(".close-modal"),
    btnOpenModal = document.querySelectorAll(".show-modal"),
    body = document.querySelector("body");

  const openModal = function (el, i) {
    document.querySelector(`.modal-${i}`).classList.remove("hidden");
    overlay.classList.remove("hidden");
    body.style.backdropFilter = "3px";
  };

  const closeModal = function (el, i) {
    document.querySelector(`.modal-${i}`).classList.add("hidden");
    overlay.classList.add("hidden");
    body.style.backdropFilter = "0px";
  };

  btnOpenModal.forEach((el, i) => {
    el.addEventListener("click", function () {
      openModal(el, i);
    });
  });

  btnCloseModal.forEach((el, i) => {
    el.addEventListener("click", function () {
      closeModal(el, i);
    });

    overlay.addEventListener("click", function () {
      closeModal(el, i);
    });

    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        !el.closest(".modal").classList.contains("hidden")
      ) {
        closeModal(el, i);
      }
    });
  });
};

// Generate DOM in Projects list
const projects = function () {
  const parentEl = document.querySelector(".works__container__completed__list");

  const markup = projectsList.map((el, index) => {
    return `
  <li class="works__container__completed__list__project">
                  <img
                    src="${el.thumbnail}"
                    alt="${el.title} project picture by Covaci Alex"
                    class="works__container__completed__list__project__img"
                  />
                  <h3 class="works__container__completed__list__project__title">
                  ${el.title}
                  </h3>
                  <span
                    class="works__container__completed__list__project__preview show-modal show-modal-${index}"
                    >Preview <i class="bx bxs-right-arrow-alt"></i
                  ></span>

                  <div class="modal modal-${index} hidden">
                    <button class="close-modal ">&times;</button>
                    <h3 class="modal__title">
                      ${el.title}
                      </h3>
                    <div class="modal__contents">
                     <div class="modal__contents__data">
                       <img
                         src="${el.thumbnail}"
                         alt="${el.thumbnail} project by Covaci Alex"
                         class="modal__contents__data__img"
                       />
                       <div class="modal__contents__data__links">
                         <a
                           href="${el.website}"
                           class="modal__contents__data__site tooltip"
                           target="_blank"
                           ><i class="bx bx-world"></i
                         ><span class="tooltiptext tooltiptext-site">View live website</span></a>
                         <a
                           href="${el.source}"
                           class="modal__contents__data__code tooltip"
                           target="_blank"
                           ><i class="bx bx-code"></i
                         ><span class="tooltiptext tooltiptext-code">View source code</span></a>
                         
                       </div>
                     </div>

                     <p class="modal__contents__description">
                       ${el.description}
                     </p>
                  </div>
                  </div>
                </li>
  `;
  });

  // Without join(), a comma appears after every element
  parentEl.insertAdjacentHTML("afterbegin", markup.join(""));
};

// Active link on menu
const active = function () {
  const sections = document.querySelectorAll(".section");
  const navLi = document.querySelectorAll(".nav__menu ul li a");

  window.onscroll = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionY = pageYOffset;

      if (sectionY >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLi.forEach((li) => {
      li.classList.remove("active__link");
      if (li.classList.contains(current)) {
        li.classList.add("active__link");
      }
    });
  };
};

// Theme change
const theme = function () {
  const themeButton = document.getElementById("theme-button");
  const lightTheme = "light-theme";
  const iconTheme = "bx-sun";

  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  const getCurrentTheme = () =>
    document.body.classList.contains(lightTheme) ? "dark" : "light";

  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      lightTheme
    );

    themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
      iconTheme
    );
  }

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
};

//////////////////////////////////////////////////////////////////

const init = function () {
  active();
  carouselize();
  projects();
  modal();
  theme();
};

init();
