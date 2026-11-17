import os
import io
import base64
from PIL import Image, ImageDraw

def generate_badges():
    # Source high-resolution mark
    src_path = 'public/toplinkers-logo-mark.png'
    if not os.path.exists(src_path):
        src_path = 'public/toplinkers-logo.png'
    
    src = Image.open(src_path).convert('RGBA')
    
    # Trim transparent borders if any
    alpha = src.split()[-1]
    bbox = alpha.point(lambda p: 255 if p > 15 else 0).getbbox()
    if bbox:
        src = src.crop(bbox)
    
    print(f"Source cropped logo size: {src.size}")

    # Generate icons with a crisp white circular badge
    # Canvas sizes to generate:
    # 512x512 (master / PWA)
    # 192x192 (Android / PWA)
    # 180x180 (apple-touch-icon)
    # 96x96 (Google Search high-res)
    # 48x48 (Google Search canonical)
    # 32x32 (standard tab)
    # 16x16 (small tab)
    
    def make_badge(size, padding_ratio=0.15, is_circle=True, border_color=(226, 232, 240, 255)):
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Draw badge background
        if is_circle:
            # Circle with subtle 1px border
            draw.ellipse([1, 1, size - 2, size - 2], fill=(255, 255, 255, 255), outline=border_color, width=max(1, int(size * 0.02)))
        else:
            # Squircle / rounded rect with corner radius ~18%
            r = int(size * 0.20)
            draw.rounded_rectangle([1, 1, size - 2, size - 2], radius=r, fill=(255, 255, 255, 255), outline=border_color, width=max(1, int(size * 0.02)))
        
        # Fit logo inside badge with padding
        inner_max_w = int(size * (1.0 - 2 * padding_ratio))
        inner_max_h = int(size * (1.0 - 2 * padding_ratio))
        
        # Maintain aspect ratio
        ratio = min(inner_max_w / src.width, inner_max_h / src.height)
        new_w = int(src.width * ratio)
        new_h = int(src.height * ratio)
        
        resized_logo = src.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Center horizontally and vertically
        offset_x = (size - new_w) // 2
        offset_y = (size - new_h) // 2
        
        img.paste(resized_logo, (offset_x, offset_y), resized_logo)
        return img

    # Generate circle badge favicons
    icon_512 = make_badge(512, padding_ratio=0.16)
    icon_192 = make_badge(192, padding_ratio=0.16)
    icon_180 = make_badge(180, padding_ratio=0.16)
    icon_96 = make_badge(96, padding_ratio=0.16)
    icon_48 = make_badge(48, padding_ratio=0.16)
    icon_32 = make_badge(32, padding_ratio=0.15)
    icon_16 = make_badge(16, padding_ratio=0.14)

    # Save to public directory
    icon_192.save('public/favicon-192x192.png', 'PNG')
    icon_96.save('public/favicon-96x96.png', 'PNG')
    icon_48.save('public/favicon-48x48.png', 'PNG')
    icon_180.save('public/apple-touch-icon.png', 'PNG')
    
    # Save multi-size favicon.ico (contains 16, 32, 48)
    icon_48.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    
    # Also save a crisp 64x64 for toplinkers-logo-sm.png
    icon_64 = make_badge(64, padding_ratio=0.12)
    icon_64.save('public/toplinkers-logo-sm.png', 'PNG')

    # Generate high-contrast SVG favicon with embedded high-res badge
    buffered = io.BytesIO()
    icon_192.save(buffered, format="PNG")
    b64_png = base64.b64encode(buffered.getvalue()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="30" fill="#ffffff" stroke="#CBD5E1" stroke-width="1.5"/>
  <image href="data:image/png;base64,{b64_png}" x="0" y="0" width="64" height="64"/>
</svg>
'''
    with open('public/favicon.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print("✅ Generated all high-contrast white-badge favicons and icons!")

if __name__ == '__main__':
    generate_badges()
