# View PR Comments Skill

A Claude Code skill to display and manage pull request comments, discussions, review comments, and conversation threads in an organized format.

## Overview

The `view-pr-comments` skill provides focused access to PR discussions:
1. General PR comments and discussion threads
2. Review comments on specific code lines
3. Comment authors and timestamps
4. Comment resolution status
5. Threading and reply chains
6. Comment filtering and sorting
7. Search within comments
8. Comment reactions and engagement

## Usage

```
/view-pr-comments <pr-number> [options]
```

### Parameters

- **pr-number** (required): The pull request number (e.g., `123`, `PR-456`)
- **--repo** (optional): Repository in format `owner/repo`. Defaults to current repository
- **--unresolved** (optional): Show only unresolved comments/discussions
- **--resolved** (optional): Show only resolved comments
- **--review** (optional): Show only code review comments (line comments)
- **--general** (optional): Show only general discussion comments
- **--author** (optional): Filter comments by author username
- **--since** (optional): Show comments since date (e.g., "2 days ago", "2024-04-20")
- **--sort** (optional): Sort by newest, oldest, or threaded
- **--search** (optional): Search for keyword in comments

## Workflow Steps

### 1. Fetch Comments
- Retrieves all comments from the PR
- Gets timestamps for each comment
- Fetches comment authors
- Retrieves comment content and formatting
- Example: `gh pr view <PR-number> --json comments`

### 2. Display General Comments
- Shows discussion comments on the PR
- Displays comment threads
- Shows reply chains
- Indicates comment order and nesting
- Example: Chronological comment listing

### 3. Display Review Comments
- Shows code review comments
- Links comments to specific file lines
- Displays code snippet context
- Shows line numbers and file paths
- Example: `gh pr diff <PR-number> --color=never`

### 4. Show Resolution Status
- Indicates if comment/discussion is resolved
- Shows who resolved it and when
- Displays resolution messages
- Marks action items and decisions
- Example: Discussion state tracking

### 5. Display Author Information
- Shows comment author username
- Displays author role (author, member, contributor)
- Shows author profile link
- Indicates if author has permissions
- Example: User metadata display

### 6. Show Threading
- Organizes comments in threads
- Displays reply chains
- Shows comment hierarchy
- Indicates main comments vs replies
- Example: Nested discussion structure

### 7. Filter and Sort
- Filters by resolution status
- Filters by comment type (review vs general)
- Filters by author
- Sorts by date or thread
- Example: Customized view options

## Examples

### View All Comments
```bash
/view-pr-comments 123
```
**Output:**
```
==================================================
PR #123 Comments & Discussions
==================================================

[1] john-doe commented 2024-04-15 10:35 UTC
    Ready for review! Please check the auth implementation.
    
    [Reply] jane-smith 2024-04-15 11:20 UTC
    Great work! Just reviewed the code.
    
    [Reply] john-doe 2024-04-15 12:05 UTC
    Thanks for the feedback!

[2] jane-smith commented 2024-04-16 09:20 UTC
    I found a potential security issue in the password hashing.
    🔴 UNRESOLVED
    
    [Reply] john-doe 2024-04-16 11:05 UTC
    Good catch! I've updated the hashing function.
    ✓ RESOLVED by jane-smith

[3] alice-johnson commented 2024-04-17 14:30 UTC
    The docs look great! 👍
```

### View Only Unresolved Comments
```bash
/view-pr-comments 123 --unresolved
```
**Output:**
```
Unresolved Comments (2):

[1] bob-wilson commented 2024-04-18 10:15 UTC
    Should we add rate limiting to the login endpoint?
    Location: src/auth/login.js:42
    Status: 🔴 UNRESOLVED
    Replies: 0

[2] alice-johnson commented 2024-04-19 16:45 UTC
    Consider adding input validation here
    Location: src/auth/middleware.js:78
    Status: 🔴 UNRESOLVED
    Replies: 1
    
    [Reply] john-doe 2024-04-19 17:20 UTC
    Will add in next commit
```

