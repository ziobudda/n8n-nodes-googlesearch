# Troubleshooting n8n Google Search Node

## Common Issues and Solutions

### API Authentication Errors

#### Error: "Google Search API error: Request failed with status code 400"

This error indicates a problem with the parameters sent to the Google Custom Search API.

**Possible causes and solutions:**

1. **Missing or invalid Custom Search Engine ID (cx):**
   - Make sure you've created a Custom Search Engine at [Programmable Search Engine](https://programmablesearchengine.google.com/)
   - Verify that the CX ID is correctly copied to your n8n credentials
   - See the CX_GUIDE.md file for detailed instructions

2. **Empty search query:**
   - Ensure that the search query parameter is not empty
   - Check that the query string is properly formatted

3. **API quota exceeded:**
   - The free tier of Google Custom Search API allows 100 queries per day
   - Check if you've reached your daily limit
   - Consider upgrading to a paid plan if you need more queries

#### Error: "Google Search API error: API key not valid"

This error indicates an issue with your Google API key.

**Solutions:**
1. Verify that your API key is correct
2. Make sure the "Custom Search JSON API" is enabled in your Google Cloud project
3. Check API key restrictions (IP, referrers, etc.) in the Google Cloud Console

### Node Configuration Issues

#### Error: "Icons not displaying correctly"

If the node's icons aren't displaying properly in the n8n interface:

**Solutions:**
1. This is usually a path-resolution issue in different n8n environments
2. The node package includes icons in multiple locations to ensure compatibility
3. Try reinstalling the node if icons are missing

#### Error: "Node not appearing in n8n"

If the node doesn't show up in the n8n interface after installation:

**Solutions:**
1. Verify the node was installed correctly: `npm list n8n-nodes-googlesearch`
2. Restart your n8n instance: `n8n start`
3. Check for any errors in the n8n logs

### Search Results Issues

#### Issue: "No search results returned"

If your search query doesn't return any results:

**Solutions:**
1. Try a different search query
2. Check if your Custom Search Engine is configured to search the entire web or only specific sites
3. Verify that any site-specific restrictions aren't too limiting
4. Test the same search query directly in Google to check if results should exist

#### Issue: "Limited or irrelevant results"

If you're getting unexpected or irrelevant results:

**Solutions:**
1. Adjust your search query to be more specific
2. Configure your Custom Search Engine settings in the Google Programmable Search Console
3. Try using the site search parameter to limit results to specific domains
4. Experiment with the language parameter to get results in your preferred language

### Performance Issues

#### Issue: "Slow response times"

If the node is taking a long time to return results:

**Solutions:**
1. Limit the number of results requested (maximum is 10)
2. Check your network connection
3. Be aware that the Google Search API might have some latency

## Getting More Help

If you're still experiencing issues:

1. Check the [Google Custom Search API documentation](https://developers.google.com/custom-search/v1/overview)
2. Review the node's README.md and CX_GUIDE.md files
3. Submit an issue on the GitHub repository with:
   - A detailed description of the problem
   - Steps to reproduce the issue
   - Relevant error messages (without sensitive information)
   - Your n8n version