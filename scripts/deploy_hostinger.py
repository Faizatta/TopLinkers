import os
import sys
import ftplib
import ssl

def safe_cwd_multi(ftps, path):
    """Navigate multi-level path segment by segment safely on any FTP daemon."""
    if not path or path == '.' or path == '/':
        return
    segments = [s for s in path.strip('/').split('/') if s]
    for seg in segments:
        print(f"  📂 Entering segment: {seg}")
        ftps.cwd(seg)

def upload_folder_recursive(ftps, local_dir):
    """Uploads local_dir into current FTP working directory."""
    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        if os.path.isdir(local_path):
            try:
                ftps.mkd(item)
            except Exception:
                pass # Already exists
            ftps.cwd(item)
            upload_folder_recursive(ftps, local_path)
            ftps.cwd('..')
        else:
            with open(local_path, 'rb') as f:
                ftps.storbinary(f"STOR {item}", f)
                size_kb = round(os.path.getsize(local_path) / 1024, 1)
                print(f"    ⬆️ {item} ({size_kb} KB)")

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
    print(f"✅ Logged in! Root is: {initial_root}")

    root_items = [f.strip() for f in ftps.nlst()]
    print(f"Root items: {root_items}")

    # Find the real website root
    targets_to_update = []

    # Check domains directory
    if 'domains' in root_items:
        try:
            ftps.cwd('domains')
            domains = [d for d in ftps.nlst() if d not in ['.', '..']]
            print(f"Domains found: {domains}")
            for d in domains:
                # Check if public_html exists inside this domain
                try:
                    ftps.cwd(d)
                    if 'public_html' in ftps.nlst():
                        targets_to_update.append(f"domains/{d}/public_html")
                    ftps.cwd('..')
                except Exception as e:
                    print(f"Error checking domain {d}: {e}")
            ftps.cwd(initial_root)
        except Exception as e:
            print("Error inspecting domains:", e)
            ftps.cwd(initial_root)

    # Check top-level public_html
    if 'public_html' in root_items:
        targets_to_update.append('public_html')

    # If root contains index.html, root is also a target
    if 'index.html' in root_items or 'default.php' in root_items:
        targets_to_update.append('')

    # Deduplicate
    unique_targets = []
    for t in targets_to_update:
        if t not in unique_targets:
            unique_targets.append(t)

    print(f"\n🎯 Targets to deploy: {unique_targets}")

    dist_dir = os.path.abspath('dist')
    if not os.path.exists(dist_dir):
        print(f"❌ Error: {dist_dir} does not exist.")
        sys.exit(1)

    for target in unique_targets:
        print(f"\n==========================================")
        print(f"🚀 Deploying to: '{target or initial_root}'")
        print(f"==========================================")
        
        ftps.cwd(initial_root)
        safe_cwd_multi(ftps, target)
        
        target_pwd = ftps.pwd()
        print(f"Verified PWD: {target_pwd}")
        
        upload_folder_recursive(ftps, dist_dir)
        print(f"✅ Successfully deployed all files to {target_pwd}")

    ftps.quit()
    print("\n🎉 ALL DEPLOYMENTS FINISHED SUCCESSFULLY!")

if __name__ == '__main__':
    main()
