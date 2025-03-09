import axios from 'axios';
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

// Simple in-memory query counter implementation
class SimpleQueryCounter {
	private static instance: SimpleQueryCounter;
	private date: string = this.getCurrentDate();
	private count: number = 0;

	// Singleton pattern
	static getInstance(): SimpleQueryCounter {
		if (!SimpleQueryCounter.instance) {
			SimpleQueryCounter.instance = new SimpleQueryCounter();
		}
		return SimpleQueryCounter.instance;
	}

	private getCurrentDate(): string {
		const now = new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
	}

	private checkAndResetCounter(): void {
		const currentDate = this.getCurrentDate();
		if (this.date !== currentDate) {
			this.date = currentDate;
			this.count = 0;
		}
	}

	incrementCounter(): number {
		this.checkAndResetCounter();
		return ++this.count;
	}

	getCount(): number {
		this.checkAndResetCounter();
		return this.count;
	}

	getFormattedCount(): string {
		return `${this.getCount()}/100`;
	}
}

// Create the counter instance
const queryCounter = SimpleQueryCounter.getInstance();

export class GoogleSearch implements INodeType {
	// Static version number instead of loading from package.json
	private version = '0.2.4';
	
	// Method to get the current usage info
	getNodeInfo() {
		return {
			version: this.version,
			currentQueryCount: queryCounter.getFormattedCount(),
		};
	}

