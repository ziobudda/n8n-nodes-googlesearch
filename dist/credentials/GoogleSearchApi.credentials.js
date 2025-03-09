"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSearchApi = void 0;
class GoogleSearchApi {
    constructor() {
        this.name = 'googleSearchApi';
        this.displayName = 'Google Search API';
        this.documentationUrl = 'https://developers.google.com/custom-search/v1/overview';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                description: 'Google Custom Search API Key',
            },
            {
                displayName: 'Custom Search Engine ID',
                name: 'customSearchEngineId',
                type: 'string',
                default: '',
                description: 'Google Custom Search Engine ID (cx)',
            },
        ];
    }
}
exports.GoogleSearchApi = GoogleSearchApi;
//# sourceMappingURL=GoogleSearchApi.credentials.js.map