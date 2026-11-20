export async function generateCards(description, apiKey) {
    const response = await axios.post('https://flowboard-api-virid.vercel.app/ai/generate',
        {
            description,
            apiKey
        },
        {
            Headers: {
                'X-Workspace': 'public'
            },
            timeout: 30000
        }
    ); 

    return response.data ;

}