	description: INodeTypeDescription = {
		displayName: 'Google Search',
		name: 'googleSearch',
		group: ['search'],
		version: 1,
		subtitle: '={{$parameter["operation"] + " - Queries today: " + $node.getNodeInfo().currentQueryCount}}',
		description: 'Search the web using Google Custom Search API<br><br><span style="font-size: 0.8em; opacity: 0.6;">v{{$node.getNodeInfo().version}} by Michel Morelli</span>',
		defaults: {
			name: 'Google Search',
		},
		inputs: ['main'],
		outputs: ['main'],
		// Try multiple possible paths for the icon
		icon: 'file:googleSearch.svg',
		// Add the package version and author information
		documentationUrl: '={{$parameter["operation"] === "search" ? "https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list" : "https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list"}}',
		credentials: [
			{
				name: 'googleSearchApi',
				required: true,
				testedBy: 'testGoogleSearchApiCredentials',
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'search',
				options: [
					{
						name: 'Web Search',
						value: 'search',
						description: 'Search for web pages',
						action: 'Search for web pages',
					},
					{
						name: 'Image Search',
						value: 'imageSearch',
						description: 'Search for images',
						action: 'Search for images',
					},
				],
			},
			// Web Search parameters
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'search',
							'imageSearch',
						],
					},
				},
				description: 'The search query',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: {
					show: {
						operation: [
							'search',
							'imageSearch',
						],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 10,
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
					maxValue: 10,
				},
				displayOptions: {
					show: {
						operation: [
							'search',
							'imageSearch',
						],
						returnAll: [
							false,
						],
					},
				},
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'search',
							'imageSearch',
						],
					},
				},
				options: [
					{
						displayName: 'Safe Search',
						name: 'safeSearch',
						type: 'options',
						options: [
							{
								name: 'Off',
								value: 'off',
							},
							{
								name: 'Medium',
								value: 'medium',
							},
							{
								name: 'High',
								value: 'high',
							},
						],
						default: 'off',
					},
					{
						displayName: 'Site Search',
						name: 'siteSearch',
						type: 'string',
						default: '',
						placeholder: 'example.com',
						description: 'Limit search results to a specific domain',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'options',
						options: [
							{
								name: 'English',
								value: 'lang_en',
							},
							{
								name: 'Italian',
								value: 'lang_it',
							},
							{
								name: 'French',
								value: 'lang_fr',
							},
							{
								name: 'German',
								value: 'lang_de',
							},
							{
								name: 'Spanish',
								value: 'lang_es',
							},
						],
						default: 'lang_en',
					},
				],
			},
		],
	};

	// Function to test the Google Search API credentials
	async testGoogleSearchApiCredentials(this: IExecuteFunctions): Promise<{ status: string, message: string }> {
		try {
			// Get credentials
			const credentials = await this.getCredentials('googleSearchApi');
			const apiKey = credentials.apiKey as string;
			const customSearchEngineId = credentials.customSearchEngineId as string;
			
			// Check if required credentials are provided
			if (!apiKey) {
				return {
					status: 'Error',
					message: 'API Key is missing',
				};
			}
			
			if (!customSearchEngineId) {
				return {
					status: 'Error',
					message: 'Custom Search Engine ID (cx) is missing. Please see CX_GUIDE.md for instructions on how to create one.',
				};
			}
			
			// Make a simple test request
			const baseUrl = 'https://www.googleapis.com/customsearch/v1';
			const testParams = {
				key: apiKey,
				cx: customSearchEngineId,
				q: 'test',
				num: 1,
			};
			
			try {
				await axios.get(baseUrl, { params: testParams });
				return {
					status: 'OK',
					message: 'Connection successful',
				};
			} catch (error) {
				if (error.response?.data?.error?.message) {
					return {
						status: 'Error',
						message: `API Error: ${error.response.data.error.message}`,
					};
				}
				return {
					status: 'Error',
					message: `Connection failed: ${error.message}`,
				};
			}
		} catch (error) {
			return {
				status: 'Error',
				message: `Error testing credentials: ${error.message}`,
			};
		}
	}
	
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Get credentials
		const credentials = await this.getCredentials('googleSearchApi');
		const apiKey = credentials.apiKey as string;
		const customSearchEngineId = credentials.customSearchEngineId as string;

		// Base URL for Google Custom Search API
		const baseUrl = 'https://www.googleapis.com/customsearch/v1';

		// For each item
		for (let i = 0; i < items.length; i++) {
			try {
				// Get operation parameters
				const operation = this.getNodeParameter('operation', i) as string;
				const query = this.getNodeParameter('query', i) as string;
				
				// Validate query
				if (!query || query.trim() === '') {
					throw new Error('Search query cannot be empty');
				}
				
				const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
				const limit = returnAll ? 10 : this.getNodeParameter('limit', i, 10) as number;
				const options = this.getNodeParameter('options', i, {}) as {
					safeSearch?: string;
					siteSearch?: string;
					language?: string;
				};

				// Prepare request parameters
				const requestParams = {
					key: apiKey,
					cx: customSearchEngineId,
					q: query,
					num: limit,
				} as Record<string, string | number>;

				// Add search type if it's an image search
				if (operation === 'imageSearch') {
					requestParams.searchType = 'image';
				}
				
				// Log request parameters for debugging (no sensitive info)
				console.log('Google Search request parameters:', {
					cx: customSearchEngineId,
					q: query,
					num: limit,
					searchType: operation === 'imageSearch' ? 'image' : 'web',
					...options,
				});

				// Add optional parameters
				if (options.safeSearch) {
					requestParams.safe = options.safeSearch;
				}
				
				if (options.siteSearch) {
					requestParams.siteSearch = options.siteSearch;
				}
				
				if (options.language) {
					requestParams.lr = options.language;
				}

				try {
					// Make the API request
					const response = await axios.get(baseUrl, { params: requestParams });
					
					// Increment the query counter for each successful API call
					queryCounter.incrementCounter();
					
					// Process results
					const results = response.data;
					
					// Log successful response structure for debugging
					console.log('Google Search API response structure:', {
						searchInformation: results.searchInformation,
						itemCount: results.items ? results.items.length : 0,
					});
					
					if (results && results.items) {
						const formattedResults = results.items.map((item: any) => ({
							json: {
								title: item.title,
								link: item.link,
								snippet: item.snippet,
								displayLink: item.displayLink,
								...(item.image && {
									image: {
										url: item.image.thumbnailLink,
										height: item.image.thumbnailHeight,
										width: item.image.thumbnailWidth,
									},
								}),
							},
						}));
						returnData.push(...formattedResults);
					} else {
						// Handle empty results
						console.log('No search results found for query:', query);
						returnData.push({
							json: {
								message: 'No results found for this query',
								query: query,
							},
						});
					}
				} catch (apiError: any) {
					// Log detailed API error
					console.error('Google Search API detailed error:', 
						apiError.response?.data || apiError.message);
					
					// Throw a more helpful error
					if (apiError.response?.data?.error?.message) {
						throw new Error(`Google Search API error: ${apiError.response.data.error.message}`);
					} else {
						throw apiError;
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), `Google Search API error: ${error.message}`);
			}
		}

		return [returnData];
	}
}