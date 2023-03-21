////From and Cart Made in this file
//It interfaces with skeletons.xml



//js functions  - GLOBAL
//To ensure I get numbers when I calculate later
String.prototype.toNum = function () {
    return parseInt(this, 10);
}

//Jquery
//When the doc loads run loadskeleton()
$(document).ready(function () {
    loadSkeletons();
});

//When this loads skeletons.xml

function loadSkeletons() {
    $.ajax({
        type: "GET",
        url: "skeletons.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('skeleton').each(function () {
                createSkeletonForm(xml, $(this));
            });
        },
        error: function () {
            alert('Error loading XML file.');
        }
    });
}


//Combine all the form parts into a whole, like th drop downs, the calculate button,
function createSkeletonForm(xml, skeleton) {
    var name = skeleton.attr('name');
    var price = skeleton.find('price').text();
    var quantity = skeleton.find('quantity').text();
    var image = skeleton.find('image').text();
    var description = skeleton.find('description').text();
    var form = $('<form class="m-4 border border-warning border-4 ">').addClass('my-skeleton-form');
    form.append('<img class="img-thumbnail testimonial-logoborder border-warning border-4" height="200" width="300" background-size="cover" src="' + image + '"/>');
    form.append($('<h2 id="border border-warning border-4">').text(name));
    form.append('<p id="border border-warning border-4">' + 'Description: ' + description + '</p>');
    form.append($('<p id="border border-warning border-4">').text('Price: $' + price));
    form.append($('<p id="border border-warning border-4">').text('Quantity: ' + quantity));
    //same above

    ///IN PROGRESS
    // Create dropdown for skeleton type
    //startings of a drop down for animal choice, I also wanted to add sell options so quantity could increase too
    //Plus I might want to isolate this out and make a dropdown creator function
    
    //same below
    createDropdowns(form, price);
    createCalculateButton(form, xml, skeleton, name, price, quantity);
    //formDiv.append(form);
    $('#myDiv').append(form);
}

//This just creates the drop downs for the user's form
function createDropdowns(form, price) {
    var downPaymentOptions = '';
    //can't exceed xml listed price
    for (let i = 0; i <= price; i++) {
        downPaymentOptions += '<option value="' + i + '">' + i + '</option>';
    }
    //var downPatmentValue =
    var interestRateOptions = '';
    for (let i = 0; i < 100; i++) {
        interestRateOptions += '<option value="' + i + '">' + i + '</option>';
    }

    var termOptions = '';
    for (let i = 1; i <= 100; i++) {
        termOptions += '<option value="' + i + '">' + i + '</option>';
    }

    form.append($('<label class="label-info"> Down Payment ($): </label>'));
    form.append($('<select>').attr({ name: 'down-payment' }).html(downPaymentOptions));
    form.append($('<br>'));

    form.append($('<label>').text('Interest Rate (%): '));
    form.append($('<select>').attr({ name: 'interest-rate' }).html(interestRateOptions));
    form.append($('<br>'));

    form.append($('<label>').text('Term (years): '));
    form.append($('<select>').attr({ name: 'term' }).html(termOptions));
    form.append($('<br>'));
}


