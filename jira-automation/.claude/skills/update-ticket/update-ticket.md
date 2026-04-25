# Update Jira Ticket Skill

## Overview
This skill enables users to update existing Jira tickets with support for modifying summary, description, status, assignee, priority, labels, and other custom fields.

## Usage

### Basic Usage
```
/update-ticket SCRUM-1 --summary "New title" --description "Updated description"
```

### Update Status/Transition
```
/update-ticket SCRUM-1 --status "In Progress"
```

### Full Command with Multiple Fields
```
/update-ticket SCRUM-1 \
  --summary "Updated Summary" \
  --description "New description" \
  --status "In Progress" \
  --assignee "user@example.com" \
  --priority "High" \
  --labels "label1,label2"
```

## Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `TICKET_KEY` | Yes | Jira ticket key | `SCRUM-1`, `BUG-42` |
| `--summary` | No | New ticket title | `"Updated Title"` |
| `--description` | No | New description | `"Updated details"` |
| `--status` | No | New status (transitions) | `"To Do"`, `"In Progress"`, `"Done"` |
| `--assignee` | No | New assignee email/username | `rupa.rk201@gmail.com` |
| `--priority` | No | Priority level | `Lowest`, `Low`, `Medium`, `High`, `Highest` |
| `--labels` | No | Comma-separated labels | `"backend,api,critical"` |
| `--add-labels` | No | Add labels without removing existing | `"newlabel"` |
| `--remove-labels` | No | Remove specific labels | `"oldlabel"` |

## Examples

### Update ticket title only
```
/update-ticket SCRUM-1 --summary "Fix authentication bug"
```

### Move ticket to in progress
```
/update-ticket SCRUM-1 --status "In Progress"
```

### Reassign and change priority
```
/update-ticket SCRUM-1 --assignee rupa.rk201 --priority High
```

### Update description with more details
```
/update-ticket BUG-42 --description "This bug occurs when users click the logout button on the profile page. Expected: redirect to login. Actual: application crashes with 500 error."
```

### Add labels to existing ticket
```
/update-ticket SCRUM-1 --add-labels "urgent,review-needed"
```

### Complete ticket workflow
```
/update-ticket SCRUM-1 \
  --status "In Review" \
  --description "Ready for code review - all tests passing" \
  --add-labels "review-ready"
```

## Supported Status Transitions

Common workflow states:
- `To Do` - Initial state
- `In Progress` - Work in progress
- `In Review` - Pending review
- `Done` - Completed

*Note: Available transitions depend on your Jira workflow configuration.*

## Implementation Details

The skill uses the Atlassian MCP server to interact with Jira. It:
1. Authenticates with your Jira instance
2. Retrieves current ticket details
3. Updates only the specified fields
4. Optionally transitions the ticket to a new status
5. Returns the updated ticket information and confirmation

## Errors & Troubleshooting

- **Ticket not found**: Verify the ticket key is correct (e.g., SCRUM-1)
- **Invalid status**: Check available transitions for the ticket's current workflow
- **Permission denied**: Ensure you have permission to edit this ticket
- **Invalid field value**: Some fields have restricted values (e.g., priority must be from defined list)
- **Cannot transition**: The status you requested may not be reachable from current state

## Common Use Cases

### Daily standup updates
```
/update-ticket SCRUM-5 --status "In Progress" --description "Working on API endpoint implementation. ~50% complete."
```

### Mark completed work
```
/update-ticket SCRUM-3 --status "Done" --add-labels "completed" --description "Implementation finished and tested."
```

### Request review
```
/update-ticket SCRUM-7 --status "In Review" --description "Implementation complete, ready for review. See PR #123"
```

### Re-prioritize urgent issues
```
/update-ticket BUG-15 --priority "Highest" --add-labels "critical,blocker"
```

## Related Skills
- `create-ticket` - Create new tickets
- `add-comment` - Add comments to tickets
- `bulk-update` - Update multiple tickets at once
