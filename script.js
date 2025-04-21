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


// Giải pháp mới hoàn toàn cho portfolio section - không sử dụng MixItUp
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các phần tử portfolio
    const portfolioItems = document.querySelectorAll('.port-box');
    const filterButtons = document.querySelectorAll('.fillter-buttons .btn');

    // Hàm để lọc các mục portfolio
    function filterPortfolio(filter) {
        // Hiển thị hoặc ẩn các mục dựa trên bộ lọc
        portfolioItems.forEach(item => {
            // Ẩn tất cả trước
            item.style.display = 'none';

            // Nếu là 'all' hoặc item có class phù hợp với bộ lọc
            if (filter === 'all' || item.classList.contains(filter.replace('.', ''))) {
                // Hiển thị mục này
                item.style.display = 'block';

                // Thêm hiệu ứng fade in
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';

                // Sử dụng setTimeout để tạo hiệu ứng fade in
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    }

    // Thêm sự kiện click cho các nút filter
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Xóa class active từ tất cả các nút
            filterButtons.forEach(btn => {
                btn.classList.remove('mixitup-control-active');
            });

            // Thêm class active vào nút được click
            this.classList.add('mixitup-control-active');

            // Lấy giá trị filter và áp dụng
            const filterValue = this.getAttribute('data-filter');
            filterPortfolio(filterValue);
        });
    });

    // Khởi tạo với filter 'all' mặc định
    filterPortfolio('all');

    // Thêm transition cho các mục portfolio
    portfolioItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});

// Navigation menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navlist.classList.toggle('active');

    // Update aria-expanded attribute
    const isExpanded = navlist.classList.contains('active');
    menuIcon.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
});

// Xử lý sự kiện click cho các liên kết trong thanh điều hướng
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Ẩn menu trên mobile
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');

        // Xử lý đặc biệt cho các liên kết đến các section
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#') && targetId !== '#' && document.querySelector(targetId)) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định

            // Xóa class active từ tất cả các liên kết
            menuLi.forEach(item => item.classList.remove('active'));

            // Thêm class active vào liên kết được click
            link.classList.add('active');

            // Cuộn đến section tương ứng
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Trừ đi chiều cao của header
                behavior: 'smooth'
            });
        }
    });
});

// active menu - cải tiến để xử lý chính xác các section
let menuLi = document.querySelectorAll('header ul li a');
let sections = document.querySelectorAll('section[id]'); // Chỉ lấy các section có id

function activeMenu() {
    // Lấy vị trí cuộn hiện tại
    let scrollY = window.scrollY;

    // Tìm section hiện tại dựa trên vị trí cuộn
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Trừ đi một khoảng để tạo vùng đệm
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // Kiểm tra xem người dùng đã cuộn đến section này chưa
        if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // Xóa active từ tất cả các menu item
            menuLi.forEach(item => item.classList.remove('active'));

            // Thêm active vào menu item tương ứng với section hiện tại
            document.querySelector('header ul li a[href*=' + sectionId + ']').classList.add('active');
        }
    });
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// Close menu when Escape key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navlist.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    }
});

// sticky navbar //////////

const header = document.querySelector('header');
window.addEventListener("scroll", function(){

        header.classList.toggle("sticky", window.scrollY > 50);

})