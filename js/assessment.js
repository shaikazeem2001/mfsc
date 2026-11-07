(function () {
  var S = ['Not at all', 'Sometimes', 'Often', 'Definitely'];
  function q(id, text) { return { id: id, text: text, opts: S, scored: true }; }
  var SECTIONS = [
    { part: 'PART 1 · TELL US ABOUT YOUR BUSINESS', title: 'A little context first.', intro: 'These help us understand your business. They don\u2019t affect your score.', items: [
      { id: 'c1', text: 'How many employees do you currently have?', opts: ['0', '1\u20135', '6\u201310', '11\u201325', '26\u201350', '51+'] },
      { id: 'c2', text: 'Which best describes your role?', opts: ['Owner / Founder', 'Executive', 'Manager', 'HR', 'Other'] },
      { id: 'c3', text: 'What stage best describes your business?', opts: ['Starting', 'Growing', 'Established', 'Restructuring', 'Scaling'] }
    ]},
    { part: 'PART 2 · PEOPLE', title: 'Hiring & workforce needs', intro: 'How true is each statement for your business?', items: [
      q('p1', 'Do you currently have one or more specific positions you need help filling?'),
      q('p2', 'Do you find yourself hiring for the same or similar positions repeatedly throughout the year?'),
      q('p3', 'Are you frequently replacing employees who leave, resign, or don\u2019t work out?'),
      q('p4', 'Does employee turnover create ongoing gaps in your staffing or disrupt your business operations?'),
      q('p5', 'Do you expect to hire multiple employees over the next 3\u20136 months because of turnover, growth, seasonal demand, or increased workload?'),
      q('p6', 'Does it feel like your business is almost always recruiting, interviewing, onboarding, or replacing someone?'),
      q('p7', 'Would having ongoing access to a pipeline of screened candidates make it easier to keep your business properly staffed?'),
      q('p8', 'Is your hiring need primarily for one specific position rather than an ongoing need for employees?')
    ]},
    { part: 'PART 2 · HR', title: 'People management needs', intro: 'How true is each statement for your business?', items: [
      q('h1', 'Are employee issues taking more of your time than they should?'),
      q('h2', 'Do you need help with onboarding, payroll administration, attendance, PTO, employee records, investigations, or employee relations?'),
      q('h3', 'Does your business lack a dedicated HR professional or department?'),
      q('h4', 'Do you sometimes feel unsure about how employee situations should be documented, communicated, or managed?')
    ]},
    { part: 'PART 2 · OPERATIONS', title: 'Systems & accountability needs', intro: 'How true is each statement for your business?', items: [
      q('o1', 'Does too much of the business depend on you personally to keep things moving?'),
      q('o2', 'Are your processes, responsibilities, or workflows unclear or inconsistent?'),
      q('o3', 'Do things sometimes fall through the cracks because there isn\u2019t enough accountability?'),
      q('o4', 'Do you need better systems, processes, KPIs, or operational oversight?')
    ]},
    { part: 'PART 2 · GROWTH', title: 'Business development needs', intro: 'How true is each statement for your business?', items: [
      q('g1', 'Are you struggling to consistently generate new business opportunities?'),
      q('g2', 'Do you need more customers, clients, contracts, partnerships, or referral relationships?'),
      q('g3', 'Does business development depend primarily on the owner?'),
      q('g4', 'Would your business benefit from someone actively developing relationships and pursuing growth opportunities on your behalf?')
    ]}
  ];

  var CONSULT = 'about.html#contact';
  var GATE_FORM = 'https://link.poisemediaco.com/widget/form/H7m62UZF4aMgDwEp61Sw';
  var ARROW = '<svg class="ico ico-arrow" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  var ARROW_L = ARROW.replace('ico-arrow', 'ico-arrow ico-arrow-l').replace('M4 12h15M13 6l6 6-6 6', 'M20 12H5M11 6l-6 6 6 6');
  // flat list of every question, in order
  var QS = [], START = [];
  SECTIONS.forEach(function (sec, si) { START[si] = QS.length; sec.items.forEach(function (it) { QS.push({ sec: sec, si: si, it: it }); }); });
  var state = { step: 0, q: 0, answers: {} };   // step: 0 intro, 1 questions, 2 results form, 3 results
  var timer = null;
  var app = document.getElementById('a-app');
  var hero = document.querySelector('.a-hero');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function avg(ids) { return ids.reduce(function (t, id) { return t + (state.answers[id] || 0); }, 0) / (ids.length * 3); }

  function diagnose() {
    var direct = avg(['p1', 'p8']);
    var recurring = avg(['p2', 'p3', 'p4', 'p5', 'p6', 'p7']);
    var areas = [
      { key: 'PEOPLE', name: 'People', score: Math.max(direct, recurring), service: recurring >= direct ? 'Employer Membership' : 'Direct Placement' },
      { key: 'HR', name: 'HR', score: avg(['h1', 'h2', 'h3', 'h4']), service: 'HR Partner' },
      { key: 'OPERATIONS', name: 'Operations', score: avg(['o1', 'o2', 'o3', 'o4']), service: 'Operations Partner Pathway' },
      { key: 'GROWTH', name: 'Growth', score: avg(['g1', 'g2', 'g3', 'g4']), service: 'Business Solutions Consultation' }
    ];
    areas.forEach(function (a) { a.tier = a.score >= 0.6 ? 2 : a.score >= 0.34 ? 1 : 0; });
    return { areas: areas, direct: direct, recurring: recurring };
  }

  function single(a) {
    if (a.key === 'PEOPLE' && a.service === 'Employer Membership') return { kicker: 'YOUR BIGGEST CHALLENGE IS PEOPLE', headline: 'Your business has an ongoing workforce need.', body: 'Your responses suggest that hiring isn\u2019t an occasional event for your business. Frequent hiring, turnover, growth, or recurring staffing needs may be keeping you in a constant cycle of recruiting and replacing employees.', service: 'MFSC Employer Membership', note: 'Instead of starting your hiring process from zero every time you need someone, MFSC helps keep your talent pipeline working.', cta: 'Explore Employer Membership', href: 'business.html#people' };
    if (a.key === 'PEOPLE') return { kicker: 'YOUR BIGGEST CHALLENGE IS PEOPLE', headline: 'Your business has a specific hiring need.', body: 'You don\u2019t necessarily need an ongoing recruiting solution. You need help finding the right person for a specific position.', service: 'MFSC Direct Placement', note: 'MFSC sources, screens and matches the right candidate for your opening, with onboarding support and a 30-day placement assurance.', cta: 'Get Started with Direct Placement', href: 'business.html#people' };
    if (a.key === 'HR') return { kicker: 'YOUR BIGGEST CHALLENGE IS HR', headline: 'You need help managing your people.', body: 'Your responses suggest that HR responsibilities and employee-related matters may be consuming time and attention you could spend leading and growing your business.', service: 'MFSC HR Partner', note: 'Fractional HR support for businesses that need help managing their people.', cta: 'Get Started with HR Partner', href: 'business.html#capacity' };
    if (a.key === 'OPERATIONS') return { kicker: 'YOUR BIGGEST CHALLENGE IS OPERATIONS', headline: 'You need better systems and accountability.', body: 'Your responses suggest that systems, processes, accountability, or day-to-day operational demands may be limiting your ability to lead and grow effectively.', service: 'MFSC Operations Partner Pathway', note: 'Fractional operations support for the systems and day-to-day operations behind your business. MFSC begins by assessing your business before taking on ongoing operational management.', cta: 'Get Started with My Operations Assessment', href: 'business.html#capacity' };
    return { kicker: 'YOUR BIGGEST CHALLENGE IS GROWTH', headline: 'You need more customers and opportunities.', body: 'Your responses suggest your business could benefit from more consistent relationship building and business-development activity.', service: 'MFSC Business Solutions Consultation', note: 'Let\u2019s talk through where your growth is getting stuck and map out the right next step for your business.', cta: 'Schedule My Business Solutions Consultation', href: CONSULT };
  }

  function result() {
    var d = diagnose();
    var ranked = d.areas.slice().sort(function (x, y) { return y.score - x.score; });
    var highs = ranked.filter(function (a) { return a.tier === 2; });
    var res;
    if (highs.length === 1) {
      res = single(highs[0]); res.ranked = [];
    } else if (highs.length > 1) {
      res = { kicker: 'MULTIPLE PRIORITIES', headline: 'Your business may not have one problem.', body: 'Your solutions shouldn\u2019t have to come from five different places. MFSC can help you determine which issue should be addressed first and build the right combination of solutions around your business.',
        ranked: ranked.filter(function (a) { return a.tier > 0; }).map(function (a, i) { return { label: '#' + (i + 1) + ' Priority: ' + a.key, service: a.service }; }),
        cta: 'Schedule My Business Solutions Consultation', href: CONSULT };
    } else {
      res = { kicker: 'NEEDS FURTHER DIAGNOSIS', headline: 'Your business needs a closer look.', body: 'Your responses don\u2019t point to one dominant challenge, but they do indicate opportunities to strengthen your business. Schedule an MFSC Business Solutions Consultation and we\u2019ll help identify what\u2019s keeping your business from moving forward.', ranked: [], cta: 'Schedule My Business Solutions Consultation', href: CONSULT };
    }
    return { res: res, d: d };
  }

  var LEVELS = ['Strong', 'Moderate Priority', 'High Priority'];

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function segments() {
    var h = '';
    SECTIONS.forEach(function (sec, si) {
      var len = sec.items.length, done = Math.max(0, Math.min(len, state.q - START[si]));
      h += '<span class="seg"><i style="width:' + Math.round(done / len * 100) + '%"></i></span>';
    });
    return h;
  }

  // Scores travel to the CRM as URL parameters. In the GHL form, each hidden field's "Query Key"
  // must match a name below (see README). Short values only: URLs have a length limit.
  function gateSrc() {
    var d = diagnose(), out = result();
    var pct = function (x) { return String(Math.round(x * 100)); };
    var c = SECTIONS[0].items;
    var p = new URLSearchParams();
    p.set('people_score', pct(d.areas[0].score));
    p.set('hr_score', pct(d.areas[1].score));
    p.set('operations_score', pct(d.areas[2].score));
    p.set('growth_score', pct(d.areas[3].score));
    p.set('diagnosis_summary', d.areas.map(function (a) { return a.name + ': ' + LEVELS[a.tier] + ' (' + pct(a.score) + '%)'; }).join(' | '));
    p.set('recommended_solution', out.res.service || out.res.ranked.map(function (x) { return x.label + ' = ' + x.service; }).join(' | ') || out.res.headline);
    p.set('business_size', c[0].opts[state.answers.c1] || '');
    p.set('contact_role', c[1].opts[state.answers.c2] || '');
    p.set('business_stage', c[2].opts[state.answers.c3] || '');
    return GATE_FORM + '?' + p.toString();
  }

  function render() {
    var s = state.step, html = '';
    hero.classList.toggle('is-compact', s > 0);
    if (s === 0) {
      html = '<div class="a-intro"><img src="images/coworking.jpg" alt="A team working at shared tables, seen from above"><div class="a-intro-text">' +
        '<h2 class="a-h2">Four areas. One clear diagnosis.</h2>' +
        '<p class="a-muted">Answer three quick questions about your business, then rate 20 statements. You’ll get a ranked diagnosis and the MFSC solution matched to your biggest challenge.</p>' +
        '<div class="a-areas"><div class="a-area"><b>People</b><span>Hiring &amp; workforce needs</span></div><div class="a-area"><b>HR</b><span>People management</span></div><div class="a-area"><b>Operations</b><span>Systems &amp; accountability</span></div><div class="a-area"><b>Growth</b><span>Business development</span></div></div>' +
        '<button type="button" class="btn btn-navy" data-a="start"><span>Start My Assessment</span>' + ARROW + '</button></div></div>';
    } else if (s === 1) {
      var cur = QS[state.q], it = cur.it, n = state.q + 1, last = state.q === QS.length - 1;
      html = '<div class="a-stack"><div class="a-qcard">' +
        '<div class="a-segs" role="progressbar" aria-valuemin="1" aria-valuemax="' + QS.length + '" aria-valuenow="' + n + '" aria-label="Question ' + n + ' of ' + QS.length + '">' + segments() + '</div>' +
        '<p class="a-qnum">QUESTION ' + pad(n) + ' <span>OF ' + QS.length + '</span></p>' +
        '<h2 class="a-qh" id="a-qh" tabindex="-1">' + esc(it.text) + '</h2>' +
        '<p class="a-pick">SELECT ONLY ONE' + (cur.si === 0 ? ' · DOESN’T AFFECT YOUR SCORE' : '') + '</p>' +
        '<div class="a-opts" role="radiogroup" aria-labelledby="a-qh">';
      it.opts.forEach(function (o, oi) {
        var on = state.answers[it.id] === oi;
        html += '<button type="button" class="a-opt" role="radio" aria-checked="' + on + '" data-v="' + oi + '"><span class="dot" aria-hidden="true"></span><span>' + esc(o) + '</span></button>';
      });
      html += '</div><div class="a-nav"><button type="button" class="a-back" data-a="back">Back</button>' +
        '<button type="button" class="a-next" data-a="next" id="a-next"' + (state.answers[it.id] === undefined ? ' disabled' : '') + '><span>' + (last ? 'See My Results' : 'Next') + '</span>' + ARROW + '</button></div></div></div>';
    } else if (s === 2) {
      html = '<div class="a-gate"><img src="images/team-celebrating.jpg" alt="A team celebrating together in an office"><div class="a-gate-r">' +
        '<div style="display:flex;flex-direction:column;gap:8px"><h2 class="a-h2" id="a-gh" tabindex="-1">Your results are ready.</h2><p class="a-muted">Enter your information to receive your MFSC Business Solutions Diagnosis and recommended next steps.</p></div>' +
        '<div class="a-embed embed-box is-wait" style="--h:520px"><iframe src="' + gateSrc() + '" title="Get your assessment results" style="width:100%;height:520px;border:0" onload="var b=this.parentNode;setTimeout(function(){b.classList.add(\'is-loaded\')},700)"></iframe></div>' +
        '<div class="a-row"><button type="button" class="btn btn-green" data-a="show"><span>Show My Results</span>' + ARROW + '</button>' +
        '<button type="button" class="btn btn-outline" data-a="back">' + ARROW_L + '<span>Back</span></button></div></div></div>';
    } else {
      var out = result(), r = out.res;
      html = '<div class="a-card"><p class="a-eyebrow" style="margin-bottom:8px">YOUR BUSINESS DIAGNOSIS</p>';
      out.d.areas.forEach(function (a) {
        html += '<div class="a-arow"><span class="n">' + a.name + '</span><span class="pill t' + a.tier + '">' + LEVELS[a.tier] + '</span><div class="meter"><div class="b' + a.tier + '" style="width:' + Math.max(4, Math.round(a.score * 100)) + '%"></div></div></div>';
      });
      html += '</div><div class="a-res"><p class="k">' + r.kicker + '</p><h2 id="a-rh" tabindex="-1">' + esc(r.headline) + '</h2><p class="b">' + esc(r.body) + '</p>';
      if (r.service) html += '<p class="k" style="letter-spacing:.08em">THERE’S AN MFSC SOLUTION FOR THAT.</p><div class="a-rec"><small>Recommended solution</small><b>' + esc(r.service) + '</b><span>' + esc(r.note) + '</span></div>';
      if (r.ranked.length) html += '<ol class="a-rank">' + r.ranked.map(function (x) { return '<li><b>' + esc(x.label) + '</b><span>Recommended: ' + esc(x.service) + '</span></li>'; }).join('') + '</ol>';
      html += '<div class="a-row"><a class="btn btn-green" href="' + r.href + '"><span>' + esc(r.cta) + '</span>' + ARROW + '</a><button type="button" class="btn btn-white" data-a="restart">Retake the Assessment</button></div></div>';
    }
    app.innerHTML = html;
  }

  function go(step, q) {
    clearTimeout(timer);
    state.step = step;
    if (q !== undefined) state.q = q;
    render();
    var card = app.firstElementChild;
    if (card && card.getBoundingClientRect().top < 0) window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' });
    var h = app.querySelector('#a-qh, #a-gh, #a-rh, h2');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }

  function advance() { if (state.q < QS.length - 1) go(1, state.q + 1); else go(2); }
  function back() {
    if (state.step === 2) go(1, QS.length - 1);
    else if (state.step === 1) { if (state.q > 0) go(1, state.q - 1); else go(0); }
  }

  document.addEventListener('click', function (e) {
    var opt = e.target.closest('.a-opt');
    if (opt && state.step === 1) {
      state.answers[QS[state.q].it.id] = +opt.dataset.v;
      opt.parentElement.querySelectorAll('.a-opt').forEach(function (b) { b.setAttribute('aria-checked', b === opt ? 'true' : 'false'); });
      var nx = document.getElementById('a-next'); if (nx) nx.disabled = false;
      clearTimeout(timer);
      timer = setTimeout(advance, 320);   // picking an answer moves on by itself; Next/Back still work
      return;
    }
    var a = e.target.closest('[data-a]');
    if (!a) return;
    var act = a.dataset.a;
    if (act === 'start') go(1, 0);
    else if (act === 'back') back();
    else if (act === 'next') { if (state.answers[QS[state.q].it.id] !== undefined) advance(); }
    else if (act === 'show') go(3);
    else if (act === 'restart') { state.answers = {}; go(0, 0); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });
  render();
})();
