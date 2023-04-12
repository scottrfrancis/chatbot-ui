// mock api endpoint for testing

export const config = {
    runtime: 'edge',
  };
  

const handler = async(req: Request): Promise<Response> => {

    const models = {
        "object": "list",
        "data": [
            {
                "id": "bloom-7b1-fp16",
                "object":  "model",
                "created":  1681227653,
                "owned_by": "amazon",
                "permission": [
                    {
                        "id": "bloom-7b1-fp16",
                        "object": "model_permission",
                        "created": 1681227653,
                        "allow_create_engine": false,
                        "allow_sampling": true,
                        "allow_logprobs": true,
                        "allow_search_indices": false,
                        "allow_view": true,
                        "allow_fine_tuning": false,
                        "organization": "*",
                        "group": null,
                        "is_blocking": false,
                    }
                ],
                "root": "bloom",
                "parent": null
            }
        ]
    }

    return new Response(JSON.stringify(models), { status: 200 });
}

export default handler;
