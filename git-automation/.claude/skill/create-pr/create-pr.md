# Create PR Skill

A Claude Code skill to automate the pull request creation workflow, including branch creation, committing changes, pushing, and opening a PR.

## Overview

The `create-pr` skill streamlines the process of:
1. Creating a new feature branch
2. Staging and committing changes
3. Pushing the branch to remote
4. Creating a pull request on GitHub

## Usage

```
/create-pr <branch-name> <pr-title> [pr-description]
```

### Parameters

- **branch-name** (required): Name for the new feature branch (e.g., `feature/add-login`, `fix/bug-123`)
- **pr-title** (required): Title for the pull request
- **pr-description** (optional): Description for the pull request body. If not provided, will use a default or prompt for details

## Workflow Steps

### 1. Create New Branch
- Creates a new branch from the current main/master branch
- Branch name follows the pattern: `<branch-name>`
- Example: `git checkout -b feature/add-login`

### 2. Add Changes for Commit
- Stages all modified files in the working directory
- Stages new files that should be included in the commit
- Allows selective file staging if needed
- Example: `git add <files>`

### 3. Commit Changes
- Creates a commit with a meaningful message
- Commit message format: `<type>: <description>`
- Common types: feat, fix, refactor, docs, test, chore
- Example: `git commit -m "feat: add user login functionality"`

### 4. Push to Remote
- Pushes the new branch to the remote repository
- Sets upstream tracking for the branch
- Example: `git push -u origin feature/add-login`

### 5. Create Pull Request
- Opens a new pull request against the target branch (default: main)
- Uses the provided title and description
- Automatically links related issues if mentioned
- Example: `gh pr create --title "Add login feature" --body "Description..."`

## Examples

### Basic Usage
```bash
/create-pr feature/authentication "Add user authentication" "Implements JWT-based login and session management"
```

### With Issue Reference
```bash
/create-pr fix/issue-123 "Fix: Resolve database connection timeout" "Closes #123. Increased connection pool timeout from 5s to 30s"
```

### Simple Branch
```bash
/create-pr docs/readme-update "Update README with setup instructions"
```

## Prerequisites

- Git repository initialized locally
- Remote repository configured (origin)
- GitHub CLI (`gh`) installed and authenticated
- Write permissions to the repository

## Configuration

The skill uses settings from `settings.claude.json`:
- `skillOverrides.create-pr`: Set to `"on"` to enable the skill
- Bash permissions required: git commands, GitHub CLI access

## Output

Upon successful completion:
- Branch created and pushed
- Changes committed with message
- Pull request URL displayed
- Ready for review and merging

## Error Handling

- **Branch already exists**: Will prompt to use a different name or update existing branch
- **No changes to commit**: Will alert that there are no staged changes
- **Push failed**: Will provide error details (e.g., authentication issues)
- **PR creation failed**: Will show GitHub CLI errors for troubleshooting

## Tips

1. Keep branch names descriptive but concise
2. Use conventional commit format for clear history
3. PR title should summarize the change in one line
4. Provide detailed descriptions for complex changes
5. Reference issues using `#123` to auto-link them

## Related Commands

- `/review-pr`: Review an existing pull request
- `/merge-pr`: Merge an approved pull request
- `git status`: Check current branch and changes
- `gh pr list`: View open pull requests
