# Status Skill

A Claude Code skill to check the current git branch status and display all pending changes, staged files, and untracked files.

## Overview

The `status` skill provides a quick overview of:
1. Current branch name
2. Tracking status (ahead/behind main)
3. Staged changes ready for commit
4. Unstaged modifications
5. Untracked files
6. Conflict indicators
7. Stash status

## Usage

```
/status [--verbose] [--untracked] [--all]
```

### Parameters

- **--verbose** (optional): Show detailed change statistics and file modifications
- **--untracked** (optional): Include untracked files in output
- **--all** (optional): Show all information including ignored files
- No parameters: Shows concise summary of current state

## Workflow Steps

### 1. Get Current Branch
- Displays the current active branch name
- Shows if detached HEAD state
- Indicates default upstream tracking branch
- Example: `git rev-parse --abbrev-ref HEAD`

### 2. Check Branch Tracking
- Shows commits ahead of main/master
- Shows commits behind main/master
- Displays divergence status
- Example: `git rev-list --left-right --count origin/main...HEAD`

### 3. Display Staged Changes
- Lists all files staged for commit
- Shows modification type (added, modified, deleted, renamed)
- Displays file paths
- Example: `git diff --cached --name-status`

### 4. Show Unstaged Changes
- Lists all modified but unstaged files
- Shows which files have changes
- Indicates file modification status
- Example: `git diff --name-status`

### 5. List Untracked Files
- Displays new files not yet tracked by git
- Excludes files in .gitignore
- Shows file count
- Example: `git ls-files --others --exclude-standard`

### 6. Detect Merge Conflicts
- Identifies files with merge conflicts
- Shows conflict resolution status
- Alerts if in middle of merge/rebase
- Example: `git ls-files --unmerged`

### 7. Check Stash Status
- Shows if there are stashed changes
- Displays stash count
- Lists recent stash entries
- Example: `git stash list`

## Examples

### Basic Status Check
```bash
/status
```
**Output:**
```
Current Branch: feature/add-auth
Status: 2 commits ahead of main

Staged Changes (2 files):
  M  src/auth/login.js
  A  src/auth/middleware.js

Unstaged Changes (1 file):
  M  src/config.js

Untracked Files (1 file):
  ?  .env.local
```

### Verbose Status
```bash
/status --verbose
```
**Output:**
```
Current Branch: feature/add-auth
Remote: origin/feature/add-auth
Status: 2 commits ahead of main, 0 behind

Staged Changes (2 files):
  M  src/auth/login.js        (+45 lines, -12 lines)
  A  src/auth/middleware.js   (+78 lines)

Unstaged Changes (1 file):
  M  src/config.js            (+5 lines, -2 lines)

Untracked Files (1 file):
  ?  .env.local

Stash Status: 0 stashed changes
```

### Include Untracked Files
```bash
/status --untracked
```

### Complete Information
```bash
/status --all
```

## Output Format

### Staged Section
Shows files ready to commit with format:
```
[Status Code] [File Path]
```

Status codes:
- `A` = Added (new file)
- `M` = Modified (changed)
- `D` = Deleted (removed)
- `R` = Renamed
- `C` = Copied
- `T` = Type change (e.g., file → symlink)

### Unstaged Section
Shows modified files not yet staged:
```
M  filename.js
?? new-file.js
D  deleted-file.js
```

### Branch Information
```
Current Branch: branch-name
Upstream: origin/branch-name
Status: X commits ahead, Y commits behind
```

## Status Indicators

### Branch Status
- `master/main` = On main branch
- `feature/name` = On feature branch
- `fix/name` = On bug fix branch
- `(detached HEAD at SHA)` = Detached state

### File Status
- `M` = Modified
- `A` = Added
- `D` = Deleted
- `??` = Untracked
- `UU` = Both modified (merge conflict)
- `DD` = Both deleted (merge conflict)

