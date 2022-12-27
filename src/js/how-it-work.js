const accordion = document.querySelector(".question-box-accordion");

accordion.addEventListener("click", (e) => {
  const item = e.target.closest(".question-box-accordion-item");

  const box = e.target.closest(".question-box-accordion-item-question");

  if (!box) return;
  if (box) {
    if (item.classList.contains("open")) {
      item.classList.remove("open");
    } else {
      item.classList.add("open");
    }
  }
});

/*   REVEAL SECTION
 */

const allSection = document.querySelectorAll(".section");

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});
///////////////////////////////////////////////////////////////////
