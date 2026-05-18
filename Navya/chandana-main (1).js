/* ============================================================
   CHANDANA GROUPS — Shared JavaScript
   Used by: chandana_final2.html, about-us.html, contact.html
   ============================================================ */

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── OUR COMPANIES DROPDOWN SCROLL FIX ── */
document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  if (toggle && toggle.getAttribute('href') === '#companies') {
    toggle.addEventListener('click', function(e) {
      const target = document.querySelector('#companies');
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelector('.navbar-collapse').classList.remove('show');
      }
    });
  }
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
(function () {
  const links = document.querySelectorAll('.navbar-nav .nav-link[data-target]');
  if (!links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(
          `.navbar-nav .nav-link[data-target="#${entry.target.id}"]`
        );
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  links.forEach(link => {
    const id = link.getAttribute('data-target');
    const section = id ? document.querySelector(id) : null;
    if (section) observer.observe(section);
  });
})();

/* ── CHATBOT ── */
function toggleChat() {
  const win       = document.getElementById('cg-chat-window');
  const icon      = document.getElementById('cg-chat-icon');
  const closeIcon = document.getElementById('cg-chat-close');
  const badge     = document.getElementById('cg-chat-badge');
  if (!win) return;
  const isOpen = win.style.display === 'flex';
  win.style.display       = isOpen ? 'none' : 'flex';
  icon.style.display      = isOpen ? ''     : 'none';
  closeIcon.style.display = isOpen ? 'none' : '';
  if (!isOpen && badge) badge.style.display = 'none';
}

const botReplies = {
  'our services':         'We offer IT solutions, HR recruitment, career development programs, and educational initiatives. Would you like to know more about any specific service?',
  'career opportunities': '🎯 We have exciting openings across multiple domains! Please visit our <strong>Careers</strong> section or send your resume to careers@chandanagroups.com.',
  'contact support':      '📞 You can reach us at <strong>+91 98765 43210</strong> or email <strong>info@chandanagroups.com</strong>. We\'re available Mon–Sat, 9AM–6PM.',
  'our companies':        '🏢 Our group includes:<br>• Chandana IT Solutions<br>• JobNest HR Solutions<br>• Chandana Tech Careers<br>• Sri Sharada Nikethana',
  'default':              'Thanks for your message! Our team will get back to you shortly. You can also call us at <strong>+91 98765 43210</strong>. 😊'
};

function addMessage(text, sender) {
  const msgs = document.getElementById('cg-chat-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'cg-msg ' + sender;
  div.innerHTML = '<div class="cg-bubble">' + text + '</div>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function quickReply(text) {
  const qr = document.querySelector('.cg-quick-replies');
  if (qr) qr.remove();
  addMessage(text, 'user');
  setTimeout(() => {
    const key = text.toLowerCase();
    addMessage(botReplies[key] || botReplies['default'], 'bot');
  }, 600);
}

function sendMessage() {
  const input = document.getElementById('cg-chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  const qr = document.querySelector('.cg-quick-replies');
  if (qr) qr.remove();
  addMessage(text, 'user');
  input.value = '';
  setTimeout(() => {
    const key = Object.keys(botReplies).find(k => text.toLowerCase().includes(k));
    addMessage(botReplies[key] || botReplies['default'], 'bot');
  }, 700);
}
