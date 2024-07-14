document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer setup
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  // For active nav a
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
  // Smooth scrolling setup
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
  // For Modal
  $(document).ready(function () {
    var $modal = $(".modal-frame");
    var $overlay = $(".modal-overlay");

    $(".close").on("click", function () {
      $overlay.removeClass("state-show");
      $modal.removeClass("state-appear").addClass("state-leave");

      // Timeout to ensure animations complete before removing classes
      setTimeout(function () {
        $overlay.removeClass("state-leave");
        $modal.removeClass("state-leave");
        $("body").removeClass("modal-open"); // Restore body scroll
      }, 350); // Adjust this timeout to match your modal animation duration
    });

    $(".open").on("click", function () {
      $overlay.addClass("state-show");
      $modal.removeClass("state-leave").addClass("state-appear");
      $("body").addClass("modal-open"); // Prevent body scroll
    });
  });
});
