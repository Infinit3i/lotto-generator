const axios = require('axios');
const cheerio = require('cheerio');

console.log("Scraper service is running!");

const fetchPowerballData = async () => {
  try {
    const url = 'https://www.powerball.com/previous-results?gc=powerball';
    const response = await axios.get(url);

    // Load the HTML into Cheerio
    const $ = cheerio.load(response.data);

    // Selector for the Powerball numbers
    const numbers = [];
    $('.game-ball-group .item-powerball').each((i, element) => {
      numbers.push($(element).text());
    });

    console.log('Powerball Numbers:', numbers);
  } catch (error) {
    console.error('Error fetching Powerball data:', error.message);
    // Retry fetching after 30 seconds if there's an error
    setTimeout(fetchPowerballData, 30000);
  }
};

fetchPowerballData();
