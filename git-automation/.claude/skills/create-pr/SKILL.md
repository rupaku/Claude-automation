---
name: create-pr
description: Create a new pull request on GitHub
allowed-tools: Bash(git:*), Bash(gh:*)
---

# Skill: /create-pr

You are executing the `/create-pr` skill to create a new pull request on GitHub.

## Arguments
Parse from the invocation:
- `<branch-name>` (required): Name for the feature branch (e.g., `feature/auth`, `fix/bug-123`)
- `<title>` (required): Pull request title
- `[description]` (optional): Pull request description

## Steps

1. **Check if branch exists locally:**
   ```bash
   git branch --list <branch-name>
   ```
   If output is empty, create the branch. Otherwise, switch to existing branch.

2. **Create or switch to branch:**
   ```bash
   git checkout -b <branch-name> 2>/dev/null || git checkout <branch-name>
   ```

3. **Stage all changes (if any):**
   ```bash
   git add -A
   ```

4. **Check if there are changes to commit:**
   ```bash
   git diff --cached --quiet
   ```
   If changes exist, commit them. Otherwise, skip commit.

5. **Commit changes (if changes exist):**
   ```bash
   git commit -m "feat: <title>"
   ```

6. **Push branch to remote:**
   ```bash
   git push -u origin <branch-name>
   ```

7. **Create pull request:**
   ```bash
   gh pr create --title "<title>" --body "<description or empty>" --base main --head <branch-name>
   ```

8. **Display output in this format:**

```
✅ Pull Request Created!
PR #<number>: <title>
URL: <pr-url>
Status: OPEN
Branch: <branch-name> → main
```

## Examples

### Create basic PR:
```
/create-pr feature/auth "Add user authentication"
```

### Create PR with description:
```
/create-pr feature/auth "Add user authentication" "Implements JWT-based login with bcrypt password hashing and session management"
```

### Create fix PR:
```
/create-pr fix/login-timeout "Fix login session timeout" "Resolves issue #42 where sessions expire prematurely"
```

## Error Handling

- **Branch already exists on remote:** Display message and continue (will update the PR if one exists)
- **Push failed:** Display "Error: Failed to push branch. Check authentication and permissions."
- **PR creation failed:** Display "Error: Failed to create pull request. <error details>"
- **Not a git repository:** Display "Error: Not a git repository"
- **No remote configured:** Display "Error: No remote 'origin' found"
