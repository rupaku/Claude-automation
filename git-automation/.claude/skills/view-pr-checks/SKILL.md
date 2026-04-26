---
name: view-pr-checks
description: View CI/CD status checks and test results for a pull request
allowed-tools: Bash(gh:*)
---

# Skill: /view-pr-checks

You are executing the `/view-pr-checks` skill to view CI/CD status checks and test results for a pull request.

## Arguments
Parse from the invocation:
- `<pr-number>` (required): The PR number
- `--failed` (optional): Show only failed checks
- `--passed` (optional): Show only passed checks
- `--logs` (optional): Include detailed logs

## Steps

1. **Fetch PR status checks:**
   ```bash
   gh pr checks <pr-number>
   ```

2. **Parse check results:**
   Extract status, name, and duration from each check result.

3. **Filter based on flags:**
   - If `--failed`: show only checks with status ✗ FAILED
   - If `--passed`: show only checks with status ✓ PASSED
   - Otherwise: show all checks

4. **Display output in this format:**

```
PR #<pr-number> Status Checks

✓ PASSED - <check-name> (<duration>)
✗ FAILED - <check-name> (<duration>)
⏳ PENDING - <check-name>
⏭️  SKIPPED - <check-name>

<repeat for each check>

Summary: X passed, Y failed, Z pending
```

5. **If --logs flag, fetch detailed logs:**
   ```bash
   gh run view <run-id> --log
   ```

## Examples

### View all checks:
```
/view-pr-checks 1
```

### View only failed checks:
```
/view-pr-checks 1 --failed
```

### View only passed checks:
```
/view-pr-checks 1 --passed
```

### View checks with logs:
```
/view-pr-checks 1 --logs
```

## Error Handling

- **PR not found:** Display "Error: Pull request <pr-number> not found"
- **No checks:** Display "No CI/CD checks for this PR"
- **Access denied:** Display "Error: Access denied. Check authentication."
- **Logs unavailable:** Display "Logs not available for this run"
