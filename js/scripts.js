document.getElementById('smoothieForm').addEventListener('submit', function(event) {
    event.preventDefault(); //I just learnt this. this method prevents the form from submitting the traditional way.
    // * Traditionally, form submission reloads the page and sends data to a server. We avoid this to enhance UX by preventing the default behavior with JavaScript, enabling dynamic page updates without a full reload :)

    // Getting the selected base
    var base = document.getElementById('base').value;

    // A simple method for checking if any of ingredients are selected I am excluding the base because its in a drop down list I guess
    var selectedIngredients = document.querySelectorAll('input[name="ingredient"]:checked');
    var hasIngredientsSelected = selectedIngredients.length > 0; // Checking if any ingredient is selected
    // Checking if ingredients are selected
    if (!hasIngredientsSelected) {
        alert('Please select at least one ingredient for your smoothie.');
        return; // Exiting the function to stop processing further
    }

    // Finding all checked ingredients
    var ingredients = [];
    document.querySelectorAll('input[name="ingredient"]:checked').forEach(function(checkbox) {
        ingredients.push(checkbox.value);
    });

    // Creating the smoothie description
    var smoothieDescription = "Your smoothie with a " + base + " base includes: " + ingredients.join(', ') + ".";

    // Display the description
    document.getElementById('smoothieDescription').textContent = smoothieDescription;
});


// Ingredient & base preview function
//base
document.getElementById('smoothieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const base = document.getElementById('base').value;
    let ingredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(checkbox => checkbox.value);// pretty complex huh

    // Display the smoothie description with selected ingredients
    updateSmoothieDescription(base, ingredients);
});

// Listen for changes in ingredient selection
document.querySelectorAll('input[name="ingredient"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const base = document.getElementById('base').value;
        let ingredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(checkbox => checkbox.value);
        updateSmoothieDescription(base, ingredients);
    });
});


// Smoothie name generator
function generateSmoothieName(ingredients) {
    const adjectives = ['Refreshing', 'Exotic', 'Green', 'Berrylicious', 'Tropical'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    return `${randomAdj} ${randomIngredient} Smoothie`;
}

// Update the updateSmoothieDescription function to include the name
function updateSmoothieDescription(base, ingredients) {
    const descriptionArea = document.getElementById('smoothieDescription');
    if (ingredients.length === 0) {
        descriptionArea.textContent = 'Please select at least one ingredient.';
    } else {
        const name = generateSmoothieName(ingredients);
        descriptionArea.innerHTML = `<strong>${name}</strong> with a ${base} base includes: ${ingredients.join(', ')}.`;
    }
}
