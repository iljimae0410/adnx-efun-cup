const matches = [
  { id: '01', group: 'A', label: 'BẢNG A', home: 'Đội A1', away: 'Đội A2', homeBadge: 'A1', awayBadge: 'A2', homeColor: 'green', awayColor: 'orange' },
  { id: '02', group: 'B', label: 'BẢNG B', home: 'Đội B1', away: 'Đội B2', homeBadge: 'B1', awayBadge: 'B2', homeColor: 'blue', awayColor: 'gold' },
  { id: '03', group: 'A', label: 'BẢNG A', home: 'Đội A1', away: 'Đội A3', homeBadge: 'A1', awayBadge: 'A3', homeColor: 'green', awayColor: 'dark' },
  { id: '04', group: 'B', label: 'BẢNG B', home: 'Đội B1', away: 'Đội B3', homeBadge: 'B1', awayBadge: 'B3', homeColor: 'blue', awayColor: 'red' },
  { id: '05', group: 'A', label: 'BẢNG A', home: 'Đội A2', away: 'Đội A3', homeBadge: 'A2', awayBadge: 'A3', homeColor: 'orange', awayColor: 'dark' },
  { id: '06', group: 'B', label: 'BẢNG B', home: 'Đội B2', away: 'Đội B3', homeBadge: 'B2', awayBadge: 'B3', homeColor: 'gold', awayColor: 'red' },
  { id: '07', group: 'final', label: 'TRANH HẠNG BA', home: 'Nhì bảng A', away: 'Nhì bảng B', homeBadge: 'A', awayBadge: 'B', homeColor: 'green', awayColor: 'blue' },
  { id: '08', group: 'final', label: 'CHUNG KẾT', home: 'Nhất bảng A', away: 'Nhất bảng B', homeBadge: 'A', awayBadge: 'B', homeColor: 'green', awayColor: 'blue' },
];

// Use the same team names in cards, fixtures and roster dialogs.
for (const match of matches) {
  if (match.group === 'final') continue;
  const home = rosterTeams.find(team => team.id === match.homeBadge);
  const away = rosterTeams.find(team => team.id === match.awayBadge);
  match.home = home.name;
  match.away = away.name;
  match.homeColor = home.color;
  match.awayColor = away.color;
}

function renderMatches(filter = 'all') {
  const visible = matches.filter(match => filter === 'all' || match.group === filter);
  document.querySelector('#match-list').innerHTML = visible.map(match => `
    <article class="match ${match.group === 'final' ? 'match-final' : ''}" aria-label="Trận ${match.id}: ${match.home} gặp ${match.away}">
      <div class="match-round"><span class="match-number">${match.id}</span><span class="match-round-label">${match.label}</span></div>
      <div class="match-pair"><div class="match-team"><span>${match.home}</span><span class="crest mini-crest crest-${match.homeColor}" aria-hidden="true">${match.homeBadge}</span></div><span class="vs">VS</span><div class="match-team"><span class="crest mini-crest crest-${match.awayColor}" aria-hidden="true">${match.awayBadge}</span><span>${match.away}</span></div></div>
      <div class="match-info">Giờ: Chờ công bố<small>Ngày & sân: Chờ cập nhật</small></div>
    </article>`).join('');
  document.querySelector('#match-count').textContent = `${String(visible.length).padStart(2, '0')} TRẬN ĐẤU`;
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    renderMatches(button.dataset.filter);
  });
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Mở menu');
}
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
renderMatches();

const rosterModal = document.querySelector('#roster-modal');
let rosterTrigger;
const escapeText = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

document.querySelectorAll('.group .team').forEach((card, index) => {
  const team = rosterTeams[index];
  card.querySelector('h4').textContent = team.name;
  card.querySelector('p').textContent = `${team.players.length} cầu thủ · ${team.kitColor}`;
  card.querySelector('.crest').className = `crest crest-${team.color}`;
  const button = document.createElement('button');
  button.className = 'roster-button';
  button.textContent = 'Xem danh sách ↗';
  button.setAttribute('aria-label', `Xem danh sách ${team.name}`);
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'roster-modal');
  card.querySelector('.team-index').replaceWith(button);
  button.addEventListener('click', () => {
    rosterTrigger = button;
    document.querySelector('#roster-title').textContent = team.name;
    document.querySelector('#roster-summary').textContent = `${team.players.length} cầu thủ · Áo ${team.kitColor.toLowerCase()} · Bảng ${team.id[0]} (tạm thời)`;
    document.querySelector('#roster-players').innerHTML = team.players.map(([name, position, tier], playerIndex) =>
      `<tr><td>${String(playerIndex + 1).padStart(2, '0')}</td><th scope="row">${escapeText(name)}</th><td>${escapeText(position)}</td><td><span class="roster-tier">${escapeText(tier || '—')}</span></td></tr>`
    ).join('');
    rosterModal.showModal();
    document.body.classList.add('modal-open');
    rosterModal.querySelector('.roster-scroll').scrollTop = 0;
  });
});

rosterModal.querySelectorAll('.roster-close, .roster-done').forEach(button => {
  button.addEventListener('click', () => rosterModal.close());
});
// Only dismiss a backdrop click; padding and scrollbar clicks stay inside.
rosterModal.addEventListener('click', event => {
  const bounds = rosterModal.getBoundingClientRect();
  if (event.target === rosterModal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) rosterModal.close();
});
rosterModal.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  rosterTrigger?.focus({ preventScroll: true });
});
const rulesModal = document.querySelector('#rules-modal');
const rulesTrigger = document.querySelector('.rules-open');
rulesTrigger.addEventListener('click', () => {
  rulesModal.showModal();
  document.body.classList.add('modal-open');
  rulesModal.querySelector('.rules-content').scrollTop = 0;
});
rulesModal.querySelectorAll('.roster-close, .roster-done').forEach(button => {
  button.addEventListener('click', () => rulesModal.close());
});
rulesModal.addEventListener('click', event => {
  const bounds = rulesModal.getBoundingClientRect();
  if (event.target === rulesModal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) rulesModal.close();
});
rulesModal.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  rulesTrigger.focus({ preventScroll: true });
});
