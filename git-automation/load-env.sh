# #!/bin/bash
# # Load environment variables from .env file

# ENV_FILE="$(dirname "$0")/.env"

# if [ -f "$ENV_FILE" ]; then
#   set -a
#   source "$ENV_FILE"
#   set +a
# fi

# # Export for Claude Code
# echo "{\"JIRA_HOST\": \"$JIRA_HOST\", \"JIRA_USERNAME\": \"$JIRA_USERNAME\", \"JIRA_API_TOKEN_with_perm\": \"$JIRA_API_TOKEN_with_perm\"}"
