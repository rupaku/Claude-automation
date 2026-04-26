# Merge PR Skill

A Claude Code skill to safely merge approved pull requests into the target branch with proper validation, conflict resolution, and post-merge cleanup.

## Overview

The `merge` skill streamlines the PR merging process:
1. Verify PR approval status and requirements
2. Check CI/CD status and all checks passing
3. Detect and handle merge conflicts
4. Execute the merge operation
5. Delete the source branch
6. Verify merge success
7. Provide post-merge notifications

## Usage

```
/merge <pr-number> [options]
```

### Parameters

- **pr-number** (required): The pull request number (e.g., `123`, `PR-456`)
- **--repo** (optional): Repository in format `owner/repo`. Defaults to current repository
- **--strategy** (optional): Merge strategy: `merge`, `squash`, `rebase` (default: `merge`)
- **--delete-branch** (optional): Delete source branch after merge (default: true)
- **--no-delete** (optional): Keep source branch after merge
- **--force** (optional): Force merge even with warnings (use with caution)
- **--message** (optional): Custom commit message for merge
- **--dry-run** (optional): Preview merge without executing
- **--auto-delete-head** (optional): Auto-delete branch after merge completes

## Workflow Steps

### 1. Verify PR Status
- Checks PR is in OPEN state
- Verifies PR is mergeable
- Confirms no conflicts exist
- Checks branch is not behind target
- Example: `gh pr view <PR-number> --json state,mergeable`

### 2. Check Approval Requirements
- Verifies PR has required approvals
- Checks review requirements met
- Confirms no requested changes pending
- Validates reviewer count if required
- Example: `gh pr view <PR-number> --json reviews`

### 3. Validate CI/CD Status
- Confirms all status checks passed
- Verifies no failing tests
- Checks security scans completed
- Ensures build succeeded
- Example: `gh pr checks <PR-number>`

### 4. Detect Merge Conflicts
- Analyzes merge ability
- Identifies conflicting files
- Provides conflict resolution options
- Offers rebase or manual resolution
- Example: `git merge --no-commit --no-ff <branch>`

### 5. Choose Merge Strategy
- **Create a merge commit** (default): Full merge history
- **Squash and merge**: Compress commits into one
- **Rebase and merge**: Linear commit history
- Displays implications of each strategy
- Example: Different merge strategies

### 6. Execute Merge
- Performs the merge operation
- Creates merge commit with message
- Updates target branch pointer
- Finalizes merge
- Example: `gh pr merge <PR-number> --merge`

### 7. Post-Merge Cleanup
- Deletes source branch (optional)
- Updates local branches
- Provides merge confirmation
- Shows new branch history
- Example: `gh pr merge <PR-number> --delete-branch`

### 8. Notify and Confirm
- Displays merge success message
- Shows commit SHA of merge
- Provides link to merged PR
- Suggests next steps
- Example: Completion notification

## Examples

### Basic Merge
```bash
/merge 123
```
**Output:**
```
==================================================
PR #123 Merge Verification
==================================================

PR Information:
├── Title: Add user authentication feature
├── Author: john-doe
├── Target: main
├── Source: feature/auth
└── Status: OPEN

Approval Status:                         ✓ READY
├── Required Reviews: 2/2 ✓
├── Requested Changes: None ✓
└── Approved By: jane-smith, alice-johnson

CI/CD Status:                            ✓ ALL PASSED
├── Build: ✓ Passed (3m 45s)
├── Tests: ✓ Passed (4m 32s)
├── Coverage: ✓ 92% (Target: 80%)
└── Security: ✓ Passed

Branch Status:                           ✓ MERGEABLE
├── Conflicts: None
├── Behind Target: 0 commits
└── Ready: YES

Merge Preview:
├── Files Changed: 8
├── Additions: +245
├── Deletions: -32
└── Commits: 5

==================================================
Proceeding with merge...

✓ Merge Successful!
Commit: abc123def456
Merged into: main
Branch deleted: feature/auth

==================================================
Summary:
- PR #123 merged into main
- 8 files changed, 245 insertions(+), 32 deletions(-)
- Branch feature/auth deleted
- Merge commit: abc123def456

Next Steps:
1. Pull main to get latest changes
2. Delete local branch: git branch -d feature/auth
3. Update your environment
```

