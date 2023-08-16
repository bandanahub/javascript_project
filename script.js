$(document).ready(function () {
    $("#userSelectionForm").submit(function (event) {
        event.preventDefault();

        const userType = $("input[name='userType']:checked").val();

        if (userType === "new") {
            window.location.href = "register.html";
        } else if (userType === "existing") {
            window.location.href = "login.html";
        }
    });
});

$(document).ready(function () {
    // Show user selection form
    $('.user-selection').show();

    // User Selection Form Submission
    $('#userSelectionForm').submit(function (event) {
        event.preventDefault();

        const userType = $('input[name="userType"]:checked').val();

        if (userType === 'new') {
            $('.user-selection').hide();
            $('#registration-form').show();
        } else if (userType === 'existing') {
            $('.user-selection').hide();
            $('#login-form').show();
        }
    });

    // Registration Form
    $('#registration-form').submit(function (event) {
        event.preventDefault();

        // ... (existing registration form logic) ...
    });

    // Login Form
    $('#login-form').submit(function (event) {
        event.preventDefault();

        // ... (existing login form logic) ...
    });

    // Fetch and render product list
    function renderProductList(products) {
        // ... (existing renderProductList function logic) ...
    }

    // Add to Cart Button Click
    $('#add-to-cart-btn').click(function () {
        // ... (existing add-to-cart logic) ...
    });

    // Fetch product data from the server
    function fetchProductData(searchTerm = '') {
        // ... (existing fetchProductData function logic) ...
    }

    // Initial fetch on page load
    fetchProductData();

    // Search functionality
    $('#search-input').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();
        fetchProductData(searchTerm);
    });
});
