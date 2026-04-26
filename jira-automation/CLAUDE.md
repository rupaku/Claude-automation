# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains **Jira automation skills** for Claude Code that streamline ticket management workflows. It provides skills for:
- Creating new Jira tickets
- Updating existing ticket fields
- Transitioning tickets through workflow states
- Adding comments to tickets
- Bulk transitioning multiple tickets at once

## Technology Stack

- **Atlassian MCP**: Model Context Protocol server for authenticated Jira API access
- **Jira Cloud REST API**: Via the `@modelcontextprotocol/server-atlassian` package

## Development Setup

### Prerequisites
1. Jira Cloud instance with API access
2. Jira API token with appropriate permissions
3. Node.js (for npx to run the MCP server)

### Environment Configuration

1. **Create `.env` file** in the project root:
```bash
JIRA_HOST="https://your-instance.atlassian.net"
JIRA_USERNAME="your-email@example.com"
JIRA_API_TOKEN_with_perm="your_jira_api_token_here"
```

2. **MCP Server**: Configured in `.mcp.json` — uses `@modelcontextprotocol/server-atlassian`

3. **Verify Setup**: Run `claude` in this directory and check that the Atlassian MCP server connects successfully.

## Architecture Notes

### Core Structure
- **Skills**: Located in `.claude/skills/` directory
  - `create-ticket/` - Create new Jira tickets
  - `update-ticket/` - Update existing ticket fields
  - `transition-ticket/` - Move tickets through workflow states
  - `add-comment/` - Add comments to tickets
  - `bulk-transition/` - Batch transition multiple tickets

### Configuration
- `.mcp.json`: Defines Atlassian MCP server configuration
- `.claude/settings.json`: Permissions and MCP server enablement
- `load-env.sh`: Loads environment variables for Claude Code

### Adding a New Skill
1. Create skill folder in `.claude/skills/<skill-name>/`
2. Create `SKILL.md` with YAML frontmatter and instructions
3. Add `allowed-tools` in frontmatter for required permissions
4. Test with your Jira instance

## Sensitive Information

Never commit:
- Jira API tokens or credentials
- Personal authentication tokens
- Any user-specific configuration
Use environment variables or `.env` files (add to `.gitignore`) for secrets.
