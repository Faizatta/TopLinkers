import os
import base64
import io
from PIL import Image

def generate_favicons():
    logo_path = r'C:\Users\faiiz\.gemini\antigravity\scratch\topliker\public\toplinkers-logo-mark.png'
    public_dir = r'C:\Users\faiiz\.gemini\antigravity\scratch\topliker\public'

    img = Image.open(logo_path).convert('RGBA')

    # Crop bounding box to maximize resolution
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    w, h = img.size
    side = max(w, h)
    # Give just 2% padding around logo
    padded_side = int(side * 1.04)
    square_img = Image.new('RGBA', (padded_side, padded_side), (0, 0, 0, 0))
    offset = ((padded_side - w) // 2, (padded_side - h) // 2)
    square_img.paste(img, offset, img)

    # 1. Multi-resolution favicon.ico (16, 32, 48)
    sizes = [(16, 16), (32, 32), (48, 48)]
    icon_layers = [square_img.resize(s, Image.Resampling.LANCZOS) for s in sizes]
    ico_path = os.path.join(public_dir, 'favicon.ico')
    icon_layers[0].save(ico_path, format='ICO', sizes=sizes, append_images=icon_layers[1:])
    print(f"✅ Generated: {ico_path}")

    # 2. PNG touch & tab icons
    p32 = square_img.resize((32, 32), Image.Resampling.LANCZOS)
    p32.save(os.path.join(public_dir, 'toplinkers-logo-sm.png'), format='PNG')
    
    p180 = square_img.resize((180, 180), Image.Resampling.LANCZOS)
    p180.save(os.path.join(public_dir, 'apple-touch-icon.png'), format='PNG')

    # 3. Transparent SVG with adaptive dark-mode drop glow (NO bulky grey circle)
    embed_img = square_img.resize((64, 64), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    embed_img.save(buf, format='PNG')
    b64_embed = base64.b64encode(buf.getvalue()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <filter id="tab-contrast" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#ffffff" flood-opacity="0.8" />
    </filter>
  </defs>
  <style>
    @media (prefers-color-scheme: dark) {{
      .logo-mark {{ filter: url(#tab-contrast); }}
    }}
  </style>
  <image class="logo-mark" href="data:image/png;base64,{b64_embed}" x="2" y="2" width="60" height="60"/>
</svg>'''

    svg_path = os.path.join(public_dir, 'favicon.svg')
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"✅ Generated: {svg_path}")

if __name__ == '__main__':
    generate_favicons()