### View Code Review Comments
```bash
/view-pr-comments 123 --review
```
**Output:**
```
Code Review Comments (8):

[auth/middleware.js]

Line 15: jane-smith commented 2024-04-16 09:20 UTC
  "Consider using async/await instead of promises here"
  Status: ✓ RESOLVED

Line 42: jane-smith commented 2024-04-16 09:25 UTC
  "Should validate token expiry"
  Status: ⏳ NEEDS ATTENTION
  Replies: 1
  
  [Reply] john-doe 2024-04-16 11:05 UTC
  "Added validation check"

[auth/login.js]

Line 85: bob-wilson commented 2024-04-17 14:30 UTC
  "Consider adding rate limiting"
  Status: 🔴 UNRESOLVED
  Context:
  83 |  try {
  84 |    const user = await User.findByEmail(email);
> 85 |    const valid = await bcrypt.compare(password, user.hash);
  86 |    return { token: generateToken(user.id) };
  87 |  } catch (err) {

[tests/auth.test.js]

Line 45: jane-smith commented 2024-04-16 10:30 UTC
  "Add test for expired token case"
  Status: ✓ RESOLVED
```

### View General Discussion Only
```bash
/view-pr-comments 123 --general
```
**Output:**
```
General Discussion (5):

[1] john-doe (Author) commented 2024-04-15 10:35 UTC
    Ready for review! Please check the auth implementation.
    👍 3 reactions
    Replies: 4

[2] jane-smith commented 2024-04-16 09:20 UTC
    Great work! Few questions about the approach...
    👍 2 reactions
    Replies: 2

[3] alice-johnson commented 2024-04-17 14:30 UTC
    LGTM! Approving ✓
    👍 5 reactions
    Replies: 0
```

### View Comments from Specific Author
```bash
/view-pr-comments 123 --author jane-smith
```
**Output:**
```
Comments by jane-smith (6):

1. Code Review: src/auth/middleware.js:15
   "Consider using async/await instead of promises"
   Status: ✓ RESOLVED

2. Code Review: src/auth/middleware.js:42
   "Should validate token expiry"
   Status: ⏳ NEEDS ATTENTION

3. General Discussion
   "Great work! Few questions about the approach..."
   Replies: 2

4. Code Review: src/auth/login.js:85
   "Rate limiting consideration"
   Status: 🔴 UNRESOLVED

5. Code Review: tests/auth.test.js:45
   "Add test for expired token case"
   Status: ✓ RESOLVED

6. General Discussion
   "LGTM! Approving"
   Reactions: 5
```

### View Comments Since Last Update
```bash
/view-pr-comments 123 --since "2 days ago"
```
Shows only comments posted in the last 2 days.

### Search Comments
```bash
/view-pr-comments 123 --search "rate limiting"
```
**Output:**
```
Search Results for "rate limiting" (2 matches):

[1] bob-wilson - Code Review on src/auth/login.js:85
    "Consider adding rate limiting to the login endpoint"
    Status: 🔴 UNRESOLVED
    Date: 2024-04-17 14:30 UTC

[2] john-doe - Reply to general discussion
    "We should implement rate limiting in v2"
    Date: 2024-04-17 15:45 UTC
```

### View Sorted by Threading
```bash
/view-pr-comments 123 --sort threaded
```
Organizes all comments by discussion thread rather than chronologically.

### Combined Options
```bash
/view-pr-comments 123 --unresolved --review --author jane-smith
```
Shows unresolved code review comments from jane-smith only.

## Comment Types

### General Comments
- Posted on the PR itself
- Visible in PR overview
- Can be edited by author
- Support reactions (👍, 😀, etc.)

### Review Comments
- Posted on specific code lines
- Linked to file and line number
- Part of code review process
- Can suggest changes
- Support code snippets

### Review Decision Comments
- Part of PR review submission
- Can request changes, approve, or comment
- Blocks merge if "request changes"
- Permanent record of review decision

### Status Updates
- Comments indicating progress
- Resolution markers
- Action item completions
- Decision announcements

## Output Features

### Comment Structure
```
[#] Author - Role commented DATE
    Comment text
    
    Status indicators:
    - ✓ RESOLVED: Issue addressed
    - 🔴 UNRESOLVED: Still open
    - ⏳ NEEDS ATTENTION: Pending response
    - 🔒 OUTDATED: No longer relevant
    
    Reactions: 👍 X, 😀 Y, etc.
    Replies: Z
    
    [Reply] ReplyAuthor DATE
    Reply text
```

### Code Context
For review comments, shows:
```
[file.js:line-number]

Line number | Code before
Line number | Code with issue
Line number | Code after

Comment text
```

### Threading
```
Main Comment
├── Reply 1
├── Reply 2
│   ├── Reply 2.1
│   └── Reply 2.2
└── Reply 3
```

## Prerequisites

- GitHub account with repository access
- GitHub CLI (`gh`) installed and authenticated
- Read access to the repository
- PR must exist and have comments

## Configuration

