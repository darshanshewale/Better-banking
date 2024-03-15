import card from "url:/card.jpg";
import digital from "url:/digital.jpg";
import grow from "url:/grow.jpg";
import "core-js/stable";

("use strict");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnclosemodal = document.querySelector(".btn_close_modal");
const btnopenmodal = document.querySelectorAll(".btn_show_modal");
const btnscrollto = document.querySelector(".btn_scroll_to");
const section1 = document.querySelector("#section_1");
const header = document.querySelector(".header");
const tabs = document.querySelectorAll(".operations_tab");
const tabcontainer = document.querySelector(".operations_tab_container");
const tabscontent = document.querySelectorAll(".operations_content");
const nav = document.querySelector(".nav");

//modal open
const openmodal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// modal close by adding hidden class
const closemodal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// onclicking on showmodal foreach button shows the modal by removing hidden class
btnopenmodal.forEach((btn) => btn.addEventListener("click", openmodal));

// onclicking on closemodal foreach button close the modal by adding hidden class
btnclosemodal.addEventListener("click", closemodal);

// onclicking on body close the modal by adding hidden class
overlay.addEventListener("click", closemodal);

// onclicking on esc close the modal by adding hidden class
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closemodal();
  }
});

//scroll onc clicking on learn more

btnscrollto.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

//navigation scrolling on clicking on links
document.querySelectorAll(".nav_link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();

    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

// console.log(tabscontent);

// console.log(tabs);
// console.log(tabcontainer);

// tabs.forEach((t) => t.addEventListener("click", () => console.log("hello")));

// on clicking on all tabs container
tabcontainer.addEventListener("click", function (e) {
  // gets element from parent
  const clicked = e.target.closest(".operations_tab");

  // guard clause if did not get any element
  if (!clicked) return;

  // removed for all tabs as active
  tabs.forEach((t) => t.classList.remove("operations_tab_active"));

  // removed for all tabs as active content
  tabscontent.forEach((c) => c.classList.remove("operations_content_active"));

  // clicked tab get pop up to y axis
  clicked.classList.add("operations_tab_active");

  console.log(clicked.dataset.tab);

  // make the content visible accordingly to dataset property
  document
    .querySelector(`.operations_content_${clicked.dataset.tab}`)
    .classList.add("operations_content_active");
});

//menu fads animation
const fads = function (e, o) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav_link");
    const logo = link.closest(".nav").querySelector("img");

    // check clicked is equal to not  matching link make it according to opacity passed through event
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = o;
      }
    });
    logo.style.opacity = o;
  }
};

// changes the opacity on clicking on the links by passing the value on causing event
nav.addEventListener("mouseover", function (e) {
  fads(e, 0.5);
});

nav.addEventListener("mouseout", function (e) {
  fads(e, 1);
});

//sticky navigation
const head = document.querySelector(".header");

const stickynav = function (entries) {
  const [entry] = entries;

  // if is intersecting then make it visble else remove
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

// as soon as reaches to end 90px stickynav get triggred
const headerobserver = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});

// will observe is header to get coordinates
headerobserver.observe(header);

//reveal section

const allsection = document.querySelectorAll(".section");

const revealsection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section_hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealsection, {
  root: null,
  threshold: 0.15,
});

allsection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section_hidden");
});

//lazy loading for image accoding to the data source

const imgTargets = document.querySelectorAll("img[data-src]");

console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  console.log(entry.target.dataset.src);
  console.log(card);

  if (entry.target.dataset.src === "digital.jpg") {
    entry.target.src = digital;
  }

  if (entry.target.dataset.src === "card.jpg") {
    entry.target.src = card;
  }

  if (entry.target.dataset.src === "grow.jpg") {
    entry.target.src = grow;
  }

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy_img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider_btn_left");
  const btnRight = document.querySelector(".slider_btn_right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots_dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots_dot")
      .forEach((dot) => dot.classList.remove("dots_dot_active"));

    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add("dots_dot_active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    // if third slide is active  on clicking next will go to 1st or else next slide
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    // if first slide is active  on clicking prev will go to last or else prev slide
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // on pressing the key
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots_dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//sticky navigation

// const obscallback = function (entries, observer) {
//   entries.forEach(entry);
//   console.log(entry);
// };
// const oboptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const intialpoints = section1.getBoundingClientRect();

// console.log(intialpoints);

// window.addEventListener("scroll", function (e) {
//   if (window.scrollY > intialpoints.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// //child
// console.log(h1.querySelectorAll(".highlight"));

// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = "red";

// h1.lastElementChild.style.color = "red";

// //going parent

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.backgroundColor = "pink";

// //siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);

// //creating and inserting element

// const message = document.createElement("div");
// message.classList.add("cookie_message");
// message.innerHTML =
//   'accept the cookies for better functioanlity . <button class="btn btn_close_cookie">Accept!</button>';

// header.append(message);

// const closecookie = document.querySelector(".btn_close_cookie");

// closecookie.addEventListener("click", function () {
//   message.innerHTML = " ";
// });

// //style
// message.style.backgroundColor = "#37383d";

// //attribute

// const logo = document.querySelector(".nav_logo");
// console.log(logo.alt);
// console.log(logo.src);

// console.log(logo.getAttribute("src"));
