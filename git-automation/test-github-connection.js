#!/usr/bin/env node

/**
 * Test GitHub MCP Server Connection
 * Verifies that GitHub API access is properly configured
 */

require('dotenv').config();
const { Octokit } = require('@octokit/rest');

async function testConnection() {
  console.log('🔍 Testing GitHub Connection...\n');

  // Check environment variables
  console.log('1️⃣  Checking environment variables:');
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token) {
    console.error('   ❌ GITHUB_TOKEN not set');
    console.log('   ℹ️  Add GITHUB_TOKEN to .env file');
    process.exit(1);
  }
  console.log('   ✓ GITHUB_TOKEN is set');

  if (!owner || !repo) {
    console.warn('   ⚠️  GITHUB_OWNER or GITHUB_REPO not set');
    console.log('   ℹ️  Add these to .env for full functionality');
  } else {
    console.log(`   ✓ Repository: ${owner}/${repo}`);
  }

  // Test authentication
  console.log('\n2️⃣  Testing GitHub authentication:');
  try {
    const octokit = new Octokit({
      auth: token
    });

    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`   ✓ Authenticated as: ${user.login}`);
    console.log(`   ✓ Account type: ${user.type}`);
  } catch (error) {
    console.error('   ❌ Authentication failed:', error.message);
    process.exit(1);
  }

  // Test rate limit
  console.log('\n3️⃣  Checking API rate limit:');
  try {
    const octokit = new Octokit({
      auth: token
    });

    const { data: rateLimit } = await octokit.rateLimit.get();
    console.log(`   ✓ Rate limit: ${rateLimit.rate.limit} requests/hour`);
    console.log(`   ✓ Remaining: ${rateLimit.rate.remaining} requests`);
    console.log(`   ✓ Reset at: ${new Date(rateLimit.rate.reset * 1000).toLocaleString()}`);
  } catch (error) {
    console.error('   ❌ Rate limit check failed:', error.message);
    process.exit(1);
  }

  // Test repository access (if configured)
  if (owner && repo) {
    console.log(`\n4️⃣  Testing repository access (${owner}/${repo}):`);
    try {
      const octokit = new Octokit({
        auth: token
      });

      const { data: repository } = await octokit.repos.get({
        owner: owner,
        repo: repo
      });
      
      console.log(`   ✓ Repository found: ${repository.full_name}`);
      console.log(`   ✓ URL: ${repository.html_url}`);
      console.log(`   ✓ Stars: ${repository.stargazers_count}`);
    } catch (error) {
      console.error(`   ❌ Repository access failed: ${error.message}`);
      console.log('   ℹ️  Verify GITHUB_OWNER and GITHUB_REPO are correct');
    }
  }

  console.log('\n✅ All checks passed! GitHub MCP is ready to use.\n');
}

testConnection().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
