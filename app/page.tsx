'use client';
import { useEffect, useState } from 'react';
import { moveLink, safeUrl } from '../lib/links.mjs';
type Link = { id: string; label: string; url: string; clicks: number };
const starter: Link[] = [{ id: 'site', label: 'Portfolio', url: 'https://example.com', clicks: 0 }, { id: 'work', label: 'Latest work', url: 'https://example.org', clicks: 0 }, { id: 'contact', label: 'Get in touch', url: 'https://example.net', clicks: 0 }];
export default function Page() {
  const [links, setLinks] = useState<Link[]>(starter);
  const [bio, setBio] = useState('Creator, builder, and curious human.');
  const [theme, setTheme] = useState('#274c77');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ label: '', url: '' });
  const [views, setViews] = useState(0);
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem('link-bio-demo') || '{}'); if (saved.links) setLinks(saved.links); if (saved.bio) setBio(saved.bio); if (saved.theme) setTheme(saved.theme); const count = Number(sessionStorage.getItem('link-bio-views') || '0') + 1; sessionStorage.setItem('link-bio-views', String(count)); setViews(count); } catch {} }, []);
  useEffect(() => { localStorage.setItem('link-bio-demo', JSON.stringify({ links, bio, theme })); }, [links, bio, theme]);
  function add() { const url = safeUrl(draft.url); if (!url || !draft.label.trim()) return; setLinks([...links, { id: crypto.randomUUID(), label: draft.label.trim().slice(0, 80), url, clicks: 0 }]); setDraft({ label: '', url: '' }); }
  function open(link: Link) { setLinks(links.map(item => item.id === link.id ? { ...item, clicks: item.clicks + 1 } : item)); window.open(link.url, '_blank', 'noopener,noreferrer'); }
  return <main><div className="eyebrow">PERSONAL LINK PAGE · LOCAL DEMO</div><section style={{ textAlign: 'center', background: theme, color: 'white' }}><div style={{ fontSize: 48 }}>✦</div><h1 style={{ fontSize: 44 }}>Your Name</h1><p>{bio}</p></section><section><h2>Links</h2><div className="grid">{links.map(link => <button key={link.id} onClick={() => open(link)}>{link.label} ↗</button>)}</div></section><div className="row"><button className="secondary" onClick={() => setEditing(!editing)}>{editing ? 'Close demo editor' : 'Open demo editor'}</button></div>
    {editing && <section><h2>Demo editor</h2><p className="muted">Changes and analytics stay in this browser. There is no shared admin account in this preview.</p><label>Bio<input type="text" value={bio} onChange={e => setBio(e.target.value)} /></label><label>Theme color<input type="color" value={theme} onChange={e => setTheme(e.target.value)} /></label><h3>Links</h3>{links.map((link, index) => <article key={link.id}><div className="row"><b>{link.label}</b><small>{link.clicks} clicks</small><button className="secondary" onClick={() => setLinks(moveLink(links, index, -1))}>↑</button><button className="secondary" onClick={() => setLinks(moveLink(links, index, 1))}>↓</button><button className="secondary" onClick={() => setLinks(links.filter(item => item.id !== link.id))}>Remove</button></div></article>)}<div className="grid"><label>Button label<input type="text" value={draft.label} onChange={e => setDraft({ ...draft, label: e.target.value })} /></label><label>HTTPS URL<input type="url" value={draft.url} onChange={e => setDraft({ ...draft, url: e.target.value })} /></label></div><button onClick={add}>Add link</button><p>Views this session: {views} · Link clicks: {links.reduce((sum, link) => sum + link.clicks, 0)}</p></section>}<footer>Demo data is local to this browser. It does not identify visitors or transmit IP addresses.</footer></main>;
}
