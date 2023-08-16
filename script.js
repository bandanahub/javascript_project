$(document).ready(function () {
    // Registration Form
    $('#registration-form').submit(function (event) {
        event.preventDefault();
        
        var name = $('#name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var confirmPassword = $('#confirm-password').val();
        
        if (password !== confirmPassword) {
            $('#message').html('<p>Passwords do not match.</p>');
            return;
        }
        
        $.ajax({
            type: 'POST',
            url: '/register',
            data: {
                name: name,
                email: email,
                password: password
            },
            success: function (response) {
                if (response.success) {
                    $('#message').html('<p>Welcome, ' + name + '!</p>');
                } else {
                    $('#message').html('<p>Registration failed. Please try again.</p>');
                }
            },
            error: function () {
                $('#message').html('<p>Error processing the request.</p>');
            }
        });
    });

    // Login Form
    $('#login-form').submit(function (event) {
        event.preventDefault();

        var email = $('#login-email').val();
        var password = $('#login-password').val();

        $.ajax({
            type: 'POST',
            url: '/login',
            data: {
                email: email,
                password: password
            },
            success: function (response) {
                if (response.success) {
                    $('#login-message').html('<p>Login successful.</p>');
                } else {
                    $('#login-message').html('<p>Login failed. Please check your credentials.</p>');
                }
            },
            error: function () {
                $('#login-message').html('<p>Error processing the request.</p>');
            }
        });
    });

    // Fetch and render product list
    function renderProductList(products) {
        const productListDiv = $('#product-list');
        productListDiv.empty();

        products.forEach(product => {
            const productDiv = $('<div class="product"></div>');
            productDiv.append(`<img src="${product.imageUrl}" alt="${product.name}" class="product-image">`);
            productDiv.append(`<h3 class="product-name">${product.name}</h3>`);
            productDiv.append(`<p class="product-price">Price: $${product.price}</p>`);
            productDiv.append(`<p class="product-quantity">Quantity: ${product.quantity}</p>`);
            productListDiv.append(productDiv);
        });
    }

    // Fetch product data from the server
    function fetchProductData(searchTerm = '') {
        $.ajax({
            type: 'GET',
            url: '/products',
            success: function (response) {
                let filteredProducts = response.products;

                if (searchTerm) {
                    filteredProducts = response.products.filter(product => {
                        return product.name.toLowerCase().includes(searchTerm);
                    });
                }

                renderProductList(filteredProducts);
            },
            error: function () {
                console.log('Error fetching product data.');
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
