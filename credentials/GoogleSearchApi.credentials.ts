import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GoogleSearchApi implements ICredentialType {
	name = 'googleSearchApi';
	displayName = 'Google Search API';
	documentationUrl = 'https://developers.google.com/custom-search/v1/overview';
	properties: INodeProperties[] = [
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