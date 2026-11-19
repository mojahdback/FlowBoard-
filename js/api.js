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

export async function changeStatus(id , newStatus) {
    const {data} = await axios.patch('https://flowboard-api-virid.vercel.app/cards/' + id ,
        {status:newStatus},
        {
            headers:{'X-Workspace': 'public' },
            params:{password: '1234'}
        }

    );

    return data ;
    
}


