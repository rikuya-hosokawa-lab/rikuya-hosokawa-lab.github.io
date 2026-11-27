from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape
import re,sys,html
if len(sys.argv)!=2 or urlparse(sys.argv[1]).scheme not in ("https","http") or not urlparse(sys.argv[1]).netloc:
    raise SystemExit("Usage: python3 finalize_seo.py https://YOUR-SITE/")
base=sys.argv[1].rstrip("/")+"/"
root=Path(__file__).resolve().parent
urls=[]
for p in sorted(root.glob("*.html")):
    url=base+("" if p.name=="index.html" else p.name)
    urls.append(url)
    s=p.read_text(encoding="utf-8")
    s=re.sub(r'<link\b[^>]*\brel="(?:canonical|alternate)"[^>]*>', '', s)
    s=re.sub(r'<meta\b[^>]*\bproperty="og:url"[^>]*>', '', s)
    ja="index.html" if p.name in ("index.html","en.html") else p.name[3:] if p.name.startswith("en-") else p.name
    en="en.html" if ja=="index.html" else "en-"+ja
    jurl=base+("" if ja=="index.html" else ja)
    eurl=base+en
    tags=f'<link rel="canonical" href="{html.escape(url,quote=True)}"><meta property="og:url" content="{html.escape(url,quote=True)}"><link rel="alternate" hreflang="ja" href="{html.escape(jurl,quote=True)}"><link rel="alternate" hreflang="en" href="{html.escape(eurl,quote=True)}">'
    s=s.replace('</head>',tags+'</head>')
    p.write_text(s,encoding="utf-8")
(root/"sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'<url><loc>{escape(u)}</loc></url>\n' for u in urls)+'</urlset>\n',encoding="utf-8")
(root/"robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {base}sitemap.xml\n",encoding="utf-8")
