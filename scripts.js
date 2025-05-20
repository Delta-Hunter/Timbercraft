document.addEventListener("DOMContentLoaded", () => {
  // === NAVIGATION LOGIC ===
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) link.classList.add("active");
  });

  // === FILTERING LOGIC ===
  const categoryFilter = document.getElementById("categoryFilter");
  const priceRange = document.getElementById("priceRange");
  const priceValue = document.getElementById("priceValue");
  const productCards = document.querySelectorAll(".product-card");

  function filterProducts() {
    const selectedCategory = categoryFilter?.value;
    const maxPrice = parseInt(priceRange?.value);
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

  // === MODAL LOGIC ===
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
    modalImg.src = card.querySelector("img").src;
    modalTitle.innerText = card.querySelector("h3").innerText;
    modalDesc.innerText = card.querySelector("p").innerText;
    modalPrice.innerText = card.querySelector(".price").innerText;
    modalEnquireBtn.href = `contact.html?product=${encodeURIComponent(modalTitle.innerText)}`;
    currentIndex = index;
    modal.style.display = "block";
  }

  if (modal && modalImg && modalTitle) {
    productCardList.forEach((card, index) => {
      const image = card.querySelector("img");
      if (image) {
        image.style.cursor = "pointer";
        image.addEventListener("click", () => openModal(index));
      }
    });

    if (closeModal) closeModal.onclick = () => (modal.style.display = "none");
    window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
    if (nextBtn && prevBtn) {
      nextBtn.onclick = () => openModal((currentIndex + 1) % productCardList.length);
      prevBtn.onclick = () => openModal((currentIndex - 1 + productCardList.length) % productCardList.length);
    }
  }

  // === TEAM SCROLL LOGIC ===
  const teamMembersContainer = document.querySelector('.team-members');
  const teamNextBtn = document.getElementById('nextTeam');
  const teamPrevBtn = document.getElementById('prevTeam');

  if (teamMembersContainer && teamNextBtn && teamPrevBtn) {
    teamNextBtn.addEventListener("click", () => teamMembersContainer.scrollBy({ left: 250, behavior: 'smooth' }));
    teamPrevBtn.addEventListener("click", () => teamMembersContainer.scrollBy({ left: -250, behavior: 'smooth' }));
  }

  // === TESTIMONIALS SCROLL ===
  const testimonialsContainer = document.querySelector('.Testimonials');
  const nextTestimonial = document.getElementById('nextTestimonial');
  const prevTestimonial = document.getElementById('prevTestimonial');

  if (testimonialsContainer && nextTestimonial && prevTestimonial) {
    nextTestimonial.addEventListener("click", () => testimonialsContainer.scrollBy({ left: 250, behavior: 'smooth' }));
    prevTestimonial.addEventListener("click", () => testimonialsContainer.scrollBy({ left: -250, behavior: 'smooth' }));
  }

  // === CONTACT FORM LOGIC ===
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const startTime = Date.now();

  if (form) {
    // Set product from URL if present
    const productParam = new URLSearchParams(window.location.search).get("product");
    if (productParam) form.querySelector("#product").value = productParam;

    // Add honeypot field for spam protection
    const honeypot = document.createElement("input");
    honeypot.type = "text";
    honeypot.name = "honeypot";
    honeypot.style.display = "none";
    form.appendChild(honeypot);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Honeypot check
      if (form.querySelector('[name="honeypot"]').value.trim() !== "") {
        formMessage.textContent = "❌ Spam detected. Submission blocked.";
        formMessage.className = "error";
        return;
      }

      // Delay check
      if (Date.now() - startTime < 2000) {
        formMessage.textContent = "❌ Submission too fast. Are you a bot?";
        formMessage.className = "error";
        return;
      }

      formMessage.textContent = "Sending...";
      formMessage.className = "";

      let ip = "Unavailable";
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        ip = data.ip;
      } catch (err) {
        console.warn("Could not fetch IP:", err);
        formData.ip = "Unavailable";
      }

      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        product: form.product.value,
        message: form.message.value,
        userAgent: navigator.userAgent,
        referrer: document.referrer || "N/A",
        currentPage: window.location.href,
        browserLang: navigator.language,
        platform: navigator.platform,
        screenRes: `${screen.width}x${screen.height}`,
        timezone: new Date().getTimezoneOffset(),
        ip: ip
      };

      const encodedData = new URLSearchParams(formData);

      const formsubmitURL = "https://formsubmit.co/ajax/hellowworld296@gmail.com";
      const sheetURL = "https://script.google.com/macros/s/AKfycbymJxa-vsJsgQLV0SHlJs9el3WZsYt5040Z5C8Z2jGbYwmds9Yoxn7wTrWfQ9T9F4OpVw/exec";

      try {
        await fetch(formsubmitURL, { method: "POST", body: encodedData });
        await fetch(sheetURL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodedData
        });

        formMessage.textContent = "✅ Message sent successfully!";
        formMessage.className = "success";
        form.reset();
        setTimeout(() => window.location.href = "thank-you.html", 1500);
      } catch (err) {
        console.error(err);
        formMessage.textContent = "❌ Something went wrong. Please try again.";
        formMessage.className = "error";
      }
    });
  }
});
