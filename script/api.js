export function getCards(params = new URLSearchParams()) {

    return fetch(`https://flowboard-api-virid.vercel.app/cards?${params.toString()}`)

        .then(response => {

            if (!response.ok) {
                throw new Error('Erreur sur chargment des cartes');
            }

            return response.json();


        })

}