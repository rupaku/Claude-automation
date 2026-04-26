# Review PR Skill

A Claude Code skill to automate the process of reviewing existing pull requests, including fetching PR details, analyzing changes, and providing feedback.

## Overview

The `review-pr` skill streamlines the process of:
1. Fetching pull request details and metadata
2. Analyzing code changes and diffs
3. Reviewing file modifications
4. Providing structured feedback and comments
5. Suggesting approvals or requesting changes

## Usage

```
/review-pr <pr-number> [repository]
```

### Parameters

- **pr-number** (required): The pull request number (e.g., `123`, `PR-456`)
- **repository** (optional): Repository in format `owner/repo`. If not provided, uses current repository context

## Workflow Steps

### 1. Fetch PR Details
- Retrieves pull request metadata (title, description, author, state)
- Gets branch information (source and target branches)
- Fetches PR creation date and last update timestamp
- Example: `gh pr view <PR-number> --json title,body,author,state`

### 2. Analyze Code Changes
- Retrieves the diff for all modified files
- Identifies added, removed, and modified lines
- Calculates statistics (files changed, insertions, deletions)
- Example: `gh pr diff <PR-number>`

### 3. Review File Modifications
- Examines each changed file for:
  - Code quality and standards compliance
  - Potential bugs or edge cases
  - Performance concerns
  - Security vulnerabilities
  - Test coverage

### 4. Provide Structured Feedback
- Identifies specific issues and improvements
- Provides line-by-line comments on problematic code
- Suggests best practices and alternatives
- Highlights well-implemented features

### 5. Submit Review Decision
- **APPROVE**: PR is ready to merge
- **REQUEST CHANGES**: Issues must be addressed before merging
- **COMMENT**: Feedback provided without blocking merge
- Example: `gh pr review <PR-number> --approve`

## Examples

### Review Specific PR
```bash
/review-pr 123
```

### Review PR in Different Repository
```bash
/review-pr 45 owner/another-repo
```

### Detailed Review with Issues
```bash
/review-pr 789
# Returns comprehensive feedback on:
# - Code quality issues
# - Security concerns
# - Test coverage gaps
# - Performance optimizations
```

## Review Criteria

The skill evaluates PRs based on:

### Code Quality
- Follows project code style and conventions
- Functions are properly named and documented
- Complex logic is explained with comments
- No unnecessary complexity or duplication

### Functionality
- Changes implement the described feature/fix
- Edge cases are handled
- Backwards compatibility maintained (if applicable)
- No breaking changes without documentation

### Testing
- Adequate test coverage for changes
- Tests are meaningful and comprehensive
- Edge cases covered by tests
- No test regressions

### Security
- No SQL injection or XSS vulnerabilities
- Proper input validation
- Secure credential handling
- No exposed API keys or secrets
- Dependency vulnerabilities checked

### Performance
- No performance regressions
- Efficient algorithms used
- Database queries optimized
- Memory leaks prevented

### Documentation
- Code comments for complex logic
- PR description explains the changes
- API changes documented
- Configuration changes noted

## Prerequisites

- GitHub account with repository access
- GitHub CLI (`gh`) installed and authenticated
- Read access to the repository
- Permission to review PRs

## Configuration

The skill uses settings from `settings.claude.json`:
- `skillOverrides.review-pr`: Set to `"on"` to enable the skill
- GitHub CLI authentication configured

## Output Format

Upon completion, provides:

```
## PR Review Summary
- **Status**: [Approve / Request Changes / Comment]
- **Files Changed**: X files with Y additions, Z deletions

## Issues Found
- [Issue 1]: Description and location
- [Issue 2]: Description and location

## Feedback
- [Positive feedback on well-implemented features]
- [Suggestions for improvement]

## Recommendation
[Final verdict and action items if any]
```

## Review Actions

### Approve PR
- PR is ready to merge
- Code meets quality standards
- All concerns addressed
- Tests pass

### Request Changes
- Specific issues must be fixed
- Blocks PR from merging until addressed
- Author can push additional commits
- Automatic re-review after updates

### Comment Only
- Feedback provided for consideration
- Does not block merging
- Useful for minor suggestions or observations

## Advanced Features

### Automated Checks
- Runs linting checks on changed files
- Validates test coverage thresholds
- Checks for security vulnerabilities
- Verifies commit message format

### Conditional Approvals
- Auto-approve for documentation-only changes
- Auto-approve for dependency updates (if configured)
- Skip approval for WIP (work in progress) PRs

### Notification
- Comments pinged on review completion
- Notifications sent to PR author
- Summary available in GitHub UI

## Error Handling

- **PR Not Found**: Verifies PR number and repository
- **No Permission**: Checks access level to repository
- **Network Errors**: Retries with exponential backoff
- **Invalid Repository**: Provides clear error message

## Tips

1. **Be Constructive**: Provide actionable feedback, not just criticism
2. **Consider Context**: Understand the PR's purpose before reviewing
3. **Check Related Issues**: Link to any related issues or PRs
4. **Test Locally**: For critical changes, consider testing locally
5. **Acknowledge Good Work**: Highlight well-implemented features
6. **Be Timely**: Review promptly to avoid blocking deployments

## Related Commands

- `/create-pr`: Create a new pull request
- `/merge-pr`: Merge an approved pull request
- `gh pr view`: View detailed PR information
- `gh pr comments`: View PR comments and discussions
- `gh pr checks`: View PR status checks and CI results

## Integration with CI/CD

The review skill works alongside:
- GitHub Actions for automated testing
- Code coverage tools
- Linting and formatting checks
- Dependency scanning

Reviews complement but don't replace automated checks.
