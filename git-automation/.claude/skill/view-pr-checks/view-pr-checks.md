# View PR Checks Skill

A Claude Code skill to display pull request status checks, CI/CD pipeline results, build logs, test coverage, and deployment status in a comprehensive format.

## Overview

The `view-pr-checks` skill provides detailed insights into PR automation:
1. GitHub status checks and requirements
2. CI/CD pipeline results (GitHub Actions, Jenkins, CircleCI, etc.)
3. Build logs and compilation results
4. Unit and integration test results
5. Code coverage metrics
6. Security and linting checks
7. Deployment status and previews
8. Check run details and logs

## Usage

```
/view-pr-checks <pr-number> [options]
```

### Parameters

- **pr-number** (required): The pull request number (e.g., `123`, `PR-456`)
- **--repo** (optional): Repository in format `owner/repo`. Defaults to current repository
- **--logs** (optional): Show detailed logs from failed checks
- **--coverage** (optional): Show code coverage metrics
- **--tests** (optional): Show test results and failures
- **--build** (optional): Show build status and logs
- **--security** (optional): Show security scanning results
- **--deployments** (optional): Show deployment status
- **--failed** (optional): Show only failed checks
- **--passed** (optional): Show only passed checks
- **--all** (optional): Show all available information

## Workflow Steps

### 1. Fetch Check Runs
- Retrieves all check runs for the PR
- Gets check names and status (passed, failed, pending)
- Fetches completion timestamps
- Gets associated apps/services
- Example: `gh pr checks <PR-number>`

### 2. Display Build Status
- Shows build compilation results
- Displays build duration
- Shows artifact availability
- Indicates build environment/platform
- Links to build logs
- Example: GitHub Actions workflow results

### 3. Show Test Results
- Lists all test suites executed
- Shows passed/failed test counts
- Displays failed test names and stack traces
- Shows test coverage percentage
- Calculates coverage change from main
- Example: JUnit, Jest, Pytest results

### 4. Display Code Coverage
- Shows coverage percentage overall
- Breaks down by file/module
- Displays coverage change (delta)
- Shows lines covered vs uncovered
- Highlights coverage gaps
- Example: Codecov, Coveralls reports

### 5. Show Security Scanning
- Displays vulnerability scan results
- Shows severity levels (critical, high, medium, low)
- Lists found vulnerabilities
- Provides remediation suggestions
- Example: Snyk, OWASP, GitHub Security

### 6. Display Linting/Format Checks
- Shows code style violations
- Displays formatting issues
- Lists linting rule violations
- Suggests fixes
- Example: ESLint, Prettier, Black results

### 7. Show Deployment Status
- Indicates deployment readiness
- Shows staged deployment status
- Displays preview environments
- Shows production deployment status
- Links to deployed services
- Example: Vercel, Netlify, AWS deployments

### 8. Display Check Logs
- Provides detailed output from failed checks
- Shows error messages and stack traces
- Displays warning details
- Provides context for failures
- Example: Full build/test output

## Examples

### View All Checks Summary
```bash
/view-pr-checks 123
```
**Output:**
```
==================================================
PR #123 Status Checks & CI Results
==================================================

Overall Status: ✓ All Checks Passed

Check Summary:
✓ PASSED (2m 15s)  - Lint Check
✓ PASSED (4m 32s)  - Unit Tests
✓ PASSED (6m 18s)  - Integration Tests
✓ PASSED (3m 45s)  - Build
✓ PASSED (1m 20s)  - Security Scan
✓ PASSED (2m 10s)  - Code Coverage

Total Duration: 20m 30s
Last Updated: 2024-04-20 14:45 UTC

==================================================
Details:
==================================================

[1] Lint Check                              ✓ PASSED
    Duration: 2m 15s
    Platform: GitHub Actions
    Conclusion: All files pass linting
    Log: https://github.com/...

[2] Unit Tests                              ✓ PASSED
    Duration: 4m 32s
    Platform: GitHub Actions
    Tests: 145 passed, 0 failed, 3 skipped
    Coverage: 92%
    Coverage Change: +2% from main
    Log: https://github.com/...

[3] Integration Tests                       ✓ PASSED
    Duration: 6m 18s
    Platform: GitHub Actions
    Tests: 87 passed, 0 failed
    Log: https://github.com/...

[4] Build                                   ✓ PASSED
    Duration: 3m 45s
    Platform: GitHub Actions
    Environment: Node.js 18.x
    Build Size: 2.4MB
    Artifacts: Available
    Log: https://github.com/...

[5] Security Scan                           ✓ PASSED
    Duration: 1m 20s
    Platform: Snyk
    Vulnerabilities Found: 0
    Severity: None
    Log: https://github.com/...

[6] Code Coverage                           ✓ PASSED
    Duration: 2m 10s
    Coverage: 92%
    Coverage Change: +2%
    Lines Covered: 1,245 / 1,351
    Files Analyzed: 28
    Log: https://github.com/...

Conclusion:
✓ All required checks passed
✓ Ready for review and merge
```

