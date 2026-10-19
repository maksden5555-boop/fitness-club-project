document.addEventListener('DOMContentLoaded', () => {
    const allModals = document.querySelectorAll('.modal');
    const startModal = document.getElementById('modal');
    const trialModal = document.getElementById('modal-trial');

    function closeAllModals() {
        allModals.forEach(m => (m.style.display = 'none'));
        document.querySelectorAll('form').forEach(f => f.reset());
        document.querySelectorAll('.result-message').forEach(r => (r.textContent = ''));
    }

    document.querySelectorAll('.close-btn').forEach(b => b.addEventListener('click', closeAllModals));
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) closeAllModals();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

    document.querySelectorAll('.open-start').forEach(b =>
        b.addEventListener('click', () => (startModal.style.display = 'flex')));
    document.querySelectorAll('.open-trial').forEach(b =>
        b.addEventListener('click', () => (trialModal.style.display = 'flex')));

    function setupLeadForm({ formId, nameId, phoneId, resultId, source, okText }) {
        const form = document.getElementById(formId);
        const result = document.getElementById(resultId);
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById(nameId).value;
            const phone = document.getElementById(phoneId).value;
            try {
                const r = await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, source })
                });
                result.textContent = r.ok ? `${okText}, ${name}!` : 'Ошибка, попробуйте ещё раз';
                if (r.ok) form.reset();
            } catch {
                result.textContent = 'Нет связи с сервером';
            }
        });
    }

    setupLeadForm({ formId: 'modalForm', nameId: 'modalName', phoneId: 'modalPhone',
        resultId: 'modalResult', source: 'start', okText: 'Спасибо! Мы вам позвоним' });
    setupLeadForm({ formId: 'trialForm', nameId: 'trialName', phoneId: 'trialPhone',
        resultId: 'trialResult', source: 'trial', okText: 'Заявка принята' });
});