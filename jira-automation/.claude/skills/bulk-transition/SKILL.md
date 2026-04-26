---
name: bulk-transition
description: Move multiple Jira tickets through workflow states in a single operation
allowed-tools: mcp__atlassian
---

# Bulk Transition Jira Tickets Skill

## Overview
This skill enables users to move multiple Jira tickets through workflow states in a single operation. It's ideal for sprint completion, batch processing, and coordinated workflow changes across related tickets.

## Usage

### Transition Multiple Specific Tickets
```
/bulk-transition SCRUM-1,SCRUM-2,SCRUM-3 --to "In Progress"
```

### Transition Using JQL Query
```
/bulk-transition --jql "project = SCRUM AND status = 'To Do' AND assignee = currentUser()" --to "In Progress"
```

### Transition with Comment
```
/bulk-transition SCRUM-1,SCRUM-5,SCRUM-8 --to "Done" --comment "Sprint 5 completion - all stories finished"
```

### Transition from File (Ticket List)
```
/bulk-transition --from-file tickets.txt --to "In Review" --comment "Ready for code review"
```

### Full Command with All Options
```
/bulk-transition SCRUM-1,SCRUM-2 \
  --to "In Review" \
  --comment "Moving to review phase" \
  --reassign-to "rupa.rk201" \
  --add-label "code-review" \
  --dry-run
```

## Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `TICKET_KEYS` | If no JQL | Comma-separated ticket keys | `SCRUM-1,SCRUM-2,SCRUM-3` |
| `--jql` | If no keys | JQL query to find tickets | `"project = SCRUM AND status = 'To Do'"` |
| `--from-file` | If no keys | File with ticket keys (one per line) | `tickets.txt`, `sprint-list.csv` |
| `--to` | Yes | Target status | `"In Progress"`, `"Done"` |
| `--comment` | No | Comment for all transitions | `"Sprint completion"` |
| `--reassign-to` | No | Reassign all tickets | `rupa.rk201@gmail.com` |
| `--add-label` | No | Add label(s) to all tickets | `"bulk-update,done"` |
| `--resolution` | No | Mark as resolved (for Done) | `"Done"`, `"Won't Fix"` |
| `--dry-run` | No | Preview changes without executing | `--dry-run` |
| `--skip-errors` | No | Continue on errors instead of stopping | `--skip-errors` |
| `--batch-size` | No | Process N tickets at a time | `10`, `50` |

## Examples

### Sprint Completion
```
/bulk-transition SCRUM-1,SCRUM-2,SCRUM-3,SCRUM-4,SCRUM-5 \
  --to "Done" \
  --comment "Sprint 6 completed - all requirements met" \
  --resolution "Done"
```

### Move All My To-Do Items to In Progress
```
/bulk-transition --jql "assignee = currentUser() AND status = 'To Do'" \
  --to "In Progress" \
  --comment "Starting work on sprint backlog"
```

### Send All Reviewed Code to Done
```
/bulk-transition --jql "status = 'In Review' AND approvals >= 2" \
  --to "Done" \
  --comment "Approved and ready to merge"
```

### Revert Failed Deployments
```
/bulk-transition --jql "label = 'production-failed'" \
  --to "In Progress" \
  --comment "Reverting: hotfix required before re-deployment" \
  --reassign-to "dev-team-lead"
```

### Bulk Reassign and Transition
```
/bulk-transition SCRUM-10,SCRUM-11,SCRUM-12 \
  --to "Testing" \
  --reassign-to "qa-team" \
  --comment "Ready for QA verification" \
  --add-label "testing"
```

### End of Sprint Cleanup
```
/bulk-transition --jql "project = SCRUM AND sprint = 'Sprint 5'" \
  --to "Done" \
  --comment "Sprint 5 final - all items closed"
```

### Find and Transition Blocking Issues
```
/bulk-transition --jql "status = 'Blocked' AND blockedSince < -7d" \
  --to "Cancelled" \
  --comment "Auto-closing old blocked items. Please reopen if still relevant." \
  --resolution "Won't Fix"
```

### Dry Run - Preview Changes
```
/bulk-transition --jql "project = SCRUM AND status = 'In Review'" \
  --to "Done" \
  --comment "Batch completion" \
  --dry-run
```

### Process Large Result Set in Batches
```
/bulk-transition --jql "project = INFRA AND status = 'To Do'" \
  --to "In Progress" \
  --batch-size 50 \
  --comment "Processing backlog in batches"
```

## JQL Query Examples

### Common Patterns

**All unresolved tickets in project:**
```
project = SCRUM AND resolution = Unresolved
```

**My assigned to-do items:**
```
assignee = currentUser() AND status = 'To Do'
```

**Items in a specific sprint:**
```
sprint = "Sprint 5" AND status != Done
```

**Items waiting on review longer than 3 days:**
```
status = 'In Review' AND updated < -3d
```

**High priority bugs:**
```
project = BUG AND priority = Highest
```

**Items with specific label:**
```
labels = "critical" AND status = 'To Do'
```

**Items assigned to team:**
```
assignee IN (alice, bob, charlie) AND status = 'In Progress'
```

**Stale items (not updated in 30 days):**
```
status = 'Blocked' AND updated < -30d
```

**Ready for deployment:**
```
status = 'In Review' AND approvals >= 2 AND tests = passed
```

## Workflow Patterns

