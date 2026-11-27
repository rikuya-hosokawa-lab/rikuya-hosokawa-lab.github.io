document.addEventListener('input',function(e){if(e.target.id!=='research-query')return;const input=e.target, q=input.value.trim().toLowerCase(), cards=[...document.querySelectorAll('#research .card')];let count=0;for(const c of cards){const text=(c.textContent+' '+(c.dataset.search||'')).toLowerCase();const yes=q.split(/\s+/).every(w=>text.includes(w));c.hidden=!yes;if(yes)count++;}for(const g of document.querySelectorAll('#research .topic-group'))g.hidden=!g.querySelector('.card:not([hidden])');const status=document.getElementById('research-search-status');status.textContent=document.documentElement.lang==='en'?(q?(count?'Showing matching research stories.':'No matching research stories.'):'Showing all research stories.'):(q?(count?'検索条件に合う研究を表示しています。':'検索条件に合う研究が見つかりませんでした。'):'掲載している研究成果を表示しています。');});document.addEventListener('click',function(e){if(e.target.closest('.topic-nav a')){const i=document.getElementById('research-query');if(i&&i.value){i.value='';i.dispatchEvent(new Event('input',{bubbles:true}));}}});
;document.addEventListener('input',function(e){if(e.target.id!=='pub-query')return;const q=e.target.value.trim().toLowerCase(),words=q.split(/\s+/),items=[...document.querySelectorAll('#publications .pubs li')];let match=false;for(const li of items){li.hidden=!words.every(w=>li.textContent.toLowerCase().includes(w));if(!li.hidden)match=true;}const s=document.getElementById('pub-search-status');if(s)s.textContent=document.documentElement.lang==='en'?(match?'Showing matching publications.':'No matching publications.'):(match?'検索条件に合う論文を表示しています。':'検索条件に合う論文が見つかりませんでした。');});

;(()=>{function refreshTop(){const b=document.getElementById('back-to-top');if(b)b.hidden=window.scrollY<400;}window.addEventListener('scroll',refreshTop,{passive:true});window.addEventListener('resize',refreshTop);window.addEventListener('pageshow',refreshTop);document.addEventListener('DOMContentLoaded',refreshTop);document.addEventListener('click',e=>{if(e.target.closest('#back-to-top')){e.preventDefault();window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}});refreshTop();})();

/* Optional, first-party consent control for aggregate GA4 website statistics. */
;(() => {
  'use strict';
  const id = 'G-R0LGRMYSV9', key = 'hosokawa_analytics_consent_v1';
  const en = document.documentElement.lang === 'en';
  const t = en ? {
    title: 'Optional website analytics', message: 'With your permission, Google Analytics helps us understand visits and improve this research website. You can decline without affecting access.',
    allow: 'Allow analytics', deny: 'Decline', settings: 'Analytics settings', privacy: 'Privacy information'
  } : {
    title: 'アクセス解析について', message: '同意いただいた場合のみ、Google アナリティクスで閲覧状況を集計し、研究室サイトの改善に役立てます。同意しなくてもすべてのページを閲覧できます。',
    allow: '同意する', deny: '同意しない', settings: 'アクセス解析の設定', privacy: 'プライバシーについて'
  };
  let choice = null, started = false, panel, trigger;
  try { choice = localStorage.getItem(key); } catch (_) {}
  function save(value) { choice = value; try { localStorage.setItem(key, value); } catch (_) {} }
  function removeCookies() {
    for (const part of document.cookie.split(';')) {
      const name = part.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      const base = name + '=; Max-Age=0; path=/; SameSite=Lax; Secure';
      document.cookie = base;
      document.cookie = base + '; domain=' + location.hostname;
    }
  }
  function start() {
    if (started || choice !== 'granted' || location.hostname !== 'rikuya-hosokawa-lab.github.io') return;
    started = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);};
    window.gtag('consent', 'default', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent', 'update', {analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js', new Date());
    let ref = '';
    try { if (document.referrer) ref = new URL(document.referrer).origin + '/'; } catch (_) {}
    window.gtag('config', id, {allow_google_signals:false,allow_ad_personalization_signals:false, cookie_expires:15552000,cookie_update:false,page_location:location.origin+location.pathname,page_referrer:ref});
    const script = document.createElement('script');
    script.async = true; script.referrerPolicy = 'no-referrer';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }
  function button(text, fn) { const el = document.createElement('button'); el.type='button'; el.textContent=text; el.addEventListener('click',fn); return el; }
  function close() { panel.hidden=true; }
  function show() { panel.hidden=false; panel.querySelector('button').focus(); }
  function mount() {
    const style = document.createElement('style');
    style.textContent = '#lab-analytics-panel[hidden]{display:none!important}#lab-analytics-panel{position:fixed;z-index:10000;bottom:16px;left:16px;right:16px;max-width:580px;margin:auto;padding:18px;background:#fff;color:#192b46;border:1px solid #cbd8e9;border-radius:12px;box-shadow:0 6px 28px #10254830;font:14px/1.65 -apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",Meiryo,sans-serif}#lab-analytics-panel p{margin:7px 0 12px}#lab-analytics-panel .lab-actions{display:flex;gap:9px;flex-wrap:wrap;align-items:center}#lab-analytics-panel button{font:inherit;font-weight:600;border:1px solid #174ea6;border-radius:5px;background:#fff;color:#174ea6;cursor:pointer;padding:7px 13px}#lab-analytics-panel button:focus-visible,#lab-analytics-settings:focus-visible{outline:3px solid #6297e6;outline-offset:2px}#lab-analytics-settings{background:transparent;color:inherit;border:0;text-decoration:underline;text-underline-offset:3px;cursor:pointer;font:inherit;padding:0}#lab-analytics-panel a{color:#174ea6;font-size:13px}';
    document.head.appendChild(style);
    panel=document.createElement('section'); panel.id='lab-analytics-panel';panel.hidden=true;panel.setAttribute('aria-label',t.title);
    const heading=document.createElement('strong');heading.textContent=t.title;panel.appendChild(heading);
    const p=document.createElement('p');p.textContent=t.message;panel.appendChild(p);
    const actions=document.createElement('div');actions.className='lab-actions';
    actions.appendChild(button(t.allow,()=>{save('granted');close();start();if(trigger)trigger.focus();}));
    actions.appendChild(button(t.deny,()=>{const wasStarted=started;window['ga-disable-'+id]=true;save('denied');removeCookies();close();if(wasStarted){location.reload();return;}if(trigger)trigger.focus();}));
    const link=document.createElement('a');link.href=en?'en-privacy.html':'privacy.html';link.textContent=t.privacy;actions.appendChild(link);panel.appendChild(actions);
    document.body.appendChild(panel);
    trigger=button(t.settings,show);trigger.id='lab-analytics-settings';
    const holder=document.createElement('p');holder.appendChild(trigger);(document.querySelector('footer .wrap')||document.body).appendChild(holder);
    if(choice==='granted') start(); else if(choice!=='denied') panel.hidden=false;
    window.addEventListener('storage', e=>{if(e.key===key && e.newValue!==choice){window['ga-disable-'+id]=true;location.reload();}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
