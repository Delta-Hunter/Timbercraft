document.addEventListener("DOMContentLoaded", () => {

    // NAVIGATION LOGIC
    const navLinks = document.querySelectorAll("nav a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    console.log("Current page:", currentPage);
    navLinks.forEach(link => {
      const linkPage = link.getAttribute("href").split("/").pop();
      if (linkPage === currentPage) {
        console.log("Matched:", linkPage);
        link.classList.add("active");
      }
    });

  // FILTERING LOGIC
    const categoryFilter = document.getElementById("categoryFilter");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const productCards = document.querySelectorAll(".product-card");
  
    function filterProducts() {
      const selectedCategory = categoryFilter.value;
      const maxPrice = parseInt(priceRange.value);
  
      productCards.forEach(card => {
        const category = card.getAttribute("data-category");
        const price = parseInt(card.getAttribute("data-price"));
  
        const matchesCategory = selectedCategory === "all" || category === selectedCategory;
        const matchesPrice = price <= maxPrice;
  
        card.style.display = (matchesCategory && matchesPrice) ? "block" : "none";
      });
    }
  
    if (categoryFilter && priceRange && priceValue) {
      categoryFilter.addEventListener("change", filterProducts);
      priceRange.addEventListener("input", () => {
        priceValue.textContent = priceRange.value;
        filterProducts();
      });
      filterProducts();
    }
  
    // MODAL LOGIC
    const modal = document.getElementById("productModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalPrice = document.getElementById("modalPrice");
    const modalEnquireBtn = document.getElementById("modalEnquireBtn");
    const closeModal = document.querySelector(".close-modal");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const productCardList = Array.from(document.querySelectorAll(".product-card"));
    let currentIndex = -1;
  
    function openModal(index) {
      const card = productCardList[index];
      const img = card.querySelector("img").src;
      const title = card.querySelector("h3").innerText;
      const desc = card.querySelector("p").innerText;
      const price = card.querySelector(".price").innerText;
  
      modalImg.src = img;
      modalTitle.innerText = title;
      modalDesc.innerText = desc;
      modalPrice.innerText = price;
      modalEnquireBtn.href = `contact.html?product=${encodeURIComponent(title)}`;
  
      currentIndex = index;
      modal.style.display = "block";
    }
  
    productCardList.forEach((card, index) => {
      const image = card.querySelector("img");
      if (image) {
        image.style.cursor = "pointer";
        image.addEventListener("click", () => openModal(index));
      }
    });
  
    if (closeModal) {
      closeModal.onclick = () => {
        modal.style.display = "none";
      };
    }
  
    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };
  
    if (nextBtn && prevBtn) {
      nextBtn.onclick = () => {
        let nextIndex = (currentIndex + 1) % productCardList.length;
        openModal(nextIndex);
      };
  
      prevBtn.onclick = () => {
        let prevIndex = (currentIndex - 1 + productCardList.length) % productCardList.length;
        openModal(prevIndex);
      };
    }

  // Using unique IDs "nextTeam" and "prevTeam" for team section navigation
  // TEAM MEMBER CONTINUOUS LOOP SCROLLING LOGIC
  // Select the container and buttons. Note the selector now uses '.team-members'
  // Using unique IDs "nextTeam" and "prevTeam" for team section navigation
  const teamMembersContainer = document.querySelector('.team-members');
  const teamNextBtn = document.getElementById('nextTeam');
  const teamPrevBtn = document.getElementById('prevTeam');

  // Check if elements are found - if not, log an error for debugging
  if (!teamMembersContainer)
    console.error("Team members container (.team-members) not found.");
  if (!teamNextBtn)
    console.error("Next team button (#nextTeam) not found.");
  if (!teamPrevBtn)
    console.error("Previous team button (#prevTeam) not found.");
  
  if (teamMembersContainer && teamNextBtn && teamPrevBtn) {
    teamNextBtn.addEventListener("click", () => {
      console.log("Next team button clicked, scrolling right.");
      teamMembersContainer.scrollBy({ left: 250, behavior: 'smooth' });
    });
    teamPrevBtn.addEventListener("click", () => {
      console.log("Prev team button clicked, scrolling left.");
      teamMembersContainer.scrollBy({ left: -250, behavior: 'smooth' });
    });
  }

    // Using unique IDs "nextTestimonial" and "prevTestimonial" for testimonial section navigation
  // Select the container and buttons. Note the selector now uses '.testimonials'
  // Using unique IDs "nextTestimonial" and "prevTestimonial" for testimonial section navigation
  const TestimonialsContainer = document.querySelector('.Testimonials');
  const nextTestimonial = document.getElementById('nextTestimonial');
  const prevTestimonial = document.getElementById('prevTestimonial');

  // Check if elements are found - if not, log an error for debugging
  if (!TestimonialsContainer)
    console.error("Testimonials container (.Testimonials) not found.");
  if (!nextTestimonial)
    console.error("Next testimonial button (#nextTestimonial) not found.");
  if (!prevTestimonial)
    console.error("Previous testimonial button (#prevTestimonial) not found.");

  if (TestimonialsContainer && nextTestimonial && prevTestimonial) {
    nextTestimonial.addEventListener("click", () => {
      console.log("Next testimonial button clicked, scrolling right.");
      TestimonialsContainer.scrollBy({ left: 250, behavior: 'smooth' });
    });
    prevTestimonial.addEventListener("click", () => {
      console.log("Prev testimonial button clicked, scrolling left.");
      TestimonialsContainer.scrollBy({ left: -250, behavior: 'smooth' });
    });
  }





// CONTACT FORM LOGIC
// This code will run when the DOM is fully loaded
// It will set the product name in the contact form if it's passed in the URL

  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");
  if (product) {
    document.getElementById("product").value = product;
  }

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const startTime = Date.now();
  const honeypot = document.createElement("input");
  honeypot.type = "text";
  honeypot.name = "honeypot";
  honeypot.style.display = "none";
  form.appendChild(honeypot);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // SPAM PROTECTION: Honeypot check
    if (form.honeypot.value.trim() !== "") {
    formMessage.textContent = "❌ Spam detected. Submission blocked.";
    formMessage.className = "error";
    return;
    }

    // SPAM PROTECTION: Delay check
    const elapsed = Date.now() - startTime;
    if (elapsed < 2000) {
    formMessage.textContent = "❌ Submission too fast. Are you a bot?";
    formMessage.className = "error";
    return;
    }

    formMessage.textContent = "Sending...";
    formMessage.className = "";

    // Get user's IP address
    let ipAddress = "Unavailable";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      ipAddress = data.ip;
    } catch (err) {
      console.warn("Could not fetch IP address:", err);
    }

  const formData = {
  name: form.name.value,
  email: form.email.value,
  phone: form.phone.value,
  product: form.product.value,
  message: form.message.value,
  honeypot: form.honeypot.value,
  userAgent: navigator.userAgent,
  referrer: document.referrer || "N/A",
  currentPage: window.location.href,
  browserLang: navigator.language,
  platform: navigator.platform,
  screenRes: `${screen.width}x${screen.height}`,
  timezone: new Date().getTimezoneOffset()
  };

  // Get user's IP address
    try {
    const ipRes = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipRes.json();
    formData.ip = ipData.ip;
    } catch (err) {
    console.warn("Could not fetch IP address:", err);
    formData.ip = "Unavailable";
    }

    const data = new URLSearchParams(formData);

    const formsubmitURL = "https://formsubmit.co/ajax/hellowworld296@gmail.com";
    const sheetURL = "https://script.google.com/macros/s/AKfycbymJxa-vsJsgQLV0SHlJs9el3WZsYt5040Z5C8Z2jGbYwmds9Yoxn7wTrWfQ9T9F4OpVw/exec";

    try {
      // Send to Formsubmit
      await fetch(formsubmitURL, {
        method: "POST",
        body: new URLSearchParams(formData),
      });

      // Send to Google Sheets
      await fetch(sheetURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData),
      });

      formMessage.innerText = "✅ Message sent successfully!";
      form.reset();
      setTimeout(() => {
        formMessage.innerText = "";
        window.location.href = "thank-you.html";
      }, 1500);
    } catch (err) {
      formMessage.innerText = "❌ Something went wrong. Please try again.";
      console.error(err);
    }
  });
});


