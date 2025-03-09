import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class GoogleSearch implements INodeType {
    private version;
    getNodeInfo(): {
        version: string;
        currentQueryCount: string;
    };
    description: INodeTypeDescription;
    testGoogleSearchApiCredentials(this: IExecuteFunctions): Promise<{
        status: string;
        message: string;
    }>;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
