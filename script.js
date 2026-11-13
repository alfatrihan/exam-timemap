// Utility: Format YYYY-MM-DD in local timezone
function getLocalDateStr(dateObj) {
    return new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Dhaka', year:'numeric',month:'2-digit',day:'2-digit'}).format(dateObj);

}

function toBanglaNum(str) {
    const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return String(str).replace(/\d/g, d => bn[d]);
}

const todayObj = new Date(getLocalDateStr(new Date()) + 'T12:00:00+06:00');
const todayStr = getLocalDateStr(todayObj);
let currentCalMonth = (todayObj.getFullYear() === 2026 && todayObj.getMonth() === 11) ? 11 : 10; // 10 = Nov, 11 = Dec
let selectedDateStr = todayStr;

// Render Today Summary
function renderTodayHero() {
    const box = document.getElementById('today-summary-box');
    const info = dailySchedule[todayStr];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const bnDateFormatted = todayObj.toLocaleDateString('bn-BD', options);

    if (info) {
        const badgeClass = info.type === 'exam' ? 'badge-exam' : (info.type === 'travel' ? 'badge-travel' : 'badge-study');
        const badgeText = info.type === 'exam' ? '🚨 আজ পরীক্ষা!' : (info.type === 'travel' ? '🏡 নানু বাড়ী + রিভিশন' : '📖 আজকের স্টাডি টার্গেট');
        box.innerHTML = `
            <span class="badge ${badgeClass}">${badgeText}</span>
            <div style="font-size:0.85rem; color:var(--muted); margin-bottom:4px;">📅 আজ: ${bnDateFormatted}</div>
            <h2 style="font-size:1.25rem; color:var(--primary); margin-bottom:6px;">${info.title}</h2>
            <p style="font-size:0.95rem;">${info.desc}</p>
        `;
    } else {
        box.innerHTML = `
            <span class="badge badge-primary">📅 আজকের আপডেট</span>
            <div style="font-size:0.85rem; color:var(--muted); margin-bottom:4px;">${bnDateFormatted}</div>
            <h2 style="font-size:1.2rem; color:var(--primary); margin-bottom:6px;">বার্ষিক পরীক্ষার প্রস্তুতি</h2>
            <p style="font-size:0.95rem;">আজকের জন্য নির্ধারিত কোনো বিশেষ রুটিন নেই। সিলেবাস দেখে কঠিন টপিকগুলো রিভিশন দিতে পারো!</p>
        `;
    }
}

