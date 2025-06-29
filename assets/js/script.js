// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

/*
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
};

// add click event to all modal items
for (const element of testimonialsItem) {
  element.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);
*/

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (const element of selectItems) {
  element.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (const element of filterItems) {
    if (selectedValue === "all") {
      element.classList.add("active");
    } else if (selectedValue === element.dataset.category) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (const element of filterBtn) {
  element.addEventListener("click", function () {
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
for (const element of formInputs) {
  element.addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to handle navigation and make the clicked link active
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const pageName = link.getAttribute("aria-label").toLowerCase();

    // Show the clicked page and set the link as active
    pages.forEach((page) => {
      if (page.dataset.page === pageName) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    // Remove "active" class from all links, then add to the clicked link
    navigationLinks.forEach((navLink) => navLink.classList.remove("active"));
    link.classList.add("active");

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  });
});

//Clearing Info after clicking submit in contact form
function clearfield() {
  setTimeout(() => {
    document.getElementById("s-name").value = "";
    document.getElementById("s-mail").value = "";
    document.getElementById("s-msg").value = "";
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  // LeetCode Stats
  const leetCodeStatsContainer = document.getElementById("leetcode-stats");
  const leetCodeUsername = "nmohammedshakeel22";

  fetch(`https://leetcode-stats-api.herokuapp.com/${leetCodeUsername}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const { totalSolved, easySolved, mediumSolved, hardSolved, ranking } =
          data;
        const mediumPercent = totalSolved
          ? ((mediumSolved / totalSolved) * 100).toFixed(1)
          : 0;

        leetCodeStatsContainer.innerHTML = `
          <p class="stats-item-text">
            <strong>${totalSolved} Problems Solved</strong><br>
            <strong>Easy: ${easySolved}</strong> | <strong>Medium: ${mediumSolved}</strong> | <strong>Hard: ${hardSolved}</strong><br>
            <strong>Global Ranking: ${ranking}</strong><br>
            <a href="https://leetcode.com/u/nmohammedshakeel22" target="_blank" rel="noopener noreferrer">View Profile</a>
          </p>
          <div class="stats-progress">
            <p>Medium Problems: ${mediumPercent}%</p>
            <div class="stats-progress-bar">
              <div class="stats-progress-fill" style="width: ${mediumPercent}%"></div>
            </div>
          </div>
          <p class="stats-insight">
            <strong>Insight:</strong> <span class="highlight">${mediumPercent}%</span> of solved problems are Medium difficulty!
          </p>
        `;
      } else {
        leetCodeStatsContainer.innerHTML = `
          <p class="stats-item-text">Unable to load LeetCode stats. Check username or try again later.</p>
          <p class="stats-item-text">
            <strong>100+ Problems Solved</strong><br>
            <a href="https://leetcode.com/u/nmohammedshakeel22" target="_blank" rel="noopener noreferrer">View Profile</a>
          </p>
        `;
      }
    })
    .catch((error) => {
      console.error("Error fetching LeetCode stats:", error);
      leetCodeStatsContainer.innerHTML = `
        <p class="stats-item-text">Unable to load LeetCode stats. Check username or try again later.</p>
        <p class="stats-item-text">
          <strong>100+ Problems Solved</strong><br>
          <a href="https://leetcode.com/u/nmohammedshakeel22" target="_blank" rel="noopener noreferrer">View Profile</a>
        </p>
      `;
    });

  // GitHub Insight (Dynamic Commit Frequency)
  const githubInsight = document.querySelector(
    '[data-stats-item="github"] .stats-insight'
  );
  fetch("https://api.github.com/users/N-MohammedShakeel/events")
    .then((response) => response.json())
    .then((events) => {
      const pushEvents = events.filter((event) => event.type === "PushEvent");
      const recentCommits = pushEvents.length;
      githubInsight.innerHTML = `
        <strong>Insight:</strong> Active contributor with <span class="highlight">${recentCommits} recent commits</span> across multiple repositories!
      `;
    })
    .catch((error) => {
      console.error("Error fetching GitHub events:", error);
      githubInsight.innerHTML = `
        <strong>Insight:</strong> Active contributor with recent commits across multiple repositories!
      `;
    });

  // Flip Card Functionality (only one card open at a time)
  const flipCards = document.querySelectorAll(".flip-card");
  if (flipCards.length === 0) {
    console.warn(
      "No flip cards found. Check if '.flip-card' elements exist in the DOM."
    );
  }
  flipCards.forEach((card) => {
    card.addEventListener("click", () => {
      console.log("Flip card clicked:", card);
      flipCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("flipped");
        }
      });
      card.classList.toggle("flipped");
    });
  });

  // Project Grid Dynamic Row Span
  const projectItems = document.querySelectorAll(".project-item");
  if (projectItems.length === 0) {
    console.warn(
      "No project items found. Check if '.project-item' elements exist in the DOM."
    );
  }
  projectItems.forEach((item) => {
    const height = item.offsetHeight;
    const rowSpan = Math.ceil(height / 10); // Matches grid-auto-rows: 10px
    item.style.gridRow = `span ${rowSpan}`;
  });

  // Service Section Animation
  const serviceSection = document.querySelector(
    "article[data-page='about'] .service"
  );
  const serviceItems = document.querySelectorAll(
    "article[data-page='about'] .service-item"
  );

  if (!serviceSection) {
    console.warn(
      "Service section not found. Check if 'article[data-page=\"about\"] .service' exists in the DOM."
    );
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("Service section is in view, applying animations");
          serviceSection.classList.add("animate");
          serviceItems.forEach((item) => item.classList.add("animate"));
          observer.unobserve(serviceSection); // Stop observing after animation
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of section is visible
      rootMargin: "0px 0px -100px 0px", // Trigger earlier for better visibility
    }
  );

  observer.observe(serviceSection);
});
