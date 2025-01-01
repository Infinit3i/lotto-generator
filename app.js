// DOM Elements
const mostCommonList = document.getElementById('most-common-numbers');
const leastCommonList = document.getElementById('least-common-numbers');
const generateButton = document.getElementById('generate-button');
const generatedNumbers = document.getElementById('generated-numbers');

// API Endpoints
const powerballAPI = 'https://example.com/api/powerball';
const megaMillionsAPI = 'https://example.com/api/megamillions';

// Fetch data from APIs
async function fetchData(api) {
    try {
        const response = await fetch(api);
        if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Update statistics in the UI
function updateStatistics(data, targetElement) {
    targetElement.innerHTML = '';
    data.forEach(number => {
        const listItem = document.createElement('li');
        listItem.textContent = number;
        targetElement.appendChild(listItem);
    });
}

// Generate random numbers
function generateRandomNumbers() {
    const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 69) + 1);
    const powerball = Math.floor(Math.random() * 26) + 1;
    generatedNumbers.textContent = `Numbers: ${randomNumbers.join(', ')} | Powerball: ${powerball}`;
}

// Initialize app
async function initialize() {
    const powerballData = await fetchData(powerballAPI);
    const megaMillionsData = await fetchData(megaMillionsAPI);

    if (powerballData) {
        updateStatistics(powerballData.mostCommon, mostCommonList);
        updateStatistics(powerballData.leastCommon, leastCommonList);
    }

    // Repeat for Mega Millions data if needed
    // if (megaMillionsData) { ... }
}

// Event Listeners
generateButton.addEventListener('click', generateRandomNumbers);

// Start the app
initialize();
