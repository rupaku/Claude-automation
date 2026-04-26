# GitHub MCP Setup Instructions

## ✅ Installation Complete

GitHub MCP server has been successfully installed! Here's what was set up:

### Installed Packages
- ✓ `@modelcontextprotocol/server-github` - GitHub MCP Server
- ✓ `@octokit/rest` - GitHub REST API Client
- ✓ `dotenv` - Environment variable loader

### Created Files
- ✓ `package.json` - Project dependencies
- ✓ `.env` - Environment configuration (needs your token)
- ✓ `test-github-connection.js` - Connection verification script

## Next Steps: Configure Your GitHub Token

### Step 1: Create a GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Claude MCP Token"
4. Select these scopes:
   - ✓ `repo` - Full control of repositories
   - ✓ `read:org` - Read organization data  
   - ✓ `workflow` - Manage GitHub Actions workflows

5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

### Step 2: Add Token to .env File

Open `.env` and replace the empty GITHUB_TOKEN:

```bash
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GITHUB_OWNER="your-github-username"
GITHUB_REPO="Claude-automation"
```

Example:
```bash
GITHUB_TOKEN="ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q"
GITHUB_OWNER="rupa-rk201"
GITHUB_REPO="Claude-automation"
```

### Step 3: Verify Connection

Run the test script:

```bash
node test-github-connection.js
```

Expected output:
```
🔍 Testing GitHub Connection...

1️⃣  Checking environment variables:
   ✓ GITHUB_TOKEN is set
   ✓ Repository: your-username/Claude-automation

2️⃣  Testing GitHub authentication:
   ✓ Authenticated as: your-username
   ✓ Account type: User

3️⃣  Checking API rate limit:
   ✓ Rate limit: 5000 requests/hour
   ✓ Remaining: 4999 requests
   ✓ Reset at: [timestamp]

4️⃣  Testing repository access:
   ✓ Repository found: your-username/Claude-automation
   ✓ URL: https://github.com/your-username/Claude-automation
   ✓ Stars: 0

✅ All checks passed! GitHub MCP is ready to use.
```

## Quick Reference

### Environment Variables

| Variable | Required | Example |
|----------|----------|---------|
| `GITHUB_TOKEN` | Yes | `ghp_...` |
| `GITHUB_OWNER` | Yes | `rupa-rk201` |
| `GITHUB_REPO` | Yes | `Claude-automation` |
| `DEBUG` | No | `false` or `true` |

### .gitignore Configuration

Make sure `.env` is in `.gitignore` to protect your token:

```bash
# .gitignore
.env
.env.local
node_modules/
```

### Using with Claude Code

Once configured, skills will work via prompts:

```
/status
/create-pr feature/auth "Add authentication"
/view-pr 123
/view-pr-checks 123
/merge 123
```

## Security Best Practices

1. **Never commit your token** ✓ Already in .gitignore
2. **Use environment variables** ✓ Using .env file
3. **Minimal permissions** ✓ Only needed scopes
4. **Rotate tokens** - Regenerate periodically
5. **Check audit log** - Review token usage in GitHub settings

## Troubleshooting

### "GITHUB_TOKEN not set"
```bash
# Check if token is loaded
echo $GITHUB_TOKEN

# Source environment
source load-env.sh
```

### "Authentication failed"
```bash
# Verify token is valid and has correct scopes
gh auth status

# Regenerate token at: https://github.com/settings/tokens
```

### "Rate limit exceeded"
```bash
# Check current rate limit
node test-github-connection.js

# Wait for reset (happens hourly)
# GitHub limit: 5000 requests/hour for authenticated users
```

### "Repository not found"
```bash
# Verify repository exists and you have access
gh repo view GITHUB_OWNER/GITHUB_REPO

# Check username matches GitHub
gh auth status
```

## Testing Individual Components

### Test GitHub CLI
```bash
gh auth status
gh api rate_limit
```

### Test Octokit
```bash
node -e "
require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
octokit.users.getAuthenticated().then(r => console.log(r.data.login));
"
```

### Test MCP Server
```bash
npx @modelcontextprotocol/server-github --version
```

## What's Next?

After verifying the connection:

1. ✓ GitHub MCP installed and configured
2. → Create skill implementations (see [SKILL_IMPLEMENTATION_GUIDE.md](./SKILL_IMPLEMENTATION_GUIDE.md))
3. → Register skills in Claude Code
4. → Use skills via `/skill-name` prompts
5. → Monitor skill execution

## Files Reference

| File | Purpose |
|------|---------|
| `.env` | Environment variables (TOKEN, OWNER, REPO) |
| `package.json` | Project dependencies and scripts |
| `.mcp.json` | GitHub MCP server configuration |
| `settings.claude.json` | Claude Code skill settings |
| `test-github-connection.js` | Verify GitHub connection |
| `GITHUB_MCP_INTEGRATION.md` | Detailed integration guide |
| `SKILL_IMPLEMENTATION_GUIDE.md` | Implement skills |

## Support

For issues:
1. Run `node test-github-connection.js`
2. Check `.env` file configuration
3. Verify GitHub token is valid
4. Review error messages carefully
5. Check GitHub API status: https://status.github.com

## Summary

✅ GitHub MCP server installed
✅ Dependencies configured
✅ Environment file set up
⏳ Add your GitHub token to `.env`
⏳ Run test script to verify
⏳ Create and use skills

**You're almost there! Just add your GitHub token and you'll be ready to go.**
