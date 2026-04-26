---
name: add-comment
description: Add comments to existing Jira tickets with formatted text, mentions, and visibility restrictions
allowed-tools: mcp__atlassian
---

# Add Comment to Jira Ticket Skill

## Overview
This skill enables users to add comments to existing Jira tickets with support for formatted text, mentions, code blocks, and visibility restrictions.

## Usage

### Basic Comment
```
/add-comment SCRUM-1 "This is a simple comment on the ticket"
```

### Multiline Comment
```
/add-comment SCRUM-1 --message "
Work completed:
- Implemented API endpoint
- Added unit tests
- Updated documentation

Ready for review!
"
```

### Comment with Visibility Restriction
```
/add-comment SCRUM-1 --message "Internal note: Budget constraints limit scope" --visibility role:Developers
```

### Full Command with All Options
```
/add-comment SCRUM-1 \
  --message "Comment text here" \
  --format html \
  --visibility group:team-leads
```

## Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `TICKET_KEY` | Yes | Jira ticket key | `SCRUM-1`, `BUG-42` |
| `--message` / `-m` | Yes | Comment text (can use quotes for multiline) | `"Comment here"` |
| `--format` | No | Text format | `markdown` (default), `html`, `plain` |
| `--visibility` | No | Who can see comment | `role:Developers`, `group:team-leads` |

## Examples

### Quick status update
```
/add-comment SCRUM-5 "Working on this now, should be done by EOD"
```

### Detailed progress comment
```
/add-comment SCRUM-3 --message "
## Progress Update

**Completed:**
- Backend API implementation
- Database schema migration
- Unit test coverage: 85%

**In Progress:**
- Integration tests
- API documentation

**Blockers:**
- Waiting for design approval on UI components

ETA: 2 days
"
```

### Comment with code snippet
```
/add-comment BUG-15 --message "
Found the issue! The bug is in the authentication handler:

\`\`\`javascript
// Before (incorrect)
if (token == null) {
  
// After (correct)  
if (token === null) {
\`\`\`

This strict equality check fixes the false positive authentication failures.
" --format markdown
```

### Internal team note
```
/add-comment SCRUM-42 \
  --message "We need to discuss the performance implications with the architecture team before proceeding." \
  --visibility role:Developers
```

### Comment with mention
```
/add-comment SCRUM-7 "Hey @rupa.rk201, can you review the implementation when you get a chance?"
```

### Link to external resource
```
/add-comment SCRUM-10 --message "
See the related discussion: https://github.com/company/repo/discussions/123

Key points:
- Performance impact: ~5% increase in latency
- Backwards compatible: Yes
- Requires database migration: No
"
```

## Comment Formatting

### Markdown Format (Default)
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~

# Heading 1
## Heading 2

- Bullet point
- Another point

1. Numbered item
2. Another item

[Link text](https://example.com)

\`\`\`javascript
code block
\`\`\`

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### HTML Format
```html
<p>Paragraph with <strong>bold</strong> and <em>italic</em></p>
<h2>Heading</h2>
<ul>
  <li>List item</li>
</ul>
<code>inline code</code>
```

## Visibility Options

### Public Comment (Default)
- Visible to all users with access to the ticket
- No visibility parameter needed

### Role-based Visibility
```
--visibility role:Developers
--visibility role:Managers
```

### Group-based Visibility
```
--visibility group:team-leads
--visibility group:backend-team
```

## Use Cases

### Daily Standup Update
```
/add-comment SCRUM-8 "
**Today's Update:**
- Completed: User authentication module
- Working on: API integration tests
- Blocked by: Waiting for staging environment access

**Plan for Tomorrow:**
- Finish integration tests
- Begin code review process
"
```

### Code Review Comment
```
/add-comment SCRUM-11 "
Looks good overall! A few suggestions:

1. Consider extracting the validation logic to a separate function
2. Add error handling for network timeouts
3. Update the test case for edge case where data is null

Once addressed, feel free to mark as reviewed!
"
```

### Bug Reproduction Steps
```
/add-comment BUG-20 "
I can reproduce this issue with these steps:

1. Navigate to Settings page
2. Click on 'Advanced Options'
3. Change timezone to 'UTC-8'
4. Refresh the page
5. Check the dashboard - time displays incorrectly

**Expected:** Dashboard shows correct time in UTC-8
**Actual:** Dashboard shows time in UTC

Environment: Chrome 120, macOS 14.2
"
```

### Decision Documentation
```
/add-comment SCRUM-25 "
**Decision:** Use PostgreSQL for the new analytics database

**Reasoning:**
- Better performance for complex queries
- Team expertise with PostgreSQL
- Native support for JSON data types

**Alternatives Considered:**
- MongoDB (not suitable for relational queries)
- DynamoDB (cost would be ~3x higher)

**Next Steps:**
- Set up staging PostgreSQL instance
- Begin schema design
- Schedule knowledge transfer session
" --visibility role:Architects
```

### Quick Acknowledgment
```
/add-comment SCRUM-2 "👍 On it!"
```

## Implementation Details

The skill uses the Atlassian MCP server to interact with Jira. It:
1. Authenticates with your Jira instance
2. Validates the ticket exists
3. Formats the comment according to specified format
4. Applies visibility restrictions if specified
5. Adds the comment and returns confirmation with comment ID

## Errors & Troubleshooting

- **Ticket not found**: Verify the ticket key is correct (e.g., SCRUM-1)
- **Missing message**: Comment text is required
- **Invalid visibility**: Check the role or group name exists in your Jira instance
- **Permission denied**: Ensure you have permission to comment on this ticket
- **Format not supported**: Use `markdown`, `html`, or `plain`

## Tips & Best Practices

✅ **Do:**
- Use clear formatting for readability
- Include context and reasoning
- Link to related discussions or PRs
- Update comments with new information when situations change
- Use visibility restrictions for sensitive information

❌ **Don't:**
- Add sensitive credentials or API keys
- Duplicate information already in ticket description
- Use @ mentions for non-urgent comments
- Leave unnecessarily long comments without structure

## Related Skills
- `create-ticket` - Create new tickets
- `update-ticket` - Update ticket details and status
- `bulk-comment` - Add comments to multiple tickets at once
