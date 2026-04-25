# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository is for Jira automation tools and integrations. It likely contains:
- Scripts or services that interact with the Jira API
- Automation workflows for common Jira operations
- Tools for bulk operations, migrations, or integrations

## Development Setup

As the project develops, document:
- How to install dependencies (`npm install`, `pip install`, etc.)
- How to configure credentials or environment variables for Jira API access
- How to run the application or scripts

## Build, Test, and Lint Commands

Add the specific commands when the project structure is finalized:
- **Build**: [TBD]
- **Test**: [TBD]
- **Lint/Format**: [TBD]
- **Run**: [TBD]

## Architecture Notes

When code is added, document:
- Entry points and how scripts/services are invoked
- How Jira API communication is handled (authentication, request patterns)
- Major modules and their responsibilities
- Any external dependencies or integrations

## Common Development Tasks

As patterns emerge, document:
- How to add new automation workflows
- How to work with the Jira API client
- How to test changes against a Jira instance

## Sensitive Information

Never commit:
- Jira API tokens or credentials
- Personal authentication tokens
- Any user-specific configuration
Use environment variables or `.env` files (add to `.gitignore`) for secrets.