### View Only Test Results
```bash
/view-pr-checks 123 --tests
```
**Output:**
```
Test Results for PR #123

Unit Tests:                              ✓ PASSED
├── src/auth/                            145 passed
├── src/utils/                           89 passed
├── src/middleware/                      67 passed
└── Total: 301 passed, 0 failed, 3 skipped

Failed Tests: None

Integration Tests:                       ✓ PASSED
├── API endpoints                        34 passed
├── Database operations                  23 passed
├── Authentication flow                  18 passed
├── User management                      12 passed
└── Total: 87 passed, 0 failed

Test Coverage: 92%
Coverage Change: +2% from main

Slowest Tests:
1. User registration flow (3.2s)
2. Database migration (2.8s)
3. API integration (2.1s)
```

### View Failed Checks with Logs
```bash
/view-pr-checks 123 --failed --logs
```
**Output:**
```
Failed Checks for PR #123

[1] Security Scan                         ✗ FAILED
    Duration: 1m 20s
    Platform: Snyk
    Severity: HIGH
    
    Vulnerabilities Found: 2
    
    🔴 HIGH: Prototype Pollution in lodash (lodash < 4.17.21)
       Location: node_modules/lodash
       Recommendation: Upgrade to lodash >= 4.17.21
       CVSS Score: 7.4
    
    🟡 MEDIUM: Regular Expression Denial of Service
       Location: src/utils/validator.js:42
       Recommendation: Use safer regex pattern
       CVSS Score: 5.3
    
    Full Log:
    ─────────────────────────────────────────
    [14:32:10] Scanning dependencies...
    [14:32:45] Vulnerability Analysis
    [14:33:20] Found issues in:
    - lodash@4.17.19 (prototype pollution)
    - validator@12.0.0 (regex DoS)
    [14:33:30] Scan complete - 2 vulnerabilities
    ─────────────────────────────────────────

[2] Integration Tests                     ✗ FAILED
    Duration: 8m 45s
    Platform: GitHub Actions
    Tests: 87 passed, 2 failed, 0 skipped
    
    Failed Tests:
    
    ✗ User Registration Flow
      Error: Timeout - database connection
      Location: tests/integration/auth.test.js:234
      Stack Trace:
        at Object.<anonymous> (tests/integration/auth.test.js:234:10)
        at runTest (node_modules/jest/build/index.js:1:1)
      
      Full Log:
      [14:25:10] Running User Registration Flow test
      [14:25:15] Connecting to database...
      [14:26:45] Timeout after 60000ms
      
    ✗ API Rate Limiting
      Error: Expected rate limit header
      Location: tests/integration/api.test.js:567
      Stack Trace:
        at expect (node_modules/jest/build/expect.js:1:1)
        at Object.<anonymous> (tests/integration/api.test.js:567:10)
```

### View Code Coverage
```bash
/view-pr-checks 123 --coverage
```
**Output:**
```
Code Coverage Report for PR #123

Overall Coverage: 92%
Coverage Change: +2% from main

Coverage by Type:
├── Statements: 94% (1,245 / 1,325)
├── Branches: 88% (524 / 595)
├── Functions: 91% (187 / 205)
└── Lines: 92% (1,203 / 1,305)

Top Files with Coverage:
✓ src/auth/middleware.js           100% (89/89)
✓ src/auth/login.js                 98% (145/148)
✓ src/utils/validator.js            95% (76/80)
⚠ src/middleware/error.js           78% (34/44)  ← Below threshold
✗ src/middleware/logging.js         62% (28/45)  ← Below threshold

Coverage Comparison:
Branch    Overall    Statements    Branches    Functions    Lines
─────────────────────────────────────────────────────────
main      90%        92%           86%         89%          90%
current   92%        94%           88%          91%          92%
delta     +2%        +2%           +2%         +2%          +2%

Files with Coverage Decrease:
✗ src/config.js: 95% → 93% (-2%)
✗ src/logger.js: 88% → 85% (-3%)

Recommendation:
- Increase tests for src/middleware/logging.js
- Add coverage for error handling paths
```

