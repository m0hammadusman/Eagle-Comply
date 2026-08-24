import os
import re

def fix_jsx_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix hardcoded src="/..."
    # Matches src="/some/path.png" and changes to src={`${import.meta.env.BASE_URL}some/path.png`}
    content = re.sub(r'src="/([^"]+\.(?:png|jpg|jpeg|svg|mp4))"', r'src={`${import.meta.env.BASE_URL}\1`}', content)

    # Fix variables that might contain absolute paths, e.g., src={member.photo}
    # This is trickier, we can just look for specific known variables or just apply to all src={...}
    # For now, let's just do it manually for known ones: member.photo, leadExpert.photo, exp.photo
    content = re.sub(r'src=\{member\.photo\}', r'src={member.photo.startsWith("/") ? import.meta.env.BASE_URL + member.photo.slice(1) : member.photo}', content)
    content = re.sub(r'src=\{leadExpert\.photo\}', r'src={leadExpert.photo.startsWith("/") ? import.meta.env.BASE_URL + leadExpert.photo.slice(1) : leadExpert.photo}', content)
    content = re.sub(r'src=\{exp\.photo\}', r'src={exp.photo.startsWith("/") ? import.meta.env.BASE_URL + exp.photo.slice(1) : exp.photo}', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    src_dir = r"C:\Users\Administrator\Documents\eagle-compliance\eagle-compliance\src"
    for root, dirs, files in os.walk(src_dir):
        for f in files:
            if f.endswith('.jsx'):
                fix_jsx_file(os.path.join(root, f))

if __name__ == '__main__':
    main()
