// public/js/hideMessage.js

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const message = document.getElementById('message');
      if (message) {
        message.remove();
      }
    }, 1000);
  });
  