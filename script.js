'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

function openIframe(link) {
  const iframeContainer = document.getElementById('iframe-container');
  const iframe = document.getElementById('project-iframe');

  // Set the iframe source to the provided link
  iframe.src = link;

  // Display the iframe container
  iframeContainer.style.display = 'block';

  // Shift focus to the iframe and disable scrolling on the main page
  iframe.focus();
  document.body.style.overflow = 'hidden'; // Disable scrolling on the main page
}

function closeIframe() {
  const iframeContainer = document.getElementById('iframe-container');
  const iframe = document.getElementById('project-iframe');

  // Hide the iframe container
  iframeContainer.style.display = 'none';

  // Clear the iframe source
  iframe.src = '';

  // Re-enable scrolling on the main page
  document.body.style.overflow = 'auto';
}
document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with the class "project-item-icon-box"
  const projectIconBoxes = document.querySelectorAll(".project-img");

  projectIconBoxes.forEach(iconBox => {
    iconBox.addEventListener("click", (event) => {
      // Find the parent project item
      const projectItem = event.target.closest(".project-item");

      // Check if the project item belongs to the "web design" category
      if (projectItem.dataset.category === "web design") {
        // Skip the overlay functionality for "web design" category
        return;
      }
      if (document.querySelector(".image-overlay")) {
        document.body.removeChild(overlay);
      }
      // Find the image inside the project item
      const projectImage = projectItem.querySelector("img").src;

      // Create overlay
      const overlay = document.createElement("div");
      overlay.classList.add("image-overlay");
      overlay.innerHTML = `
        <div class="overlay-content">
          <img src="${projectImage}" alt="Full Image">
          <button class="close-overlay">&times;</button>
        </div>
      `;

      // Append overlay to the body
      document.body.appendChild(overlay);

      // Close overlay on button click
      overlay.querySelector(".close-overlay").addEventListener("click", () => {
        document.body.removeChild(overlay);
      });

      // Close overlay on clicking outside the content
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
        }
        if (document.querySelector(".image-overlay")) {
          document.body.removeChild(overlay);
        }
      });
    });
  });
});

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
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

}

// add event in all filter button items for large screen
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



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
