---
name: view-pr
description: View detailed information about a pull request
allowed-tools: Bash(gh:*)
---

# Skill: /view-pr

You are executing the `/view-pr` skill to display detailed information about a pull request.

## Arguments
Parse from the invocation:
- `<pr-number>` (required): The PR number (e.g., `1`, `123`)
- `--all` (optional): Show all available information
- `--comments` (optional): Include comments and discussions
- `--commits` (optional): Show commits in the PR
- `--checks` (optional): Show CI/CD checks
- `--diff` (optional): Show full diff

## Steps

1. **Fetch PR metadata:**
   ```bash
   gh pr view <pr-number> --json number,title,body,state,author,createdAt,updatedAt,headRefName,baseRefName,additions,deletions,changedFiles,mergeable,reviews,labels,assignees
   ```

2. **Display PR header and metadata:**

```
==================================================
PR #<number>: <title>
==================================================

Status: <state>
Author: <author.login>
Created: <createdAt>
Updated: <updatedAt>

Description:
<body>

Branches:
  From: <headRefName>
  To:   <baseRefName>
  Mergeable: <✓ Yes / ✗ No>

Changes: <changedFiles> files, +<additions> -<deletions>

Reviews: <approved>/<total> approved
Labels: <labels>
Assignees: <assignees>
```

3. **If --comments or --all, fetch and display comments:**
   ```bash
   gh pr view <pr-number> --json comments
   ```
   Format as:
   ```
   Comments (<count>):
   
   [<index>] <author.login> commented <createdAt>
       "<body>"
       Status: <resolved/unresolved>
   ```

4. **If --commits or --all, fetch and display commits:**
   ```bash
   gh pr view <pr-number> --json commits
   ```
   Format as:
   ```
   Commits (<count>):
   
   <oid (short)> <message>
   Author: <author.login> | <committedDate>
   ```

5. **If --checks or --all, fetch and display CI/CD checks:**
   ```bash
   gh pr checks <pr-number>
   ```
   Format as:
   ```
   Status Checks:
   
   <status> <name> (<duration>)
   ```

6. **If --diff or --all, show the diff:**
   ```bash
   gh pr diff <pr-number>
   ```

## Examples

### View basic PR info:
```
/view-pr 1
```

### View PR with all details:
```
/view-pr 1 --all
```

### View PR comments only:
```
/view-pr 1 --comments
```

### View PR checks:
```
/view-pr 1 --checks
```

## Error Handling

- **PR not found:** Display "Error: Pull request <pr-number> not found"
- **Access denied:** Display "Error: Access denied. Check authentication."
- **Invalid PR number:** Display "Error: Invalid PR number. Use a numeric value."
