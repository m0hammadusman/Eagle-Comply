import os, re

SRC_DIR = r"C:\Users\Administrator\Documents\eagle-compliance\eagle-compliance\src"

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace '/assets/images/...' with `${import.meta.env.BASE_URL}assets/images/...`
    # Replace "/assets/images/..." with `${import.meta.env.BASE_URL}assets/images/...`
    new_content = re.sub(
        r"(['\"])/assets/images/([^'\"]+)(['\"])",
        r"`${import.meta.env.BASE_URL}assets/images/\2`",
        content
    )

    # Also replace any remaining '/images/team/...'
    new_content = re.sub(
        r"(['\"])/images/team/([^'\"]+)(['\"])",
        r"`${import.meta.env.BASE_URL}images/team/\2`",
        new_content
    )

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {file_path}")

for root, dirs, files in os.walk(SRC_DIR):
    for f in files:
        if f.endswith('.jsx') or f.endswith('.js'):
            process_file(os.path.join(root, f))