### End of Sprint Workflow
```bash
# 1. Find all completed items
/bulk-transition --jql "sprint = currentSprint() AND status = 'In Review'" \
  --to "Done" \
  --comment "Sprint completed" \
  --dry-run

# 2. Execute after review
/bulk-transition --jql "sprint = currentSprint() AND status = 'In Review'" \
  --to "Done" \
  --comment "Sprint completed"

# 3. Move incomplete items to next sprint
/bulk-transition --jql "sprint = currentSprint() AND status != Done" \
  --to "Backlog" \
  --comment "Moved to next sprint for continuation"
```

### Release Preparation
```bash
# 1. Find all items for release
/bulk-transition --jql "label = 'v2.0.0-release' AND status = 'In Review'" \
  --to "Testing" \
  --reassign-to "qa-team" \
  --add-label "release-qa"

# 2. Move tested items to done
/bulk-transition --jql "label = 'release-qa' AND test-status = passed" \
  --to "Done" \
  --resolution "Done" \
  --comment "Released in v2.0.0"
```

### Bug Triage Workflow
```bash
# 1. Find high-priority unassigned bugs
/bulk-transition --jql "priority = Highest AND assignee = EMPTY" \
  --reassign-to "dev-team-lead" \
  --add-label "needs-triage"

# 2. Move triaged bugs to in progress
/bulk-transition --jql "label = 'needs-triage' AND assignee != EMPTY" \
  --to "In Progress" \
  --comment "Assigned and ready for work"
```

## Input Formats

### File Format (tickets.txt)
```
SCRUM-1
SCRUM-2
SCRUM-3
SCRUM-5
SCRUM-8
```

### CSV Format (tickets.csv)
```
SCRUM-1,In Progress
SCRUM-2,In Review
SCRUM-3,Done
```

## Dry Run & Preview

Always preview large operations first:
```
/bulk-transition --jql "project = SCRUM" --to "Done" --dry-run
```

Output:
```
Dry-run mode: No changes will be made
Tickets to transition: 47
  SCRUM-1: To Do → Done
  SCRUM-2: In Progress → Done
  SCRUM-3: In Review → Done
  ...
```

## Error Handling & Troubleshooting

### Common Issues

**Invalid JQL Query**
- Error: "Invalid JQL: status = 'In Progess'" (typo in "In Progress")
- Fix: Check JQL syntax and status names

**Transition Not Available**
- Error: "Cannot transition SCRUM-1 from 'To Do' to 'Testing'" 
- Fix: Check your workflow path - 'Testing' may not be a valid state

**Permission Denied**
- Error: "You do not have permission to transition SCRUM-5"
- Fix: Ensure you have workflow transition permissions

**No Tickets Found**
- Error: "JQL returned 0 results"
- Fix: Verify JQL query matches existing tickets

**Mixed Workflow States**
- Error: "Tickets have different workflow states - cannot batch transition"
- Fix: Use separate commands for different states

### Options to Handle Errors

**Skip Errors and Continue**
```
/bulk-transition SCRUM-1,SCRUM-2,INVALID-KEY --to "Done" --skip-errors
```

**Batch Processing for Large Sets**
```
/bulk-transition --jql "project = LARGE" --to "Done" --batch-size 100
```

## Tips & Best Practices

✅ **Do:**
- Always use `--dry-run` first for large operations
- Add descriptive comments explaining the batch change
- Use JQL for complex filtering instead of listing each ticket
- Monitor the operation progress with batch-size
- Verify permissions before bulk operations
- Document reason for bulk transitions

❌ **Don't:**
- Use bulk transitions without testing with --dry-run
- Transition tickets you don't have permission to modify
- Ignore error messages - investigate and fix
- Mix unrelated tickets in one operation
- Forget to add informative comments
- Blindly apply bulk changes without review

## Performance Considerations

| Operation | Estimated Time |
|-----------|-----------------|
| 10 tickets | < 1 second |
| 50 tickets | 2-5 seconds |
| 100 tickets | 5-10 seconds |
| 500+ tickets | Use batch-size 50-100 |

## Automation & Scheduling

### Daily Backlog Review
```bash
/bulk-transition \
  --jql "status = 'Blocked' AND blockedSince < -7d" \
  --to "Cancelled" \
  --comment "Auto-closing old blocked items"
```

### Weekly Sprint Cleanup
```bash
/bulk-transition \
  --jql "sprint = currentSprint() AND status = 'In Review'" \
  --to "Done" \
  --comment "Friday cleanup - approved items to done"
```

### Monthly Old Issue Archive
```bash
/bulk-transition \
  --jql "status = 'To Do' AND created < -90d" \
  --to "Archived" \
  --comment "Archiving old backlog items"
```

## Related Skills
- `transition-ticket` - Move single tickets
- `update-ticket` - Modify ticket fields without changing status
- `add-comment` - Add comments to multiple tickets
- `bulk-update` - Update fields across multiple tickets
- `create-ticket` - Create new tickets

## Safety Guidelines

1. **Always preview first**: `--dry-run` is your friend
2. **Test on small set**: Try with 5 tickets before running on 500
3. **Communicate changes**: Add clear comments explaining why
4. **Monitor results**: Check a sample of transitions completed
5. **Keep audit trail**: Comments provide history of bulk operations

## Limits & Constraints

- Maximum tickets per operation: 1000 (use batch-size for larger sets)
- Maximum comment length: 32,767 characters
- Query timeout: 30 seconds (reduce result set if exceeded)
- API rate limits: Depends on Jira instance configuration
