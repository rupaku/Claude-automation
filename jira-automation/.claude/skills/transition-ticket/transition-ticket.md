# Transition Jira Ticket Skill

## Overview
This skill enables users to move Jira tickets through workflow states (status transitions). It handles moving tickets between different states like To Do, In Progress, In Review, and Done, with support for custom workflows and transition conditions.

## Usage

### Basic Transition
```
/transition-ticket SCRUM-1 --to "In Progress"
```

### Transition with Comment
```
/transition-ticket SCRUM-1 --to "Done" --comment "Implementation complete and tested"
```

### Transition with Metadata
```
/transition-ticket SCRUM-5 --to "In Review" --assignee rupa.rk201 --comment "Ready for code review"
```

### Full Command with All Options
```
/transition-ticket SCRUM-1 \
  --to "In Progress" \
  --comment "Starting work on this task" \
  --assignee "assignee@example.com" \
  --resolution "Done" \
  --resolution-comment "Issue resolved as of version 2.1.0"
```

## Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `TICKET_KEY` | Yes | Jira ticket key | `SCRUM-1`, `BUG-42` |
| `--to` / `-t` | Yes | Target status/state | `"In Progress"`, `"Done"` |
| `--comment` / `-c` | No | Comment to add during transition | `"Moving to review"` |
| `--assignee` / `-a` | No | Reassign during transition | `rupa.rk201@gmail.com` |
| `--resolution` | No | Mark as resolved (for Done state) | `"Done"`, `"Won't Fix"` |
| `--resolution-comment` | No | Comment for resolution | `"Resolved in v1.2.0"` |

## Common Workflow States

### Standard Scrum Workflow
```
To Do → In Progress → In Review → Done
```

### Kanban Workflow
```
Backlog → To Do → In Progress → Review → QA → Done
```

### Bug Workflow
```
New → In Progress → Resolved → Closed/Reopened
```

*Note: Available states depend on your Jira project's workflow configuration.*

## Examples

### Start working on a task
```
/transition-ticket SCRUM-1 --to "In Progress"
```

### Move task to review
```
/transition-ticket SCRUM-3 --to "In Review" --comment "Implementation complete, ready for code review"
```

### Mark task as complete
```
/transition-ticket SCRUM-5 --to "Done" --comment "All requirements met, tested and deployed to production"
```

### Transition with reassignment
```
/transition-ticket SCRUM-7 --to "In Review" --assignee sarah.dev --comment "Code ready for review by Sarah"
```

### Reject and send back
```
/transition-ticket SCRUM-9 --to "In Progress" --comment "Found issues during review. Specific feedback: Need more error handling in the login form"
```

### Resolve a bug
```
/transition-ticket BUG-15 --to "Done" \
  --resolution "Fixed" \
  --resolution-comment "Bug fixed in commit abc123def. Users should clear cache and reload." \
  --comment "Applied fix to production. Monitoring for regressions."
```

### Block and defer
```
/transition-ticket SCRUM-12 --to "Blocked" --comment "Waiting for design approval from the UX team. See SCRUM-8 for dependency."
```

### Reopen ticket
```
/transition-ticket SCRUM-20 --to "In Progress" --comment "QA found regression. Reopening for fixes."
```

### Batch workflow progression
```
/transition-ticket SCRUM-1 --to "In Review"
/transition-ticket SCRUM-2 --to "In Review"
/transition-ticket SCRUM-3 --to "In Review"
```

## Workflow Patterns

### Development Workflow
```
1. /transition-ticket SCRUM-X --to "In Progress" --comment "Starting development"
2. (Make changes, commit)
3. /transition-ticket SCRUM-X --to "In Review" --comment "PR: #123 - Ready for review"
4. (Address feedback)
5. /transition-ticket SCRUM-X --to "Done" --comment "Merged to main, deployed to production"
```

