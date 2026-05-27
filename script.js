"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

function openIframe(link) {
  const iframeContainer = document.getElementById("iframe-container");
  const iframe = document.getElementById("project-iframe");

  iframe.src = link;
  iframeContainer.style.display = "block";
  iframe.focus();
  document.body.style.overflow = "hidden";
}

function closeIframe() {
  const iframeContainer = document.getElementById("iframe-container");
  const iframe = document.getElementById("project-iframe");

  iframeContainer.style.display = "none";
  iframe.src = "";
  document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", () => {
  const projectIconBoxes = document.querySelectorAll(".project-img");

  projectIconBoxes.forEach((iconBox) => {
    iconBox.addEventListener("click", (event) => {
      const projectItem = event.target.closest(".project-item");

      if (projectItem.dataset.category === "web design") {
        return;
      }
      if (document.querySelector(".image-overlay")) {
        document.body.removeChild(document.querySelector(".image-overlay"));
      }

      const projectImage = projectItem.querySelector("img").src;

      const overlay = document.createElement("div");
      overlay.classList.add("image-overlay");
      overlay.innerHTML = `
<div class="image-overlay">
  <div class="overlay-content">
    <img src="${projectImage}" alt="Full Image">
  </div>
  <button class="close-overlay">&times;</button>
</div>
      `;

      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      overlay.focus();

      overlay.querySelector(".close-overlay").addEventListener("click", () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = "auto";
      });

      overlay.addEventListener("click", (e) => {
        if (e.target === overlay || document.querySelector(".image-overlay")) {
          document.body.removeChild(overlay);
          document.body.style.overflow = "auto";
        }
      });
    });
  });
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = encodeURIComponent(document.getElementById("fullname").value);
  const email = encodeURIComponent(document.getElementById("email").value);
  const message = encodeURIComponent(document.getElementById("message").value);

  const gmailLink = `https://mail.google.com/mail/?view=cm&to=kunalmakhija147@gmail.com&su=Message from ${name}&body=Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  window.open(gmailLink, "_blank");
});

// ── Typing animation 

const element = document.getElementById("animated-text");

const words = [
  { text: "Software Developer", prefix: false },
  { text: "Web & Mobile Apps", prefix: true },
  { text: "Network Systems", prefix: true },
  { text: "UI Design", prefix: true },
];

const PREFIX = "Building ";
const typeSpeed = 60;
const forwardWait = 4000;
const reverseWait = 1000;

let wordIndex = 0;
let letterIndex = 0;
let typingForward = true;
let prefixVisible = false;

const cursor = document.createElement("span");
cursor.className = "cursor";
element.after(cursor);

// ── DOM helpers 

function buildSpans(text, groupClass) {
  const parts = text.split(" ");
  parts.forEach((part, partIndex) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.whiteSpace = "nowrap";
    if (groupClass) wrapper.dataset.group = groupClass;
    [...part].forEach((char) => {
      const span = document.createElement("span");
      span.className = "typing-word";
      if (groupClass) span.dataset.group = groupClass;
      span.textContent = char;
      wrapper.appendChild(span);
    });
    element.appendChild(wrapper);
    if (partIndex < parts.length - 1) {
      const space = document.createElement("span");
      space.className = "typing-word";
      if (groupClass) space.dataset.group = groupClass;
      space.innerHTML = "&nbsp;";
      element.appendChild(space);
    }
  });
}

function getSuffixSpans() {
  return [...element.querySelectorAll(".typing-word[data-group='suffix']")];
}

function getPrefixSpans() {
  return [...element.querySelectorAll(".typing-word[data-group='prefix']")];
}

function typePrefix(onDone) {
  const prefixSpans = getPrefixSpans();
  let i = 0;
  function typeNext() {
    if (i < prefixSpans.length) {
      prefixSpans[i].classList.add("visible");
      i++;
      setTimeout(typeNext, typeSpeed);
    } else {
      onDone();
    }
  }
  typeNext();
}

function erasePrefix(onDone) {
  const prefixSpans = getPrefixSpans().reverse();
  let i = 0;
  function eraseNext() {
    if (i < prefixSpans.length) {
      const span = prefixSpans[i];
      span.classList.remove("visible");
      span.style.opacity = "0";
      span.style.filter = "blur(1px)";
      span.style.transform = "translateY(2px)";
      i++;
      setTimeout(eraseNext, typeSpeed);
    } else {
      onDone();
    }
  }
  eraseNext();
}

// ── Core loop 

function typeLoop() {
  const suffixSpans = getSuffixSpans();

  if (typingForward) {
    if (letterIndex < suffixSpans.length) {
      suffixSpans[letterIndex].classList.add("visible");
      letterIndex++;
      setTimeout(typeLoop, typeSpeed);
    } else {
      typingForward = false;
      setTimeout(typeLoop, forwardWait);
    }
  } else {
    // Erasing suffix
    if (letterIndex > 0) {
      letterIndex--;
      const span = suffixSpans[letterIndex];
      span.classList.remove("visible");
      span.style.opacity = "0";
      span.style.filter = "blur(1px)";
      span.style.transform = "translateY(2px)";
      setTimeout(typeLoop, typeSpeed);
    } else {
      // Suffix fully erased
      const nextIndex = (wordIndex + 1) % words.length;
      const nextHasPrefix = words[nextIndex].prefix;
      const currentHasPrefix = words[wordIndex].prefix;

      wordIndex = nextIndex;

      if (currentHasPrefix && !nextHasPrefix) {
        // Erase prefix, then build new suffix (no prefix)
        erasePrefix(() => {
          prefixVisible = false;
          element.innerHTML = "";
          requestAnimationFrame(() => {
            buildSpans(words[wordIndex].text, "suffix");
            letterIndex = 0;
            typingForward = true;
            setTimeout(typeLoop, reverseWait);
          });
        });
      } else if (!currentHasPrefix && nextHasPrefix) {
        // No prefix → has prefix: build prefix + suffix, type prefix first
        requestAnimationFrame(() => {
          element.querySelectorAll("[data-group='suffix']").forEach((el) => el.remove());
          buildSpans(PREFIX, "prefix");
          prefixVisible = true;
          buildSpans(words[wordIndex].text, "suffix"); // FIX: build suffix BEFORE typePrefix
          typePrefix(() => {
            letterIndex = 0;
            typingForward = true;
            setTimeout(typeLoop, reverseWait);
          });
        });
      } else {
        // Prefix state unchanged — just swap suffix
        requestAnimationFrame(() => {
          element.querySelectorAll("[data-group='suffix']").forEach((el) => el.remove());
          buildSpans(words[wordIndex].text, "suffix");
          letterIndex = 0;
          typingForward = true;
          setTimeout(typeLoop, reverseWait);
        });
      }
    }
  }
}

// ── Init 

if (words[wordIndex].prefix) {
  buildSpans(PREFIX, "prefix");
  prefixVisible = true;
  buildSpans(words[wordIndex].text, "suffix");
  typePrefix(() => typeLoop());
} else {
  buildSpans(words[wordIndex].text, "suffix");
  typeLoop();
}
