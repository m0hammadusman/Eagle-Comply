"""
Fix all hardcoded /assets/images/ and /images/ paths in JSX and JS files.
Replace them with import.meta.env.BASE_URL aware versions.
"""
import os, re

PROJECT = r"C:\Users\Administrator\Documents\eagle-compliance\eagle-compliance\src"

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    content = original

    # Fix: src={something.image} -> src={(something.image||'').startsWith('/') ? import.meta.env.BASE_URL+(something.image||'').slice(1) : (something.image||'')}
    # But safer to just fix the fallback strings and the data values
    
    # Fix fallback strings like: || '/assets/images/foo.jpg'
    content = re.sub(
        r"\|\| '(/assets/images/[^']+)'",
        lambda m: "|| `${import.meta.env.BASE_URL}" + m.group(1).lstrip('/') + "`",
        content
    )
    content = re.sub(
        r'\|\| "(/assets/images/[^"]+)"',
        lambda m: '|| `${import.meta.env.BASE_URL}' + m.group(1).lstrip('/') + '`',
        content
    )

    # Fix: src={variable.image} -> src={variable.image ? (variable.image.startsWith('/') ? import.meta.env.BASE_URL+variable.image.slice(1) : variable.image) : ''}
    # Do this for common patterns found:
    def fix_image_src(m):
        expr = m.group(1)
        return f'src={{({expr}||"").startsWith("/") ? import.meta.env.BASE_URL+({expr}||"").slice(1) : ({expr}||"")}}'
    
    # Match src={xxx.image} patterns  
    content = re.sub(
        r'src=\{([a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*\.image)\}',
        fix_image_src,
        content
    )

    # Match src={xxx[yyy].image} patterns
    content = re.sub(
        r'src=\{([a-zA-Z_$][a-zA-Z0-9_$]*\[[^\]]+\]\.image)\}',
        fix_image_src,
        content
    )

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {path}")
    else:
        print(f"No change: {path}")

for root, dirs, files in os.walk(PROJECT):
    for f in files:
        if f.endswith('.jsx') or f.endswith('.js'):
            fix_file(os.path.join(root, f))

# Also fix complianceData.js data values
DATA_FILE = r"C:\Users\Administrator\Documents\eagle-compliance\eagle-compliance\src\data\complianceData.js"
with open(DATA_FILE, 'r', encoding='utf-8') as f:
    data = f.read()

# The data file has string values like "/assets/images/..." - we need these to be relative
# Change them to relative paths (remove leading slash) since BASE_URL already has trailing slash
data_fixed = re.sub(r'"(/assets/images/[^"]+)"', lambda m: '"' + m.group(1).lstrip('/') + '"', data)
data_fixed = re.sub(r'"(/images/[^"]+)"', lambda m: '"' + m.group(1).lstrip('/') + '"', data_fixed)

if data_fixed != data:
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(data_fixed)
    print(f"Fixed data paths in: {DATA_FILE}")
