# How to Use Git Automation Skills in Claude Code

This guide explains how to invoke and use the 7 Git automation skills in Claude Code prompts.

## Quick Start

Skills are invoked using the `/skill-name` syntax in your prompts to Claude Code.

## Available Skills

### 1. `/status` - Check Git Branch Status

**Purpose**: Check your current branch, staged changes, unstaged changes, and untracked files.

**Syntax**:
```
/status [--verbose] [--untracked]
```

**Examples**:

Basic status check:
```
/status
```

Verbose output with details:
```
/status --verbose
```

Show untracked files:
```
/status --untracked
```

**Expected Output**:
```
Current Branch: main
Status: Up to date with origin/main

Staged Changes: 2 files
  M  src/auth.js
  A  src/middleware.js

Unstaged Changes: 1 file
  M  config.js

Untracked Files: 0 files
```

---

### 2. `/create-pr` - Create a New Pull Request

**Purpose**: Create a new pull request on GitHub.

**Syntax**:
```
/create-pr <branch-name> <title> [description]
```

**Parameters**:
- `branch-name` (required): Name of the source branch (e.g., `feature/auth`)
- `title` (required): Title of the PR
- `description` (optional): PR description

**Examples**:

Simple PR creation:
```
/create-pr feature/authentication "Add user authentication"
```

PR with description:
```
/create-pr feature/auth "Add user authentication" "Implements JWT-based authentication with session management and password hashing using bcrypt"
```

Feature PR:
```
/create-pr feature/dark-mode "Implement dark mode support" "Adds theme switching capability with system preference detection"
```

Bug fix PR:
```
/create-pr fix/login-bug "Fix login timeout issue" "Resolves issue where login sessions expire prematurely"
```

**Expected Output**:
```
✅ Pull request created successfully!
PR #2: Add user authentication
https://github.com/rupaku/Claude-automation/pull/2
Status: OPEN
```

---

### 3. `/view-pr` - View Pull Request Details

**Purpose**: View comprehensive information about a specific PR.

**Syntax**:
```
/view-pr <pr-number> [--all] [--comments] [--commits] [--checks]
```

**Parameters**:
- `pr-number` (required): The PR number to view
- `--all` (optional): Show all available information
- `--comments` (optional): Include comments
- `--commits` (optional): Show commits
- `--checks` (optional): Show CI/CD checks

**Examples**:

View basic PR info:
```
/view-pr 1
```

View PR with all details:
```
/view-pr 1 --all
```

View PR commits:
```
/view-pr 1 --commits
```

View PR with checks:
```
/view-pr 1 --checks
```

**Expected Output**:
```
PR #1: Add GitHub automation skills with MCP integration
Status: OPEN
Author: @rupaku
Created: 2024-04-26

Files Changed: 18
Additions: +4,817
Deletions: -0

Commits: 1
Reviews: 0
Checks: Pending
```

---

### 4. `/view-pr-comments` - View PR Comments and Discussions

**Purpose**: View comments, discussions, and reviews on a PR.

**Syntax**:
```
/view-pr-comments <pr-number> [--unresolved] [--resolved] [--author name]
```

**Parameters**:
- `pr-number` (required): The PR number
- `--unresolved` (optional): Show only unresolved comments
- `--resolved` (optional): Show only resolved comments
- `--author` (optional): Filter by comment author

**Examples**:

View all comments:
```
/view-pr-comments 1
```

View only unresolved comments:
```
/view-pr-comments 1 --unresolved
```

View comments from specific reviewer:
```
/view-pr-comments 1 --author jane-smith
```

View resolved discussions:
```
/view-pr-comments 1 --resolved
```

**Expected Output**:
```
PR #1 Comments & Discussions
Total Comments: 5

[1] john-doe commented 2024-04-26
    "Great start! Few suggestions..."
    Status: UNRESOLVED
    Replies: 2

[2] jane-smith commented 2024-04-26
    "Looks good!"
    Status: ✓ RESOLVED
    Replies: 0
```

---

### 5. `/view-pr-checks` - View CI/CD Status and Test Results

**Purpose**: View build status, test results, and CI/CD checks for a PR.

**Syntax**:
```
/view-pr-checks <pr-number> [--failed] [--passed] [--logs]
```

**Parameters**:
- `pr-number` (required): The PR number
- `--failed` (optional): Show only failed checks
- `--passed` (optional): Show only passed checks
- `--logs` (optional): Include detailed logs

**Examples**:

View all checks:
```
/view-pr-checks 1
```

View only failed checks:
```
/view-pr-checks 1 --failed
```

View passed checks:
```
/view-pr-checks 1 --passed
```

View checks with logs:
```
/view-pr-checks 1 --logs
```

**Expected Output**:
```
PR #1 Status Checks

✓ PASSED - Lint checks (2m 15s)
✓ PASSED - Unit tests (4m 32s)
  Coverage: 92%
✓ PASSED - Build (3m 45s)
✓ PASSED - Security scan (1m 20s)

All checks passed! ✅
```

---

### 6. `/review-pr` - Review a Pull Request

**Purpose**: Leave a review on a PR with feedback.

**Syntax**:
```
/review-pr <pr-number> [message] [--approve] [--request-changes]
```

**Parameters**:
- `pr-number` (required): The PR number to review
- `message` (optional): Your review comment
- `--approve` (optional): Approve the PR
- `--request-changes` (optional): Request changes

**Examples**:

Just get PR info for review:
```
/review-pr 1
```

Leave a comment:
```
/review-pr 1 "Great work! Just one small suggestion - consider adding error handling for the auth middleware"
```

Approve the PR:
```
/review-pr 1 "Looks great! Ship it!" --approve
```

