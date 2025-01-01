// DOM Elements
const mostCommonList = document.getElementById('most-common-numbers');
const leastCommonList = document.getElementById('least-common-numbers');
const generateButton = document.getElementById('generate-button');
const generatedNumbers = document.getElementById('generated-numbers');

// API Endpoints
const powerballAPI = 'https://www.powerball.com/';
const megaMillionsAPI = 'https://www.megamillions.com/';

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
function generateRandomNumbers(isPowerball = true) {
    const numberRange = isPowerball ? 69 : 70;
    const specialRange = isPowerball ? 26 : 25;

    const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * numberRange) + 1);
    const specialNumber = Math.floor(Math.random() * specialRange) + 1;

    generatedNumbers.textContent = isPowerball
        ? `Powerball Numbers: ${randomNumbers.join(', ')} | Powerball: ${specialNumber}`
        : `MegaMillions Numbers: ${randomNumbers.join(', ')} | Mega Ball: ${specialNumber}`;
}


// Initialize app
async function initialize() {
    // Fetch Powerball and MegaMillions data from your backend or scraper
    const powerballData = await fetchData('/api/powerball'); // Replace with scraper output path
    const megaMillionsData = await fetchData('/api/megamillions'); // Replace with scraper output path

    // Update UI with Powerball data
    if (powerballData) {
        updateStatistics(powerballData.mostCommon, mostCommonList);
        updateStatistics(powerballData.leastCommon, leastCommonList);
    } else {
        console.error('Failed to load Powerball data');
    }

    // Optionally handle Mega Millions data
    // if (megaMillionsData) { ... }
}



// Event Listeners
generateButton.addEventListener('click', generateRandomNumbers);

// Start the app
initialize();
