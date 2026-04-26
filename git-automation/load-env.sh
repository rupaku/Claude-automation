#!/bin/bash
# Load environment variables from .env file for Claude Code skills

ENV_FILE="$(dirname "$0")/.env"

if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

# Output as JSON for Claude Code's apiKeyHelper
echo "{\"GITHUB_TOKEN\": \"$GITHUB_TOKEN\", \"GITHUB_OWNER\": \"$GITHUB_OWNER\", \"GITHUB_REPO\": \"$GITHUB_REPO\"}"
