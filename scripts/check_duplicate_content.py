import os
import glob

base_dir = r"C:\Users\faiiz\.gemini\antigravity\scratch\topliker"
home_vue = open(os.path.join(base_dir, "src", "pages", "HomePage.vue"), "r", encoding="utf-8").read()

pages = glob.glob(os.path.join(base_dir, "src", "pages", "**", "*.vue"), recursive=True)
print(f"Checking {len(pages)} Vue pages for repeated homepage content...")

snippets_to_check = [
    "Institutional Property Advisory & Engineering Excellence in Islamabad",
    "On-ground possession plots in TopCity-1, PECHS",
    "Why TopLinkers Is the Trusted Choice for Islamabad Real Estate",
    "Handpicked Properties For You",
    "Explore our top featured residential plots",
    "Find A Home That Fits Your Lifestyle"
]

for p in pages:
    if "HomePage.vue" in p:
        continue
    content = open(p, "r", encoding="utf-8").read()
    rel = os.path.relpath(p, base_dir)
    found = [s for s in snippets_to_check if s.lower() in content.lower()]
    if found:
        print(f"⚠️ Page {rel} contains homepage snippet: {found}")

print("Check finished.")
