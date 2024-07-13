// script.js

document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector(".carousel-inner");
  const dots = document.querySelectorAll(".dot");
  const photo = document.getElementById("photo");
  const cards = document.querySelectorAll(".card");

  const imageSources = [
    "./images/image.png",
    "./images/1-1.png",
    "./images/2-1.png",
  ];

  let currentIndex = 0;
  const totalItems = document.querySelectorAll(".carousel-item").length;

  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 33.33}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (event) => {
      currentIndex = parseInt(event.target.getAttribute("data-index"));
      updateCarousel();
    });
  });

  function autoSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("card-clicked"));

      card.classList.add("card-clicked");

      const index = card.getAttribute("data-index");
      changeImage(imageSources[index]);
    });
  });

  function changeImage(src) {
    photo.style.opacity = "0";
    setTimeout(() => {
      photo.src = src;
      photo.style.opacity = "1";
    }, 100); // Match the timeout to the transition duration in CSS
  }

  const contactBtn = document.getElementById("contact-btn");
  const contactSection = document.getElementById("contact-section");
  const formSection = contactSection.querySelector(".form-section");

  // Show contact section and disable scrolling
  contactBtn.addEventListener("click", () => {
    contactSection.style.display = "flex";
    document.body.classList.add("no-scroll");
  });

  // Hide contact section and enable scrolling
  contactSection.addEventListener("click", () => {
    contactSection.style.display = "none";
    document.body.classList.remove("no-scroll");
  });

  // Prevent click events on the contact content from closing the section
  formSection.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.querySelectorAll(".input-container input").forEach((input) => {
    if (input.value) {
      input.classList.add("not-empty");
    }
    input.addEventListener("input", () => {
      if (input.value) {
        input.classList.add("not-empty");
      } else {
        input.classList.remove("not-empty");
      }
    });
  });

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      // Get form elements
      var email = document.getElementById("email");
      var firstname = document.getElementById("firstname");
      var lastname = document.getElementById("lastname");
      var terms = document.getElementById("terms");
      var notification = document.getElementById("notification");

      // Basic validation checks
      if (!email.value || !validateEmail(email.value)) {
        showNotification("Please enter a valid email address.");
        email.focus();
        event.preventDefault();
        return false;
      }

      if (!firstname.value) {
        showNotification("Please enter your first name.");
        firstname.focus();
        event.preventDefault();
        return false;
      }

      if (!lastname.value) {
        showNotification("Please enter your last name.");
        lastname.focus();
        event.preventDefault();
        return false;
      }

      if (!terms.checked) {
        showNotification("You must agree to the terms and conditions.");
        terms.focus();
        event.preventDefault();
        return false;
      }

      return true;
    });

  function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.innerText = message;
    notification.classList.remove("hidden");
    notification.classList.add("visible");

    // Hide notification after 3 seconds
    setTimeout(function () {
      notification.classList.remove("visible");
      notification.classList.add("hidden");
    }, 3000);
  }
});
