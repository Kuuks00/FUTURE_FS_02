import React, { useState, useEffect } from 'react';

// Product Data - Static for demonstration
const initialProducts = [
    { id: 1, name: 'Classic Vanilla Cake', price: 25.00, description: 'A timeless favorite with rich vanilla flavor and buttercream.', imageUrl: 'https://www.mashed.com/img/gallery/classic-vanilla-cake-recipe-youll-make-again-and-again/intro-1614368196.jpg' },
    { id: 2, name: 'Rich Chocolate Fudge Cake', price: 30.00, description: 'Decadent chocolate layers with creamy fudge frosting.', imageUrl: 'https://insanelygoodrecipes.com/wp-content/uploads/2024/06/chocolate-fudge-cake-5.jpg' },
    { id: 3, name: 'Strawberry Shortcake', price: 28.00, description: 'Light and airy cake with fresh strawberries and whipped cream.', imageUrl: 'https://www.lacherpatisserie.com/cdn/shop/files/strawberry-shortcake_c656cf4e-ee3d-49c4-87f3-e7330e64b34b.jpg?v=1730608801' },
    { id: 4, name: 'Lemon Meringue Cake', price: 32.00, description: 'Tangy lemon curd layers topped with fluffy meringue.', imageUrl: 'https://realfood.tesco.com/media/images/1400x919-EarlGreyLemonMerginue-df52beb2-3c66-457a-81bf-4afaec1e933e-0-1400x919.jpg' },
    { id: 5, name: 'Red Velvet Cake', price: 29.00, description: 'Moist red velvet with a classic cream cheese frosting.', imageUrl: 'https://thecookingfoodie.com/wp-content/uploads/2025/02/IMG_0910-2.jpg' },
    { id: 6, name: 'Chocolate Lava Cake', price: 26.00, description: 'Warm, gooey chocolate cake with a molten center.', imageUrl: 'https://images.getrecipekit.com/20250325120225-how-20to-20make-20chocolate-20molten-20lava-20cake-20in-20the-20microwave.png?width=650&quality=90&' },
];