### View Build Details
```bash
/view-pr-checks 123 --build --logs
```
**Output:**
```
Build Information for PR #123

Build Status:                            ✓ PASSED
Duration: 3m 45s
Platform: GitHub Actions
Workflow: Node.js CI
Branch: feature/auth
Commit: a1b2c3d

Environment:
├── Node.js: 18.x
├── npm: 8.x
├── OS: ubuntu-latest
└── Arch: x64

Build Steps:
✓ Checkout code                          (5s)
✓ Setup Node.js                          (8s)
✓ Install dependencies                   (42s)
✓ Build application                      (1m 5s)
✓ Generate artifacts                     (25s)
✓ Upload artifacts                       (20s)

Build Output:
─────────────────────────────────────────
[14:15:10] Starting build...
[14:15:12] Cleaning dist/
[14:15:15] Transpiling TypeScript...
[14:15:45] Compiling assets...
[14:16:10] Bundling application...
[14:16:30] Minifying code...
[14:16:35] Generating sourcemaps...
[14:17:00] Build successful!
[14:17:05] Total build size: 2.4MB
[14:17:10] Build complete!
─────────────────────────────────────────

Artifacts Generated:
├── dist/app.min.js (1.2MB)
├── dist/app.min.css (256KB)
├── dist/assets.tar.gz (892KB)
└── dist/sourcemap.map (52KB)

Warnings: 0
Errors: 0
```

### View Security Scan Results
```bash
/view-pr-checks 123 --security
```
**Output:**
```
Security Scan Results for PR #123

Overall Status:                          ✓ PASSED
Vulnerabilities: 0 Critical, 0 High

Dependency Scanning:
✓ All dependencies up to date
✓ No known vulnerabilities
✓ License compliance: OK

Code Scanning:
✓ No SQL injection risks found
✓ No XSS vulnerabilities found
✓ No hardcoded secrets detected
✓ No insecure random generation
✓ No weak cryptography

Detailed Scan:
─────────────────────────────────────────
Total Dependencies: 145
├── Updated: 143
├── Outdated: 2 (non-critical)
└── Vulnerable: 0

Scanning Complete:
✓ SAST (Static Application Security Testing)
✓ DAST (Dynamic Application Security Testing)
✓ Dependency Check
✓ License Scan
✓ Secret Detection

Recommendation:
- All security checks passed ✓
- Secure to merge
```

### View Deployment Status
```bash
/view-pr-checks 123 --deployments
```
**Output:**
```
Deployment Status for PR #123

Staging Deployment:                      ✓ PASSED
├── Status: Deployed
├── Environment: Staging
├── URL: https://staging-pr-123.vercel.app
├── Deployed At: 2024-04-20 14:50 UTC
├── Duration: 2m 15s
└── Preview: Available

Production Deployment:                   ⏳ PENDING
├── Status: Waiting for approval
├── Environment: Production
├── Requirements:
│  ├── ✓ All checks passed
│  ├── ✓ Code reviewed
│  ├── ✓ PR approved
│  └── ⏳ Awaiting merge to main
└── Estimated Time: After PR merge

Preview Links:
├── Staging: https://staging-pr-123.vercel.app
├── Storybook: https://staging-pr-123.vercel.app/storybook
└── Lighthouse: https://staging-pr-123.vercel.app/report

Deployment History:
1. Initial Deploy: 2024-04-20 14:45:30 UTC (successful)
2. Rebuild: 2024-04-20 14:48:15 UTC (successful)
```

### View Summary with Specific Status
```bash
/view-pr-checks 123 --passed
```
Shows only the passed checks.

```bash
/view-pr-checks 123 --failed
```
Shows only the failed checks.

### View Complete Information
```bash
/view-pr-checks 123 --all
```
Displays all available check information, logs, and details.

## Check Status Indicators

### Status Codes
- `✓ PASSED`: Check completed successfully
- `✗ FAILED`: Check failed and requires attention
- `⏳ PENDING`: Check is in progress
- `⊘ SKIPPED`: Check was skipped
- `! ERROR`: Check encountered an error
- `⚠ WARNED`: Check passed with warnings

### Severity Levels
- 🔴 `CRITICAL`: Must fix before merge
- 🟠 `HIGH`: Should fix before merge
- 🟡 `MEDIUM`: Recommended to fix
- 🟢 `LOW`: Minor issues
- ⚪ `INFO`: Informational only

## Check Types

### Build Checks
- Compilation success
- Build artifact generation
- Build size validation
- Environment setup

### Test Checks
- Unit test execution
- Integration test execution
- End-to-end test execution
- Test coverage metrics

### Quality Checks
- Linting (ESLint, Pylint, etc.)
- Code formatting (Prettier, Black)
- Type checking (TypeScript, mypy)
- Complexity analysis

### Security Checks
- Dependency vulnerability scanning
- SAST (static code analysis)
- Secret detection
- License compliance

