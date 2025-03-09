"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSearch = void 0;
const axios_1 = __importDefault(require("axios"));
const n8n_workflow_1 = require("n8n-workflow");
class SimpleQueryCounter {
    constructor() {
        this.date = this.getCurrentDate();
        this.count = 0;
    }
    static getInstance() {
        if (!SimpleQueryCounter.instance) {
            SimpleQueryCounter.instance = new SimpleQueryCounter();
        }
        return SimpleQueryCounter.instance;
    }
    getCurrentDate() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
    checkAndResetCounter() {
        const currentDate = this.getCurrentDate();
        if (this.date !== currentDate) {
            this.date = currentDate;
            this.count = 0;
        }
    }
    incrementCounter() {
        this.checkAndResetCounter();
        return ++this.count;
    }
    getCount() {
        this.checkAndResetCounter();
        return this.count;
    }
    getFormattedCount() {
        return `${this.getCount()}/100`;
    }
}
const queryCounter = SimpleQueryCounter.getInstance();
class GoogleSearch {
    constructor() {
        this.version = '0.2.4';
        this.description = {
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
            icon: 'file:googleSearch.svg',
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
    }
    getNodeInfo() {
        return {
            version: this.version,
            currentQueryCount: queryCounter.getFormattedCount(),
        };
    }
    async testGoogleSearchApiCredentials() {
        var _a, _b, _c;
        try {
            const credentials = await this.getCredentials('googleSearchApi');
            const apiKey = credentials.apiKey;
            const customSearchEngineId = credentials.customSearchEngineId;
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
            const baseUrl = 'https://www.googleapis.com/customsearch/v1';
            const testParams = {
                key: apiKey,
                cx: customSearchEngineId,
                q: 'test',
                num: 1,
            };
            try {
                await axios_1.default.get(baseUrl, { params: testParams });
                return {
                    status: 'OK',
                    message: 'Connection successful',
                };
            }
            catch (error) {
                if ((_c = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message) {
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
        }
        catch (error) {
            return {
                status: 'Error',
                message: `Error testing credentials: ${error.message}`,
            };
        }
    }
    async execute() {
        var _a, _b, _c, _d;
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('googleSearchApi');
        const apiKey = credentials.apiKey;
        const customSearchEngineId = credentials.customSearchEngineId;
        const baseUrl = 'https://www.googleapis.com/customsearch/v1';
        for (let i = 0; i < items.length; i++) {
            try {
                const operation = this.getNodeParameter('operation', i);
                const query = this.getNodeParameter('query', i);
                if (!query || query.trim() === '') {
                    throw new Error('Search query cannot be empty');
                }
                const returnAll = this.getNodeParameter('returnAll', i, false);
                const limit = returnAll ? 10 : this.getNodeParameter('limit', i, 10);
                const options = this.getNodeParameter('options', i, {});
                const requestParams = {
                    key: apiKey,
                    cx: customSearchEngineId,
                    q: query,
                    num: limit,
                };
                if (operation === 'imageSearch') {
                    requestParams.searchType = 'image';
                }
                console.log('Google Search request parameters:', {
                    cx: customSearchEngineId,
                    q: query,
                    num: limit,
                    searchType: operation === 'imageSearch' ? 'image' : 'web',
                    ...options,
                });
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
                    const response = await axios_1.default.get(baseUrl, { params: requestParams });
                    queryCounter.incrementCounter();
                    const results = response.data;
                    console.log('Google Search API response structure:', {
                        searchInformation: results.searchInformation,
                        itemCount: results.items ? results.items.length : 0,
                    });
                    if (results && results.items) {
                        const formattedResults = results.items.map((item) => ({
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
                    }
                    else {
                        console.log('No search results found for query:', query);
                        returnData.push({
                            json: {
                                message: 'No results found for this query',
                                query: query,
                            },
                        });
                    }
                }
                catch (apiError) {
                    console.error('Google Search API detailed error:', ((_a = apiError.response) === null || _a === void 0 ? void 0 : _a.data) || apiError.message);
                    if ((_d = (_c = (_b = apiError.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) {
                        throw new Error(`Google Search API error: ${apiError.response.data.error.message}`);
                    }
                    else {
                        throw apiError;
                    }
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Google Search API error: ${error.message}`);
            }
        }
        return [returnData];
    }
}
exports.GoogleSearch = GoogleSearch;
//# sourceMappingURL=GoogleSearch.node.js.map