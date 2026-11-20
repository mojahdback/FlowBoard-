export async function generateCards(description, apiKey) {
    const response = await axios.post('https://flowboard-api-virid.vercel.app/ai/cards',
        {
            description,
            apiKey
        },
        {
            Headers: {
                'X-Workspace': 'public'
            },
            params: {
                password: '1234'
            },
            timeout: 30000
        }
    );

    return response.data;

}