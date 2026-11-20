
const FILTERS_KEY = 'flowboard-filters';

export function saveFilters(filters) {
    localStorage.setItem(
        FILTERS_KEY,
        JSON.stringify(filters)
    );
}

export function getSavedFilters() {
    const savedFilters = localStorage.getItem(FILTERS_KEY);

    if (!savedFilters) {
        return null;
    }

    try {
        return JSON.parse(savedFilters);
    } catch (error) {
        console.error('Erreur de lecture:', error);

    }
}