//Create the caculate button and do all the calculating
function createCalculateButton(form, xml, skeleton, name, price) {
    var calculateButton = $('<button>').text('Calculate Payment').addClass("calc-btn");

    // Add tax dropdown
    var taxDropdown = $('<select>').attr('name', 'tax-rate').addClass("tax-dropdown");
    var taxRates = [
        { value: 0.1, label: 'Default' },
        { value: 0.04, label: 'Alabama' },
        { value: 0.02, label: 'Alaska' },
        { value: 0.056, label: 'Arizona' },
        { value: 0.065, label: 'Arkansas' },
        { value: 0.0725, label: 'California' },
        { value: 0.029, label: 'Colorado' },
        { value: 0.0635, label: 'Connecticut' },
        { value: 0.0, label: 'Delaware' },
        { value: 0.06, label: 'Florida' },
        { value: 0.04, label: 'Georgia' },
        { value: 0.04, label: 'Hawaii' },
        { value: 0.06, label: 'Idaho' },
        { value: 0.0625, label: 'Illinois' },
        { value: 0.07, label: 'Indiana' },
        { value: 0.06, label: 'Iowa' },
        { value: 0.065, label: 'Kansas' },
        { value: 0.06, label: 'Kentucky' },
        { value: 0.0445, label: 'Louisiana' },
        { value: 0.055, label: 'Maine' },
        { value: 0.06, label: 'Maryland' },
        { value: 0.0625, label: 'Massachusetts' },
        { value: 0.06, label: 'Michigan' },
        { value: 0.06875, label: 'Minnesota' },
        { value: 0.07, label: 'Mississippi' },
        { value: 0.04225, label: 'Missouri' },
        { value: 0.0, label: 'Montana' },
        { value: 0.055, label: 'Nebraska' },
        { value: 0.0685, label: 'Nevada' },
        { value: 0.0, label: 'New Hampshire' },
        { value: 0.06625, label: 'New Jersey' },
        { value: 0.05125, label: 'New Mexico' },
        { value: 0.04, label: 'New York' },
        { value: 0.0475, label: 'North Carolina' },
        { value: 0.05, label: 'North Dakota' },
        { value: 0.0575, label: 'Ohio' },
        { value: 0.045, label: 'Oklahoma' },
        { value: 0.0, label: 'Oregon' },
        { value: 0.06, label: 'Pennsylvania' },
        { value: 0.07, label: 'Rhode Island' },
        { value: 0.06, label: 'South Carolina' },
        { value: 0.045, label: 'South Dakota' },
        { value: 0.07, label: 'Tennessee' },
        { value: 0.0625, label: 'Texas' },
        { value: 0.0595, label: 'Utah' },
        { value: 0.06, label: 'Vermont' },
        { value: 0.053, label: 'Virginia' },
        { value: 0.065, label: 'Washington' }
    ];

    taxRates.forEach(function (taxRate) {
        taxDropdown.append($('<option>').attr('value', taxRate.value).text(taxRate.label));
    });
    form.append("<label>Tax (By State)</label>").addClass("label-danger");
    form.append(taxDropdown);

    calculateButton.click(function (event) {
        event.preventDefault();
        var taxRate = form.find('select[name="tax-rate"]').val(); // Get tax rate from dropdown
        var downPaymentInput = form.find('select[name="down-payment"]');
        var interestRateInput = form.find('select[name="interest-rate"]');
        var termInput = form.find('select[name="term"]');
        var downPayment = downPaymentInput.val();
        var interestRate = interestRateInput.val();
        var term = termInput.val();

        // Calculate the payment
        var subtotal = price.toNum() * (1 + (interestRate.toNum() / 100) * term.toNum());
        var tax = taxRate * subtotal;
        var totalCost = subtotal + tax;
        var monthlyPayment = (totalCost - downPayment.toNum()) / (term.toNum() * 12);

        // Update the quantity in the XML file and on the HTML page
        var currentQuantity = skeleton.find('quantity').text().toNum();
        if (currentQuantity > 0) {
            var newQuantity = currentQuantity - 1;
            skeleton.find('quantity').text(newQuantity);
            form.find('#qty').text('Quantity: ' + newQuantity);

            // Display the payment
            alert('Monthly Payment: $' + monthlyPayment.toFixed(2) + '\nTotal Cost: $' + totalCost.toFixed(2));

            // Update the shopping cart
            displayCart(name, monthlyPayment, totalCost);
        } else {
            alert('Sorry, this item is out of stock.');
        }
    });

    form.append(calculateButton);
}




//Display results from users desicions, kinda like a rudamentary client side only cart
function displayCart(name, monthlyPayment, totalCost) {
    var cart = $('#shopping-cart');
    if (cart.length === 0) {
        cart = $('<div>').attr('id', 'shopping-cart').addClass('shopping-cart');
        $('#shop').append(cart);
    }

    var cartItem = $('<div>').addClass('cart-item');
    cartItem.append($('<h4>').text(name));
    cartItem.append($('<p>').text('Monthly Payment: $' + monthlyPayment.toFixed(2)));
    cartItem.append($('<p>').text('Total Cost: $' + totalCost.toFixed(2)));

    cart.append(cartItem);
}