// ProductCard Component
const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/FEE4E3/333?text=${encodeURIComponent(product.name)}`; }}
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-playfair-display font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 flex-grow font-inter-regular">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-indigo-600 font-inter-medium">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md font-inter-medium"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

// ProductList Component
const ProductList = ({ products, addToCart }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 md:p-10 bg-gradient-to-br from-pink-50 to-orange-50 min-h-screen font-inter-regular">
            <h2 className="text-4xl font-playfair-display font-extrabold text-gray-800 mb-8 text-center">Our Delicious Cakes</h2>
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Search for cakes..."
                    className="w-full max-w-md p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 font-inter-regular"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

// Cart Component
const Cart = ({ cartItems, updateQuantity, removeFromCart, proceedToCheckout }) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen font-inter-regular">
            <h2 className="text-4xl font-playfair-display font-extrabold text-gray-800 mb-8 text-center">Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">Your cart is empty. Start adding some delicious cakes!</p>
            ) : (
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
                            <div className="flex items-center space-x-4">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <h3 className="font-playfair-display font-semibold text-lg text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600 text-sm font-inter-regular">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-300 rounded-md font-inter-medium">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-l-md transition duration-200"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 border-x border-gray-300 text-gray-700">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-r-md transition duration-200"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="font-bold text-lg text-gray-800 w-24 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                        <span className="text-2xl font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-indigo-700 font-inter-medium">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={proceedToCheckout}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg text-xl font-inter-medium"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Checkout Component
const Checkout = ({ cartItems, placeOrder, goBackToCart }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
    });
    const [errors, setErrors] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required.';
        if (!formData.city.trim()) newErrors.city = 'City is required.';
        if (!formData.zip.trim()) newErrors.zip = 'Zip Code is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            placeOrder(formData); // Simulate placing the order
            setOrderPlaced(true);
            setShowOrderConfirmation(true);
            // Optionally clear cart or navigate back
        }
    };

    if (showOrderConfirmation) {
        return (
            <div className="p-6 md:p-10 bg-gradient-to-br from-green-50 to-teal-50 min-h-screen flex items-center justify-center font-inter-regular">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                    <svg className="mx-auto h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-3xl font-playfair-display font-extrabold text-gray-800 mt-4 mb-2">Order Placed!</h2>
                    <p className="text-gray-600 text-lg">Thank you for your purchase, {formData.name}!</p>
                    <p className="text-gray-600 text-md mt-2">Your order will be delivered to {formData.address}, {formData.city}, {formData.zip}.</p>
                    <button
                        onClick={() => {
                            setShowOrderConfirmation(false);
                            goBackToCart(); // Navigate back or to home
                        }}
                        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg font-inter-medium"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen font-inter-regular">
            <h2 className="text-4xl font-playfair-display font-extrabold text-gray-800 mb-8 text-center">Checkout</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-playfair-display font-semibold text-gray-800 mb-4">Order Summary</h3>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-gray-700 mb-2">
                            <span className="font-inter-regular">{item.name} x {item.quantity}</span>
                            <span className="font-inter-regular">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center font-bold text-xl text-gray-800 mt-4 pt-4 border-t border-gray-200">
                        <span className="font-inter-medium">Total:</span>
                        <span className="text-2xl font-bold text-indigo-700 font-inter-medium">${calculateTotal().toFixed(2)}</span>
                    </div>
                </div>

                <h3 className="text-2xl font-playfair-display font-semibold text-gray-800 mb-4">Delivery Information</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 font-inter-medium">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : 'border-gray-300'} font-inter-regular`}
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-xs italic mt-1 font-inter-regular">{errors.name}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 font-inter-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : 'border-gray-300'} font-inter-regular`}
                            placeholder="john.doe@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic mt-1 font-inter-regular">{errors.email}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2 font-inter-medium">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.address ? 'border-red-500' : 'border-gray-300'} font-inter-regular`}
                            placeholder="123 Main St"
                        />
                        {errors.address && <p className="text-red-500 text-xs italic mt-1 font-inter-regular">{errors.address}</p>}
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2 font-inter-medium">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city ? 'border-red-500' : 'border-gray-300'} font-inter-regular`}
                            placeholder="Anytown"
                        />
                        {errors.city && <p className="text-red-500 text-xs italic mt-1 font-inter-regular">{errors.city}</p>}
                    </div>

                    <div>
                        <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2 font-inter-medium">Zip Code</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.zip ? 'border-red-500' : 'border-gray-300'} font-inter-regular`}
                            placeholder="12345"
                        />
                        {errors.zip && <p className="text-red-500 text-xs italic mt-1 font-inter-regular">{errors.zip}</p>}
                    </div>

                    <div className="md:col-span-2 flex justify-between items-center mt-6">
                        <button
                            type="button"
                            onClick={goBackToCart}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg text-lg font-inter-medium"
                        >
                            Back to Cart
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg text-xl font-inter-medium"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main App Component
function App() {
    const [cartItems, setCartItems] = useState([]);
    const [currentPage, setCurrentPage] = useState('products'); // 'products', 'cart', 'checkout'

    // Dynamically load Google Fonts and Tailwind CSS if not already present
    useEffect(() => {
        // Load Tailwind CSS
        if (!document.querySelector('script[src*="cdn.tailwindcss.com"]')) {
            const tailwindScript = document.createElement('script');
            tailwindScript.src = "https://cdn.tailwindcss.com";
            tailwindScript.async = true;
            document.head.appendChild(tailwindScript);
        }

        // Load Google Fonts
        const fontFamilies = [
            'Playfair Display:wght@400;600;700', // Regular, SemiBold, Bold
            'Inter:wght@400;500;600', // Regular, Medium, SemiBold
            'Dancing Script:wght@400;700', // For flair title
            'DM Serif Display:wght@400', // Alternative for headings
            'Great Vibes:wght@400' // For flair
        ];
        const googleFontsLink = document.createElement('link');
        googleFontsLink.href = `https://fonts.googleapis.com/css2?family=${fontFamilies.join('&family=')}&display=swap`;
        googleFontsLink.rel = 'stylesheet';
        document.head.appendChild(googleFontsLink);

        // Configure Tailwind to use custom fonts
        // This is a dynamic configuration as we cannot modify tailwind.config.js in this environment
        // Instead, we'll directly inject a style block with font-face definitions if needed,
        // but primarily rely on the Google Fonts loading and applying classes.
        // For direct class usage like 'font-playfair-display', Tailwind needs to know these names.
        // A simple way is to use generic serif/sans-serif classes or ensure a custom config is injected.
        // Since we are limited in directly modifying tailwind.config.js, we will apply classes directly,
        // assuming Tailwind's JIT or a pre-configured setup can resolve these font names.
        // For safety, we define generic font families and apply them.
        const style = document.createElement('style');
        style.innerHTML = `
      .font-playfair-display { font-family: 'Playfair Display', serif; }
      .font-inter-regular { font-family: 'Inter', sans-serif; font-weight: 400; }
      .font-inter-medium { font-family: 'Inter', sans-serif; font-weight: 500; }
      .font-inter-semibold { font-family: 'Inter', sans-serif; font-weight: 600; }
      .font-dancing-script { font-family: 'Dancing Script', cursive; }
      .font-great-vibes { font-family: 'Great Vibes', cursive; }
    `;
        document.head.appendChild(style);


    }, []); // Run once on component mount

    // Add item to cart or increase quantity if already exists
    const addToCart = (productToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...productToAdd, quantity: 1 }];
            }
        });
    };

    // Update quantity of an item in the cart
    const updateQuantity = (id, newQuantity) => {
        setCartItems(prevItems => {
            if (newQuantity <= 0) {
                return prevItems.filter(item => item.id !== id);
            }
            return prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Simulate placing an order
    const placeOrder = (orderDetails) => {
        console.log('Order Placed!', { cartItems, orderDetails });
        setCartItems([]); // Clear cart after order is placed
        // Optionally navigate to a confirmation page or home
        setCurrentPage('products'); // Go back to products page after order confirmation
    };

    const goToCart = () => setCurrentPage('cart');
    const goToCheckout = () => setCurrentPage('checkout');
    const goToProducts = () => setCurrentPage('products');

    return (
        <div className="font-inter-regular antialiased bg-gray-100"> {/* Default body font */}
            {/* Header */}
            <header className="bg-white shadow-md p-4 sticky top-0 z-10">
                <nav className="container mx-auto flex justify-between items-center">
                    <h1 className="text-4xl font-great-vibes text-indigo-700">Bake My Day</h1> {/* Using Great Vibes for flair title */}
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={goToProducts}
                            className="text-gray-600 hover:text-indigo-600 font-inter-medium transition duration-200"
                        >
                            Products
                        </button>
                        <button
                            onClick={goToCart}
                            className="relative text-gray-600 hover:text-indigo-600 font-inter-medium transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                {currentPage === 'products' && (
                    <ProductList products={initialProducts} addToCart={addToCart} />
                )}
                {currentPage === 'cart' && (
                    <Cart
                        cartItems={cartItems}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        proceedToCheckout={goToCheckout}
                    />
                )}
                {currentPage === 'checkout' && (
                    <Checkout
                        cartItems={cartItems}
                        placeOrder={placeOrder}
                        goBackToCart={goToCart}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