Request changes:
```
/review-pr 1 "Please add unit tests for the auth module before merging" --request-changes
```

Detailed review:
```
/review-pr 1 "The implementation is solid but I have a few concerns:

1. Missing error handling in the login endpoint
2. Session timeout could be longer
3. Add rate limiting to prevent brute force

Otherwise looks good!" --request-changes
```

**Expected Output**:
```
✅ Review submitted successfully!
PR #1: Add GitHub automation skills
State: APPROVED
Reviews: 1/2 approved
```

---

### 7. `/merge` - Merge an Approved Pull Request

**Purpose**: Merge a PR into the main branch.

**Syntax**:
```
/merge <pr-number> [--squash] [--rebase] [--no-delete]
```

**Parameters**:
- `pr-number` (required): The PR number to merge
- `--squash` (optional): Use squash merge (default: merge commit)
- `--rebase` (optional): Use rebase merge
- `--no-delete` (optional): Keep source branch after merge

**Examples**:

Standard merge:
```
/merge 1
```

Squash merge (combine commits):
```
/merge 1 --squash
```

Rebase merge (linear history):
```
/merge 1 --rebase
```

Merge without deleting branch:
```
/merge 1 --no-delete
```

Squash merge keep branch:
```
/merge 1 --squash --no-delete
```

**Expected Output**:
```
✅ Merge Successful!
Commit: abc123def456
Merged into: main
Branch feature/auth deleted

18 files changed, 4817 insertions(+)
```

---

## Common Workflows

### Workflow 1: Complete PR Creation to Merge

```
Step 1: Check your status
/status

Step 2: Create a new PR
/create-pr feature/new-feature "Add new feature" "This adds awesome functionality"

Step 3: Check PR details
/view-pr 1

Step 4: View and respond to comments
/view-pr-comments 1

Step 5: Check CI/CD status
/view-pr-checks 1

Step 6: Review and approve
/review-pr 1 "Looks perfect!" --approve

Step 7: Merge the PR
/merge 1 --squash
```

### Workflow 2: Review and Respond to Feedback

```
/view-pr 2
/view-pr-comments 2 --unresolved
/review-pr 2 "Updated code to address your feedback"
/view-pr-checks 2 --failed
```

### Workflow 3: Quick Status Check and Merge

```
/status --verbose
/view-pr 3 --all
/merge 3
```

---

## Tips & Tricks

### 1. **Chain Multiple Prompts**
You can use multiple skill calls in sequence:

```
/status
# Review output, then:
/view-pr 1 --all
# Review the PR, then:
/merge 1 --squash
```

### 2. **Use Descriptive PR Titles**
Good PR titles make skills more useful:

```
✅ /create-pr feature/auth "Add JWT authentication with refresh tokens"
❌ /create-pr feature/auth "Add auth"
```

### 3. **Always Check Checks Before Merging**
Never merge without verifying CI/CD:

```
/view-pr 1
/view-pr-checks 1 --failed  # Check for failures first
/merge 1  # Only if all checks pass
```

### 4. **Use --unresolved Filter**
Focus on blocking comments:

```
/view-pr-comments 5 --unresolved  # Only shows unresolved
```

### 5. **Verify Before Merge**
Use a dry-run approach:

```
/view-pr 1 --all
/view-pr-checks 1
/view-pr-comments 1 --unresolved
# If all good:
/merge 1
```

---

## Command Reference Table

| Skill | Command | Purpose |
|-------|---------|---------|
| Status | `/status` | Check branch status |
| Create PR | `/create-pr <branch> <title>` | Create new PR |
| View PR | `/view-pr <number>` | View PR details |
| View Comments | `/view-pr-comments <number>` | View discussions |
| View Checks | `/view-pr-checks <number>` | View CI/CD results |
| Review PR | `/review-pr <number>` | Leave review |
| Merge PR | `/merge <number>` | Merge to main |

---

## Troubleshooting

### "Skill not found"
- Ensure you're in the git-automation directory
- Verify settings.claude.json has skill enabled

### "GitHub token not set"
```bash
# Make sure .env file has valid token
cat .env | grep GITHUB_TOKEN

# Test connection
node test-github-connection.js
```

### "PR not found"
```
/view-pr 999  # PR might not exist, check number
```

### "Cannot merge - needs approval"
```
/review-pr 1 "Looks good!" --approve
# Then merge:
/merge 1
```

---

## Real-World Examples

### Example 1: Create and Merge Feature PR
```
User: I've been working on dark mode. Can you create a PR?

/create-pr feature/dark-mode "Add dark mode support" "Implements theme switching with system preference detection"

User: Can you check if all tests pass?

/view-pr 3 --checks

User: Great! Let's merge it.

/merge 3 --squash
```

### Example 2: Address Feedback and Update PR
```
User: What feedback do we have on the auth PR?

/view-pr-comments 2 --unresolved

User: I've fixed the issues. Check the tests.

/view-pr-checks 2

User: Approve it!

/review-pr 2 "Fixed all feedback. Ready to merge!" --approve
```

### Example 3: Quick Status Check
```
User: What's the status of PR #1?

/status
/view-pr 1
/view-pr-checks 1

User: Merge it!

/merge 1
```

---

## Notes

- Skills require GitHub token in `.env`
- All skills use GitHub MCP for authenticated access
- Skills work with your repository (rupaku/Claude-automation)
- Most skills are read-only except create-pr, review-pr, and merge
- Changes are immediate on GitHub

---

## Need Help?

- Check skill documentation: `GITHUB_MCP_INTEGRATION.md`
- Verify setup: `node test-github-connection.js`
- View CLAUDE.md for project context
