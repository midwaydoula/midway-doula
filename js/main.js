document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var payload = {
        name: form.name.value,
        email: form.email.value,
        dueDate: form['due-date'].value,
        interest: form.interest.value,
        message: form.message.value
      };

      btn.disabled = true;
      btn.textContent = 'Sending...';
      if (status) { status.textContent = ''; status.className = 'form-status'; }

      fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) { throw new Error('Request failed'); }
          form.reset();
          if (status) {
            status.textContent = 'Thanks! Your message is on its way — I’ll be in touch soon.';
            status.className = 'form-status success';
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = 'Something went wrong sending that. Please email hello@midwaydoula.com directly.';
            status.className = 'form-status error';
          }
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = 'Send Message';
        });
    });
  }
});
