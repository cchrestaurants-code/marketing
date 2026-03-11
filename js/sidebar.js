// Shared sidebar template — included by all pages
function getSidebarHTML(activePage) {
  const pages = [
    { id:'dashboard',   href:'dashboard.html',  label:'Dashboard',        icon:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>' },
    { id:'budget',      href:'budget.html',     label:'Budget Tracker',   icon:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
    { id:'social',      href:'social.html',     label:'Social Media',     icon:'<path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>' },
    { id:'influencers', href:'influencers.html',label:'Influencers',      icon:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
    { id:'suppliers',   href:'suppliers.html',  label:'Suppliers & Print',icon:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3h0a4 4 0 0 1 4 4H4a4 4 0 0 1 4-4h0"/>' },
  ];

  const navItems = pages.map(p => `
    <a class="sb-item ${activePage===p.id?'active':''}" href="${p.href}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">${p.icon}</svg>
      ${p.label}
    </a>`).join('');

  return `
    <div class="sb-brand">
      <div class="sb-logo">
        <div class="sb-icon">🏨</div>
        <div><div class="sb-hotel">Colombo Court<br>Hotel & Spa</div><div class="sb-dept">Marketing Hub</div></div>
      </div>
      <div class="sb-fy">FY Apr 2026 – Mar 2027</div>
    </div>
    <nav class="sb-nav">
      <div class="sb-sec">Overview</div>
      ${navItems.slice(0,1)}
      <div class="sb-sec">Budget</div>
      ${navItems.slice(1)}
      <div class="sb-sec">Quick Links</div>
      <div id="sb-extra" class="sb-extra"></div>
      <div class="sb-sec">Config</div>
      <a class="sb-item" href="settings.html" id="sb-settings-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/></svg>
        Settings
      </a>
    </nav>
    <div class="sb-foot">
      <div style="flex:1">
        <div class="sb-uname" id="sb-uname">—</div>
        <div class="sb-role" id="sb-role">—</div>
      </div>
      <button class="btn-logout" onclick="logout()">Sign out</button>
    </div>`;
}
