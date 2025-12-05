// assets/js/auth.js
const AUTH = {
  CORRECT_PIN: "200211",        // ← hier änderst du deine PIN

  init() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
      this.setupLoginPage();
    } else {
      this.protectAppPages();
    }
  },

  setupLoginPage() {
    const digits = document.querySelectorAll('.pin-digit');
    const errorMsg = document.getElementById('error-msg');

    digits.forEach((input, i) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
        if (input.value && i < 5) digits[i + 1].focus();
        if ([...digits].every(d => d.value)) this.checkPin();
      });
      input.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !input.value && i > 0) digits[i - 1].focus();
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.checkPin();
    });

    document.getElementById('login-btn')?.addEventListener('click', () => this.checkPin());

    this.checkPin = () => {
      const entered = Array.from(digits).map(d => d.value).join('');
      if (entered.length !== 6) return;

      if (entered === this.CORRECT_PIN) {
        sessionStorage.setItem('unlocked', 'true');
        window.location.href = 'app.html';
      } else {
        errorMsg.textContent = 'Falsche PIN';
        digits.forEach(d => d.value = '');
        digits[0].focus();
      }
    };
  },

  protectAppPages() {
    if (!sessionStorage.getItem('unlocked')) {
      window.location.href = 'index.html';
    }
  }
};

// Start
AUTH.init();