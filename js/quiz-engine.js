/* ============================================
   محرك التمارين التفاعلية - رياضيات الخامس
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

  // ---- تمارين اختيار من متعدد ----
  document.querySelectorAll('.mcq').forEach(function (box) {
    const options = box.querySelectorAll('.mcq-opt');
    const feedback = box.querySelector('.mcq-feedback');
    const correct = box.getAttribute('data-correct');

    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (box.classList.contains('answered')) return;
        box.classList.add('answered');
        const chosen = opt.getAttribute('data-val');

        options.forEach(function (o) {
          o.classList.add('disabled');
          if (o.getAttribute('data-val') === correct) o.classList.add('correct');
        });

        if (chosen === correct) {
          opt.classList.add('correct');
          feedback.className = 'mcq-feedback show good';
          feedback.textContent = '✅ إجابة صحيحة! أحسنت.';
        } else {
          opt.classList.add('wrong');
          feedback.className = 'mcq-feedback show bad';
          feedback.textContent = '❌ ليست صحيحة — الإجابة الصحيحة موضحة باللون الأخضر.';
        }
        updateProgress();
      });
    });
  });

  // ---- تمارين إدخال رقم ----
  document.querySelectorAll('.numeric-check').forEach(function (box) {
    const input = box.querySelector('input');
    const btn = box.querySelector('.check-btn');
    const feedback = box.querySelector('.mcq-feedback');
    const answers = (box.getAttribute('data-answer') || '').split('|').map(s => s.trim());

    function check() {
      if (box.classList.contains('answered')) return;
      const val = (input.value || '').trim();
      if (val === '') return;
      box.classList.add('answered');
      input.disabled = true;
      btn.disabled = true;

      if (answers.includes(val)) {
        feedback.className = 'mcq-feedback show good';
        feedback.textContent = '✅ إجابة صحيحة! أحسنت.';
        input.classList.add('correct');
      } else {
        feedback.className = 'mcq-feedback show bad';
        feedback.textContent = '❌ غير صحيحة. الإجابة الصحيحة: ' + answers[0];
        input.classList.add('wrong');
      }
      updateProgress();
    }
    btn.addEventListener('click', check);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
  });

  // ---- إعادة المحاولة لكل التمارين في الصفحة ----
  const resetBtn = document.getElementById('resetExercises');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      document.querySelectorAll('.mcq, .numeric-check').forEach(function (box) {
        box.classList.remove('answered');
        box.querySelectorAll('.mcq-opt').forEach(o => o.classList.remove('correct', 'wrong', 'disabled'));
        const fb = box.querySelector('.mcq-feedback');
        if (fb) { fb.className = 'mcq-feedback'; fb.textContent = ''; }
        const input = box.querySelector('input');
        if (input) { input.disabled = false; input.value = ''; input.classList.remove('correct', 'wrong'); }
        const btn = box.querySelector('.check-btn');
        if (btn) btn.disabled = false;
      });
      updateProgress();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- شريط التقدم ----
  function updateProgress() {
    const bar = document.getElementById('lessonProgress');
    const label = document.getElementById('lessonProgressLabel');
    if (!bar) return;
    const total = document.querySelectorAll('.mcq, .numeric-check').length;
    const done = document.querySelectorAll('.mcq.answered, .numeric-check.answered').length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    bar.style.width = pct + '%';
    if (label) label.textContent = done + ' من ' + total + ' مكتمل';
  }
  updateProgress();

  // القائمة المتنقلة (نفس السلوك في كل الصفحات)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () { navLinks.classList.toggle('open'); });
  }
});
