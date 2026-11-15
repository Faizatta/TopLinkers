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

def find_file_locations(ftps, target_name, depth=0, max_depth=4):
    """Recursively search for a specific filename across the FTP account."""
    if depth > max_depth:
        return []
    locations = []
    current_dir = ftps.pwd()
    try:
        items = [i for i in ftps.nlst() if i not in ['.', '..']]
    except Exception as e:
        print(f"Error listing {current_dir}: {e}")
        return []

    # Check if target file is in this directory
    for item in items:
        clean_item = os.path.basename(item)
        if clean_item.lower() == target_name.lower():
            locations.append(current_dir)

    # Search subdirectories
    for item in items:
        clean_item = os.path.basename(item)
        if clean_item.startswith('.'):
            continue
        try:
            ftps.cwd(clean_item)
            sub_locations = find_file_locations(ftps, target_name, depth + 1, max_depth)
            locations.extend(sub_locations)
            ftps.cwd('..')
        except Exception:
            pass

    return list(set(locations))

def upload_folder_recursive(ftps, local_dir):
    """Recursively upload local_dir contents into the current FTP working directory."""
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
    print(f"✅ Connected! FTP Root is: {initial_root}")

    # Gather explicit paths
    explicit_targets = []
    
    # Check domains directory
    try:
        ftps.cwd('/')
        root_items = [os.path.basename(f.strip()) for f in ftps.nlst() if f not in ['.', '..']]
        print(f"Root items: {root_items}")
        
        if 'public_html' in root_items:
            explicit_targets.append('/public_html')
            
        if 'domains' in root_items:
            ftps.cwd('domains')
            domains = [os.path.basename(d.strip()) for d in ftps.nlst() if d not in ['.', '..']]
            print(f"Domains detected: {domains}")
            for d in domains:
                try:
                    ftps.cwd(d)
                    dom_items = [os.path.basename(x.strip()) for x in ftps.nlst()]
                    if 'public_html' in dom_items:
                        explicit_targets.append(f"/domains/{d}/public_html")
                    ftps.cwd('..')
                except Exception as e:
                    print(f"Error checking domain {d}: {e}")
            ftps.cwd('/')
    except Exception as e:
        print(f"Notice inspecting explicit paths: {e}")

    # Search for where index.html or toplinkers-logo-sm.png is currently located
    print("\n🔍 Recursively searching server for existing website directories...")
    ftps.cwd('/')
    found_logo_dirs = find_file_locations(ftps, 'toplinkers-logo-sm.png')
    ftps.cwd('/')
    found_html_dirs = find_file_locations(ftps, 'index.html')
    ftps.cwd('/')

    print(f"Directories containing toplinkers-logo-sm.png: {found_logo_dirs}")
    print(f"Directories containing index.html: {found_html_dirs}")
    print(f"Explicit target directories: {explicit_targets}")

    # Combine all found directories
    all_targets = list(set(explicit_targets + found_logo_dirs + found_html_dirs))
    
    # Filter targets to make sure we don't deploy to non-web folders
    targets = [t for t in all_targets if t and not t.startswith('/.') and '/.trash' not in t]
    
    if not targets:
        targets.append(initial_root)

    print(f"\n🎯 FINAL Target Web Directories to Overwrite: {targets}")

    dist_dir = os.path.abspath('dist')
    if not os.path.exists(dist_dir):
        print(f"❌ Error: {dist_dir} does not exist.")
        sys.exit(1)

    for target in targets:
        print(f"\n==========================================")
        print(f"🚀 Overwriting live directory: {target}")
        print(f"==========================================")
        
        safe_cwd_multi(ftps, target)
        current_pwd = ftps.pwd()
        print(f"Verified PWD: {current_pwd}")
        
        upload_folder_recursive(ftps, dist_dir)
        
        # Verify uploaded files in this directory
        try:
            logo_size = ftps.size('toplinkers-logo-sm.png')
            print(f"🔍 Verification: toplinkers-logo-sm.png size on server = {logo_size} bytes")
        except Exception as e:
            print(f"Size verification note: {e}")
            
        print(f"✅ Successfully updated {current_pwd} with latest build!")

    ftps.quit()
    print("\n🎉 ALL LIVE SITES UPDATED SUCCESSFULLY!")

if __name__ == '__main__':
    main()
