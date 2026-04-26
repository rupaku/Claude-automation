# View PR Skill

A Claude Code skill to display detailed information about a pull request, including metadata, files changed, commits, and discussion.

## Overview

The `view-pr` skill provides comprehensive PR information:
1. Pull request metadata (title, description, state)
2. Author and reviewer information
3. Branch details (source and target)
4. Files changed and diff statistics
5. Commits included in the PR
6. Comments and discussion
7. CI/CD status and checks
8. Labels, assignees, and milestones

## Usage

```
/view-pr <pr-number> [options]
```

### Parameters

- **pr-number** (required): The pull request number (e.g., `123`, `PR-456`)
- **--repo** (optional): Repository in format `owner/repo`. Defaults to current repository
- **--diff** (optional): Show full diff of changes
- **--comments** (optional): Display all comments and discussions
- **--commits** (optional): Show all commits in the PR
- **--checks** (optional): Display CI/CD status and check results
- **--all** (optional): Show all available information

## Workflow Steps

### 1. Fetch PR Metadata
- Retrieves PR number, title, and description
- Gets PR state (open, closed, merged, draft)
- Shows creation date and last update timestamp
- Displays author information and avatar
- Example: `gh pr view <PR-number> --json title,body,state,author,createdAt,updatedAt`

### 2. Display Branch Information
- Shows source branch name
- Shows target branch name
- Displays mergeable status
- Indicates if branch is synced with main
- Example: `gh pr view <PR-number> --json headRefName,baseRefName`

### 3. Show Files Changed
- Lists all modified files with paths
- Shows file change type (added, modified, deleted)
- Displays line statistics (additions, deletions)
- Calculates total changes summary
- Example: `gh pr view <PR-number> --json files`

### 4. Display Commits
- Lists all commits in the PR
- Shows commit messages
- Displays author and date for each commit
- Shows commit SHAs
- Example: `gh pr view <PR-number> --json commits`

### 5. Show Comments and Discussions
- Displays all comments in chronological order
- Shows review comments on specific lines
- Displays discussion threads
- Marks resolved vs unresolved discussions
- Example: `gh pr view <PR-number> --json comments,reviews`

### 6. Display CI/CD Status
- Shows test/check status (passed, failed, pending)
- Lists all status checks
- Displays deployment status
- Shows build logs link
- Example: `gh pr checks <PR-number>`

### 7. Show Labels and Metadata
- Displays PR labels (bug, feature, docs, etc.)
- Shows assignees
- Displays milestone if set
- Shows linked issues
- Example: `gh pr view <PR-number> --json labels,assignees,milestone`

## Examples

### Basic PR View
```bash
/view-pr 123
```
**Output:**
```
==================================================
PR #123: Add user authentication feature
==================================================

Status: OPEN
Author: john-doe
Created: 2024-04-15 10:30 UTC
Updated: 2024-04-20 14:45 UTC

Description:
This PR implements JWT-based user authentication with:
- Login and logout endpoints
- Session management
- Password hashing with bcrypt

Branches:
  From: feature/auth
  To:   main
  Status: ✓ Can merge (branch is up to date)

Files Changed: 8 files
  + 245 lines added
  - 32 lines deleted

Commits: 5
- feat: add auth middleware
- feat: add login endpoint
- feat: add logout endpoint
- fix: update password hashing
- docs: update auth documentation

Reviews: 2/3 approved
Checks: ✓ All checks passed

Labels: enhancement, feature
Assignees: jane-smith
```

### View with Full Diff
```bash
/view-pr 123 --diff
```
Shows all file modifications with complete diff output.

### View Comments and Discussions
```bash
/view-pr 123 --comments
```
**Output:**
```
Comments (8 total):

[1] john-doe commented 2024-04-15 10:35 UTC
    Ready for review! Please check the auth implementation.

[2] jane-smith commented 2024-04-16 09:20 UTC
    Great work! Just a few minor suggestions:
    - Consider adding rate limiting to login endpoint
    - Add error handling for edge cases

[3] john-doe replied 2024-04-16 11:05 UTC
    Good points! I'll add rate limiting in v2.

Review Comments:
[auth/middleware.js:42] jane-smith:
"Should validate token expiry here"
Status: UNRESOLVED
```

### View Commits
```bash
/view-pr 123 --commits
```
**Output:**
```
Commits in PR (5 total):

1. a1b2c3d feat: add auth middleware
   Author: john-doe | 2024-04-15 10:15 UTC
   Changes: 3 files, +78 lines, -12 lines

2. d4e5f6g feat: add login endpoint
   Author: john-doe | 2024-04-15 10:30 UTC
   Changes: 2 files, +145 lines, -5 lines

3. h7i8j9k feat: add logout endpoint
   Author: john-doe | 2024-04-15 14:20 UTC
   Changes: 1 file, +22 lines, -0 lines

4. k1l2m3n fix: update password hashing
   Author: john-doe | 2024-04-16 09:10 UTC
   Changes: 1 file, +5 lines, -3 lines

5. n4o5p6q docs: update auth documentation
   Author: john-doe | 2024-04-16 11:05 UTC
   Changes: 1 file, +35 lines, -2 lines
```

### View CI/CD Status
```bash
/view-pr 123 --checks
```
**Output:**
```
CI/CD Checks:

✓ PASSED - Lint checks (2m 15s)
  Status: All files pass linting

✓ PASSED - Unit tests (4m 32s)
  Coverage: 92%
  Failed: 0, Passed: 145, Skipped: 3

✓ PASSED - Integration tests (6m 18s)
  Failed: 0, Passed: 87

✓ PASSED - Build (3m 45s)
  Build size: 2.4MB

✓ PASSED - Security scan (1m 20s)
  Vulnerabilities: 0 critical, 0 high

Status: All checks passed ✓
```

