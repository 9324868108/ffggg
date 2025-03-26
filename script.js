document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block"

      // Toggle hamburger to X
      const spans = menuToggle.querySelectorAll("span")
      if (mobileMenu.style.display === "block") {
        spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Support widget toggle
  const supportButton = document.querySelector(".support-button")
  const supportPanel = document.querySelector(".support-panel")
  const closeSupport = document.querySelector(".close-support")

  if (supportButton && supportPanel && closeSupport) {
    supportButton.addEventListener("click", () => {
      supportPanel.classList.toggle("active")
    })

    closeSupport.addEventListener("click", () => {
      supportPanel.classList.remove("active")
    })
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll(".reveal-element")

  function checkReveal() {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < windowHeight - revealPoint) {
        // Add delay if specified
        const delay = element.getAttribute("data-delay")
        if (delay) {
          setTimeout(() => {
            element.classList.add("active")
          }, Number.parseInt(delay))
        } else {
          element.classList.add("active")
        }
      }
    })
  }

  // Check on load
  checkReveal()

  // Check on scroll
  window.addEventListener("scroll", checkReveal)

  // Business Value Calculator
  const calculateBtn = document.getElementById("calculate-btn")

  if (calculateBtn) {
    calculateBtn.addEventListener("click", () => {
      // Get input values
      const monthlyRevenue = Number.parseFloat(document.getElementById("monthly-revenue").value) || 0
      const productCount = Number.parseInt(document.getElementById("product-count").value) || 0
      const profitMargin = Number.parseFloat(document.getElementById("profit-margin").value) || 0
      const inventoryTurnover = Number.parseFloat(document.getElementById("inventory-turnover").value) || 0
      const stockoutRate = Number.parseFloat(document.getElementById("stockout-rate").value) || 0

      // Calculate potential improvements
      // These are example calculations - adjust as needed
      const revenueIncrease = monthlyRevenue * 0.15 // 15% increase
      const profitIncrease = revenueIncrease * (profitMargin / 100)
      const inventoryImprovement = 25 // 25% improvement
      const stockoutReduction = stockoutRate * 0.8 // 80% reduction
      const annualValue = revenueIncrease * 12 + profitIncrease * 12 + monthlyRevenue * 0.05 * 12 // Additional 5% efficiency savings

      // Update results
      document.getElementById("revenue-increase").textContent =
        "$" + revenueIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })
      document.getElementById("profit-increase").textContent =
        "$" + profitIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })
      document.getElementById("inventory-improvement").textContent = inventoryImprovement + "%"
      document.getElementById("stockout-reduction").textContent =
        stockoutReduction.toLocaleString(undefined, { maximumFractionDigits: 1 }) + "%"
      document.getElementById("annual-value").textContent =
        "$" + annualValue.toLocaleString(undefined, { maximumFractionDigits: 0 })

      // Add animation to results
      const resultValues = document.querySelectorAll(".result-value")
      resultValues.forEach((value) => {
        value.style.animation = "none"
        setTimeout(() => {
          value.style.animation = "fadeIn 0.5s ease-out"
        }, 10)
      })
    })
  }

  // 3D tilt effect for cards
  const cards = document.querySelectorAll(".feature-card, .pricing-card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left // x position within the element
      const y = e.clientY - rect.top // y position within the element

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const deltaX = ((x - centerX) / centerX) * 10 // max 10 degrees
      const deltaY = ((y - centerY) / centerY) * 10 // max 10 degrees

      this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateZ(10px)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
    })
  })
})

