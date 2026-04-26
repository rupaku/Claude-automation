# GitHub MCP Integration Guide

This guide explains how to set up and use the GitHub Model Context Protocol (MCP) server for automating Git and PR operations.

## What is GitHub MCP?

GitHub MCP is a Model Context Protocol server that provides Claude with authenticated access to GitHub APIs. It enables:
- Reading PR information programmatically
- Accessing repository data
- Interacting with GitHub issues and discussions
- Automating workflow operations
- Real-time GitHub data access

## Prerequisites

- Node.js 18+ installed
- GitHub personal access token (PAT)
- GitHub CLI (`gh`) installed and authenticated
- npm or yarn package manager

## Setup Steps

### 1. Install GitHub MCP Server

```bash
npm install @modelcontextprotocol/server-github
```

Or globally:
```bash
npm install -g @modelcontextprotocol/server-github
```

### 2. Get GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "Claude MCP Token")
4. Select scopes:
   - `repo` - Full control of private repositories
   - `read:org` - Read organization data
   - `workflow` - Manage workflows
   - `admin:repo_hook` - Manage repository hooks
5. Click "Generate token"
6. Copy the token (you won't see it again)

### 3. Configure Environment Variables

Create or update `.env` file:

```bash
# .env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=Claude-automation
```

Or set environment variable:
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Load Environment Variables

Update `load-env.sh`:

```bash
#!/bin/bash
# load-env.sh
set -a
[ -f .env ] && source .env
set +a
export GITHUB_TOKEN
```

Make it executable:
```bash
chmod +x load-env.sh
```

### 5. Configure .mcp.json

The `.mcp.json` file is already configured. It includes:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### 6. Update settings.claude.json

The `settings.claude.json` file enables the GitHub MCP server:

```json
{
  "permissions": {
    "allow": [
      "Bash(gh:*)",
      "Bash(git:*)",
      "Bash(python3:*)"
    ]
  },
  "enabledMcpServers": ["github"],
  "apiKeyHelper": "./load-env.sh",
  "skillOverrides": {
    "create-pr": "on",
    "review-pr": "on",
    "merge-pr": "on"
  }
}
```

## GitHub MCP Resources

The GitHub MCP server provides these main resource types:

### Repository Resources
- Repository information
- Branch details
- Tags and releases
- Protection rules

### Pull Request Resources
- PR metadata and details
- PR reviews and comments
- PR status checks
- PR merge status

### Issue Resources
- Issue details and status
- Issue comments and discussions
- Issue assignments
- Labels and milestones

### Workflow Resources
- Workflow runs
- Job details
- Artifact information
- Deployment status

## Using GitHub MCP in Skills

### Example: Create PR Skill Integration

```javascript
// skills/create-pr.js
const { Octokit } = require("@octokit/rest");

async function createPR(branchName, title, description) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  // Create PR using GitHub API via MCP
  const { data } = await octokit.pulls.create({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    title: title,
    body: description,
    head: branchName,
    base: "main"
  });

  return data;
}

module.exports = { createPR };
```

### Example: View PR Details

```javascript
// skills/view-pr.js
const { Octokit } = require("@octokit/rest");

async function getPRDetails(prNumber) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  const { data: pr } = await octokit.pulls.get({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    pull_number: prNumber
  });

  const { data: reviews } = await octokit.pulls.listReviews({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    pull_number: prNumber
  });

  const { data: commits } = await octokit.pulls.listCommits({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    pull_number: prNumber
  });

  return {
    pr: pr,
    reviews: reviews,
    commits: commits
  };
}

module.exports = { getPRDetails };
```

### Example: Check PR Status

```javascript
// skills/view-pr-checks.js
const { Octokit } = require("@octokit/rest");

async function getPRChecks(prNumber) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  // Get PR to find head SHA
  const { data: pr } = await octokit.pulls.get({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    pull_number: prNumber
  });

  // Get status checks
  const { data: status } = await octokit.repos.getCombinedStatusForRef({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    ref: pr.head.sha
  });

  // Get check runs
  const { data: checkRuns } = await octokit.checks.listForRef({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    ref: pr.head.sha
  });

  return {
    status: status,
    checkRuns: checkRuns
  };
}

module.exports = { getPRChecks };
```

## Available GitHub MCP Operations

### Pull Requests
- `list` - List PRs in repository
- `get` - Get PR details
- `create` - Create new PR
- `update` - Update PR (title, body)
- `listReviews` - Get PR reviews
- `createReview` - Add PR review
- `merge` - Merge PR
- `listCommits` - Get PR commits
- `getCommitStatus` - Get commit status

### Issues
- `list` - List issues
- `get` - Get issue details
- `create` - Create issue
- `update` - Update issue
- `addLabels` - Add labels to issue
- `createComment` - Add comment to issue

### Repositories
- `get` - Get repository info
- `listBranches` - List branches
- `getBranch` - Get branch details
- `getBranchProtection` - Get protection rules
- `deleteRef` - Delete branch

### Workflows
- `listRuns` - List workflow runs
- `getRun` - Get run details
- `listJobs` - List jobs in run
- `getJob` - Get job details
- `downloadArtifacts` - Download run artifacts

## Skill Implementation Checklist

When implementing skills with GitHub MCP:

- ✓ Load `GITHUB_TOKEN` from environment
- ✓ Set `GITHUB_OWNER` and `GITHUB_REPO` environment variables
- ✓ Use `@octokit/rest` for API calls
- ✓ Implement error handling for API failures
- ✓ Add rate limit handling (GitHub: 5000 req/hr)
- ✓ Include proper authentication headers
- ✓ Validate input parameters
- ✓ Format output for readability
- ✓ Log API calls for debugging
- ✓ Handle pagination for large result sets

## Rate Limiting

GitHub API rate limits:
- **Authenticated**: 5,000 requests per hour
- **Unauthenticated**: 60 requests per hour
- **GraphQL**: 5,000 points per hour

To check rate limit status:
```bash
gh api rate_limit
```

## Security Best Practices

1. **Never commit token**: Add `.env` to `.gitignore`
2. **Use environment variables**: Don't hardcode tokens
3. **Minimal scopes**: Only request needed permissions
4. **Token rotation**: Regenerate tokens periodically
5. **Audit access**: Review token usage in GitHub settings
6. **Team access**: Share via environment, not code
7. **Expiration**: Set token expiration dates when possible

## Troubleshooting

### GitHub MCP Not Found
```bash
npm install @modelcontextprotocol/server-github
```

### Authentication Errors
```bash
# Verify token
echo $GITHUB_TOKEN

# Test GitHub CLI
gh auth status

# Regenerate token if needed
# Go to https://github.com/settings/tokens
```

### Rate Limit Exceeded
```bash
# Check current rate limit
gh api rate_limit

# Wait for reset (happens hourly)
# Consider batching API calls
# Use GraphQL for complex queries (more efficient)
```

### MCP Server Not Starting
```bash
# Check .mcp.json syntax
node -e "console.log(JSON.parse(require('fs').readFileSync('.mcp.json')))"

# Verify Node.js version
node --version  # Should be 18+

# Check if package is installed
npm list @modelcontextprotocol/server-github
```

## Testing GitHub MCP

### Test Connection
```bash
# Using GitHub CLI
gh api repos/OWNER/REPO

# Using curl with token
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user
```

### Test in Claude Code
```javascript
// Test script to verify GitHub MCP
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function test() {
  try {
    const { data } = await octokit.repos.get({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO
    });
    console.log("✓ Connected to GitHub");
    console.log(`Repository: ${data.full_name}`);
  } catch (error) {
    console.error("✗ Connection failed:", error.message);
  }
}

test();
```

## Skill to GitHub MCP Mapping

| Skill | GitHub API Used |
|-------|-----------------|
| `create-pr` | `pulls.create` |
| `view-pr` | `pulls.get` |
| `review-pr` | `pulls.createReview` |
| `view-pr-comments` | `pulls.listReviews`, `issues.listComments` |
| `view-pr-checks` | `checks.listForRef`, `repos.getCombinedStatusForRef` |
| `merge` | `pulls.merge` |
| `status` | `repos.getBranch`, `git.getRef` |

## Next Steps

1. ✓ Install GitHub MCP server
2. ✓ Set up GitHub token
3. ✓ Configure .env and .mcp.json
4. ✓ Verify connection with test
5. → Implement skill functions using Octokit
6. → Add error handling and logging
7. → Test skills with real PRs
8. → Deploy to production

## Resources

- [GitHub MCP Documentation](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- [Octokit.js Documentation](https://octokit.github.io/rest.js/)
- [GitHub REST API](https://docs.github.com/en/rest)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [Personal Access Tokens](https://github.com/settings/tokens)

## Support

For issues:
1. Check GitHub MCP logs
2. Verify token is valid
3. Confirm repository access
4. Review API documentation
5. Check rate limit status
6. Enable debug logging

Debug mode:
```bash
DEBUG=* claude-code
```