### Deployment Checks
- Staging deployment
- Preview generation
- Production readiness
- Rollout status

## Prerequisites

- GitHub account with repository access
- GitHub CLI (`gh`) installed and authenticated
- Read access to the repository
- PR must have CI/CD configured

## Configuration

The skill uses settings from `settings.claude.json`:
- `skillOverrides.view-pr-checks`: Set to `"on"` to enable the skill
- GitHub CLI authentication configured

## Use Cases

### Before Reviewing
Check CI/CD status before code review:
```bash
/view-pr-checks 123
# Ensure all automated checks pass
```

### Investigating Failures
Examine what failed and why:
```bash
/view-pr-checks 123 --failed --logs
# Get detailed error information
```

### Checking Test Coverage
Verify adequate test coverage:
```bash
/view-pr-checks 123 --coverage
# Check coverage meets threshold
```

### Reviewing Security
Ensure no vulnerabilities:
```bash
/view-pr-checks 123 --security
# Verify security scan results
```

### Ready to Merge Decision
Confirm all checks pass before merge:
```bash
/view-pr-checks 123
# Verify all green before merging
```

### Deployment Readiness
Check staging deployment status:
```bash
/view-pr-checks 123 --deployments
# Verify staged environment ready
```

## Advanced Features

### Real-Time Status
- Auto-refresh every 30 seconds while pending
- Notification on completion
- Status change alerts

### Log Streaming
- View logs as checks run
- Search within logs
- Filter log levels (error, warn, info)

### Performance Metrics
- Build duration tracking
- Test execution time
- Slowest tests highlighted
- Performance trends

### Integration Details
- Connected third-party services
- App permissions and scope
- Webhook status
- Integration health

## Error Handling

- **Check Not Found**: Verifies PR has CI/CD configured
- **Logs Not Available**: Provides API link to logs
- **Access Denied**: Checks read permissions on checks
- **Still Running**: Shows progress and ETA

## Tips

1. **Check Early**: Don't wait for full CI/CD before starting review
2. **Investigate Failures**: Always read failure logs
3. **Monitor Coverage**: Ensure no coverage regressions
4. **Review Security**: Address vulnerabilities immediately
5. **Use Preview URLs**: Test staged changes in browser
6. **Watch Logs**: Understand why checks pass or fail

## Keyboard Shortcut

Configure in keybindings for quick access:
```json
{
  "key": "ctrl+shift+k",
  "command": "skill.run",
  "args": ["view-pr-checks"]
}
```

## Related Commands

- `/view-pr`: View all PR information
- `/review-pr`: Review PR and provide feedback
- `/create-pr`: Create a new pull request
- `/status`: Check local branch status
- `gh pr checks`: Native GitHub CLI command
- `gh pr view`: View PR details

## Integration with Other Skills

Works seamlessly with:
- **view-pr**: See checks as part of full PR view
- **review-pr**: Reference check results in review
- **create-pr**: Verify checks pass before creating PR
- **merge-pr**: Confirm all checks pass before merge

## Common Workflows

### Workflow 1: Initial PR Review
```bash
/view-pr-checks 123              # Check CI status
/view-pr-checks 123 --failed     # Investigate failures
# Fix issues if needed
/view-pr-checks 123              # Verify fixes
/review-pr 123                   # Provide code review
```

### Workflow 2: Pre-Merge Verification
```bash
/view-pr-checks 123              # Ensure all checks pass
/view-pr-checks 123 --coverage   # Verify test coverage
/view-pr-checks 123 --security   # Confirm security OK
# Safe to merge
```

### Workflow 3: Deployment Preparation
```bash
/view-pr-checks 123 --deployments  # Check staging
# Test in staging environment
/view-pr-checks 123                # Final check
# Ready for production
```

### Workflow 4: Troubleshooting Failures
```bash
/view-pr-checks 123 --failed       # See failures
/view-pr-checks 123 --failed --logs # Get error details
# Understand root cause
# Push fixes
/view-pr-checks 123                # Verify fixed
```

### Workflow 5: Coverage Analysis
```bash
/view-pr-checks 123 --coverage     # View coverage stats
# Identify coverage gaps
/view-pr-checks 123 --tests        # See test results
# Add missing tests
/view-pr-checks 123 --coverage     # Verify improvement
```

## Performance

- Basic view: < 1 second
- With logs: 2-3 seconds
- Coverage details: 1-2 seconds
- Full details: 3-5 seconds

Results are cached for 1 minute.

## Status Check Requirements

Configurable requirements in repository settings:
- All checks must pass before merge
- Specific checks required (e.g., always require security scan)
- Minimum code coverage required
- Status checks dismiss on new pushes
- Automatic updates from head branch
