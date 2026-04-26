---
name: merge-pr
description: Merge an approved pull request into the target branch
allowed-tools: Bash(gh:*), Bash(git:*)
---

# Skill: /merge-pr

You are executing the `/merge` skill to safely merge an approved pull request into the target branch.

## Arguments
Parse from the invocation:
- `<pr-number>` (required): The PR number to merge
- `--squash` (optional): Squash commits before merging
- `--rebase` (optional): Rebase and merge (linear history)
- `--no-delete` (optional): Keep source branch after merge
- `--dry-run` (optional): Preview merge without executing
- `[--message <msg>]` (optional): Custom merge commit message

## Steps

1. **Fetch PR details and validation info:**
   ```bash
   gh pr view <pr-number> --json number,title,state,mergeable,author,headRefName,baseRefName
   ```

2. **Validate PR is mergeable:**
   If `state` is not OPEN, display: "Error: PR is <state>, cannot merge"
   If `mergeable` is false, display: "Error: PR has merge conflicts. Resolve conflicts first."

3. **Check PR approval status (optional warning):**
   ```bash
   gh pr view <pr-number> --json reviews
   ```
   Count approvals; if fewer than 1, display warning (but don't block)

4. **Check CI/CD status (warning only):**
   ```bash
   gh pr checks <pr-number>
   ```
   If any checks are FAILED, display warning but continue with `--dry-run` or force

5. **Display merge preview:**

```
PR #<pr-number> Merge Preview
==============================

Title: <title>
Author: <author>
State: <state>
Mergeable: YES

Merge Strategy: <MERGE / SQUASH / REBASE>
Delete Branch: <YES / NO>
Target: <baseRefName>
Source: <headRefName>

Status: Ready to merge
```

6. **If --dry-run, stop here.** Otherwise, proceed to step 7.

7. **Merge the PR:**
   ```bash
   gh pr merge <pr-number> \
     <--merge|--squash|--rebase> \
     [--delete-branch] \
     [--body "<custom-message>"]
   ```

8. **Display merge result:**

```
✅ Merge Successful!

PR #<pr-number>: <title>
Merged into: <baseRefName>
Merge commit: <commit-sha (first 7 chars)>

Summary:
- Files changed: <count>
- Insertions: +<count>
- Deletions: -<count>
- Branch deleted: <YES / NO>
```

## Examples

### Standard merge:
```
/merge 1
```

### Squash merge:
```
/merge 1 --squash
```

### Rebase merge:
```
/merge 1 --rebase
```

### Dry-run (preview):
```
/merge 1 --dry-run
```

### Keep branch after merge:
```
/merge 1 --no-delete
```

### Merge with custom message:
```
/merge 1 --message "Merge feature/auth: Complete authentication system"
```

## Error Handling

- **PR not found:** Display "Error: Pull request <pr-number> not found"
- **PR not open:** Display "Error: PR #<number> is <state>, cannot merge closed/merged PRs"
- **Merge conflict:** Display "Error: PR has merge conflicts. Resolve conflicts first."
- **Not mergeable:** Display "Error: PR is not in a mergeable state"
- **Merge failed:** Display "Error: Merge failed. <error details>"
- **Branch delete failed:** Display "Warning: PR merged but branch deletion failed"
- **Access denied:** Display "Error: Access denied. Check write permissions."

## Safety Notes

- Always verify approval status before merging (use `/view-pr`)
- Always check CI/CD status before merging (use `/view-pr-checks`)
- Use `--dry-run` for high-risk merges
- Delete merged branches to keep repo clean (use `--no-delete` only when necessary)
