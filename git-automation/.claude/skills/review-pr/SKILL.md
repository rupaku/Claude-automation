---
name: review-pr
description: Review a pull request and provide feedback
allowed-tools: Bash(gh:*)
---

# Skill: /review-pr

You are executing the `/review-pr` skill to review a pull request and provide feedback.

## Arguments
Parse from the invocation:
- `<pr-number>` (required): The PR number to review
- `[message]` (optional): Your review comment/message
- `--approve` (optional): Approve the PR
- `--request-changes` (optional): Request changes before merge
- `--comment` (optional): Just add a comment (default if no flag)

## Steps

1. **Validate PR exists and is open:**
   ```bash
   gh pr view <pr-number> --json title,state,author,number
   ```
   If PR is not OPEN, display error: "Error: PR is <state>, cannot review"

2. **Determine review action:**
   - If `--approve`: Use `--approve` flag in review command
   - If `--request-changes`: Use `--request-changes` flag in review command
   - Otherwise (or `--comment`): Use `--comment` flag (or omit for comment-only)

3. **Submit review:**
   ```bash
   gh pr review <pr-number> <action-flag> [--body "<message>"]
   ```
   Where `<action-flag>` is one of:
   - `--approve` (adds approval)
   - `--request-changes` (requests changes)
   - `--comment` (comment only, no vote)

4. **Display output in this format:**

```
✅ Review Submitted!
PR #<pr-number>: <title>
Author: @<author>
Review Type: <APPROVED / REQUESTED CHANGES / COMMENTED>

<if message provided>
Message:
"<message>"
</if>

PR Status: <current-approval-status>
```

## Examples

### Just get PR info for review:
```
/review-pr 1
```

### Leave a comment:
```
/review-pr 1 "Great work! Just one small suggestion on error handling."
```

### Approve the PR:
```
/review-pr 1 "Looks great! Ship it!" --approve
```

### Request changes:
```
/review-pr 1 "Please add unit tests for the new endpoint" --request-changes
```

### Comment without approval:
```
/review-pr 1 "FYI: This will be deployed to production next week" --comment
```

## Error Handling

- **PR not found:** Display "Error: Pull request <pr-number> not found"
- **PR not open:** Display "Error: PR #<number> is <state>, cannot review closed/merged PRs"
- **Review already submitted:** Display "Review already submitted. Use gh pr review to update."
- **Access denied:** Display "Error: Access denied. You may not have permission to review."
- **Invalid message:** Display "Error: Review message is required for this action"