### View All Information
```bash
/view-pr 123 --all
```
Displays complete PR information including all sections above.

### View PR in Different Repository
```bash
/view-pr 45 --repo owner/another-repo
```

## Output Sections

### Header Section
```
PR #NUMBER: TITLE
Status: [OPEN/CLOSED/MERGED/DRAFT]
Author: username
Created: timestamp
Updated: timestamp
```

### Description Section
Full PR description as written by author.

### Branches Section
```
From: source-branch-name
To:   target-branch-name
Status: [✓ Can merge / ⚠ Conflicts / ✗ Cannot merge]
```

### Changes Summary
```
Files Changed: N files
+ X lines added
- Y lines deleted
```

### Files Section
```
src/auth/middleware.js        (modified)   +78 -12
src/auth/login.js             (modified)   +145 -5
src/auth/logout.js            (added)      +22
tests/auth.test.js            (modified)   +89 -3
docs/AUTH.md                  (modified)   +35 -2
```

### Review Status
```
Reviews: X/N approved
Reviewers:
  ✓ jane-smith (approved 2024-04-16)
  ⏳ alice-johnson (pending)
  ✗ bob-wilson (requested changes)
```

### Labels and Metadata
```
Labels: [enhancement] [feature] [documentation]
Assignees: jane-smith, bob-wilson
Milestone: v1.2.0
Linked Issues: #456, #789
```

## Prerequisites

- GitHub account with repository access
- GitHub CLI (`gh`) installed and authenticated
- Read access to the repository
- PR must exist in the repository

## Configuration

The skill uses settings from `settings.claude.json`:
- `skillOverrides.view-pr`: Set to `"on"` to enable the skill
- GitHub CLI authentication configured

## Use Cases

### Before Code Review
Get full context on the PR:
```bash
/view-pr 123
# Understand what changes are being proposed
```

### Checking PR Status
Verify CI/CD and review status:
```bash
/view-pr 123 --checks
# See if all tests pass before merging
```

### Analyzing Changes
Review file modifications and diffs:
```bash
/view-pr 123 --diff
# Examine exact code changes
```

### Understanding Discussion
Review all comments and feedback:
```bash
/view-pr 123 --comments
# See what reviewers have said
```

### Tracking Commits
View commit history in the PR:
```bash
/view-pr 123 --commits
# Understand development progression
```

### Quick Status Check
Get PR summary at a glance:
```bash
/view-pr 123
# Brief overview of PR state
```

## Advanced Features

### Color-Coded Status
- 🟢 Green: Approved, passed checks
- 🟡 Yellow: Pending, needs attention
- 🔴 Red: Failed checks, requested changes
- ⚪ Gray: Draft, closed

### Interactive Navigation
- Click on file names to view diffs
- Click on comments to jump to discussion
- Click on commits to view details

### Copy Commands
- Easy copy of commit SHAs for cherry-pick
- Copy branch names for checkout
- Copy PR URL for sharing

### Quick Actions
Based on PR status, suggests:
- "Request changes" if issues found
- "Approve" if ready to merge
- "Rebase" if conflicts exist
- "Update from main" if behind

## Error Handling

- **PR Not Found**: Verifies PR number and repository
- **Access Denied**: Checks authentication and permissions
- **Network Error**: Retries with backoff
- **Invalid Repository**: Provides clear error message

## Tips

1. **Always View Before Reviewing**: Get full context first
2. **Check Checks First**: Ensure CI/CD passes before deep review
3. **Read Description**: Understand PR intent before examining code
4. **Review Discussions**: See what's already been discussed
5. **Check Branch Status**: Verify no conflicts before merging
6. **Use Filters**: Use options to focus on specific information

## Keyboard Shortcut

Configure in keybindings for quick access:
```json
{
  "key": "ctrl+shift+p",
  "command": "skill.run",
  "args": ["view-pr"]
}
```

## Related Commands

- `/review-pr`: Review and provide feedback on a PR
- `/create-pr`: Create a new pull request
- `/merge-pr`: Merge an approved pull request
- `/status`: Check current branch status
- `gh pr view`: Native GitHub CLI command
- `gh pr diff`: View diff of a PR
- `gh pr checks`: View CI/CD checks

## Integration with Other Skills

Works seamlessly with:
- **review-pr**: View PR first, then provide review
- **merge-pr**: View PR status before merging
- **create-pr**: Reference other PRs while creating new one
- **status**: Compare with local branch status

## Common Workflows

### Workflow 1: Review a PR
```bash
/view-pr 123              # Get overview
/view-pr 123 --comments   # Check discussions
/view-pr 123 --diff       # Review code changes
/review-pr 123            # Provide your review
```

### Workflow 2: Check PR Before Merge
```bash
/view-pr 123              # Get status
/view-pr 123 --checks     # Verify all tests pass
/merge-pr 123             # Merge if ready
```

### Workflow 3: Understand PR Context
```bash
/view-pr 123 --all        # Get complete information
# Research linked issues if needed
/view-pr 123 --commits    # See development progression
```

### Workflow 4: Quick Status Check
```bash
/view-pr 123              # Fast overview
# Decide if deep review needed
/view-pr 123 --checks     # Check critical status
```

## Performance

- Basic view: < 1 second
- With comments: 2-3 seconds
- With diff: 3-5 seconds
- With all options: 5-10 seconds

Results are cached for 1 minute to reduce API calls.
