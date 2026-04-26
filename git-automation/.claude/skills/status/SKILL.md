---
name: status
description: Check current git branch status and changes
allowed-tools: Bash(git:*)
---

# Skill: /status

You are executing the `/status` skill to check the current git branch status.

## Arguments
Parse from the invocation:
- `--verbose` (optional): Show detailed statistics
- `--untracked` (optional): Include untracked files
- `--all` (optional): Show everything

## Steps

1. **Get current branch:**
   ```bash
   git rev-parse --abbrev-ref HEAD
   ```

2. **Check if repo has remote tracking:**
   ```bash
   git rev-list --left-right --count origin/main...HEAD 2>/dev/null || echo "0 0"
   ```

3. **Get staged changes:**
   ```bash
   git diff --cached --name-status
   ```

4. **Get unstaged changes:**
   ```bash
   git diff --name-status
   ```

5. **Get untracked files (if --untracked or --all):**
   ```bash
   git ls-files --others --exclude-standard
   ```

6. **Get stash count (if --verbose or --all):**
   ```bash
   git stash list | wc -l
   ```

7. **Display output in this format:**

```
Current Branch: <branch-name>
Status: <X commits ahead, Y behind> (or "Up to date")

Staged Changes (<count> file(s)):
  <status-code>  <file-path>
  (repeat for each)

Unstaged Changes (<count> file(s)):
  <status-code>  <file-path>
  (repeat for each)

Untracked Files (<count> file(s)):
  ?  <file-path>
  (repeat for each, only if --untracked or --all)

Stash Status: <count> stashed change(s)
```

## Examples

### Basic status:
```
/status
```

Output:
```
Current Branch: feature/auth
Status: 3 commits ahead, 0 behind

Staged Changes (2 files):
  M  src/auth.js
  A  middleware.js

Unstaged Changes (1 file):
  M  config.js

Stash Status: 0 stashed changes
```

### Verbose status:
```
/status --verbose
```

Includes stash count in output.

### With untracked files:
```
/status --untracked
```

Shows untracked files section.

## Error Handling

- **Not a git repository:** Display "Error: Not a git repository" and stop
- **Detached HEAD:** Show "Current Branch: (detached HEAD at <SHA>)"
- **No remote:** Show "Status: Local branch (no upstream tracking)"