### Squash and Merge
```bash
/merge 123 --strategy squash
```
**Output:**
```
Merge Strategy: SQUASH AND MERGE

This will combine all 5 commits into a single commit on main:
1. feat: add auth middleware
2. feat: add login endpoint
3. feat: add logout endpoint
4. fix: update password hashing
5. docs: update auth documentation

Combined as: feat: add user authentication feature

Files Changed: 8 files
Total Changes: +245 lines, -32 lines

✓ Squash merge successful!
Commit: xyz789abc123
Parent Commits Combined: 5 → 1
```

### Rebase and Merge
```bash
/merge 123 --strategy rebase
```
**Output:**
```
Merge Strategy: REBASE AND MERGE

This will rebase 5 commits onto main:
main @ abc123def456
  ↓
  + feat: add auth middleware
  + feat: add login endpoint
  + feat: add logout endpoint
  + fix: update password hashing
  + docs: update auth documentation

Linear History Maintained: YES
Merge Commit Created: NO

✓ Rebase merge successful!
New Head: xyz789abc123
Commits Rebased: 5
```

### Dry Run (Preview Merge)
```bash
/merge 123 --dry-run
```
**Output:**
```
DRY RUN - No changes will be made

Merge Verification:
├── PR Status: ✓ Open
├── Approvals: ✓ 2/2 met
├── CI Status: ✓ All passed
├── Conflicts: ✓ None
├── Branch: ✓ Mergeable

Merge will proceed with:
├── Strategy: Merge commit
├── Target: main
├── Source: feature/auth
├── Delete branch: Yes
└── Commit message: Merge pull request #123 from john-doe/feature/auth

Result Preview:
├── Merged commits: 5
├── Files affected: 8
├── Changes: +245/-32
└── New commit: [Would be created]

Status: ✓ Ready to merge (no issues detected)

Note: This was a dry run. No changes were made.
Run without --dry-run to execute the merge.
```

### Keep Source Branch
```bash
/merge 123 --no-delete
```
**Output:**
```
Merge Configuration:
├── Strategy: Merge commit
├── Delete branch: NO (branch will be kept)
└── Target: main

✓ Merge Successful!
Commit: abc123def456
Merged into: main

Note: Source branch feature/auth was NOT deleted
You can manually delete it later with:
  git push origin --delete feature/auth
  git branch -d feature/auth
```

### Custom Merge Message
```bash
/merge 123 --message "Merge feature/auth: Complete user authentication system"
```
**Output:**
```
Merge Configuration:
├── Strategy: Merge commit
├── Custom message: YES
└── Message: "Merge feature/auth: Complete user authentication system"

✓ Merge Successful!
Commit: abc123def456
Message: Merge feature/auth: Complete user authentication system

Merged into: main
Branch deleted: feature/auth
```

### Merge with Conflict Detection
```bash
/merge 125
```
**Output:**
```
⚠️  MERGE CONFLICT DETECTED

Conflicting Files:
1. src/config.js
   - Main branch modified line 15-20
   - Feature branch modified line 18-25
   - Conflict Range: Lines 15-25

2. README.md
   - Main branch updated section "Installation"
   - Feature branch added new section
   - Conflict Type: Addition conflict

Conflict Resolution Options:
1. Rebase on main first:
   git fetch origin
   git rebase origin/main
   # Fix conflicts locally
   git push --force-with-lease

2. Merge main into feature branch:
   git merge origin/main
   # Fix conflicts locally
   git push

3. Manual conflict resolution:
   Open files and manually resolve conflicts

Recommendation:
Option 1 (Rebase) for linear history

Status: ⚠️  Cannot merge with conflicts
Please resolve conflicts first
```

### Force Merge (Override Warnings)
```bash
/merge 123 --force
```
**Output:**
```
⚠️  FORCE MERGE REQUESTED

Warning: Proceeding despite non-critical issues

Issues Detected:
├── ⚠️  Branch is 2 commits behind main
├── ⚠️  1 minor test warning
└── ✓ No critical issues

Proceeding with force merge...

✓ Merge Forced Successfully!
Commit: abc123def456

⚠️  Note: Issues existed but merge proceeded
Consider syncing branches and running tests
```

