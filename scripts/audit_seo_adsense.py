import os
import re
import json

base_dir = r"C:\Users\faiiz\.gemini\antigravity\scratch\topliker"
prerender_path = os.path.join(base_dir, "scripts", "prerender.js")
index_html_path = os.path.join(base_dir, "index.html")
ads_txt_path = os.path.join(base_dir, "public", "ads.txt")
robots_txt_path = os.path.join(base_dir, "public", "robots.txt")
sitemap_path = os.path.join(base_dir, "public", "sitemap.xml")

print("=== 1. AUDITING ADS.TXT ===")
if os.path.exists(ads_txt_path):
    ads_txt = open(ads_txt_path, "r", encoding="utf-8").read().strip()
    print("ads.txt content:", ads_txt)
    # verify format: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
    match = re.match(r"^google\.com,\s*pub-\d+,\s*DIRECT,\s*f08c47fec0942fa0$", ads_txt)
    print("ads.txt standard format valid:", bool(match))
else:
    print("ads.txt NOT FOUND")

print("\n=== 2. AUDITING INDEX.HTML ADSENSE META ===")
index_html = open(index_html_path, "r", encoding="utf-8").read()
adsense_meta = re.search(r'<meta name="google-adsense-account" content="([^"]+)"', index_html)
if adsense_meta:
    print("Found AdSense meta account:", adsense_meta.group(1))
else:
    print("AdSense meta NOT FOUND in index.html")

print("\n=== 3. AUDITING PRERENDER ROUTES ===")
code = open(prerender_path, "r", encoding="utf-8").read()

# Extract static routes
route_blocks = re.findall(r'{\s*path:\s*[\'"]([^\'"]+)[\'"],\s*title:\s*[\'"]([^\'"]+)[\'"],\s*description:\s*[\'"]([^\'"]+)[\'"],\s*h1:\s*[\'"]([^\'"]+)[\'"]', code)
print(f"Total core static routes found: {len(route_blocks)}")
titles = set()
descriptions = set()
h1s = set()
duplicates = []

for path, title, desc, h1 in route_blocks:
    if title in titles:
        duplicates.append(('title', path, title))
    titles.add(title)
    
    if desc in descriptions:
        duplicates.append(('desc', path, desc))
    descriptions.add(desc)
    
    if h1 in h1s:
        duplicates.append(('h1', path, h1))
    h1s.add(h1)

    # Check title length: recommended 50-60 chars
    # Check description length: recommended 140-160 chars
    t_len = len(title)
    d_len = len(desc)
    status = []
    if t_len < 40 or t_len > 70:
        status.append(f"Title len {t_len}")
    if d_len < 120 or d_len > 165:
        status.append(f"Desc len {d_len}")
    
    stat_str = ", ".join(status) if status else "OK"
    print(f"[{stat_str:15}] {path:30} | {title} ({t_len})")

if duplicates:
    print("DUPLICATES FOUND:", duplicates)
else:
    print("No duplicate titles, descriptions, or H1s in staticRoutes!")

print("\n=== 4. AUDITING PRIVACY POLICY & TERMS ===")
privacy_vue = os.path.join(base_dir, "src", "pages", "PrivacyPolicyPage.vue")
if os.path.exists(privacy_vue):
    priv_text = open(privacy_vue, "r", encoding="utf-8").read()
    has_cookies = "cookie" in priv_text.lower()
    has_adsense = "google" in priv_text.lower() or "adsense" in priv_text.lower() or "advertising" in priv_text.lower()
    has_dart = "dart" in priv_text.lower() or "doubleclick" in priv_text.lower()
    has_optout = "opt-out" in priv_text.lower() or "opt out" in priv_text.lower()
    has_gdpr = "gdpr" in priv_text.lower() or "general data protection" in priv_text.lower()
    has_ccpa = "ccpa" in priv_text.lower() or "california" in priv_text.lower()
    print("Privacy Policy checks:")
    print(" - Mentions Cookies:", has_cookies)
    print(" - Mentions Google/AdSense/Advertising:", has_adsense)
    print(" - Mentions DART/DoubleClick:", has_dart)
    print(" - Mentions Opt-out link/procedure:", has_optout)
    print(" - Mentions GDPR rights:", has_gdpr)
    print(" - Mentions CCPA rights:", has_ccpa)
