export function getCards() {

    return fetch('https://flowboard-api-virid.vercel.app/cards')

        .then(response => {

            if (!response.ok) {
                throw new Error('Erreur sur chargment des cartes');
            }

            return response.json();


        })

        .catch(error => {
            throw error;
        });

}