import os
from PIL import Image

def optimize_images():
    img_dir = r'C:\Users\faiiz\.gemini\antigravity\scratch\topliker\public\images'
    if not os.path.exists(img_dir):
        print(f"Directory {img_dir} does not exist.")
        return

    files = [f for f in os.listdir(img_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
    print(f"Found {len(files)} images to audit and compress...")

    for fname in files:
        fpath = os.path.join(img_dir, fname)
        size_kb = os.path.getsize(fpath) / 1024

        # For images over 150KB, compress them while preserving quality
        if size_kb > 150:
            try:
                img = Image.open(fpath)
                orig_mode = img.mode
                
                # Check dimensions
                w, h = img.size
                max_w = 1920
                if w > max_w:
                    new_h = int(h * (max_w / w))
                    img = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
                
                if fname.lower().endswith('.webp'):
                    img.save(fpath, 'WEBP', quality=82, method=6)
                elif fname.lower().endswith(('.jpg', '.jpeg')):
                    if orig_mode in ('RGBA', 'P'):
                        img = img.convert('RGB')
                    img.save(fpath, 'JPEG', quality=82, optimize=True)
                
                new_size_kb = os.path.getsize(fpath) / 1024
                reduction = round(((size_kb - new_size_kb) / size_kb) * 100, 1)
                print(f"  ⚡ {fname}: {round(size_kb, 1)} KB -> {round(new_size_kb, 1)} KB (-{reduction}%)")
            except Exception as e:
                print(f"  ⚠️ Error optimizing {fname}: {e}")

if __name__ == '__main__':
    optimize_images()
