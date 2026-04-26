---
name: create-ticket
description: Create new Jira tickets with project, type, summary, description, assignee, priority, and labels
allowed-tools: mcp__atlassian
---

# Create Jira Ticket Skill

## Overview
This skill enables users to quickly create Jira tickets with support for setting project, issue type, summary, description, assignee, priority, and labels.

## Usage

### Basic Usage
```
/create-ticket --project SCRUM --type Task --summary "Task title" --description "Task description"
```

### Full Command with All Options
```
/create-ticket \
  --project PROJECT_KEY \
  --type "Issue Type" \
  --summary "Ticket Summary" \
  --description "Detailed description" \
  --assignee "user@example.com" \
  --priority "High" \
  --labels "label1,label2"
```

## Parameters

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `--project` | Yes | Jira project key | `SCRUM`, `INFRA` |
| `--type` | Yes | Issue type | `Task`, `Bug`, `Story`, `Epic` |
| `--summary` | Yes | Ticket title/summary | `"Implement API endpoint"` |
| `--description` | No | Detailed description | `"Add POST /users endpoint"` |
| `--assignee` | No | Assignee email or username | `rupa.rk201@gmail.com` |
| `--priority` | No | Priority level | `Lowest`, `Low`, `Medium`, `High`, `Highest` |
| `--labels` | No | Comma-separated labels | `"backend,api,critical"` |

## Examples

### Create a simple task
```
/create-ticket --project SCRUM --type Task --summary "Update documentation"
```

### Create a bug with full details
```
/create-ticket \
  --project SCRUM \
  --type Bug \
  --summary "Login page crash on mobile" \
  --description "Users experience crashes when accessing login on iOS devices running version 14.2" \
  --priority High \
  --assignee rupa.rk201 \
  --labels "mobile,urgent,frontend"
```

### Create a story for a feature
```
/create-ticket \
  --project SCRUM \
  --type Story \
  --summary "Implement dark mode" \
  --description "Add dark mode support across the application with user preference persistence" \
  --priority Medium \
  --labels "feature,ui,ux"
```

## Implementation Details

The skill uses the Atlassian MCP server to interact with Jira. It:
1. Authenticates with your Jira instance
2. Validates the project exists and issue type is available
3. Creates the ticket with the provided fields
4. Returns the created ticket key and URL

## Errors & Troubleshooting

- **Project not found**: Ensure the project key is correct (use uppercase)
- **Invalid issue type**: Check available types for your project
- **Authentication failed**: Ensure MCP is authenticated with Atlassian
- **Missing required fields**: Summary, project, and type are mandatory

## Related Skills
- `update-ticket` - Modify existing tickets
- `add-comment` - Add comments to tickets
- `transition-ticket` - Move tickets through workflow states
