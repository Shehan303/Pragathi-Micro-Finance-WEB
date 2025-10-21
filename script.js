
    // User data array for login validation with unique URLs
    const userData = [
        { 
            username: "pragathi_user", 
            email: "user@pragathi.com", 
            password: "password123",
            appUrl: "https://www.appsheet.com/start/a7e29189-e578-494e-82e6-97199713f405"
        },
        { 
            username: "microfinance", 
            email: "admin@pragathi.com", 
            password: "admin2023",
            appUrl: "https://www.appsheet.com/start/admin-dashboard"
        },
        { 
            username: "sureni", 
            email: "mksureni@gmail.com", 
            password: "sureni123",
            appUrl: "https://www.appsheet.com/start/sureni-portal"
        },
        
    ];

    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const openAppBtn = document.getElementById('open-app-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');
    const loanAmount = document.getElementById('loan-amount');
    const loanTerm = document.getElementById('loan-term');
    const interestRate = document.getElementById('interest-rate');
    const loanAmountValue = document.getElementById('loan-amount-value');
    const loanTermValue = document.getElementById('loan-term-value');
    const interestRateValue = document.getElementById('interest-rate-value');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalInterest = document.getElementById('total-interest');
    const totalPayment = document.getElementById('total-payment');
    const scheduleBody = document.getElementById('schedule-body');

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }

    // Modal Functions
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModalFunc(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Open login modal
    if (openAppBtn && loginModal) {
        openAppBtn.addEventListener('click', () => openModal(loginModal));
    }

    // Close login modal
    if (closeModal && loginModal) {
        closeModal.addEventListener('click', () => closeModalFunc(loginModal));
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeModalFunc(loginModal);
        }
    });

    // Login Form Validation with Unique URL Routing
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('login-username').value;
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            let isValid = false;
            let userUrl = "";
            
            // Check if user exists in the array and get their unique URL
            for (let user of userData) {
                if (user.username === username && user.email === email && user.password === password) {
                    isValid = true;
                    userUrl = user.appUrl;
                    break;
                }
            }
            
            if (isValid) {
                // Show success message
                const usernameError = document.getElementById('username-error');
                const emailError = document.getElementById('email-error');
                const passwordError = document.getElementById('password-error');
                
                if (usernameError) usernameError.style.display = 'none';
                if (emailError) emailError.style.display = 'none';
                if (passwordError) passwordError.style.display = 'none';
                
                // Create success message element
                const successMessage = document.createElement('div');
                successMessage.style.cssText = `
                    background-color: #4CAF50;
                    color: white;
                    padding: 12px;
                    border-radius: 5px;
                    margin-bottom: 15px;
                    text-align: center;
                    font-weight: 500;
                `;
                successMessage.textContent = 'Login successful! Redirecting to your app...';
                
                // Insert success message
                const form = document.getElementById('login-form');
                const existingSuccess = form.querySelector('div[style*="background-color: #4CAF50"]');
                if (existingSuccess) {
                    existingSuccess.remove();
                }
                form.insertBefore(successMessage, form.firstChild);
                
                // Redirect to user's unique AppSheet URL after 1.5 seconds
                setTimeout(() => {
                    window.location.href = userUrl;
                }, 1500);
                
            } else {
                // Show error messages
                const usernameError = document.getElementById('username-error');
                const emailError = document.getElementById('email-error');
                const passwordError = document.getElementById('password-error');
                
                if (usernameError) usernameError.style.display = 'block';
                if (emailError) emailError.style.display = 'block';
                if (passwordError) passwordError.style.display = 'block';
            }
        });

        // Clear error messages when user starts typing
        document.querySelectorAll('#login-form input').forEach(input => {
            input.addEventListener('input', () => {
                const usernameError = document.getElementById('username-error');
                const emailError = document.getElementById('email-error');
                const passwordError = document.getElementById('password-error');
                
                if (usernameError) usernameError.style.display = 'none';
                if (emailError) emailError.style.display = 'none';
                if (passwordError) passwordError.style.display = 'none';
                
                // Remove success message if exists
                const successMessage = document.querySelector('#login-form div[style*="background-color: #4CAF50"]');
                if (successMessage) {
                    successMessage.remove();
                }
            });
        });
    }

    // Loan Calculator Functions
    function formatCurrency(amount) {
        return 'Rs. ' + amount.toLocaleString('en-IN');
    }

    function calculateLoan() {
        if (!loanAmount || !loanTerm || !interestRate) return;
        
        const principal = parseFloat(loanAmount.value);
        const months = parseFloat(loanTerm.value);
        const rate = parseFloat(interestRate.value) / 100;
        
        // Monthly interest rate
        const monthlyRate = rate / 12;
        
        // Calculate monthly payment using the formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const monthlyPaymentAmount = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        
        const totalPaymentAmount = monthlyPaymentAmount * months;
        const totalInterestAmount = totalPaymentAmount - principal;
        
        // Update display values
        if (monthlyPayment) monthlyPayment.textContent = formatCurrency(Math.round(monthlyPaymentAmount));
        if (totalInterest) totalInterest.textContent = formatCurrency(Math.round(totalInterestAmount));
        if (totalPayment) totalPayment.textContent = formatCurrency(Math.round(totalPaymentAmount));
        
        // Generate repayment schedule
        generateSchedule(principal, months, monthlyRate, monthlyPaymentAmount);
    }

    function generateSchedule(principal, months, monthlyRate, monthlyPayment) {
        if (!scheduleBody) return;
        
        let balance = principal;
        let scheduleHTML = '';
        
        for (let i = 1; i <= months; i++) {
            const interest = balance * monthlyRate;
            const principalPaid = monthlyPayment - interest;
            balance -= principalPaid;
            
            // Ensure balance doesn't go negative
            if (balance < 0) {
                balance = 0;
            }
            
            scheduleHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${formatCurrency(Math.round(monthlyPayment))}</td>
                    <td>${formatCurrency(Math.round(principalPaid))}</td>
                    <td>${formatCurrency(Math.round(interest))}</td>
                    <td>${formatCurrency(Math.round(balance))}</td>
                </tr>
            `;
        }
        
        scheduleBody.innerHTML = scheduleHTML;
    }

    // Update range values display
    if (loanAmount && loanAmountValue) {
        loanAmount.addEventListener('input', () => {
            loanAmountValue.textContent = parseInt(loanAmount.value).toLocaleString('en-IN');
            calculateLoan();
        });
    }

    if (loanTerm && loanTermValue) {
        loanTerm.addEventListener('input', () => {
            loanTermValue.textContent = loanTerm.value;
            calculateLoan();
        });
    }

    if (interestRate && interestRateValue) {
        interestRate.addEventListener('input', () => {
            interestRateValue.textContent = interestRate.value;
            calculateLoan();
        });
    }

    // Initialize calculator
    calculateLoan();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.querySelector('input').value = '';
        });
    }

    // Add theme toggle container to bottom right
    const themeToggleContainer = document.createElement('div');
    themeToggleContainer.className = 'theme-toggle-container';
    themeToggleContainer.innerHTML = `
        <button class="theme-toggle" id="floating-theme-toggle">
            <i class="fas fa-moon"></i>
        </button>
    `;
    document.body.appendChild(themeToggleContainer);

    // Move theme toggle functionality to floating button
    const floatingThemeToggle = document.getElementById('floating-theme-toggle');
    if (floatingThemeToggle) {
        floatingThemeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = floatingThemeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Remove original theme toggle from header
    if (themeToggle) {
        themeToggle.style.display = 'none';
    }
