document.getElementById('smoothieForm').addEventListener('submit', function(event) {
    event.preventDefault(); // I just learnt this. This method prevents the form from submitting the traditional way.
    // * Traditionally, form submission reloads the page and sends data to a server. We avoid this to enhance UX by preventing the default behavior with JavaScript, enabling dynamic page updates without a full reload :)

    // Getting the selected base
    var base = document.getElementById('base').value;

    // A simple method for checking if any of the ingredients are selected. I am excluding the base because it's in a drop-down list, I guess.
    var selectedIngredients = document.querySelectorAll('input[name="ingredient"]:checked');
    if (selectedIngredients.length === 0) { // Checking if any ingredient is selected
        alert('Please select at least one ingredient for your smoothie.');
        return; // Exiting the function to stop processing further
    }

    // Finding all checked ingredients
    var ingredients = Array.from(selectedIngredients).map(function(checkbox) {
        return checkbox.value;
    });

    // Optionally update the smoothie description (Assuming the function exists and works as intended)
    updateSmoothieDescription(base, ingredients); // pretty complex huh

    // Ensuring the smoothie name is generated and displaying an order confirmation alert
    const totalPriceStr = updateTotalPrice();
    const smoothieName = generateSmoothieName(ingredients); // Ensuring the smoothie name is generated
    alert(`Your total of $${totalPriceStr} for a "${smoothieName}" has been placed, and it sounds yummy!`);
    updateTotalPrice();
    // Show alert with the smoothie name after the order is placed
});

// adding a function to keep count of the prices.
    // Function to calculate and update the total price
    const updateTotalPrice = () => {
        let totalPrice = 0;
        document.querySelectorAll('input[name="ingredient"]:checked').forEach(checkbox => {
            totalPrice += parseFloat(checkbox.getAttribute('data-price'));
        });
        document.getElementById('totalPrice').textContent = `Total: $${totalPrice.toFixed(2)}`;
        return totalPrice.toFixed(2); // Return the total price as a string formatted to 2 decimal places
    };

    // Attach the updateTotalPrice function to the change event of each ingredient checkbox
    document.querySelectorAll('.ingredients input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalPrice);
    });

    // Initialize total price on page load in case of browser prefilling form inputs
    updateTotalPrice();

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

//adding randomize functionality

document.getElementById('randomize').addEventListener('click', function() {
    const bases = ['milk', 'yogurt', 'juice', 'water'];
    const ingredients = ['banana', 'strawberries', 'blueberries', 'spinach', 'kale', 'peanutButter', 'almonds', 'chiaSeeds', 'proteinPowder', 'mango', 'pineapple', 'coconut'];

    // Randomly select a base
    const randomBase = bases[Math.floor(Math.random() * bases.length)];
    document.getElementById('base').value = randomBase;

    // Randomly select ingredients (for simplicity, select 3 random ingredients)
    const shuffledIngredients = ingredients.sort(() => 0.5 - Math.random());
    const selectedIngredients = shuffledIngredients.slice(0, 3);

    // Uncheck all ingredients first
    document.querySelectorAll('input[name="ingredient"]:checked').forEach((checkbox) => {
        checkbox.checked = false;
    });

    // Check the randomly selected ingredients
    selectedIngredients.forEach(ingredient => {
        document.getElementById(ingredient).checked = true;
    });

    // Update the smoothie description based on random selections
    updateSmoothieDescription(randomBase, selectedIngredients);

    if (confirm('Are you sure you want to order a randomized drink?')) {
        document.getElementById('smoothieForm').click(); // Simulate clicking the order button
    }
    updateTotalPrice();

});