### Merge Failed - Approval Missing
```bash
/merge 124
```
**Output:**
```
✗ MERGE BLOCKED

Approval Status:                         ✗ NOT READY
├── Required Reviews: 1/2 ✗ (Need 1 more)
├── Pending Reviewers: bob-wilson
└── Cannot merge: Approval requirements not met

Solution:
1. Request approval from bob-wilson
2. Run /view-pr-comments 124 to see feedback
3. Address any requested changes
4. Try merge again once approved

PR Link: https://github.com/...
```

## Merge Strategies

### 1. Merge Commit (Default)
Creates a merge commit to combine branches.
```
Feature Branch: a-b-c
Main Branch:   x-y
Result:        x-y-m (merge commit)
```

**Pros:**
- Full history preserved
- Easy to revert
- Clear merge points
- Identifies merge commits

**Cons:**
- Cluttered commit history
- More commits
- Harder to follow linear flow

**When to Use:**
- Large features
- Complex PRs
- Need to track when merged
- Team preference

### 2. Squash and Merge
Combines all commits into one before merging.
```
Feature Branch: a-b-c
Main Branch:   x-y
Result:        x-y-ABC (squashed)
```

**Pros:**
- Clean, linear history
- Single feature = single commit
- Easier to read history
- Easy to bisect

**Cons:**
- Loses individual commit messages
- Harder to track development progression
- May hide important details
- Difficult to revert individual changes

**When to Use:**
- Small, focused features
- WIP (work in progress) branches
- Many experimental commits
- Team prefers clean history

### 3. Rebase and Merge
Replays commits on top of main branch.
```
Feature Branch: a-b-c
Main Branch:   x-y
Result:        x-y-a-b-c (rebased)
```

**Pros:**
- Linear history
- Each commit stands alone
- Easy to bisect and revert
- Clean history flow

**Cons:**
- Rewrites history
- Can't see when actually merged
- Harder for large teams
- May confuse some developers

**When to Use:**
- Small, incremental changes
- Single developer features
- Need linear history
- Require individual commit traceability

## Prerequisites

- GitHub account with repository access
- GitHub CLI (`gh`) installed and authenticated
- Write access to the repository
- PR must meet merge requirements
- All checks must pass
- Required approvals obtained

## Configuration

The skill uses settings from `settings.claude.json`:
- `skillOverrides.merge`: Set to `"on"` to enable the skill
- GitHub CLI authentication configured
- Default merge strategy (optional)
- Branch deletion preference (optional)

Example configuration:
```json
{
  "mergeSettings": {
    "strategy": "squash",
    "deleteBranch": true,
    "requireAllChecks": true,
    "requireReviews": true
  }
}
```

## Use Cases

### Before Regular Merge
Verify everything before merging:
```bash
/merge 123 --dry-run
# Check no issues exist
/merge 123
# Execute merge
```

### Squash Feature Commits
Clean up feature branch commits:
```bash
/merge 123 --strategy squash
# Combine into single commit
```

### Preserve Linear History
Keep clean Git history:
```bash
/merge 123 --strategy rebase
# Replay on target branch
```

### Keep Working Branch
Preserve branch for reference:
```bash
/merge 123 --no-delete
# Keep feature/auth for reference
```

### Batch Merge PRs
Merge multiple approved PRs:
```bash
/merge 123
/merge 124
/merge 125
# Merge series of PRs
```

## Merge Requirements Checklist

Before merging, verify:
- ✓ PR is in OPEN state
- ✓ All required reviews obtained
- ✓ No requested changes pending
- ✓ All status checks passed
- ✓ No merge conflicts
- ✓ Branch is up to date or can be auto-updated
- ✓ Code coverage meets threshold
- ✓ Security scans passed
- ✓ Deployment tests passed

## Error Handling

### Cannot Merge Errors
- **PR Not Mergeable**: Fix conflicts first
- **Missing Approvals**: Get required reviews
- **Checks Failed**: Fix failing tests/builds
- **Behind Target**: Rebase or update from main
- **Merge Conflict**: Manual conflict resolution needed
- **Branch Deleted**: PR branch was already deleted
- **Permission Denied**: Check write access

### Resolution Steps
```bash
# Check what's blocking merge
/view-pr 123

# If conflicts
git fetch origin
git rebase origin/main
# Fix conflicts manually
git push --force-with-lease

# If checks failing
/view-pr-checks 123 --failed
# Fix issues and push

# If missing approvals
/view-pr-comments 123 --unresolved
# Address feedback and request review

# Try merge again
/merge 123
```

