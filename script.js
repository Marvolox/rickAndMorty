// Function to fetch data from the Rick and Morty API with pagination
async function fetchData(url) {
    let allResults = [];
    let nextUrl = url;

    while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allResults = allResults.concat(data.results);
        nextUrl = data.info.next;
    }

    return allResults;
}

// Function to display all characters in characters.html
async function displayAllCharacters() {
    const charactersUrl = 'https://rickandmortyapi.com/api/character';
    const charactersTable = document.querySelector('#displayCharacters table');

    const allCharacters = await fetchData(charactersUrl);

    allCharacters.forEach(character => {
        const row = charactersTable.insertRow();
        row.innerHTML = `
            <td>${character.name}</td>
            <td><img src="${character.image}" alt="${character.name}" style="max-width: 100px;"></td>
            <td>${character.status}</td>
        `;
    });
}

// Function to display all locations in locations.html
async function displayAllLocations() {
    const locationsUrl = 'https://rickandmortyapi.com/api/location';
    const locationsTable = document.querySelector('#displayLocations table');

    const allLocations = await fetchData(locationsUrl);

    allLocations.forEach(location => {
        const row = locationsTable.insertRow();
        row.innerHTML = `
            <td>${location.name}</td>
            <td>${location.type}</td>
            <td>${location.dimension}</td>
        `;
    });
}

// Function to display all episodes in episodes.html
async function displayAllEpisodes() {
    const episodesUrl = 'https://rickandmortyapi.com/api/episode';
    const episodesTable = document.querySelector('#displayEpisodes table');

    const allEpisodes = await fetchData(episodesUrl);

    allEpisodes.forEach(episode => {
        const row = episodesTable.insertRow();
        row.innerHTML = `
            <td>${episode.name}</td>
            <td>${episode.air_date}</td>
            <td>${episode.episode}</td>
        `;
    });
}

// Call the respective functions based on the page
if (document.URL.includes('characters.html')) {
    displayAllCharacters();
} else if (document.URL.includes('locations.html')) {
    displayAllLocations();
} else if (document.URL.includes('episodes.html')) {
    displayAllEpisodes();
}
