export async function getCards(params = new URLSearchParams()) {

    try {

        const response = await axios.get(
            'https://flowboard-api-virid.vercel.app/cards?',
            {
                headers: {
                    'X-Workspace': 'public'
                },
                params: params
            }
        );

        return response.data;

    } catch (error) {

        throw error;

    }

}
