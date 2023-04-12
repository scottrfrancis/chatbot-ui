// Type definition for AMZN services
export interface AmznModel {
    id: string;
  name: string;
    maxLength: number; // maximum length of a message
    tokenLimit: number;
}

export enum AmznModelID {
    AMAZON_BLOOM_7B1 = 'bloom-7b1-fp16',
}

export const fallbackModelID = AmznModelID.AMAZON_BLOOM_7B1;

export const AmznModels: Record<AmznModelID, AmznModel> = {
    [AmznModelID.AMAZON_BLOOM_7B1]: {
        id: AmznModelID.AMAZON_BLOOM_7B1,
        name: 'Amazon Bloom 175B',
        maxLength: 12000,
        tokenLimit: 4000,
    }
};