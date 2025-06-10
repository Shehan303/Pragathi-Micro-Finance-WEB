document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logoImg = document.getElementById('logo-img');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // Login Modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    
    function openLoginModal() {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLoginModal() {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    loginBtn.addEventListener('click', openLoginModal);
    mobileLoginBtn.addEventListener('click', openLoginModal);
    closeModal.addEventListener('click', closeLoginModal);
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });
    
    // Loan Calculator
    const loanAmount = document.getElementById('loan-amount');
    const loanTerm = document.getElementById('loan-term');
    const interestRate = document.getElementById('interest-rate');
    const loanAmountValue = document.getElementById('loan-amount-value');
    const loanTermValue = document.getElementById('loan-term-value');
    const interestRateValue = document.getElementById('interest-rate-value');
    const calculateBtn = document.getElementById('calculate-btn');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalInterest = document.getElementById('total-interest');
    const totalPayment = document.getElementById('total-payment');
    const repaymentSchedule = document.getElementById('repayment-schedule').getElementsByTagName('tbody')[0];
    
    // Update range values
    loanAmount.addEventListener('input', function() {
        loanAmountValue.textContent = this.value;
    });
    
    loanTerm.addEventListener('input', function() {
        loanTermValue.textContent = this.value;
    });
    
    interestRate.addEventListener('input', function() {
        interestRateValue.textContent = this.value;
    });
    
    // Calculate loan
    function calculateLoan() {
        const amount = parseFloat(loanAmount.value);
        const term = parseInt(loanTerm.value);
        const rate = parseFloat(interestRate.value) / 100 / 12; // Monthly interest rate
        
        // Calculate monthly payment
        const monthly = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        const total = monthly * term;
        const totalInt = total - amount;
        
        // Display results
        monthlyPayment.textContent = '$' + monthly.toFixed(2);
        totalInterest.textContent = '$' + totalInt.toFixed(2);
        totalPayment.textContent = '$' + total.toFixed(2);
        
        // Generate repayment schedule
        generateRepaymentSchedule(amount, term, rate, monthly);
    }
    
    function generateRepaymentSchedule(amount, term, monthlyRate, monthlyPayment) {
        let balance = amount;
        let totalInterest = 0;
        
        // Clear existing rows
        repaymentSchedule.innerHTML = '';
        
        for (let i = 1; i <= term; i++) {
            const interest = balance * monthlyRate;
            const principal = monthlyPayment - interest;
            totalInterest += interest;
            balance -= principal;
            
            // Ensure balance doesn't go below 0 due to rounding
            if (balance < 0) balance = 0;
            
            const row = repaymentSchedule.insertRow();
            row.innerHTML = `
                <td>${i}</td>
                <td>$${monthlyPayment.toFixed(2)}</td>
                <td>$${principal.toFixed(2)}</td>
                <td>$${interest.toFixed(2)}</td>
                <td>$${balance.toFixed(2)}</td>
            `;
        }
    }
    
    calculateBtn.addEventListener('click', calculateLoan);
    
    // Calculate loan on page load with default values
    calculateLoan();
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        
        // In a real application, you would send this data to your server
        console.log('Form submitted:', { name, email, subject });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get email value
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this to your server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Reset form
        newsletterForm.reset();
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});