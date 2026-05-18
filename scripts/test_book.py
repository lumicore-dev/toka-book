import os
import re
import subprocess
import sys
from pathlib import Path

def extract_toka_blocks(markdown_text):
    blocks = []
    in_block = False
    current_block = []
    for line in markdown_text.splitlines():
        if line.strip() == '```toka':
            in_block = True
            current_block = []
        elif line.strip() == '```' and in_block:
            in_block = False
            blocks.append('\n'.join(current_block))
        elif in_block:
            current_block.append(line)
    return blocks

def prepare_code(code):
    lines = code.splitlines()
    imports = []
    shapes_or_globals = []
    body = []
    
    has_fn_main = False
    has_any_fn = False
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('import '):
            imports.append(line)
        elif stripped.startswith('shape ') or stripped.startswith('struct ') or stripped.startswith('pub shape ') or stripped.startswith('impl '):
            shapes_or_globals.append(line)
        else:
            if re.match(r'^(pub\s+)?fn\s+main\b', stripped):
                has_fn_main = True
            if re.match(r'^(pub\s+)?fn\s+', stripped):
                has_any_fn = True
            body.append(line)
            
    final_code = '\n'.join(imports) + '\n\n'
    
    if has_fn_main:
        final_code += '\n'.join(shapes_or_globals) + '\n' + '\n'.join(body)
    elif has_any_fn:
        final_code += '\n'.join(shapes_or_globals) + '\n' + '\n'.join(body)
        final_code += '\n\nfn main() {}\n'
    else:
        final_code += '\n'.join(shapes_or_globals) + '\n\n'
        final_code += 'fn main() {\n'
        for line in body:
            final_code += '    ' + line + '\n'
        final_code += '}\n'
        
    return final_code

def main():
    src_dir = Path('src')
    if not src_dir.exists():
        print("Error: 'src' directory not found.")
        sys.exit(1)

    md_files = list(src_dir.rglob('*.md'))
    
    failed = False
    total_blocks = 0
    
    for md_file in md_files:
        content = md_file.read_text(encoding='utf-8')
        blocks = extract_toka_blocks(content)
        
        for i, block in enumerate(blocks):
            if '{{#include' in block:
                continue
                
            total_blocks += 1
            code = prepare_code(block)
            test_file = Path(f'/tmp/test_book_{md_file.stem}_{i}.tk')
            test_file.write_text(code, encoding='utf-8')
            
            env = os.environ.copy()
            # Try to resolve relative to tokac binary if possible, or use current lib
            env['TOKA_LIB'] = os.path.abspath(os.path.join(os.path.dirname(subprocess.run(['which', 'tokac'], capture_output=True, text=True).stdout.strip()), '../../lib'))
            
            result = subprocess.run(['tokac', str(test_file)], capture_output=True, text=True, env=env)
            if result.returncode != 0:
                print(f"❌ Failed to compile snippet {i+1} in {md_file}")
                print("-" * 40)
                print("Original block:")
                print(block)
                print("-" * 40)
                print("Compiler output:")
                print(result.stderr or result.stdout)
                print("=" * 40)
                failed = True
            else:
                print(f"✅ Snippet {i+1} in {md_file} passed.")
                
    if failed:
        sys.exit(1)
    else:
        print(f"🎉 All {total_blocks} snippets compiled successfully!")

if __name__ == '__main__':
    main()
