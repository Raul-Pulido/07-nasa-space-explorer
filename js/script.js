
// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const gallery = document.getElementById('gallery');
const button = document.querySelector('.filters button');

// Call the setupDateInputs function from dateRange.js
setupDateInputs(startInput, endInput);

// NASA APOD API base URL and your personal API key
const API_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'yCbnBhXLN5BoEarh6Su5MbsY2sTA1fCk79GWU5Gt';

// Helper function to create a gallery card
function createCard(item) {
	// Only show images (not videos)
	if (item.media_type !== 'image') return '';
	return `
		<div class="gallery-item">
			<img src="${item.url}" alt="${item.title}" class="thumb" data-full="${item.hdurl || item.url}" data-title="${item.title}" data-date="${item.date}" data-explanation="${item.explanation}" />
			<div class="card-info">
				<h3>${item.title}</h3>
				<p>${item.date}</p>
			</div>
		</div>
	`;
}


// Array of fun NASA/space facts
const facts = [
  "Did you know? NASA's Voyager 1 is the farthest human-made object from Earth.",
  "Did you know? The Hubble Space Telescope has helped discover thousands of exoplanets.",
  "Did you know? The International Space Station travels at about 28,000 km/h (17,500 mph).",
  "Did you know? The Sun makes up 99.8% of the mass in our solar system.",
  "Did you know? A day on Venus is longer than a year on Venus!",
  "Did you know? The footprints on the Moon will likely last millions of years.",
  "Did you know? Mars has the tallest volcano in the solar system: Olympus Mons.",
  "Did you know? Saturn could float in water because it’s mostly made of gas.",
  "Did you know? Jupiter’s Great Red Spot is a giant storm bigger than Earth.",
  "Did you know? There are more stars in the universe than grains of sand on Earth."
];

// Function to show a random fact
function showRandomFact() {
  const factBox = document.getElementById('factBox');
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  factBox.textContent = randomFact;
  factBox.style.display = 'block';
}

// Function to fetch images from NASA APOD API
async function fetchImages(start, end) {
	// Show loading message
	gallery.innerHTML = '<p>Loading images...</p>';
	try {
		const response = await fetch(`${API_URL}?api_key=${API_KEY}&start_date=${start}&end_date=${end}`);
		const data = await response.json();
		if (Array.isArray(data)) {
			// Remove placeholder
			gallery.innerHTML = data.map(createCard).join('') || '<p>No images found for this range.</p>';
			showRandomFact();
		} else {
			gallery.innerHTML = '<p>Error fetching images.</p>';
		}
	} catch (err) {
		gallery.innerHTML = '<p>Error fetching images.</p>';
	}
}


// Listen for button click to fetch images
button.addEventListener('click', () => {
	const start = startInput.value;
	const end = endInput.value;
	fetchImages(start, end);
});

// Modal functionality
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalExplanation = document.getElementById('modalExplanation');
const modalClose = document.getElementById('modalClose');

// Show modal with image details
gallery.addEventListener('click', function(event) {
	const img = event.target.closest('.thumb');
	if (img) {
		modalImg.src = img.dataset.full;
		modalTitle.textContent = img.dataset.title;
		modalDate.textContent = img.dataset.date;
		modalExplanation.textContent = img.dataset.explanation;
		modal.style.display = 'flex';
	}
});

// Close modal on X click
modalClose.addEventListener('click', function() {
	modal.style.display = 'none';
});

// Close modal when clicking outside modal content
window.addEventListener('click', function(event) {
	if (event.target === modal) {
		modal.style.display = 'none';
	}
});
