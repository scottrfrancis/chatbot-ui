// import { OPENAI_API_HOST, OPENAI_API_TYPE, OPENAI_API_VERSION, OPENAI_ORGANIZATION } from '@/utils/app/const';
// import { OpenAIModels } from '@/types/openai';
// add AMZN models
import { AmznModel, AmznModelID, AmznModels } from '@/types/amazon';
// mock host
const MOCK_API_HOST = 'http://localhost:3000/api/mock';
// dev endpoint
const DEV_API_HOST = 'https://kx9lyhxrs8.execute-api.us-west-2.amazonaws.com/dev';


// select the API to use
const API_HOST = DEV_API_HOST;
// let api_type = OPENAI_API_TYPE;
// override for api_type for amazon
const api_type = 'amazon';


export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { key } = (await req.json()) as {
      key: string;
    };

    let url = `${API_HOST}/v1/models`;

    const response = await fetch(url, {
      headers: {
        ...(api_type === 'amazon' && { 
          'x-api-key': `${key ? key : process.env.AMAZON_API_KEY}`
      }),
      },
    });

    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(
        `OpenAI API returned an error ${
          response.status
        }: ${await response.text()}`,
      );
      throw new Error('OpenAI API returned an error');
    }

    const json = await response.json();

    // AMZN Models
    const models: AmznModel[] = json.data
      .map((model: any) => {
        for (const [key, value] of Object.entries(AmznModelID)) {
          if (value === model.id) {
            return {
              id: model.id,
              name:AmznModels[value].name,
            };
            }
          }
        })
      .filter(Boolean);
    return new Response(JSON.stringify(models), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