### Repository Status
- `Clean` = No changes
- `Dirty` = Has staged or unstaged changes
- `Unmerged` = In progress merge/rebase
- `Stashed` = Changes in stash

## Prerequisites

- Git repository initialized
- At least one commit in history
- Git properly configured with user name and email

## Configuration

The skill uses settings from `settings.claude.json`:
- `skillOverrides.status`: Set to `"on"` to enable the skill
- Bash permissions for git commands required

## Use Cases

### Before Committing
Check what changes are staged and ready to commit:
```bash
/status
# Verify staged changes before running /create-pr
```

### Resolving Merge Conflicts
Check which files need conflict resolution:
```bash
/status --verbose
# Shows UU (unmerged) files requiring manual resolution
```

### Cleaning Up Workspace
Identify untracked files and unstaged changes:
```bash
/status --untracked
# Decide which files to add, commit, or clean
```

### Before Pushing
Verify branch status and commits:
```bash
/status
# Check commits ahead before pushing to remote
```

### Syncing with Main
Check divergence from main branch:
```bash
/status --verbose
# Shows commits ahead/behind for decision on rebase/merge
```

## Advanced Features

### Color-Coded Output
- Green: Staged changes (ready to commit)
- Red: Unstaged changes (needs staging)
- Yellow: Untracked files (needs .gitignore or add)
- White: Branch and general info

### Summary Statistics
- Total files changed
- Total lines added/removed
- Commit count ahead/behind
- Stash count

### Quick Actions Suggestions
Based on status, skill suggests:
- "Run `git add` to stage changes"
- "Run `git commit` to commit staged changes"
- "Run `git push` to push commits"
- "Run `git pull` to sync with remote"

## Error Handling

- **Not a Git Repository**: Shows clear error message
- **Detached HEAD**: Alerts user with SHA and suggests checkout
- **Merge/Rebase in Progress**: Shows conflict files and resolution status
- **Upstream Not Found**: Notes if upstream branch is missing

## Tips

1. **Use Before Committing**: Always run status before creating PR
2. **Regular Checks**: Check status frequently during development
3. **Watch File Count**: Large numbers of untracked files may indicate .gitignore issues
4. **Branch Awareness**: Pay attention to current branch before making changes
5. **Resolve Conflicts Early**: Address merge conflicts as soon as they appear
6. **Clean Up Stashes**: Regularly review and clean old stashes

## Keyboard Shortcut

Configure in keybindings for quick access:
```json
{
  "key": "ctrl+alt+g",
  "command": "skill.run",
  "args": ["status"]
}
```

## Related Commands

- `/create-pr`: Create a pull request with current changes
- `/review-pr`: Review an existing pull request
- `/merge-pr`: Merge an approved pull request
- `git add`: Stage specific files
- `git commit`: Create a commit
- `git push`: Push commits to remote
- `git pull`: Fetch and merge remote changes

## Integration with Other Skills

Works seamlessly with:
- **create-pr**: Check status before creating PR
- **review-pr**: Verify local changes before reviewing
- **merge-pr**: Confirm clean status before merging

## Common Workflows

### Workflow 1: Prepare for PR
```bash
/status                    # Check changes
git add .                  # Stage changes (if needed)
/status                    # Verify staged changes
/create-pr branch "Title"  # Create pull request
```

### Workflow 2: Sync with Main
```bash
/status                    # Check commits ahead/behind
git pull origin main       # Sync with main
/status                    # Verify merge result
```

### Workflow 3: Resolve Conflicts
```bash
/status --verbose          # Show conflicted files
# Fix conflicts manually
/status                    # Verify conflict resolution
git add .                  # Stage resolved files
git commit -m "Resolve..."  # Complete merge
```

### Workflow 4: Cleanup Workspace
```bash
/status --all              # Show all changes and untracked files
git add .                  # Stage wanted changes
git clean -fd              # Remove untracked files
/status                    # Verify clean state
```
