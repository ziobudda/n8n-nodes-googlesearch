# Google Custom Search Engine ID (CX) Guide

## What is a Custom Search Engine ID (CX)?

The CX parameter is a unique identifier for your Google Custom Search Engine. It is required to use the Google Custom Search API.

## How to Create a Custom Search Engine and Get a CX ID

### Step 1: Create a Custom Search Engine

1. Go to [Google Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click on "Create a search engine"
3. Configure your search engine:
   - **Name**: Give your search engine a name
   - **Sites to search**: You can choose "Search the entire web" or limit to specific sites
   - **Language**: Choose your preferred language
   - **Search image search**: Enable if you want to search for images as well

4. Click "Create"

### Step 2: Find the Search Engine ID (CX)

1. After creating the search engine, you'll be redirected to the dashboard
2. Click on your newly created search engine
3. Go to "Basic Settings"
4. Look for "Search engine ID" or "cx"
5. Copy this value - it will look something like: `012345678901234567890:abcdefghijk`

### Step 3: Configure Credentials in n8n

1. Go to Settings > Credentials in n8n
2. Create a new credential of type "Google Search API"
3. Enter:
   - **API Key**: Your Google Cloud API key
   - **Custom Search Engine ID**: The CX value you copied in Step 2
4. Save the credentials

## Troubleshooting CX Issues

If you receive "Google Search API error: Request failed with status code 400", check:

1. **Empty or invalid CX**: Make sure the Custom Search Engine ID was entered correctly
2. **CX format**: The CX should have a specific format (e.g., `012345678901234567890:abcdefghijk`)
3. **Search engine not active**: Ensure your search engine is active in the Google Programmable Search dashboard

## Advanced Search Engine Configuration

To optimize search results, you can:

1. **Customize included sites**: Limit search to specific domains
2. **Configure synonyms**: Improve search results with custom synonyms
3. **Exclude terms**: Filter results to exclude unwanted content
4. **Customize ranking**: Modify the default order of results

All these configurations can be done through the Google Programmable Search Engine dashboard.