## Safety Features

### Pre-Merge Validation
- Confirms PR metadata
- Verifies branch exists
- Checks for conflicts
- Validates approvals
- Ensures checks pass

### Dry-Run Mode
Preview merge without executing:
```bash
/merge 123 --dry-run
```

### Conflict Detection
Automatically detects conflicts:
- Lists conflicting files
- Shows conflict locations
- Suggests resolution strategies
- Prevents unsafe merges

### Post-Merge Verification
Confirms successful merge:
- Verifies commit was created
- Confirms branch deleted (if requested)
- Shows merge statistics
- Provides next steps

## Tips

1. **Always Dry-Run First**: Use --dry-run for complex merges
2. **Choose Right Strategy**: Match your team's Git workflow
3. **Verify Checks Pass**: Never ignore failing tests
4. **Keep PR Description**: Useful for future reference
5. **Delete Old Branches**: Use --delete-branch to keep clean
6. **Review Conflicts Early**: Don't wait to resolve conflicts
7. **Squash WIP Commits**: Clean up before merging
8. **Document Decisions**: Use custom messages for important merges

## Keyboard Shortcut

Configure in keybindings for quick access:
```json
{
  "key": "ctrl+shift+m",
  "command": "skill.run",
  "args": ["merge"]
}
```

## Related Commands

- `/create-pr`: Create a new pull request
- `/review-pr`: Review and approve a PR
- `/view-pr`: View PR details before merging
- `/view-pr-checks`: Verify CI/CD status
- `/view-pr-comments`: Check reviewer feedback
- `gh pr merge`: Native GitHub CLI command
- `git merge`: Local merge operations

## Integration with Other Skills

Works seamlessly with:
- **view-pr**: Review all info before merge
- **view-pr-checks**: Ensure all checks pass
- **view-pr-comments**: Confirm all feedback addressed
- **review-pr**: Approve before merging own PRs
- **create-pr**: Link to original PR creation

## Common Workflows

### Workflow 1: Standard Merge
```bash
/view-pr 123              # Review PR details
/view-pr-checks 123       # Verify checks pass
/view-pr-comments 123     # Check discussions
/merge 123                # Execute merge
```

### Workflow 2: Dry-Run First
```bash
/merge 123 --dry-run      # Preview merge
# Review dry-run output
/merge 123                # Execute actual merge
```

### Workflow 3: Squash Merge
```bash
/view-pr 123              # Review details
/merge 123 --strategy squash --delete-branch
# Clean single commit merge
```

### Workflow 4: Rebase for Linear History
```bash
/view-pr-checks 123       # Verify ready
/merge 123 --strategy rebase
# Linear commit history maintained
```

### Workflow 5: Batch Merge Multiple PRs
```bash
/merge 121                # Merge first PR
/merge 122                # Merge second PR
/merge 123                # Merge third PR
# Multiple merges in sequence
```

### Workflow 6: Handle Conflicts
```bash
/merge 123                # Attempt merge
# Conflict detected
/merge 123 --dry-run      # See conflicts
# Resolve locally
git push                  # Push fixed branch
/merge 123                # Retry merge
```

## Performance

- Verification check: < 1 second
- Merge execution: < 3 seconds
- Branch cleanup: < 2 seconds
- Total time: ~5 seconds

## Merge Best Practices

1. **Squash Small Changes**: Keep history clean
2. **Preserve Complex Changes**: Keep meaningful commits
3. **Document in PR**: Write clear PR descriptions
4. **Test Before Merge**: Ensure checks pass
5. **Review Thoroughly**: Don't rush approvals
6. **Clean Up Branches**: Delete after merge
7. **Monitor Deployments**: Check post-merge builds
8. **Communicate Changes**: Update team on merges

## Rollback After Merge

If you need to undo a merge:
```bash
# Find merge commit
git log --oneline --graph

# Revert the merge
git revert -m 1 <merge-commit-sha>
git push

# Or reset (dangerous!)
git reset --hard <commit-before-merge>
git push --force-with-lease
```

## Team Merge Policies

Configure merge settings per repository:
- Required reviewers
- Status check enforcement
- Dismissal of stale reviews
- Automatic merge on approval
- Merge strategy restrictions
- Branch protection rules
