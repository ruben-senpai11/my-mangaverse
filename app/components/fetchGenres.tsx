import Papa from 'papaparse';

// Fetch and parse the CSV
export const fetchGenres = async () => {
  try {
    const response = await fetch('/genres.csv'); // Public file path
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvData = await response.text();
    const { data } = Papa.parse(csvData, { header: true }); // Parse CSV
    return data;
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    return [];
  }
};
