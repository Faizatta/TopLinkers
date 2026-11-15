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

    # Determine correct public_html path
    target = ""
    if 'domains' in root_items:
        try:
            doms = ftps.nlst('domains')
            print(f"Found domains folder contents: {doms}")
            # Look for toplinkersgroup.com
            matching = [d for d in doms if 'toplinkersgroup' in d.lower()]
            if matching:
                target = f"{matching[0]}/public_html"
            elif doms:
                target = f"{doms[0]}/public_html"
        except Exception as e:
            print("Notice scanning domains:", e)

    if not target:
        if 'public_html' in root_items and 'index.html' not in root_items:
            target = 'public_html'

    if target:
        print(f"👉 Navigating to target directory: {target}")
        ftps.cwd(target)
    
    current_deploy_dir = ftps.pwd()
    print(f"🎯 Verified live web directory: {current_deploy_dir}")
    print(f"Existing files in target: {ftps.nlst()[:10]}...")

    dist_dir = os.path.abspath('dist')
    if not os.path.exists(dist_dir):
        print(f"❌ Error: {dist_dir} does not exist. Did npm run build succeed?")
        sys.exit(1)

    print(f"\n🚀 Beginning sync of {dist_dir} -> {current_deploy_dir} ...")

    def upload_directory(local_path, remote_sub=""):
        for item in os.listdir(local_path):
            local_item = os.path.join(local_path, item)
            remote_item = f"{remote_sub}/{item}".strip('/') if remote_sub else item

            if os.path.isdir(local_item):
                # Ensure directory exists on remote
                try:
                    ftps.mkd(remote_item)
                    print(f"📁 Created remote directory: {remote_item}")
                except Exception:
                    # Directory likely already exists
                    pass
                upload_directory(local_item, remote_item)
            else:
                # Upload file in binary mode
                with open(local_item, 'rb') as f:
                    cmd = f"STOR {remote_item}"
                    ftps.storbinary(cmd, f)
                    size_kb = round(os.path.getsize(local_item) / 1024, 1)
                    print(f"  ⬆️ Uploaded {remote_item} ({size_kb} KB)")

    upload_directory(dist_dir)
    print("\n🎉 ALL ASSETS SUCCESSFULLY DEPLOYED TO HOSTINGER!")
    ftps.quit()

if __name__ == '__main__':
    main()