### Bug Fix Workflow
```
1. /transition-ticket BUG-Y --to "In Progress" --comment "Reproducing and investigating bug"
2. /transition-ticket BUG-Y --to "In Review" --comment "Fix implemented, PR: #456"
3. /transition-ticket BUG-Y --to "Testing" --assignee qa.team --comment "Ready for QA verification"
4. /transition-ticket BUG-Y --to "Done" --resolution "Fixed" --comment "Verified fixed in v2.0.1"
```

### Code Review Workflow
```
1. /transition-ticket SCRUM-Z --to "In Review" --comment "Sent for review - PR #789"
2. /transition-ticket SCRUM-Z --to "In Progress" --comment "Feedback received, making changes"
   OR
3. /transition-ticket SCRUM-Z --to "Done" --comment "Approved and merged"
```

### Status Check Pattern
```
/transition-ticket SCRUM-1 --to "In Progress" --comment "Status update: 75% complete, no blockers"
```

## Transition Conditions

### Resolution Requirements
Some workflows require specifying a resolution when transitioning to "Done":
```
/transition-ticket TICKET --to "Done" --resolution "Done"
```

### Available Resolutions
- `Done` - Successfully completed
- `Won't Fix` - Decided not to fix
- `Duplicate` - Duplicate of another ticket
- `Cannot Reproduce` - Issue cannot be reproduced
- `Obsolete` - No longer relevant

### Assignment During Transition
Move ownership to someone else during status change:
```
/transition-ticket SCRUM-5 --to "Testing" --assignee qa.team
```

## Error Handling & Troubleshooting

### Common Issues

**Invalid Target Status**
- Error: Status "In Completed" does not exist
- Fix: Use correct status name from your workflow (e.g., "Done" not "Completed")

**Invalid Transition**
- Error: Cannot transition from "Done" to "In Progress" (not in workflow path)
- Fix: Check if target state is reachable from current state

**Missing Required Field**
- Error: Resolution is required when transitioning to "Done"
- Fix: Add `--resolution` parameter with appropriate value

**Insufficient Permissions**
- Error: You do not have permission to transition this ticket
- Fix: Ensure you have the required workflow transition permission

**Ticket Not Found**
- Error: Ticket SCRUM-999 does not exist
- Fix: Verify ticket key is correct (case-sensitive)

## Tips & Best Practices

✅ **Do:**
- Add descriptive comments explaining why you're transitioning
- Reassign tickets appropriately during transitions
- Follow your team's workflow conventions
- Include relevant PR/commit references
- Document blockers or risks in comments

❌ **Don't:**
- Transition tickets without proper authorization
- Skip required workflow steps
- Leave status ambiguous with vague comments
- Create bottlenecks by not reassigning
- Manually mark as "Done" if tests are failing

## Automation Ideas

### Daily Update Pattern
```bash
# At start of day
/transition-ticket SCRUM-1 --to "In Progress" --comment "Starting sprint work"

# At end of day  
/transition-ticket SCRUM-1 --to "In Review" --comment "End of day checkpoint - 80% complete"
```

### Sprint Cleanup
```bash
# Move all in-review items to done
/transition-ticket SCRUM-1 --to "Done" --comment "Sprint completion"
/transition-ticket SCRUM-2 --to "Done" --comment "Sprint completion"
```

### Release Workflow
```bash
# QA phase
/transition-ticket SCRUM-5 --to "Testing" --assignee qa.team

# Upon approval
/transition-ticket SCRUM-5 --to "Done" --resolution "Done" --comment "Released in v2.1.0"
```

## Related Skills
- `update-ticket` - Modify ticket fields (summary, assignee, priority)
- `add-comment` - Add comments without changing status
- `create-ticket` - Create new tickets
- `bulk-transition` - Move multiple tickets at once

## Workflow State Reference

| State | Description | Typical Next States |
|-------|-------------|-------------------|
| To Do | Not started | In Progress, Backlog |
| In Progress | Currently being worked on | In Review, Blocked |
| In Review | Awaiting review | In Progress (changes needed), Done |
| Testing/QA | Under quality assurance | In Progress (fixes needed), Done |
| Done | Completed | - |
| Blocked | Waiting on external factor | In Progress (blocker resolved) |

*States vary by project workflow - check your Jira board for available states.*