The skill uses settings from `settings.claude.json`:
- `skillOverrides.view-pr-comments`: Set to `"on"` to enable the skill
- GitHub CLI authentication configured

## Use Cases

### Before Responding to Comments
Get full context on discussion:
```bash
/view-pr-comments 123
# Read all feedback before responding
```

### Identifying Action Items
Find unresolved comments:
```bash
/view-pr-comments 123 --unresolved
# See what needs to be addressed
```

### Code Review Analysis
Analyze code feedback:
```bash
/view-pr-comments 123 --review
# Review all code review comments
```

### Tracking Reviewer Feedback
See specific reviewer's comments:
```bash
/view-pr-comments 123 --author reviewer-name
# Focus on one reviewer's feedback
```

### Finding Resolved Issues
See what was already addressed:
```bash
/view-pr-comments 123 --resolved
# Understand resolution history
```

### Searching for Specific Topics
Find related discussions:
```bash
/view-pr-comments 123 --search "performance"
# Locate all performance-related comments
```

### Recent Activity
Check latest comments:
```bash
/view-pr-comments 123 --since "1 day ago"
# See what happened recently
```

## Advanced Features

### Reactions Display
Shows emoji reactions on comments:
- 👍 Thumbs up (agreement)
- 😀 Smile (approval)
- 😕 Confused (needs clarification)
- ❤️ Heart (appreciation)
- 🎉 Party (celebration)

### Status Badges
- ✓ RESOLVED: Issue handled
- 🔴 UNRESOLVED: Still pending
- ⏳ NEEDS ATTENTION: Awaiting action
- 🔒 OUTDATED: No longer relevant

### Smart Filtering
- By resolution status
- By comment type
- By author
- By date range
- By keyword search

### Thread Organization
- Nested reply display
- Thread summaries
- Reply counts
- Conversation flow

## Error Handling

- **PR Not Found**: Verifies PR number and repository
- **No Comments**: Indicates PR has no comments yet
- **Access Denied**: Checks authentication and permissions
- **Invalid Filter**: Explains available filter options

## Tips

1. **Check Unresolved First**: Always review unresolved comments before merging
2. **Read Full Threads**: Understand context of reply chains
3. **Search for Keywords**: Find related discussions quickly
4. **Track Authors**: See what each reviewer is concerned about
5. **Respect Resolutions**: Don't reopen resolved discussions without reason
6. **Respond Promptly**: Address comments in timely manner

## Keyboard Shortcut

Configure in keybindings for quick access:
```json
{
  "key": "ctrl+shift+c",
  "command": "skill.run",
  "args": ["view-pr-comments"]
}
```

## Related Commands

- `/view-pr`: View all PR information
- `/review-pr`: Leave a review or comment
- `/create-pr`: Create a new pull request
- `/status`: Check local branch status
- `gh pr view`: Native GitHub CLI command
- `gh pr comments`: View PR comments

## Integration with Other Skills

Works seamlessly with:
- **view-pr**: Get comments as part of full PR view
- **review-pr**: Understand existing feedback before reviewing
- **create-pr**: Reference discussions from related PRs

## Common Workflows

### Workflow 1: Address Reviewer Feedback
```bash
/view-pr-comments 123 --unresolved   # See what needs fixing
# Make code changes
/view-pr-comments 123 --unresolved   # Verify all addressed
git push                             # Push updates
```

### Workflow 2: Prepare for Merge
```bash
/view-pr-comments 123 --unresolved   # Check no blocking issues
/view-pr-comments 123 --review       # Review code feedback
# All clear for merge
```

### Workflow 3: Understand Discussion
```bash
/view-pr-comments 123 --general      # Read discussion
/view-pr-comments 123 --author me    # See your replies
# Get full context
```

### Workflow 4: Track Multiple Reviewers
```bash
/view-pr-comments 123 --author reviewer1  # Review 1's feedback
/view-pr-comments 123 --author reviewer2  # Review 2's feedback
# Compare feedback from different reviewers
```

### Workflow 5: Find Resolution History
```bash
/view-pr-comments 123 --resolved     # See what was handled
# Understand how issues were resolved
```

## Performance

- Basic view: < 1 second
- With search: 1-2 seconds
- Sorting/filtering: < 1 second
- Full threads: 2-3 seconds

Results are cached for 30 seconds.

## Comment Etiquette

When commenting on PRs:
- Be constructive and respectful
- Ask questions for clarification
- Acknowledge good work
- Suggest alternatives, not demands
- Use threads for focused discussions
- Mark resolutions clearly
- Provide context for suggestions
