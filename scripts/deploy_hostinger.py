import os
import sys
import ftplib

IMMUTABLE_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.ico', '.woff2', '.woff', '.ttf', '.pdf'}

def safe_cwd_multi(ftps, path):
    """Navigate to target path segment by segment starting from root."""
    if not path or path == '.' or path == '/':
        try:
            ftps.cwd('/')
        except Exception:
            pass
        return

    try:
        ftps.cwd('/')
    except Exception as e:
        print(f"Warning returning to root: {e}")

    parts = [p.strip() for p in path.replace('\\', '/').split('/') if p.strip()]
    for part in parts:
        ftps.cwd(part)

def get_remote_directory_map(ftps):
    """Return dict of {filename: size} for files in current remote working directory."""
    remote_map = {}
    try:
        for name, facts in ftps.mlsd():
            if facts.get('type') == 'file':
                try:
                    remote_map[name] = int(facts.get('size', -1))
                except Exception:
                    remote_map[name] = -1
            elif facts.get('type') == 'dir':
                remote_map[name] = 'DIR'
    except Exception:
        try:
            items = ftps.nlst()
            for it in items:
                base = os.path.basename(it.strip())
                remote_map[base] = -1
        except Exception:
            pass
    return remote_map

def upload_folder_recursive(ftps, local_dir, is_assets=False):
    """Recursively upload local_dir contents into current FTP working directory with smart caching."""
    remote_map = get_remote_directory_map(ftps)
    items = os.listdir(local_dir)

    # Prioritize uploading 'assets' and 'fonts' directories first so dependencies exist before HTML
    def sort_key(name):
        p = os.path.join(local_dir, name)
        if name in ('assets', 'fonts'):
            return 0
        if os.path.isdir(p):
            return 1
        return 2

    items.sort(key=sort_key)
    skipped_count = 0

    for item in items:
        local_path = os.path.join(local_dir, item)
        if os.path.isdir(local_path):
            try:
                ftps.mkd(item)
            except Exception:
                pass
            ftps.cwd(item)
            upload_folder_recursive(ftps, local_path, is_assets=(is_assets or item == 'assets'))
            ftps.cwd('..')
        else:
            local_size = os.path.getsize(local_path)
            _, ext = os.path.splitext(item.lower())

            # Skip immutable files (images, fonts) or hashed assets if remote size matches exactly
            can_skip = False
            if (ext in IMMUTABLE_EXTS or is_assets) and item in remote_map:
                rem_size = remote_map[item]
                if rem_size == -1:
                    try:
                        rem_size = ftps.size(item)
                    except Exception:
                        rem_size = -1
                if rem_size == local_size:
                    can_skip = True

            if can_skip:
                skipped_count += 1
                continue

            try:
                with open(local_path, 'rb') as f:
                    ftps.storbinary(f"STOR {item}", f, blocksize=65536)
                    size_kb = round(local_size / 1024, 1)
                    print(f"    ⬆️ {item} ({size_kb} KB)")
            except Exception as e:
                print(f"    ⚠️ Warning uploading {item}: {e}")

    if skipped_count > 0:
        print(f"    ⏩ Skipped {skipped_count} identical immutable assets in {os.path.basename(local_dir) or 'root'}")

def main():
    raw_server = os.environ.get('FTP_SERVER', '')
    server = raw_server.replace('ftp://', '').replace('ftps://', '').replace('http://', '').replace('https://', '').strip(' /')
    user = os.environ.get('FTP_USER', '')
    pwd = os.environ.get('FTP_PASS', '')

    if not server or not user or not pwd:
        print("❌ Error: Missing credentials.")
        sys.exit(1)

    print(f"Connecting to Hostinger FTPS: {server}:21 as {user}...")
    ftps = ftplib.FTP_TLS()
    ftps.connect(server, 21, timeout=60)
    ftps.auth()
    ftps.login(user, pwd)
    ftps.prot_p()

    initial_root = ftps.pwd()
    print(f"✅ Connected! FTP Root is: {initial_root}")

    # Gather explicit target directories
    targets = []
    try:
        ftps.cwd('/')
        root_items = [os.path.basename(f.strip()) for f in ftps.nlst() if f not in ['.', '..']]
        print(f"Root items: {root_items}")
        
        # 1. Top-level public_html
        if 'public_html' in root_items:
            targets.append('/public_html')
            
        # 2. Check domains/* subdirectories
        if 'domains' in root_items:
            ftps.cwd('domains')
            domains = [os.path.basename(d.strip()) for d in ftps.nlst() if d not in ['.', '..']]
            print(f"Domains detected: {domains}")
            for d in domains:
                try:
                    ftps.cwd(d)
                    dom_items = [os.path.basename(x.strip()) for x in ftps.nlst()]
                    if 'public_html' in dom_items:
                        targets.append(f"/domains/{d}/public_html")
                    ftps.cwd('..')
                except Exception as e:
                    print(f"Error checking domain {d}: {e}")
            ftps.cwd('/')
    except Exception as e:
        print(f"Notice inspecting paths: {e}")

    # If no targets found, fall back to initial_root
    if not targets:
        targets.append(initial_root)

    print(f"\n🎯 Target Web Directories to Update: {targets}")

    dist_dir = os.path.abspath('dist')
    if not os.path.exists(dist_dir):
        print(f"❌ Error: {dist_dir} does not exist.")
        sys.exit(1)

    for target in targets:
        print(f"\n==========================================")
        print(f"🚀 Updating live directory: {target}")
        print(f"==========================================")
        
        safe_cwd_multi(ftps, target)
        current_pwd = ftps.pwd()
        print(f"Verified PWD: {current_pwd}")
        
        upload_folder_recursive(ftps, dist_dir)
        print(f"✅ Successfully deployed all files to {current_pwd}")

    ftps.quit()
    print("\n🎉 ALL LIVE SITES UPDATED SUCCESSFULLY!")

if __name__ == '__main__':
    main()
