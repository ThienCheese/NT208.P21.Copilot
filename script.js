let words = document.querySelectorAll('.word');
words.forEach(word => {
    let letters = word.textContent.split('');
    word.textContent = '';
    letters.forEach(letter => {
        let span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter';
        word.appendChild(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

words[currentWordIndex].style.opacity = '1';

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
    Array.from(currentWord.children).forEach((letter, index) => {
        setTimeout(() => {
            letter.className = 'letter out';
        }, index * 80);
    });
    nextWord.style.opacity = '1';
    Array.from(nextWord.children).forEach((letter, index) => {
        letter.className = 'letter behind';
        setTimeout(() => {
            letter.className = 'letter in';
        }, 340 + (index * 80));
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
}
changeText();
setInterval(changeText, 3000);

// Modal functionality
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.querySelector('.nav-btn.login');
const signupBtn = document.querySelector('.nav-btn.signup');
const closeBtns = document.querySelectorAll('.close');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');

// Show login modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
});

// Show signup modal
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'block';
});

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

// Switch between modals
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === signupModal) {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    }
});

// Handle form submissions
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Here you would typically send this to your backend
    console.log('Login attempt:', { email, password });

    // For demo purposes, just show an alert
    alert('Login functionality would be implemented here');
    loginModal.style.display = 'none';
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Here you would typically send this to your backend
    console.log('Signup attempt:', { name, email, password });

    // For demo purposes, just show an alert
    alert('Signup functionality would be implemented here');
    signupModal.style.display = 'none';
});


//mix it up portfolio section
var mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.mix'
    },
    animation: {
        duration: 500,
        effects: 'fade translateZ(-100px)',
        easing: 'ease'
    }
});