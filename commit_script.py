import os
import subprocess
import random
from datetime import datetime, timedelta

def run_cmd(cmd):
    subprocess.run(cmd, shell=True, check=True)

# Generate a list of dates between Aug 17 09:00:00 and Aug 21 18:00:00
def get_random_date():
    start = datetime(2026, 8, 17, 9, 0, 0)
    end = datetime(2026, 8, 21, 18, 0, 0)
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start + timedelta(seconds=random_second)

def generate_commit_message(filepath):
    filename = os.path.basename(filepath)
    name, ext = os.path.splitext(filename)
    
    if ext in ['.png', '.jpg', '.jpeg', '.svg']:
        return f"add {name.replace('-', ' ')} image"
    elif ext in ['.jsx', '.js']:
        return f"implement {name} component and logic"
    elif ext in ['.css']:
        return f"add styling for {name}"
    elif filename == 'package.json' or filename == 'package-lock.json':
        return f"configure {filename} dependencies"
    elif ext == '.md':
        return f"update {name} documentation"
    elif ext == '.html':
        return f"setup {name} template"
    else:
        return f"add {filename}"

def main():
    # Ensure we are in the right directory
    os.chdir(r"C:\Users\Administrator\Documents\eagle-compliance\eagle-compliance")
    
    # Get all untracked and modified files
    result = subprocess.run(["git", "status", "--porcelain", "-uall"], capture_output=True, text=True)
    lines = result.stdout.split('\n')
    
    files_to_commit = []
    for line in lines:
        if line.strip():
            # git status porcelain format: "?? filename" or " M filename"
            status = line[:2]
            filepath = line[3:]
            
            # Handle quoted paths (if any space or special chars)
            if filepath.startswith('"') and filepath.endswith('"'):
                filepath = filepath[1:-1]
            
            # Skip node_modules and dist if they appear
            if "node_modules" in filepath or "dist" in filepath or ".git" in filepath or "commit_script.py" in filepath:
                continue
                
            files_to_commit.append(filepath)
    
    # Sort files somewhat logically (config first, then src, then images, etc.)
    # We can just sort alphabetically, but let's assign times sequentially
    files_to_commit.sort()
    
    # Sort timestamps
    dates = [get_random_date() for _ in range(len(files_to_commit))]
    dates.sort()
    
    for i, filepath in enumerate(files_to_commit):
        if not os.path.exists(filepath):
            continue # Might have been a deleted file or something
            
        commit_msg = generate_commit_message(filepath)
        commit_date = dates[i].strftime("%a %b %d %H:%M:%S %Y %z")
        
        print(f"Committing: {filepath} with msg: '{commit_msg}' at {commit_date}")
        
        try:
            # Stage file
            run_cmd(f'git add "{filepath}"')
            # Commit with date
            # Setting GIT_AUTHOR_DATE and GIT_COMMITTER_DATE in env
            env = os.environ.copy()
            env['GIT_AUTHOR_DATE'] = commit_date
            env['GIT_COMMITTER_DATE'] = commit_date
            
            subprocess.run(['git', 'commit', '-m', commit_msg], env=env, check=True)
        except Exception as e:
            print(f"Error committing {filepath}: {e}")
            
    # Set the main branch branch name
    try:
        run_cmd("git branch -M main")
    except:
        pass

if __name__ == '__main__':
    main()