// Live Countdown to Next Exam
function updateCountdown() {
    const box = document.getElementById('countdown-box');
    const now = new Date();
    let nextExam = null;

    for (let ex of examRoutine) {
        const exTime = new Date(`${ex.date}T09:00:00+06:00`);
        if (new Date(`${ex.date}T11:30:00+06:00`) > now) {
            nextExam = { ...ex, time: exTime };
            break;
        }
    }

    if (!nextExam) {
        box.innerHTML = `
            <div style="font-size:2rem;">🎉</div>
            <h3 style="margin:6px 0;">সব পরীক্ষা শেষ!</h3>
            <p style="font-size:0.85rem; opacity:0.85;">অভিনন্দন মহিয়া! এখন দারুণ ছুটি উপভোগ করো।</p>
        `;
        return;
    }

    const running = now >= nextExam.time;
    const diff = Math.max(0, (running ? new Date(`${nextExam.date}T11:30:00+06:00`) : nextExam.time) - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    box.innerHTML = `
        <span style="font-size:0.8rem; text-transform:uppercase; letter-spacing:1px; color:#94a3b8;">${running ? "পরীক্ষা চলছে · শেষ হতে বাকি" : "পরবর্তী পরীক্ষা"}</span>
        <h3 style="font-size:1.25rem; color:#f8fafc; margin:4px 0;">${nextExam.subject}</h3>
        <small style="color:#cbd5e1;">${nextExam.bnDate} (${nextExam.day}) • সকাল ৯:০০</small>
        <div class="timer-boxes">
            <div class="timer-box"><span>${toBanglaNum(days)}</span><small>দিন</small></div>
            <div class="timer-box"><span>${toBanglaNum(hours)}</span><small>ঘণ্টা</small></div>
            <div class="timer-box"><span>${toBanglaNum(mins)}</span><small>মিনিট</small></div>
            <div class="timer-box"><span>${toBanglaNum(secs)}</span><small>সেকেন্ড</small></div>
        </div>
    `;
}

// Tab Switcher
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

// Calendar Rendering
function changeMonth(monthIdx) {
    currentCalMonth = monthIdx;
    renderCalendar();
}

function selectOffsetDay(offset) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    selectedDateStr = getLocalDateStr(d);
    if (d.getFullYear() === 2026 && (d.getMonth() === 10 || d.getMonth() === 11)) {
        currentCalMonth = d.getMonth();
    }
    renderCalendar();
    showDayDetails(selectedDateStr);
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const title = document.getElementById('cal-month-title');
    const monthNames = { 10: "নভেম্বর ২০২৬", 11: "ডিসেম্বর ২০২৬" };
    title.textContent = monthNames[currentCalMonth];

    const daysOfWeek = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
    let html = daysOfWeek.map(d => `<div class="cal-day-name">${d}</div>`).join('');

    const firstDay = new Date(2026, currentCalMonth, 1).getDay();
    const totalDays = new Date(2026, currentCalMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        html += `<div class="cal-cell empty"></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `2026-${String(currentCalMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const item = dailySchedule[dateStr];
        const isToday = dateStr === todayStr ? 'is-today' : '';
        const isSelected = dateStr === selectedDateStr ? 'selected' : '';

        let indicator = '';
        if (item) {
            const dotClass = item.type === 'exam' ? 'dot-exam' : 'dot-study';
            indicator = `
                <div class="dot-indicator ${dotClass}"></div>
                <div class="dot-label">${item.short}</div>
            `;
        }

        html += `
            <button type="button" class="cal-cell ${isToday} ${isSelected}" onclick="selectCalDate('${dateStr}')">
                <span class="cal-date-num">${toBanglaNum(day)}</span>
                ${indicator}
            </button>
        `;
    }

    grid.innerHTML = html;
}

function selectCalDate(dateStr) {
    selectedDateStr = dateStr;
    renderCalendar();
    showDayDetails(dateStr);
}

function showDayDetails(dateStr) {
    const box = document.getElementById('cal-detail-box');
    const item = dailySchedule[dateStr];
    const dObj = new Date(dateStr + "T00:00:00");
    const bnDate = dObj.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    let relLabel = "";
    const diffDays = Math.round((new Date(dateStr + "T00:00:00") - new Date(todayStr + "T00:00:00")) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) relLabel = " (আজ)";
    else if (diffDays === -1) relLabel = " (গতকাল)";
    else if (diffDays === 1) relLabel = " (আগামীকাল)";

    if (item) {
        const badgeClass = item.type === 'exam' ? 'badge-exam' : 'badge-study';
        const badgeText = item.type === 'exam' ? 'পরীক্ষার দিন' : 'রিভিশন প্ল্যান';
        box.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:6px;">
                <strong>📅 ${bnDate}${relLabel}</strong>
                <span class="badge ${badgeClass}" style="margin:0;">${badgeText}</span>
            </div>
            <h4 style="font-size:1.1rem; color:var(--primary); margin-bottom:4px;">${item.title}</h4>
            <p style="font-size:0.95rem;">${item.desc}</p>
        `;
    } else {
        box.innerHTML = `
            <strong>📅 ${bnDate}${relLabel}</strong>
            <p style="margin-top:6px; color:var(--muted);">এই তারিখে কোনো নির্দিষ্ট পরীক্ষা বা রুটিন যুক্ত করা হয়নি।</p>
        `;
    }
}

// Render Routine Table
function renderRoutine() {
    const tbody = document.getElementById('routine-tbody');
    const now = new Date();
    let foundNext = false;

    tbody.innerHTML = examRoutine.map(ex => {
        const exEnd = new Date(`${ex.date}T11:30:00+06:00`);
        let rowClass = '';
        let statusBadge = '<span class="badge badge-primary" style="margin:0;">আসন্ন</span>';

        if (exEnd < now) {
            rowClass = 'past';
            statusBadge = '<span class="badge badge-study" style="margin:0;">সম্পন্ন ✓</span>';
        } else if (!foundNext) {
            rowClass = 'next-exam';
            statusBadge = '<span class="badge badge-exam" style="margin:0;">${running ? "পরীক্ষা চলছে · শেষ হতে বাকি" : "পরবর্তী পরীক্ষা"}</span>';
            foundNext = true;
        }

        return `
            <tr class="routine-row ${rowClass}">
                <td>${ex.bnDate}</td>
                <td>${ex.day}</td>
                <td><strong>${ex.subject}</strong></td>
                <td>${statusBadge}</td>
            </tr>
        `;
    }).join('');
}

// Render Revision Checklist with LocalStorage
function renderRevisions() {
    const container = document.getElementById('revision-list');
    const saved = readSaved('mahiya_exam_rev_2026');

    container.innerHTML = revisionTasks.map(task => {
        const isChecked = !!saved[task.id];
        return `
            <div class="rev-item ${isChecked ? 'completed' : ''}" id="card-${task.id}">
                <input type="checkbox" id="${task.id}" ${isChecked ? 'checked' : ''} onchange="toggleRev('${task.id}')">
                <label for="${task.id}" style="cursor:pointer; flex:1;">
                    <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px;">
                        <strong style="color:var(--primary); font-size:1.02rem;">${task.subject}</strong>
                        <span class="badge badge-primary" style="margin:0;">🗓️ ${task.date}</span>
                    </div>
                    <div style="font-size:0.92rem; color:var(--text); margin-top:4px;">${task.detail}</div>
                </label>
            </div>
        `;
    }).join('');

    updateProgress();
}

function toggleRev(id) {
    const saved = readSaved('mahiya_exam_rev_2026');
    const cb = document.getElementById(id);
    saved[id] = cb.checked;
    writeSaved('mahiya_exam_rev_2026', saved);

    const card = document.getElementById(`card-${id}`);
    if (cb.checked) card.classList.add('completed');
    else card.classList.remove('completed');

    updateProgress();
}

function updateProgress() {
    const saved = readSaved('mahiya_exam_rev_2026');
    const doneCount = revisionTasks.filter(t => saved[t.id]).length;
    const pct = Math.round((doneCount / revisionTasks.length) * 100);
    document.getElementById('progress-fill').style.width = `${pct}%`;
    document.getElementById('progress-text').textContent = `${toBanglaNum(pct)}% সম্পন্ন (${toBanglaNum(doneCount)}/${toBanglaNum(revisionTasks.length)})`;
}

// Render Syllabus Accordion
function renderSyllabus() {
    const container = document.getElementById('syllabus-container');
    container.innerHTML = syllabusData.map((sub, idx) => `
        <div class="syl-card">
            <div class="syl-header" onclick="toggleSyl(${idx})">
                <div>
                    <span>${sub.title}</span>
                    ${sub.excluded ? `<span class="excluded-note">${sub.excluded}</span>` : ''}
                </div>
                <span id="syl-icon-${idx}">➕</span>
            </div>
            <div class="syl-body" id="syl-body-${idx}">
                ${sub.content}
            </div>
        </div>
    `).join('');
}

// ১. সময় অনুযায়ী আকাশ পরিবর্তন (Dynamic Sky Vibe)
function updateSkyVibe(forceHour = null) {
  const hour = forceHour !== null ? forceHour : new Date().getHours();
  const body = document.body;
  body.classList.remove('sky-morning', 'sky-afternoon', 'sky-evening', 'sky-night');

  if (hour >= 5 && hour < 12) {
    body.classList.add('sky-morning');   // সকাল ৫টা - দুপুর ১২টা
  } else if (hour >= 12 && hour < 18) {
    body.classList.add('sky-afternoon'); // দুপুর ১২টা - সন্ধ্যা ৬টা
  } else if (hour >= 18 && hour < 23) {
    body.classList.add('sky-evening');   // সন্ধ্যা ৬টা - রাত ১১টা
  } else {
    body.classList.add('sky-night');     // রাত ১১টা - ভোর ৫টা (তারা + ল্যাম্প)
  }
}

// পেজ লোড হলেই আকাশ সেট হবে এবং প্রতি মিনিটে চেক করবে
updateSkyVibe();
setInterval(() => updateSkyVibe(), 60000);


// ২. কনফেটি সেলিব্রেশন ফাংশন (Confetti Celebration)
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: Math.random() * 3 + 2,
    speedX: Math.random() * 2 - 1,
    rotation: Math.random() * 360
  }));

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += 4;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    frame++;
    if (frame < 240) { // প্রায় ৪ সেকেন্ড ধরে কনফেটি উড়বে
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  animate();
}


function toggleSyl(idx) {
    const body = document.getElementById(`syl-body-${idx}`);
    const icon = document.getElementById(`syl-icon-${idx}`);
    const isOpen = body.style.display === 'block';
    body.style.display = isOpen ? 'none' : 'block';
    icon.textContent = isOpen ? '➕' : '➖';
}

// Initialize App
renderTodayHero();
updateCountdown();
setInterval(updateCountdown, 1000);
renderCalendar();
showDayDetails(todayStr);
renderRoutine();
renderRevisions();
renderSyllabus();

// Topic-level checklist; original syllabus remains intact in data.js.
function readSaved(key){try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{return {}}}
function writeSaved(key,value){try{localStorage.setItem(key,JSON.stringify(value));document.getElementById('save-status').textContent='✓ প্রগ্রেস সেভ হয়েছে'}catch{document.getElementById('save-status').textContent='সেভ করা যায়নি। ব্যাকআপ ডাউনলোড করো।'}}
const topicGroups = [
[['ব্যাকরণ','বাক্য|বিরামচিহ্ন|বানান|শব্দার্থ|একই শব্দের বিভিন্ন অর্থের প্রয়োগ|বিপরীতার্থক শব্দ দিয়ে বাক্য রচনা|সমোচ্চারিত ভিন্নার্থক শব্দ দিয়ে বাক্য রচনা|এক কথায় প্রকাশ|বাগধারা'],['অনুধাবন পরীক্ষণ','শ্রেণি উপযোগী: বিষয়ভিত্তিক শিক্ষক কর্তৃক নির্দেশনা'],['সারাংশ / সারমর্ম','আসিতেছে শুভ দিন .................. নব উত্থান।|বিপদে মোরে রক্ষা কর ................... যেন মানি ক্ষয়।|অপরের জন্য তুমি প্রাণ ................. গৌরব বোধ করে।|নদী কভু পান নাহি করে ............... পরহিত তরে।|তুমি জীবনকে সার্থক ও সুন্দর ........... হইয়া উঠিবে।'],['প্রবন্ধ রচনা','শহীদ মিনার|টেলিভিশন|শৃঙ্খলাবোধ|কি ধরণের বই আমার পড়তে ভাল লাগে|আমার চারপাশের প্রকৃতি']],
[['Reading','Unit 6|Unit 7|Unit 8|Unit 9'],['Paragraph','A Book Fair|Your Favourite Game|My Village|Your School Library|Climate Change|Environment Pollution'],['Completing Dialogue','Importance of tree plantation (You & Friend)|Favourite Sports (Two Friends)|Advantages & disadvantages of village life and city life|Liking / Disliking (Two friends)|Weather and climate change (You, Your sister & Your uncle)']],
[['Grammar Test','The Sentences|Parts of Speech|Articles|Tense|Use of the Right form of the Verb|Voice change|Preposition|Correction / Common Errors|Conjunction|Conversion of sentences|Narration|Conditionals'],['Compositions','The Value of Time|The Season You Like Most|Duties of a Student|A Journey by Boat|Tree Plantation']],
[['পাটিগণিত','অনুশীলনী ২.২|অনুশীলনী ২.৩|অনুশীলনী ৩|পাটিগণিত: ষাণ্মাসিক পরীক্ষার পুনরালোচনা'],['বীজগণিত','অনুশীলনী ৫.৩|অনুশীলনী ৫.৪|অনুশীলনী ৬.২|অনুশীলনী ৭.২|অনুশীলনী ৭.৩|বীজগণিত: ষাণ্মাসিক পরীক্ষার পুনরালোচনা'],['জ্যামিতি (১০ম অধ্যায়)','ত্রিভুজ সংক্রান্ত উপপাদ্য ১|ত্রিভুজ সংক্রান্ত উপপাদ্য ২|ত্রিভুজ সংক্রান্ত উপপাদ্য ৩|ত্রিভুজ সংক্রান্ত উপপাদ্য ৪|ত্রিভুজ সংক্রান্ত উপপাদ্য ৫|ত্রিভুজ সংক্রান্ত সম্পাদ্য ৪|ত্রিভুজ সংক্রান্ত সম্পাদ্য ৫|ত্রিভুজ সংক্রান্ত সম্পাদ্য ৬|অনুশীলনী ৯.৩|অনুশীলনী ১০.১|অনুশীলনী ১০.২|অনুশীলনী ১০.৩'],['তথ্য উপাত্ত','১১ অধ্যায়']],
[['অধ্যায়','দ্বিতীয় অধ্যায়: বাংলাদেশের সংস্কৃতি ও সাংস্কৃতিক বৈচিত্র।|তৃতীয় অধ্যায়: পরিবারে শিশুর বেড়ে ওঠা।|পঞ্চম অধ্যায়: বাংলাদেশ ও বাংলাদেশের নাগরিক।|সপ্তম অধ্যায়: বাংলাদেশের জনসংখ্যা পরিচিতি।|নবম অধ্যায়: বাংলাদেশের প্রবীণ ব্যক্তি ও নারী অধিকার।|দশম অধ্যায়: এশিয়ার কয়েকটি দেশ। (পাঠ পুনরালোচনা)']],
[['অধ্যায়','৩য় অধ্যায়: উদ্ভিদের বাহ্যিক বৈশিষ্ট্য।|৪র্থ অধ্যায়: শ্বসন।|৮ম অধ্যায়: শব্দের কথা।|৯ম অধ্যায়: তাপ ও তাপমাত্রা।|১০ম অধ্যায়: বিদ্যুৎ ও চুম্বকের ঘটনা।|১৩শ অধ্যায়: প্রাকৃতিক পরিবেশ ও দূষণ।|১৪শ অধ্যায়: জলবায়ু পরিবর্তন।']],
[['১ম অধ্যায়: আকাইদ',Array.from({length:4},(_,i)=>`পাঠ ${i+6}`).join('|')],['২য় অধ্যায়: ইবাদত',Array.from({length:5},(_,i)=>`পাঠ ${i+6}`).join('|')],['৩য় অধ্যায়: কুরআন ও হাদিস শিক্ষা',Array.from({length:7},(_,i)=>`পাঠ ${i+8}`).join('|')],['৪র্থ অধ্যায়: আখলাখ',Array.from({length:7},(_,i)=>`পাঠ ${i+9}`).join('|')],['৫ম অধ্যায়: আদর্শ জীবন চরিত',Array.from({length:3},(_,i)=>`পাঠ ${i+5}`).join('|')]],
[['অধ্যায়','২য় অধ্যায়: কম্পিউটার সংশ্লিষ্ট যন্ত্রপাতি। (পাঠ পুনরালোচনা)|৪র্থ অধ্যায়: ওয়ার্ড প্রসেসিং।|৫ম অধ্যায়: শিক্ষায় ইন্টারনেট ব্যবহার।']]
];
const topicKey='mahiya_topics_2026_v1';let topicState=readSaved(topicKey);
const topics=topicGroups.map((groups,s)=>groups.flatMap(([group,items],g)=>items.split('|').map((text,t)=>({id:`s${s}-g${g}-t${t}`,group,text}))));
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function stats(list){let done=list.filter(t=>topicState[t.id]===true).length;return {done,total:list.length,pct:Math.round(done/list.length*100)}}
function updateTopicProgress(){const all=stats(topics.flat());document.getElementById('overall').innerHTML=`<strong>${toBanglaNum(all.pct)}<small>%</small></strong><span>বিস্তারিত দেওয়া সিলেবাস</span><p>${toBanglaNum(all.done)} / ${toBanglaNum(all.total)} টপিক সম্পন্ন</p><progress value="${all.done}" max="${all.total}" aria-label="মোট সিলেবাস প্রগ্রেস"></progress>`;topics.forEach((list,i)=>{const s=stats(list);document.getElementById(`subject-stats-${i}`).innerHTML=`<b>${toBanglaNum(s.pct)}%</b> · ${toBanglaNum(s.done)}/${toBanglaNum(s.total)} টপিক`;document.getElementById(`subject-bar-${i}`).value=s.done;});}
function renderPlanner(){document.getElementById('subject-planner').innerHTML=topics.map((list,i)=>`<details class="subject-card" ${i===0?'open':''}><summary><span class="subject-number">${toBanglaNum(i+1).padStart(2,'০')}</span><span class="subject-title">${syllabusData[i].title.replace(/^\S+\s/,'')}<small>${syllabusData[i].excluded||'নির্ধারিত বার্ষিক সিলেবাস'}</small></span><span class="subject-stats" id="subject-stats-${i}"></span><span class="chevron">⌄</span></summary><progress id="subject-bar-${i}" max="${list.length}" value="0" aria-label="${syllabusData[i].title} প্রগ্রেস"></progress><div class="topic-body">${topicGroups[i].map(([group],g)=>`<section class="topic-group"><h4>${group}</h4>${list.filter(t=>t.group===group).map(t=>`<label class="topic-row ${topicState[t.id]?'checked':''}" data-search="${esc((syllabusData[i].title+' '+group+' '+t.text).toLowerCase())}"><input type="checkbox" data-topic="${t.id}" ${topicState[t.id]?'checked':''}><span>${t.text}</span><small>রিভিশন</small></label>`).join('')}</section>`).join('')}</div></details>`).join('')+'<div class="notice"><strong>বাংলা ১ম পত্র — বিস্তারিত অপেক্ষমাণ</strong><p>মূল দৈনিক প্ল্যানে গদ্য, পদ্য ও আনন্দ পাঠের ৪টি গল্প উল্লেখ আছে। নির্দিষ্ট নাম ও সম্পূর্ণ তালিকা নেই বলে এখানে অনুমানভিত্তিক টপিক যোগ করা হয়নি।</p></div>';updateTopicProgress();}
document.getElementById('subject-planner').addEventListener('change',e=>{if(!e.target.dataset.topic)return;topicState[e.target.dataset.topic]=e.target.checked;writeSaved(topicKey,topicState);e.target.closest('label').classList.toggle('checked',e.target.checked);updateTopicProgress();filterTopics()});
function filterTopics(){const q=document.getElementById('topic-search').value.trim().toLowerCase(),filter=document.getElementById('topic-filter').value;let count=0;document.querySelectorAll('.subject-card').forEach(card=>{let visible=0;card.querySelectorAll('.topic-group').forEach(group=>{let n=0;group.querySelectorAll('.topic-row').forEach(row=>{const done=row.querySelector('input').checked;const show=row.dataset.search.includes(q)&&(filter==='all'||(filter==='done'?done:!done));row.hidden=!show;if(show)n++});group.hidden=!n;visible+=n});card.hidden=!visible;count+=visible;if(q||filter!=='all')card.open=true});document.getElementById('empty-search').hidden=!!count;}
document.getElementById('topic-search').addEventListener('input',filterTopics);document.getElementById('topic-filter').addEventListener('change',filterTopics);
function exportProgress(){const data={version:1,topics:topicState,revisions:readSaved('mahiya_exam_rev_2026')};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='mahiya-study-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
document.getElementById('import-file').addEventListener('change',async e=>{try{const data=JSON.parse(await e.target.files[0].text());if(data.version!==1||!data.topics||typeof data.topics!=='object'||Array.isArray(data.topics))throw Error();if(!confirm('এই ব্যাকআপ দিয়ে বর্তমান প্রগ্রেস প্রতিস্থাপন করবে?'))return;topicState=Object.fromEntries(topics.flat().map(t=>[t.id,data.topics[t.id]===true]));writeSaved(topicKey,topicState);writeSaved('mahiya_exam_rev_2026',Object.fromEntries(revisionTasks.map(t=>[t.id,data.revisions?.[t.id]===true])));renderPlanner();renderRevisions();filterTopics();}catch{alert('সঠিক প্রগ্রেস ব্যাকআপ JSON ফাইল নির্বাচন করো।')}finally{e.target.value=''}});
renderPlanner();
