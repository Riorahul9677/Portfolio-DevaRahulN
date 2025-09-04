// Basic interactivity and GSAP animations
// Data for skills and projects
const skills = [
  {name: 'HTML', percent: 90},
  {name: 'CSS', percent: 88},
  {name: 'JavaScript', percent: 85},
  {name: 'React (basics)', percent: 65},
  {name: 'Java', percent: 75},
  {name: 'MySQL', percent: 60},
  {name: 'PHP', percent: 50},
  {name: 'Git', percent: 70}
];

const projects = {
  fullstack: [
    {
      title: 'StickBlitz Gaming Plateform',
      desc: 'Multiplayer stickman gaming platform.',
      tech: ['HTML','CSS','JS'],
      liveUrl: 'https://riorahul9677.github.io/StickBlits-GamePltfrm/',
      sourceUrl: 'https://github.com/Riorahul9677/StickBlits-GamePltfrm'
    }
  ],
  graphics: [
  ],
  ai: []
};

// Render skills into two panels (technical and tools)
const techList = ['HTML','CSS','Bootstrap','Java','JavaScript','Python'];
const toolList = ['Canva','CapCut','Photoshop','VS Code','Figma','Git'];

const techHolder = document.getElementById('techSkills');
const toolsHolder = document.getElementById('toolsSkills');

function makeSkillRow(name, percent){
  const row = document.createElement('div');
  row.className = 'skill-row';
  row.innerHTML = `
    <div class="skill-left"><div class="skill-name">${name}</div></div>
    <div class="skill-right">
      <div class="skill-track"><div class="skill-fill" data-percent="${percent}" ></div></div>
    </div>
    <div class="skill-percent">${percent}%</div>
  `;

  const fill = row.querySelector('.skill-fill');
  const percentEl = row.querySelector('.skill-percent');
  // row-level clicks disabled — panel header controls the whole panel
  let filled = false;

  // animate in when scrolled
  gsap.from(row, {opacity:0,y:10,duration:0.6,scrollTrigger:{trigger:row, start:'top 85%'}});
  return row;
}

// assign sample percentages
const samplePerc = {HTML:90,CSS:90,Java:60,JavaScript:75,Python:65,Canva:80,CapCut:80,Photoshop:50,'VS Code':85,Figma:55,Git:60};

techList.forEach(k=>techHolder.appendChild(makeSkillRow(k, samplePerc[k]||60)));
toolList.forEach(k=>toolsHolder.appendChild(makeSkillRow(k, samplePerc[k]||55)));

