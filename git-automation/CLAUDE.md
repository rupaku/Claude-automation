# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains **Git and GitHub automation skills** that streamline Pull Request (PR) workflows. It provides CLI skills for:
- Creating and managing pull requests
- Reviewing code changes
- Checking PR status and CI/CD results
- Merging approved pull requests
- Managing branch operations

## Technology Stack

- **GitHub MCP**: Model Context Protocol for authenticated GitHub API access
- **Octokit.js**: GitHub REST API client
- **GitHub CLI**: For command-line Git operations
- **Node.js**: Runtime environment

## Development Setup

### Prerequisites
1. Node.js 18+ installed
2. GitHub personal access token (PAT) with `repo` scope
3. GitHub CLI (`gh`) installed and authenticated

### Environment Configuration

1. **Create `.env` file** in the project root:
```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your-username
GITHUB_REPO=Claude-automation
```

2. **Install GitHub MCP Server**:
```bash
npm install @octokit/rest @octokit/octokit
npm install -D @modelcontextprotocol/server-github
```

3. **Verify Configuration**:
```bash
# Load environment variables
source load-env.sh

# Test GitHub connection
gh api user
```

See [GITHUB_MCP_INTEGRATION.md](./GITHUB_MCP_INTEGRATION.md) for detailed setup instructions.

## Build, Test, and Lint Commands

- **Install Dependencies**: `npm install`
- **Test**: `npm test` (to be configured)
- **Lint**: `npm run lint` (ESLint)
- **Format**: `npm run format` (Prettier)

## Architecture Notes

### Core Structure
- **Skills**: Located in `.claude/skill/` directory
  - `create-pr/` - Create pull request skill
  - `review-pr/` - Review pull request skill
  - `view-pr/` - View PR details skill
  - `view-pr-comments/` - View PR comments skill
  - `view-pr-checks/` - View CI/CD checks skill
  - `merge/` - Merge pull request skill
  - `status/` - Check git status skill

### GitHub MCP Integration
- `.mcp.json`: Defines GitHub MCP server configuration
- `settings.claude.json`: Enables MCP servers and skill overrides
- `GITHUB_MCP_INTEGRATION.md`: Detailed setup and implementation guide

### API Communication
- Uses GitHub REST API via Octokit.js
- Authentication via personal access token
- Implements rate limiting (5000 req/hr)
- Proper error handling for API failures

### Major Modules
1. **Skill Functions**: Implement GitHub operations
2. **GitHub MCP Server**: Provides API abstraction
3. **Utility Functions**: Formatting, validation, error handling
4. **Configuration**: Environment variables and settings

## Common Development Tasks

### Adding a New Skill
1. Create skill folder in `.claude/skill/`
2. Implement skill function using Octokit.js
3. Add to `settings.claude.json` skillOverrides
4. Create documentation file (skill-name.md)
5. Test with real GitHub PR

### Working with GitHub API
```javascript
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Example: Get PR details
const { data } = await octokit.pulls.get({
  owner: process.env.GITHUB_OWNER,
  repo: process.env.GITHUB_REPO,
  pull_number: prNumber
});
```

### Testing Skills
1. Set up test GitHub repository
2. Create test branches and PRs
3. Run skills against test data
4. Verify API responses
5. Check error handling

### Debugging
```bash
# Enable debug logging
DEBUG=* claude-code

# Check GitHub token validity
gh api rate_limit

# Test API endpoints
gh api repos/{owner}/{repo}
```

## Sensitive Information

Never commit:
- Jira API tokens or credentials
- Personal authentication tokens
- Any user-specific configuration
Use environment variables or `.env` files (add to `.gitignore`) for secrets.
