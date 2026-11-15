import os
import sys
import ftplib
import ssl

def main():
    raw_server = os.environ.get('FTP_SERVER', '')
    server = raw_server.replace('ftp://', '').replace('ftps://', '').replace('http://', '').replace('https://', '').strip(' /')
    user = os.environ.get('FTP_USER', '')
    pwd = os.environ.get('FTP_PASS', '')

    if not server or not user or not pwd:
        print("❌ Error: Missing FTP_SERVER, FTP_USER, or FTP_PASS environment variables.")
        sys.exit(1)

    print(f"Connecting to Hostinger FTPS: {server}:21 as {user}...")
    ftps = ftplib.FTP_TLS()
    ftps.connect(server, 21, timeout=30)
    ftps.auth()
    ftps.login(user, pwd)
    ftps.prot_p()

    initial_pwd = ftps.pwd()
    print(f"✅ Connected! Starting directory: {initial_pwd}")
    
    root_items = [f.strip() for f in ftps.nlst()]
    print(f"📂 Root items found: {root_items}")

    # Discover all possible web root destinations
    candidates = []

    # 1. Is root itself containing index.html or assets?
    if any(f in [i.lower() for i in root_items] for f in ['index.html', 'default.php']):
        candidates.append('')

    # 2. Check public_html
    if 'public_html' in root_items:
        candidates.append('public_html')

    # 3. Check domains/*
    if 'domains' in root_items:
        try:
            dom_list = ftps.nlst('domains')
            print(f"Domains folder listing: {dom_list}")
            for d in dom_list:
                candidates.append(f"{d}/public_html")
        except Exception as e:
            print("Notice scanning domains:", e)

    # De-duplicate while preserving order
    unique_targets = []
    for c in candidates:
        if c not in unique_targets:
            unique_targets.append(c)

    print(f"\n🎯 Target deployment paths identified: {unique_targets}")

    dist_dir = os.path.abspath('dist')
    if not os.path.exists(dist_dir):
        print(f"❌ Error: {dist_dir} does not exist.")
        sys.exit(1)

    summary_lines = [
        f"### Hostinger FTPS Deployment Report",
        f"- **FTP Server**: `{server}`",
        f"- **FTP User**: `{user}`",
        f"- **Target Directories**: `{unique_targets}`",
        f""
    ]

    for target in unique_targets:
        print(f"\n==========================================")
        print(f"🚀 Deploying to: '{target or '/'}' ...")
        print(f"==========================================")
        
        # Go back to initial root first
        ftps.cwd(initial_pwd)
        if target:
            try:
                ftps.cwd(target)
            except Exception as e:
                print(f"Failed to cwd to {target}: {e}")
                continue

        current_dir = ftps.pwd()
        print(f"Currently inside: {current_dir}")

        def upload_directory(local_path, remote_sub=""):
            for item in os.listdir(local_path):
                local_item = os.path.join(local_path, item)
                remote_item = f"{remote_sub}/{item}".strip('/') if remote_sub else item

                if os.path.isdir(local_item):
                    try:
                        ftps.mkd(remote_item)
                    except Exception:
                        pass
                    upload_directory(local_item, remote_item)
                else:
                    with open(local_item, 'rb') as f:
                        cmd = f"STOR {remote_item}"
                        ftps.storbinary(cmd, f)
                        print(f"  ⬆️ Uploaded {remote_item}")

        upload_directory(dist_dir)
        summary_lines.append(f"- ✅ Synced all files to `{current_dir}`")

    ftps.quit()
    print("\n🎉 ALL DEPLOYMENTS COMPLETED SUCCESSFULLY!")

    # Write summary for GitHub Actions
    summary_file = os.environ.get('GITHUB_STEP_SUMMARY')
    if summary_file:
        with open(summary_file, 'a', encoding='utf-8') as f:
            f.write("\n".join(summary_lines) + "\n")

if __name__ == '__main__':
    main()
