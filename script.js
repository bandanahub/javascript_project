$(document).ready(function () {
    // User Selection Form Submission
    $('#userSelectionForm').submit(function (event) {
        event.preventDefault();

        const userType = $('input[name="userType"]:checked').val();

        if (userType === 'new') {
            window.location.href = "register.html";
        } else if (userType === 'existing') {
            window.location.href = "login.html";
        }
    });

    // Registration Form
    $('#registration-form').submit(function (event) {
        event.preventDefault();

        const password = $('#password').val();
        const confirmPassword = $('#confirm-password').val();

        if (password !== confirmPassword) {
            $('#message').text('Passwords do not match.');
            return; // Prevent form submission
        }

        const formData = $(this).serialize(); // Serialize form data
        // Simulating successful registration (replace with actual registration logic)
        setTimeout(function () {
            window.location.href = "products.html"; // Redirect to products.html
        }, 1000); // Redirect after 1 second (for simulation)
    });

    // Login Form
    // Login Form
    $('#login-form').submit(function (event) {
        event.preventDefault();

        const email = $('#login-email').val();
        const password = $('#login-password').val();

        // Send the email and password to the server for validation
        $.ajax({
            type: "POST",
            url: "/login", // Use the correct server endpoint
            data: { email: email, password: password },
            success: function (response) {
                // Handle successful login response
                window.location.href = "products.html"; // Redirect to products.html
            },
            error: function (error) {
                $('#login-message').text('Invalid email or password.'); // Display error message
            }
        });
    });

    // Fetch and render product list
    function renderProductList(products) {
        const productListContainer = $('#product-list');
        productListContainer.empty(); // Clear previous content

        if (products.length === 0) {
            productListContainer.append('<p>No products found.</p>');
        } else {
            const ul = $('<ul>');
            products.forEach(product => {
                const li = $('<li>');
                li.text(product.name + ' - $' + product.price);
                ul.append(li);
            });
            productListContainer.append(ul);
        }
    }

    // Add to Cart Button Click
    $('#add-to-cart-btn').click(function () {
        const productId = $(this).data('product-id'); // Get the product ID
        // Send the productId to the server using an AJAX request
        $.ajax({
            type: "POST",
            url: "addToCart.php", // Replace with your server endpoint
            data: { productId: productId },
            success: function (response) {
                // Handle successful add to cart response
            },
            error: function (error) {
                // Handle add to cart error
            }
        });
    });

    // Fetch product data from the server
    function fetchProductData(searchTerm = '') {
        // Send searchTerm to the server using an AJAX request
        $.ajax({
            type: "GET",
            url: "getProducts.php", // Replace with your server endpoint
            data: { searchTerm: searchTerm },
            success: function (response) {
                const products = response.products; // Assuming server responds with product data
                renderProductList(products);
            },
            error: function (error) {
                // Handle fetch product data error
            }
        });
    }

    // Initial fetch on page load
    fetchProductData();

    // Search functionality
    $('#search-input').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();
        fetchProductData(searchTerm);
    });
});