// Render projects
const projectsContent = document.getElementById('projectsContent');
function renderProjects(tab){
  projectsContent.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'project-grid';
  projects[tab].forEach((p, i)=>{
    const card = document.createElement('div');
    card.className = 'project-card';
    const liveHref = p.liveUrl || '#';
    const sourceHref = p.sourceUrl || 'https://github.com/Riorahul9677/Portfolio-DevaRahulN';
    card.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="badges">${p.tech.map(t=>`<span class="badge">${t}</span>`).join('')}</div>
      <div style="margin-top:10px;display:flex;gap:8px">
        <a class="btn outline" href="${liveHref}" target="_blank" rel="noopener">Live Demo</a>
        <a class="btn outline" href="${sourceHref}" target="_blank" rel="noopener">Source Code</a>
      </div>
    `;
    grid.appendChild(card);
  });
  projectsContent.appendChild(grid);
  // animate project cards as a group using ScrollTrigger.batch (robust on tab change)
  const cards = grid.querySelectorAll('.project-card');
  if(cards.length){
    // ensure initial state
    gsap.set(cards, {opacity:0, y:12, scale:0.98});
    ScrollTrigger.batch(cards, {
      onEnter: batch => gsap.to(batch, {opacity:1, y:0, scale:1, stagger:0.08, duration:0.6, ease: 'power2.out'}),
      start: 'top 85%'
    });
  }
  // if graphics tab, show a gallery of uploaded designs (images)
  if(tab === 'graphics'){
    const gallery = document.createElement('div');
    gallery.className = 'graphics-gallery';
    const images = [
      'assets/projects/Spiderman.webp',
      'assets/projects/pitachio.webp',
      'assets/projects/I%20Am%20Iron%20Man.webp',
      'assets/projects/DREAMS.webp',
      'assets/projects/Royal%20Biryani.webp',
      'assets/projects/India.webp'
    ];
    images.forEach((src, idx) => {
      const item = document.createElement('div');
      item.className = 'graphic-item';
      item.innerHTML = `
        <img src="${src}" alt="Design ${idx+1}" />
        <div class="graphic-overlay">
          <div class="graphic-title">Design ${idx+1}</div>
          <a class="btn outline view-btn" href="#">View Project</a>
        </div>
      `;
      gallery.appendChild(item);
      grid.appendChild(item);
      gsap.set(item, {opacity:0, y:12, scale:0.98});
      // batch animate graphics items
      ScrollTrigger.batch(item, {
        onEnter: batch => gsap.to(batch, {opacity:1, y:0, scale:1, duration:0.6, stagger:0.06}),
        start: 'top 90%'
      });
    });
    // attach click to 'View Project' buttons to open drive folder (replace with your folder URL)
    document.querySelectorAll('.view-btn').forEach(b=>{
      b.addEventListener('click', (e)=>{
        e.preventDefault();
        window.open('https://drive.google.com/drive/folders/your-drive-folder-id', '_blank');
      });
    });
  }
}

// Tabs
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    // simple fade
    gsap.to('#projectsContent', {opacity:0, y:10, duration:0.25, onComplete: ()=>{
      renderProjects(tab);
      gsap.fromTo('#projectsContent',{opacity:0,y:10},{opacity:1,y:0,duration:0.45});
    }});
  });
});
// initial
// ensure sample fullstack project includes this site
projects.fullstack.push({title: 'This Portfolio Website', desc: 'Personal portfolio built with HTML/CSS/JS and GSAP animations.', tech: ['HTML','CSS','JS']});
renderProjects('fullstack');

// Add panel-level click: clicking any skill row triggers panel-wide animation
function animatePanel(panelId){
  const panel = document.getElementById(panelId);
  if(!panel) return;
  const fills = panel.querySelectorAll('.skill-fill');
  // check if any is filled
  const anyFilled = Array.from(fills).some(f => f.style.width && f.style.width !== '0%');
  if(!anyFilled){
    fills.forEach(f=>{
      const p = +f.dataset.percent || 60;
      gsap.to(f, {width: p + '%', duration: 1.2, ease: 'power2.out'});
    });
    // show percents
    panel.querySelectorAll('.skill-percent').forEach(el=>gsap.to(el,{opacity:1,duration:0.6}));
  } else {
    fills.forEach(f=>gsap.to(f,{width:'0%',duration:0.7,ease:'power2.in'}));
    panel.querySelectorAll('.skill-percent').forEach(el=>gsap.to(el,{opacity:0,duration:0.25}));
  }
}

// panel-level click binding: only header (panel-top) toggles proficiency animation
document.querySelectorAll('.skill-panel').forEach(panel=>{
  const header = panel.querySelector('.panel-top');
  if(header){
    header.style.cursor = 'pointer';
    // add small symbol to headers (done here so markup doesn't need change)
    const h = header.querySelector('h4');
    if(h && !h.textContent.trim().startsWith('▸')) h.insertAdjacentText('afterbegin', '▸ ');
    header.addEventListener('click', ()=> animatePanel(panel.id));
  }
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      window.scrollTo({top: target.offsetTop - 70, behavior:'smooth'});
    }
  });
});

// Mobile toggle (simple)
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
if(mobileToggle){
  mobileToggle.addEventListener('click', ()=>{
    const show = mobileMenu.style.display !== 'block';
    mobileMenu.style.display = show ? 'block' : 'none';
  });
}
// close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(a=>{
  a.addEventListener('click', ()=> mobileMenu.style.display = 'none');
});

// Hero animations
gsap.from('.hero-content h1', {opacity:0,y:20,duration:0.7,delay:0.2});
gsap.from('.hero-content h2', {opacity:0,y:20,duration:0.7,delay:0.35});
gsap.from('.tagline', {opacity:0,y:20,duration:0.7,delay:0.5});
gsap.from('.hero-buttons .btn', {opacity:0,y:10,duration:0.6,stagger:0.15,delay:0.7});

// Scroll animations for sections
gsap.registerPlugin(ScrollTrigger);
// Section-level reveal
document.querySelectorAll('section').forEach(sec=>{
  gsap.from(sec, {opacity:0,y:18,duration:0.7,scrollTrigger:{trigger:sec, start:'top 85%'}});
});

// Fade-in for headings and paragraphs
gsap.utils.toArray('h1,h2,h3,h4,p,.tagline').forEach((el)=>{
  gsap.from(el, {opacity:0,y:14,duration:0.7,delay:0.05,scrollTrigger:{trigger:el, start:'top 90%'}});
});

// Staggered reveal for skill rows
gsap.utils.toArray('.skill-panel .skill-row').forEach(panel =>{
  gsap.from(panel.querySelectorAll('.skill-row'), {
    opacity:0, y:12, stagger:0.08, duration:0.6, scrollTrigger:{trigger:panel, start:'top 85%'}
  });
});

// (project card animation handled during renderProjects)

// Graphics gallery items fade+zoom stagger
gsap.utils.toArray('.graphic-item').forEach((el, i)=>{
  gsap.from(el, {opacity:0, scale:0.98, y:10, duration:0.6, delay: i*0.06, scrollTrigger:{trigger:el, start:'top 90%'}});
});

// Slide-from-left for section headings
gsap.utils.toArray('.container > h3').forEach((hd)=>{
  gsap.from(hd, {opacity:0,x:-26,duration:0.6,scrollTrigger:{trigger:hd, start:'top 95%'}});
});

// Contact form
// replace form submit to open user's mail client with mailto: to send to owner
const contactFormInner = document.querySelector('.contact-form-inner');
if(contactFormInner){
  contactFormInner.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('nameField').value.trim();
    const email = document.getElementById('emailField').value.trim();
    const message = document.getElementById('messageField').value.trim();
    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    // send to owner's email
    const mailto = `mailto:riorahul68@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
});

// Make contact cards clickable
document.querySelectorAll('.contact-card[data-href]').forEach(card=>{
  card.addEventListener('click', ()=>{
    const href = card.dataset.href;
    if(href) window.location.href = href;
  });
  card.style.cursor = 'pointer';
});


