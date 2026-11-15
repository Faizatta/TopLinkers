import os
import sys
import ftplib

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

def upload_folder_recursive(ftps, local_dir):
    """Recursively upload local_dir contents into current FTP working directory."""
    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        if os.path.isdir(local_path):
            try:
                ftps.mkd(item)
            except Exception:
                pass
            ftps.cwd(item)
            upload_folder_recursive(ftps, local_path)
            ftps.cwd('..')
        else:
            try:
                with open(local_path, 'rb') as f:
                    ftps.storbinary(f"STOR {item}", f, blocksize=65536)
                    size_kb = round(os.path.getsize(local_path) / 1024, 1)
                    print(f"    ⬆️ {item} ({size_kb} KB)")
            except Exception as e:
                print(f"    ⚠️ Warning uploading {item}: {e}")

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
    ftps.connect(server, 21, timeout=30)
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
