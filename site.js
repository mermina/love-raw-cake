/* Love Raw Cake — shared behaviour (nav, tabs, hero, galleries).
   Every block guards for the elements it needs, so pages that lack them (e.g. blog.html) are fine. */

  const tgl=document.getElementById('navtoggle'),links=document.getElementById('navlinks');
  if(tgl&&links){
    tgl.addEventListener('click',()=>links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
  }

  /* In-page links (menu bar, hero buttons, footer) scroll by hand rather than
     letting the browser follow the #hash. Three reasons:
       1. a plain #hash link does nothing when you are already on that hash, so
          clicking "Cakes" a second time — after scrolling or searching the page —
          left you where you were;
       2. the sticky header would otherwise cover the section heading;
       3. "Small Cakes" and "Friday Box" live in hidden tab panels inside the
          cakes section, so they need the tab opened before the scroll. */
  const TAB_FOR = {cakes:'full', smallcakes:'mini', fridaybox:'friday'};
  function goTo(target){
    const nav=document.querySelector('header.nav');
    const off=nav?nav.getBoundingClientRect().height:0;
    const y=target.getBoundingClientRect().top+window.scrollY-off-10;
    window.scrollTo({top:Math.max(0,y),behavior:'smooth'});
  }
  function resolve(id){
    if(TAB_FOR[id]){
      const btn=document.querySelector('.tab[data-tab="'+TAB_FOR[id]+'"]');
      if(btn) btn.click();
      return document.getElementById('cakes');
    }
    return document.getElementById(id);
  }
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href').slice(1);
      if(!id) return;
      const t=resolve(id);
      if(!t) return;
      e.preventDefault();
      goTo(t);
      history.replaceState(null,'',id==='top'?location.pathname+location.search:'#'+id);
    });
  });
  /* shared links and browser back/forward: #smallcakes / #fridaybox open their tab too */
  function routeHash(){
    if(location.hash.length<2) return;
    const t=resolve(location.hash.slice(1));
    if(t) setTimeout(()=>goTo(t),60);
  }
  window.addEventListener('hashchange',routeHash);
  routeHash();

  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const tab=t.dataset.tab;
    // one panel per tab: data-tab="full" shows #grid-full, and so on
    document.querySelectorAll('[id^="grid-"]').forEach(g=>{
      g.classList.toggle('hide', g.id !== 'grid-'+tab);
    });
  }));

  const slides=[...document.querySelectorAll('.hero-media .slide')];let i=0;
  if(slides.length>1) setInterval(()=>{slides[i].classList.remove('active');i=(i+1)%slides.length;slides[i].classList.add('active');},4500);

  (function(){
    const car=document.getElementById('eventCarousel');if(!car)return;
    const imgs=[...car.querySelectorAll('img')],dotsWrap=car.querySelector('.dots');let e=0,timer;
    imgs.forEach((_,idx)=>{const d=document.createElement('b');if(idx===0)d.classList.add('active');
      d.addEventListener('click',()=>{show(idx);reset();});dotsWrap.appendChild(d);});
    const dots=[...dotsWrap.children];
    function show(idx){imgs[e].classList.remove('active');dots[e].classList.remove('active');e=idx;imgs[e].classList.add('active');dots[e].classList.add('active');}
    function next(){show((e+1)%imgs.length);}
    function reset(){clearInterval(timer);timer=setInterval(next,4000);}
    reset();
  })();

  const target=842, el=document.getElementById('cakeCount'),counter=document.querySelector('.counter');let n=0;
  if(el&&counter){
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){
    const step=Math.ceil(target/60);const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t);}el.textContent=n.toLocaleString();},24);
    io.disconnect();}});});io.observe(counter);
  }

  const yrEl=document.getElementById('yr'); if(yrEl) yrEl.textContent=new Date().getFullYear();

  const se=document.getElementById('storyExpand');
  if(se){const toggle=()=>{const o=se.classList.toggle('open');se.setAttribute('aria-expanded',o);};
    se.addEventListener('click',toggle);
    se.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});}

  /* Katya's real cakes — names, ingredients & nutrition from her "Ingredients" doc.
     Add photos later by pushing {src,cap} into photos[]. */
  const CAKES = {
    chocbanana:{title:'Chocolate Banana', order:'Chocolate Banana',
      desc:'Peanut, banana and raw chocolate — rich, nostalgic and completely plant-based.',
      badges:[['Vegan',0],['Gluten-free',0],['Peanut',1]],
      ing:'Peanut paste, coconut milk, bananas, peanuts, agave syrup, coconut flakes, cocoa butter, cocoa powder.',
      photos:[{src:'images/images_20.08.2026/chocbanana_gal.jpeg',cap:'The whole cake'},{src:'images/images_20.08.2026/chocbanana_square1_web.jpeg',cap:'Another angle'}]},
    dubai:{title:'Dubai Chocolate Cake', order:'Dubai Chocolate Cake',
      desc:'The viral Dubai chocolate, made raw — pistachio and cashew with cardamom and cocoa butter. Deeply nutty and aromatic.',
      badges:[['Vegan',0],['Gluten-free',0],['Pistachio · nuts',1]],
      ing:'Pistachios, cashews, almonds, coconut milk, pistachio paste, agave syrup, maple syrup, green buckwheat, cocoa butter, flax seeds, cocoa powder, cardamom, vanilla extract, salt.',
      nutr:'Per 100 g — Protein 11.8 g · Fat 36.6 g · Carbs 29.4 g · 469 kcal',
      photos:[{src:'images/images_20.08.2026/dubai_gal.jpeg',cap:'The whole cake'}]},
    macadamia:{title:'Macadamia Salted Caramel Cheesecake', order:'Macadamia Salted Caramel Cheesecake',
      desc:'Buttery macadamia and fermented cashew cream with date-carob caramel, cocoa nibs and pink salt.',
      badges:[['Vegan',0],['Gluten-free',0],['Contains nuts',1]],
      ing:'Macadamia nuts, fermented cashew cream, almond milk, almonds, green buckwheat, coconut flakes, dates, coconut oil, cocoa butter, agave syrup, carob molasses, lemon juice, cocoa nibs, vanilla extract, caramel extract, pink salt.',
      photos:[{src:'images/images_20.08.2026/macadamia_gal.jpeg',cap:'The whole cake'}]},
    tiramisu:{title:'Tiramisu Cake', order:'Tiramisu Cake',
      desc:'Fermented cashew cream, chicory “coffee” and cocoa over a date-almond base — the Italian classic, raw.',
      badges:[['Vegan',0],['Gluten-free',0],['Contains nuts',1]],
      ing:'Fermented cashew cream, coconut milk, agave syrup, dates, almond, coconut butter, water, chicory, cocoa powder, psyllium, agar, soy lecithin, vanilla extract, salt.',
      photos:[{src:'images/images_20.08.2026/tiramisu_gal.jpeg',cap:'The whole cake'}]},
    chochazelnut:{title:'Chocolate Hazelnut Tart', order:'Chocolate Hazelnut Tart',
      desc:'Cashew and hazelnut with cocoa and coconut — like a raw praline tart.',
      badges:[['Vegan',0],['Gluten-free',0],['Hazelnut · nuts',1]],
      ing:'Cashews, hazelnuts, coconut milk, agave syrup, dates, green buckwheat, coconut butter, coconut flakes, cocoa powder, agar, soy lecithin, vanilla extract, salt.',
      nutr:'Per 100 g — Protein 5 g · Fat 28 g · Carbs 24 g · 372 kcal',
      photos:[{src:'images/images_20.08.2026/chochazelnut_gal.jpeg',cap:'The whole tart'},{src:'images/images_20.08.2026/chochazelnut_square1_web.jpeg',cap:'Two slices'},{src:'images/images_20.08.2026/chochazelnut_square2_web.jpeg',cap:'Close up'}]},
    mango:{title:'Mango-Passion Fruit Cake', order:'Mango-Passion Fruit Cake',
      desc:'Mango and passion fruit whipped into cashew cream — tropical, silky and vivid.',
      badges:[['Vegan',0],['Gluten-free',0],['Contains nuts',1]],
      ing:'Mango, passion fruit, cashews, lemon juice, agave syrup, coconut oil, coconut milk, salt, vanilla extract, soy lecithin.',
      photos:[{src:'images/images_20.08.2026/mango_gal.jpeg',cap:'The whole cake'},{src:'images/images_20.08.2026/mango_square1_web.jpeg',cap:'Cut open'},{src:'images/images_20.08.2026/mango_square2_web.jpeg',cap:'A slice'}]},
    carrot:{title:'Carrot Cake', order:'Carrot Cake',
      desc:'Carrot, fermented cashew cream, pecans, raisins and cinnamon — warm and comforting.',
      badges:[['Vegan',0],['Gluten-free',0],['Contains nuts',1]],
      ing:'Carrot, fermented cashew cream, almond milk, agave syrup, dates, almond, pecan, raisin, coconut butter, lemon juice, cinnamon, soy lecithin, vanilla extract, salt.',
      nutr:'Per 100 g — Protein 10 g · Fat 25 g · Carbs 29 g · 361 kcal',
      photos:[{src:'images/images_20.08.2026/carrot_gal.jpeg',cap:'The whole cake'},{src:'images/images_20.08.2026/carrot_square1_web.jpeg',cap:'From the side'}]},
    lemon:{title:'Lemon Cake', order:'Lemon Cake',
      desc:'Bright lemon and poppy seed over a cashew-almond base, with a hint of turmeric for colour.',
      badges:[['Vegan',0],['Gluten-free',0],['Contains nuts',1]],
      ing:'Cashews, almond milk, agave syrup, dates, almond, coconut oil, lemon juice, poppy seeds, turmeric, soy lecithin, vanilla extract, pink salt.',
      nutr:'Per 100 g — Protein 4.5 g · Fat 26 g · Carbs 26.7 g · 350 kcal',
      photos:[{src:'images/images_20.08.2026/lemon_gal.jpeg',cap:'The whole cake'},{src:'images/images_20.08.2026/lemon_square1_web.jpeg',cap:'From the side'}]},
    chocblue:{title:'Blueberry Chocolate Cheesecake', order:'Blueberry Chocolate Cheesecake',
      desc:'Cocoa and blueberry over hazelnut-milk cashew cream with cocoa nibs.',
      badges:[['Vegan',0],['Gluten-free',0],['Contains nuts',1]],
      ing:'Cashews, hazelnut milk, agave syrup, dates, cocoa powder, blueberries, green buckwheat, fermented cashew cream, coconut flakes, cocoa nibs, almonds, lemon juice, vanilla extract, soy lecithin, salt.',
      nutr:'Per 100 g — Protein 5 g · Fat 23 g · Carbs 24 g · 317 kcal',
      photos:[{src:'images/images_20.08.2026/chocblue_gal.jpeg',cap:'The whole cake'},{src:'images/images_20.08.2026/chocblue_sliced_web.jpeg',cap:'Cut, so you can see the layers'}]},
    fridaybox:{title:'Friday Box', order:'Friday Box',
      desc:'[Copy from Katya — what is in the box, how many pieces, and the price.]',
      badges:[['Vegan',0],['Gluten-free',0],['Allergens to confirm',2]],
      photos:[{src:'images/images_20.08.2026/fridaybox_gal.jpeg',cap:'A Friday Box, ready to go'}]},
    /* the small-cake version: same flavour, made by the plate — its own entry so the
       Small Cakes card opens the small cake rather than the full-size one */
    matchasmall:{title:'Matcha Ananas', order:'Matcha Ananas (small)',
      desc:'Pineapple and matcha with pistachio and coconut — vivid, green and refreshing. Made as a small cake, by the plate.',
      badges:[['Vegan',0],['Gluten-free',0],['Pistachio · nuts',1]],
      ing:'Pineapple, cashew, coconut milk, agave syrup, green buckwheat, dates, coconut flakes, pistachio, lemon peel, matcha powder, vanilla extract, salt, soy lecithin.',
      photos:[{src:'images/images_20.08.2026/matchasmall_gal.jpeg',cap:'Made as small cakes, by the plate'}]},
    matcha:{title:'Matcha Ananas', order:'Matcha Ananas',
      desc:'Pineapple and matcha with pistachio and coconut — vivid, green and refreshing.',
      badges:[['Vegan',0],['Gluten-free',0],['Pistachio · nuts',1]],
      ing:'Pineapple, cashew, coconut milk, agave syrup, green buckwheat, dates, coconut flakes, pistachio, lemon peel, matcha powder, vanilla extract, salt, soy lecithin.',
      photos:[{src:'images/images_20.08.2026/matcha_gal.jpeg',cap:'The whole cake'}]},
    blackcurrant:{title:'Blackcurrant Banana', order:'Blackcurrant Banana (small)',
      desc:'Blackcurrant and banana with cashew, almond and green buckwheat.',
      badges:[['Vegan',0],['Gluten-free',0],['Contains nuts',1]],
      ing:'Cashews, blackcurrants, bananas, coconut milk, agave syrup, dates, almond, green buckwheat, cocoa butter, cocoa powder, lemon juice, turmeric, vanilla extract, salt.',
      photos:[{src:'images/images_20.08.2026/blackcurrant_gal.jpeg',cap:'Made as small cakes, by the plate'}]},
    peanutball:{title:'Salted Peanut Ball', order:'Salted Peanut Ball (small)',
      desc:'Marzipan biscuit base, coconut mousse and peanut filling under crisp white chocolate.',
      badges:[['Vegan',0],['Gluten-free',0],['Peanut',1]],
      ing:'Peanuts, coconut milk, white chocolate, peanut paste, agave syrup, almond flour, coconut flour, cocoa butter, agar-agar, NH pectin, vanilla extract, salt.',
      photos:[{src:'images/images_20.08.2026/peanutball_gal.jpeg',cap:'Made as small cakes, by the plate'}]}
  };

  (function(){
    const modal=document.getElementById('cakeModal');
    if(!modal) return;                       // pages without the cake menu (e.g. blog.html)
    const note=modal.querySelector('.note');
    const track=document.getElementById('galTrack');
    const dotsWrap=document.getElementById('galDots');
    const cap=document.getElementById('galCap');
    const titleEl=document.getElementById('noteTitle');
    const descEl=document.getElementById('noteDesc');
    const badgesEl=document.getElementById('noteBadges');
    const ingEl=document.getElementById('noteIng');
    const nutrEl=document.getElementById('noteNutr');
    const orderBtn=document.getElementById('noteOrder');
    const prev=document.getElementById('galPrev');
    const next=document.getElementById('galNext');
    let photos=[],idx=0,lastFocus=null;

    function render(){
      track.style.transform='translateX('+(-idx*100)+'%)';
      cap.textContent=photos.length?photos[idx].cap||'':'';
      [...dotsWrap.children].forEach((d,k)=>d.classList.toggle('active',k===idx));
    }
    function go(k){ if(!photos.length)return; idx=(k+photos.length)%photos.length; render(); }

    function open(key){
      const c=CAKES[key]; if(!c)return;
      photos=c.photos||[]; idx=0;
      track.innerHTML=''; dotsWrap.innerHTML='';
      photos.forEach((p,k)=>{
        const s=document.createElement('div'); s.className='g-slide';
        const im=document.createElement('img'); im.src=p.src; im.alt=c.title+' — '+(p.cap||''); im.loading='lazy';
        s.appendChild(im); track.appendChild(s);
        const b=document.createElement('b'); if(k===0)b.classList.add('active');
        b.addEventListener('click',()=>go(k)); dotsWrap.appendChild(b);
      });
      note.classList.toggle('single',photos.length<=1);
      note.classList.toggle('nogallery',photos.length===0);
      titleEl.textContent=c.title;
      descEl.textContent=c.desc;
      badgesEl.innerHTML='';
      (c.badges||[]).forEach(([t,kind])=>{
        const sp=document.createElement('span'); sp.className='badge'+(kind===1?' nut':kind===2?' tag':''); sp.textContent=t; badgesEl.appendChild(sp);
      });
      ingEl.innerHTML = c.ing ? '<b>Ingredients:</b> '+c.ing : '';
      nutrEl.textContent = c.nutr || '';
      orderBtn.onclick=()=>{ selectOrder(c.order); close(); };
      lastFocus=document.activeElement;
      modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
      document.body.classList.add('noscroll');
      render();
      note.querySelector('.note-close').focus();
    }
    function close(){
      modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('noscroll');
      if(lastFocus&&lastFocus.focus)lastFocus.focus();
    }
    function selectOrder(name){
      const sel=document.getElementById('orderSelect'); if(!sel||!name)return;
      [...sel.options].forEach(o=>{ if(o.textContent.trim()===name.trim()) sel.value=o.value; });
    }

    document.querySelectorAll('[data-cake]').forEach(cardEl=>{
      const key=cardEl.dataset.cake; if(!CAKES[key])return;
      cardEl.classList.add('clickable');
      cardEl.setAttribute('tabindex','0');
      cardEl.setAttribute('role','button');
      cardEl.setAttribute('aria-label',CAKES[key].title+' — view details');
      const pic=cardEl.querySelector('.pic');
      if(pic){ const h=document.createElement('span'); h.className='view-hint';
        h.textContent=(CAKES[key].photos&&CAKES[key].photos.length>1)?'⤢ see angles':'⤢ details'; pic.appendChild(h); }
      cardEl.addEventListener('click',()=>open(key));
      cardEl.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();open(key);} });
    });

    prev.addEventListener('click',()=>go(idx-1));
    next.addEventListener('click',()=>go(idx+1));
    modal.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',close));
    document.addEventListener('keydown',e=>{
      if(!modal.classList.contains('open'))return;
      if(e.key==='Escape')close();
      else if(e.key==='ArrowRight')go(idx+1);
      else if(e.key==='ArrowLeft')go(idx-1);
    });
    let x0=null;
    track.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
    track.addEventListener('touchend',e=>{
      if(x0===null)return; const dx=e.changedTouches[0].clientX-x0;
      if(Math.abs(dx)>40){ go(dx<0?idx+1:idx-1); } x0=null;
    });
  })();

  /* Doorway cards: a card carrying data-goto-tab="mini" (or "friday") isn't a
     cake — clicking it switches the menu to that tab and scrolls there. */
  (function(){
    document.querySelectorAll('[data-goto-tab]').forEach(function(card){
      function go(){
        var t=document.querySelector('.tab[data-tab="'+card.dataset.gotoTab+'"]');
        if(t){ t.click(); document.getElementById('cakes').scrollIntoView({behavior:'smooth',block:'start'}); }
      }
      card.addEventListener('click',go);
      card.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); go(); } });
    });
  })();

  /* Prices note — its own small dialog, reusing the cake note's shell. */
  (function(){
    const modal=document.getElementById('priceModal'); if(!modal) return;
    let lastFocus=null;
    function open(){
      lastFocus=document.activeElement;
      modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
      document.body.classList.add('noscroll');
      modal.querySelector('.note-close').focus();
    }
    function close(){
      modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('noscroll');
      if(lastFocus&&lastFocus.focus) lastFocus.focus();
    }
    document.querySelectorAll('[data-open-prices]').forEach(b=>b.addEventListener('click',open));
    modal.querySelectorAll('[data-info-close]').forEach(x=>x.addEventListener('click',close));
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.classList.contains('open')) close(); });
  })();

  /* "Plan an event order" / "Join the course waitlist" scroll to the form like
     any #order link, but also preselect what the person actually came for —
     otherwise you land on a form still saying "Chocolate Banana" and it reads
     as though the button did nothing. */
  document.querySelectorAll('[data-order]').forEach(b=>{
    b.addEventListener('click',()=>{
      const sel=document.getElementById('orderSelect'); if(!sel) return;
      const want=b.dataset.order.trim();
      [...sel.options].forEach(o=>{ if(o.textContent.trim()===want) sel.value=o.value; });
    });
  });
