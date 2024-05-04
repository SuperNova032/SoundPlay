//Each line generates a new button with it's own name, image and sound
const sounds = [
    { name: "Tavern", category: ["ambient"], src: "resources/sounds/tavern.wav", image: "resources/images/buttons/tavern.png" },
    { name: "Village", category: ["ambient"], src: "resources/sounds/village.wav", image: "resources/images/buttons/village.png" },
    { name: "Ocean", category: ["ambient", "nature"], src: "resources/sounds/ocean.wav", image: "resources/images/buttons/ocean.png" },
    { name: "Beach", category: ["ambient", "nature"], src: "resources/sounds/beach.wav", image: "resources/images/buttons/beach.png" },
    { name: "Forest", category: ["ambient", "nature"], src: "resources/sounds/forest.wav", image: "resources/images/buttons/forest.png" },
    { name: "Desert", category: ["ambient", "nature"], src: "resources/sounds/desert.wav", image: "resources/images/buttons/desert.png" },
    { name: "Cave", category: ["ambient", "nature"], src: "resources/sounds/cave.wav", image: "resources/images/buttons/cave.png" },
    { name: "Arrow-Hit", category: ["effects"], src: "resources/sounds/arrow.wav", image: "resources/images/buttons/arrow.png" },
    { name: "Explosion", category: ["effects"], src: "resources/sounds/explosion.wav", image: "resources/images/buttons/explosion.png" },
    { name: "Fireball", category: ["effects"], src: "resources/sounds/fireball.wav", image: "resources/images/buttons/fireball.png" },
    { name: "Rocks-Fall", category: ["effects"], src: "resources/sounds/rocks.wav", image: "resources/images/buttons/rocks.png" },
    { name: "Sword-Unsheath", category: ["effects"], src: "resources/sounds/sword.wav", image: "resources/images/buttons/sword.png" },
    { name: "Bubbles", category: ["effects"], src: "resources/sounds/bubbles.wav", image: "resources/images/buttons/bubbles.png" },
    { name: "Crickets", category: ["ambient","nature", "creature"], src: "resources/sounds/crickets.wav", image: "resources/images/buttons/crickets.png" },
    { name: "Birds-Chirp", category: ["ambient","nature", "creature"], src: "resources/sounds/birds.wav", image: "resources/images/buttons/birds.png" },
    { name: "Bear-Roars", category: ["nature", "creature"], src: "resources/sounds/bear.wav", image: "resources/images/buttons/bear.png" },
    { name: "Lion-Roars", category: ["nature", "creature"], src: "resources/sounds/lion.wav", image: "resources/images/buttons/lion.png" }
];

//Code to generate sound buttons
let currentAudio = null;

function generateSoundButtons(filteredSounds) {
    const soundboard = document.getElementById('soundboard');
    soundboard.innerHTML = ''; 

    filteredSounds.forEach(sound => {
        const button = document.createElement('button');
        button.className = 'sound-button';
        const img = document.createElement('img');
        img.src = sound.image;
        button.appendChild(img);
        const span = document.createElement('span');
        span.textContent = sound.name;
        button.appendChild(span);
        button.addEventListener('click', () => toggleSound(sound.src));
        soundboard.appendChild(button);
    });
}

//Function for toggling sound
function toggleSound(soundSrc) {
    if (currentAudio && !currentAudio.paused && currentAudio.src === soundSrc) {
        currentAudio.pause();
        currentAudio = null;
    } else {
        if (currentAudio) {
            currentAudio.pause();
        }
        currentAudio = new Audio(soundSrc);
        currentAudio.play();
    }
}

function getSelectedCategories() {
    const checkboxes = document.querySelectorAll('#filterOptions input[type="checkbox"]');
    const selectedCategories = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });

    return selectedCategories;
}

function filterSounds() {
    const selectedCategories = getSelectedCategories();

    if (selectedCategories.length === 0) {
        generateSoundButtons(sounds);
    } else {
        const filteredSounds = sounds.filter(sound => {
            return selectedCategories.every(category => sound.category.includes(category));
        });
        generateSoundButtons(filteredSounds);
    }
}

const checkboxes = document.querySelectorAll('#filterOptions input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const button = this.parentNode;
        if (this.checked) {
            button.classList.add('checked');
        } else {
            button.classList.remove('checked');
        }
        filterSounds();
    });
});

generateSoundButtons(sounds);

//Code to toggle and remember dark mode
document.addEventListener("DOMContentLoaded", function() {
    
    var isDarkMode = localStorage.getItem("darkMode");

    if (isDarkMode === "true") {
        document.body.classList.add("dark-mode");
        document.querySelector('h1').classList.add("dark-mode-heading");
    }
});

function toggleDarkMode() {
    var body = document.body;
    var h1 = document.querySelector('h1');
    var isDarkMode = body.classList.contains("dark-mode");

    body.classList.toggle("dark-mode");
    h1.classList.toggle("dark-mode-heading");

    localStorage.setItem("darkMode", !isDarkMode);
}