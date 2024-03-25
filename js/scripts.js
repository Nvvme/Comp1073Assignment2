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
