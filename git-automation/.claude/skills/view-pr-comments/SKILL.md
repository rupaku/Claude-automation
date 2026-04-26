---
name: view-pr-comments
description: View comments and discussions on a pull request
allowed-tools: Bash(gh:*)
---

# Skill: /view-pr-comments

You are executing the `/view-pr-comments` skill to view comments and discussions on a pull request.

## Arguments
Parse from the invocation:
- `<pr-number>` (required): The PR number
- `--unresolved` (optional): Show only unresolved comments
- `--resolved` (optional): Show only resolved comments
- `--author <name>` (optional): Filter by comment author

## Steps

1. **Fetch PR comments and reviews:**
   ```bash
   gh pr view <pr-number> --json comments,reviews
   ```

2. **Filter comments based on flags:**
   - If `--unresolved`: show only comments with `isResolved: false`
   - If `--resolved`: show only comments with `isResolved: true`
   - If `--author <name>`: show only comments from that author
   - Otherwise: show all comments

3. **Display output in this format:**

```
PR #<pr-number> Comments & Discussions
Total Comments: <count>

[<index>] <author.login> commented <createdAt>
    "<body>"
    Status: <RESOLVED / UNRESOLVED>
    Replies: <replyCount>

<repeat for each comment>
```

## Examples

### View all comments:
```
/view-pr-comments 1
```

### View only unresolved comments:
```
/view-pr-comments 1 --unresolved
```

### View comments from specific author:
```
/view-pr-comments 1 --author jane-smith
```

### View resolved comments only:
```
/view-pr-comments 1 --resolved
```

## Error Handling

- **PR not found:** Display "Error: Pull request <pr-number> not found"
- **No comments:** Display "No comments on this PR"
- **Author not found:** Display "No comments from <author>"
- **Access denied:** Display "Error: Access denied. Check authentication."
