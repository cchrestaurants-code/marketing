// ═══════════════════════════════════════════════════════════
// CONFIGURATION — replace with your deployed Apps Script URL
// ═══════════════════════════════════════════════════════════
const API_URL = 'https://script.google.com/macros/s/AKfycbwK9M4ZW_BvglI_Jnuc4d4gwRNOlrK7NxihaYwn_7ct4OgvRh2mwwfycTvmhQ5qs--J6Q/exec';
// e.g. 'https://script.google.com/macros/s/AKfycb.../exec'

// FY helpers
const FY_MONTHS = ['April','May','June','July','August','September','October','November','December','January','February','March'];
const FY_SHORT  = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const FY = 2026; // FY Apr 2026 – Mar 2027

function fyIdx(dateStr) {
  const m = new Date(dateStr).getMonth();
  return m >= 3 ? m - 3 : m + 9;
}
function fyIdxNow() { return fyIdx(new Date().toISOString()); }
function fyLabel(idx) {
  const calM = idx < 9 ? idx + 3 : idx - 9;
  const yr   = calM >= 3 ? FY : FY + 1;
  return `${FY_MONTHS[idx]} ${yr}`;
}

// Format helpers
function fmt(n) { return 'LKR ' + Number(n||0).toLocaleString('en-LK',{maximumFractionDigits:0}); }
function fmtK(n) { if(n>=1000000)return(n/1e6).toFixed(1)+'M'; if(n>=1000)return(n/1000).toFixed(0)+'K'; return String(Math.round(n||0)); }

// ── AUTH ────────────────────────────────────────────────────────────
function getSession() {
  try { return JSON.parse(localStorage.getItem('cc_session')); } catch(e){ return null; }
}
function saveSession(s) { localStorage.setItem('cc_session', JSON.stringify(s)); }
function clearSession() { localStorage.removeItem('cc_session'); }

function requireAuth() {
  const s = getSession();
  if (!s || !s.token) {
    window.location.href = '../index.html';
    return null;
  }
  return s;
}
function isAdmin()  { const s=getSession(); return s && s.role === 'admin'; }
function isEditor() { const s=getSession(); return s && (s.role==='admin'||s.role==='editor'); }

async function logout() {
  const s = getSession();
  if (s?.token) {
    try { await api('POST', { action:'logout', token:s.token }); } catch(e) {}
  }
  clearSession();
  window.location.href = '../index.html';
}

// ── API LAYER ───────────────────────────────────────────────────────
async function api(method, payload) {
  if (method === 'GET') {
    const params = new URLSearchParams(payload).toString();
    const res = await fetch(`${API_URL}?${params}`);
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'API error');
    return data;
  } else {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'API error');
    return data;
  }
}

// Convenience wrappers
const DB = {
  getToken() { return getSession()?.token || ''; },

  async getAll() {
    return api('GET', { action:'getAll', token:this.getToken(), fy:FY });
  },

  async add(sheet, data) {
    return api('POST', { action:'addRow', token:this.getToken(), sheet, data });
  },
  async update(sheet, id, data) {
    return api('POST', { action:'updateRow', token:this.getToken(), sheet, id, data });
  },
  async remove(sheet, id) {
    return api('POST', { action:'deleteRow', token:this.getToken(), sheet, id });
  },
  async upsertBudget(line_item_id, month, amount) {
    return api('POST', { action:'upsertBudget', token:this.getToken(), line_item_id, month, fy:FY, amount });
  },
};

// ── UI HELPERS ──────────────────────────────────────────────────────
function showLoader(msg='Loading...') {
  document.getElementById('loader').style.display = 'flex';
  document.getElementById('loader-msg').textContent = msg;
}
function hideLoader() { document.getElementById('loader').style.display = 'none'; }

function toast(msg, type='s') {
  const el = document.createElement('div');
  el.className = `toast t${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=>el.classList.add('show'), 10);
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(),280); }, 3200);
}

// Close modals on overlay click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.overlay').forEach(o =>
    o.addEventListener('click', e => { if (e.target===o) o.classList.remove('open'); })
  );
});

function openM(id) { document.getElementById(id).classList.add('open'); }
function closeM(id){ document.getElementById(id).classList.remove('open'); }

// Status pills and progress bar
function statusPill(p) {
  if(p>=100) return '<span class="pill pr">Over Budget</span>';
  if(p>=80)  return '<span class="pill pa">Warning</span>';
  if(p>=40)  return '<span class="pill pb">On Track</span>';
  return '<span class="pill pgr">Good</span>';
}
function progBar(p) {
  const c = p>=100?'over':p>=80?'warn':'';
  return `<div class="prog"><div class="prog-f ${c}" style="width:${Math.min(p,100)}%"></div></div><span style="font-size:9.5px;color:var(--text-2)">${Number(p).toFixed(1)}%</span>`;
}

// Render sidebar user info + custom quick-links
function renderSidebar(user, sidebarFields=[]) {
  const un = document.getElementById('sb-uname');
  const ur = document.getElementById('sb-role');
  if(un) un.textContent = user?.username || '—';
  if(ur) ur.textContent = user?.role || '—';

  // Hide settings link for non-admins
  const sl = document.getElementById('sb-settings-link');
  if(sl && user?.role !== 'admin') sl.style.display = 'none';

  // Render custom quick-links
  const container = document.getElementById('sb-extra');
  if(!container || !sidebarFields.length) return;
  container.innerHTML = sidebarFields.map(f => {
    if(f.type === 'link') {
      return `<div class="sb-extra-item">🔗 <a href="${f.value}" target="_blank">${f.label}</a></div>`;
    }
    return `<div class="sb-extra-item">📌 <span>${f.label}: ${f.value}</span></div>`;
  }).join('');
}
