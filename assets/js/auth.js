const auth = {
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // DEINE PIN – ÄNDERE HIER, WENN DU WILLST!
  CORRECT_PIN: "200211",
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  login() {
    const input = document.getElementById('pin-input').value;

    if (input === this.CORRECT_PIN) {
      sessionStorage.setItem('unlocked', 'true');
      window.location.href = 'app.html';
    } else {
      document.getElementById('error-msg').textContent = 'Falsche PIN';
      document.getElementById('pin-input').value = '';
    }
  },

  checkIfUnlocked() {
    if (sessionStorage.getItem('unlocked') === 'true') {
      window.location.href = 'app.html';
    }
  }
};