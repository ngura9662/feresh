document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATA MANAGEMENT ---
    const STORAGE_KEYS = {
        POSTS: 'doctor_posts',
        PRODUCTS: 'doctor_products',
        REVIEWS: 'doctor_reviews'
    };

    const initializeData = () => {
        const defaultPosts = [
            { id: 1, title: 'The Importance of a Balanced Diet', content: 'A balanced diet is crucial for good health. It provides the nutrients your body needs to function effectively and helps prevent chronic diseases.', imageUrl: 'https://placehold.co/600x400/a4d4ae/ffffff?text=Healthy+Diet', date: '2025-08-27' },
            { id: 2, title: '5 Simple Exercises for a Healthier Heart', content: 'Regular physical activity is key to heart health. Try brisk walking, swimming, or cycling for at least 30 minutes a day.', imageUrl: 'https://placehold.co/600x400/2a7d80/ffffff?text=Exercise', date: '2025-08-25' },
        ];
        const defaultProducts = [
            { id: 1, name: 'Forever Aloe Vera Gel', description: 'Supports digestive health and a strong immune system with pure, stabilized aloe vera gel.', price: 25.50, imageUrl: 'https://placehold.co/400x400/fefae0/333333?text=Aloe+Gel' },
            { id: 2, name: 'Forever Arctic Sea', description: 'A balanced supplement with Omega-3 to support cardiovascular and cognitive health.', price: 30.00, imageUrl: 'https://placehold.co/400x400/e0fbfc/333333?text=Omega-3' },
        ];
        const defaultReviews = [
            { id: 1, customerName: 'John S.', reviewText: '"Dr. Doe provided clear, actionable advice that genuinely improved my health. The chat consultation was so convenient!"', mediaUrl: 'https://placehold.co/600x400/a2d2ff/ffffff?text=Chat+Screenshot', mediaType: 'image' },
            { id: 2, customerName: 'Maria G.', reviewText: '"The video consultation felt just like an in-person visit. Highly professional and empathetic. Thank you!"', mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', mediaType: 'video' }
        ];

        if (!localStorage.getItem(STORAGE_KEYS.POSTS)) localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(defaultPosts));
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
        if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(defaultReviews));
    };

    const getPosts = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const savePosts = (posts) => localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    const getProducts = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
    const saveProducts = (products) => localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    const getReviews = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || [];
    const saveReviews = (reviews) => localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    
    initializeData();

    // --- DYNAMIC CONTENT RENDERING ---
    // (This section remains unchanged)
    const renderBlogPreview = () => {
        const container = document.getElementById('blog-preview-container');
        if (!container) return;
        const posts = getPosts().slice(0, 3);
        container.innerHTML = posts.map(post => `
            <div class="blog-card">
                <div class="blog-img"><img src="${post.imageUrl}" alt="${post.title}"></div>
                <div class="blog-content">
                    <h3>${post.title}</h3>
                    <p class="blog-meta">Posted on ${new Date(post.date).toLocaleDateString()}</p>
                    <p>${post.content.substring(0, 100)}...</p>
                    <a href="blog.html" class="read-more">Read More</a>
                </div>
            </div>
        `).join('');
    };
    const renderBlogPosts = () => {
        const container = document.getElementById('blog-container');
        if (!container) return;
        const posts = getPosts();
        container.innerHTML = posts.map(post => `
            <div class="blog-card">
                <div class="blog-img"><img src="${post.imageUrl}" alt="${post.title}"></div>
                <div class="blog-content">
                    <h3>${post.title}</h3>
                    <p class="blog-meta">Posted on ${new Date(post.date).toLocaleDateString()}</p>
                    <p>${post.content}</p>
                </div>
            </div>
        `).join('');
    };
    const renderProducts = () => {
        const container = document.getElementById('products-container');
        if (!container) return;
        const products = getProducts();
        container.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-img"><img src="${product.imageUrl}" alt="${product.name}"></div>
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    };
    const renderReviewMedia = (review) => {
        if (review.mediaType === 'video') {
            return `<div class="review-media"><iframe src="${review.mediaUrl}" title="Patient Testimonial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        }
        return `<div class="review-media"><img src="${review.mediaUrl}" alt="Testimonial from ${review.customerName}"></div>`;
    };
    const renderReviewPreview = () => {
        const container = document.getElementById('review-preview-container');
        if (!container) return;
        const reviews = getReviews().slice(0, 3);
        container.innerHTML = reviews.map(review => `
            <div class="review-card">
                ${renderReviewMedia(review)}
                <div class="review-content">
                    <p>${review.reviewText}</p>
                    <strong>- ${review.customerName}</strong>
                </div>
            </div>
        `).join('');
    };
    const renderReviews = () => {
        const container = document.getElementById('reviews-container');
        if (!container) return;
        const reviews = getReviews();
        container.innerHTML = reviews.map(review => `
            <div class="review-card">
                ${renderReviewMedia(review)}
                <div class="review-content">
                    <p>${review.reviewText}</p>
                    <strong>- ${review.customerName}</strong>
                </div>
            </div>
        `).join('');
    };

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will be in touch soon.');
            contactForm.reset();
        });
    }

    // --- ADMIN AUTHENTICATION (CORRECTED & IMPROVED) ---
    const isAdminPage = window.location.pathname.endsWith('admin.html');
    const isLoginPage = window.location.pathname.endsWith('admin-login.html');

    // 1. If on Admin Page, check if logged in. If not, redirect to login.
    if (isAdminPage && sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
    }

    // 2. If on Login Page, handle the login form submission.
    if (isLoginPage) {
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === 'admin' && password === '1234') {
                sessionStorage.setItem('loggedIn', 'true');
                window.location.href = 'admin.html';
            } else {
                document.getElementById('login-error').textContent = 'Invalid username or password.';
            }
        });
    }
    
    // 3. If on Admin Page, handle logout and load admin data.
    if (isAdminPage) {
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('loggedIn');
            window.location.href = 'admin-login.html';
        });

        // --- ADMIN PANEL CRUD LOGIC ---
        // REVIEW MANAGEMENT
        const reviewForm = document.getElementById('review-form');
        const renderAdminReviews = () => {
            const list = document.getElementById('admin-review-list');
            list.innerHTML = getReviews().map(review => `
                <div class="item-card">
                    <strong>${review.customerName}</strong>
                    <div class="item-actions">
                        <button class="btn-edit" data-id="${review.id}">Edit</button>
                        <button class="btn-delete" data-id="${review.id}">Delete</button>
                    </div>
                </div>
            `).join('');
        };
        reviewForm.addEventListener('submit', e => {
            e.preventDefault();
            const id = document.getElementById('review-id').value;
            const newReview = {
                customerName: document.getElementById('review-customer-name').value,
                mediaUrl: document.getElementById('review-media-url').value,
                mediaType: document.getElementById('review-media-type').value,
                reviewText: document.getElementById('review-text').value,
            };
            let reviews = getReviews();
            if (id) {
                reviews = reviews.map(r => r.id == id ? { ...r, ...newReview } : r);
            } else {
                newReview.id = Date.now();
                reviews.push(newReview);
            }
            saveReviews(reviews);
            reviewForm.reset();
            document.getElementById('review-id').value = '';
            renderAdminReviews();
        });
        document.getElementById('admin-review-list').addEventListener('click', e => {
            const id = e.target.dataset.id;
            if (e.target.classList.contains('btn-delete')) {
                if (confirm('Are you sure?')) {
                    saveReviews(getReviews().filter(r => r.id != id));
                    renderAdminReviews();
                }
            }
            if (e.target.classList.contains('btn-edit')) {
                const review = getReviews().find(r => r.id == id);
                document.getElementById('review-id').value = review.id;
                document.getElementById('review-customer-name').value = review.customerName;
                document.getElementById('review-media-url').value = review.mediaUrl;
                document.getElementById('review-media-type').value = review.mediaType;
                document.getElementById('review-text').value = review.reviewText;
            }
        });
        renderAdminReviews();

        // BLOG MANAGEMENT
        const blogForm = document.getElementById('blog-form');
        const renderAdminPosts = () => {
            const list = document.getElementById('admin-blog-list');
            list.innerHTML = getPosts().map(post => `
                <div class="item-card">
                    <strong>${post.title}</strong>
                    <div class="item-actions">
                        <button class="btn-edit" data-id="${post.id}">Edit</button>
                        <button class="btn-delete" data-id="${post.id}">Delete</button>
                    </div>
                </div>
            `).join('');
        };
        blogForm.addEventListener('submit', e => {
            e.preventDefault();
            const id = document.getElementById('blog-id').value;
            const newPost = {
                title: document.getElementById('blog-title').value,
                imageUrl: document.getElementById('blog-image').value,
                content: document.getElementById('blog-content').value,
                date: new Date().toISOString().split('T')[0]
            };
            let posts = getPosts();
            if (id) {
                posts = posts.map(p => p.id == id ? { ...p, ...newPost } : p);
            } else {
                newPost.id = Date.now();
                posts.push(newPost);
            }
            savePosts(posts);
            blogForm.reset();
            document.getElementById('blog-id').value = '';
            renderAdminPosts();
        });
        document.getElementById('admin-blog-list').addEventListener('click', e => {
            const id = e.target.dataset.id;
            if (e.target.classList.contains('btn-delete')) {
                if (confirm('Are you sure?')) {
                    savePosts(getPosts().filter(p => p.id != id));
                    renderAdminPosts();
                }
            }
            if (e.target.classList.contains('btn-edit')) {
                const post = getPosts().find(p => p.id == id);
                document.getElementById('blog-id').value = post.id;
                document.getElementById('blog-title').value = post.title;
                document.getElementById('blog-image').value = post.imageUrl;
                document.getElementById('blog-content').value = post.content;
            }
        });
        renderAdminPosts();

        // PRODUCT MANAGEMENT
        const productForm = document.getElementById('product-form');
        const renderAdminProducts = () => {
            const list = document.getElementById('admin-product-list');
            list.innerHTML = getProducts().map(product => `
                <div class="item-card">
                    <strong>${product.name} - $${product.price.toFixed(2)}</strong>
                    <div class="item-actions">
                        <button class="btn-edit" data-id="${product.id}">Edit</button>
                        <button class="btn-delete" data-id="${product.id}">Delete</button>
                    </div>
                </div>
            `).join('');
        };
        productForm.addEventListener('submit', e => {
            e.preventDefault();
            const id = document.getElementById('product-id').value;
            const newProduct = {
                name: document.getElementById('product-name').value,
                imageUrl: document.getElementById('product-image').value,
                price: parseFloat(document.getElementById('product-price').value),
                description: document.getElementById('product-description').value,
            };
            let products = getProducts();
            if (id) {
                products = products.map(p => p.id == id ? { ...p, ...newProduct } : p);
            } else {
                newProduct.id = Date.now();
                products.push(newProduct);
            }
            saveProducts(products);
            productForm.reset();
            document.getElementById('product-id').value = '';
            renderAdminProducts();
        });
        document.getElementById('admin-product-list').addEventListener('click', e => {
            const id = e.target.dataset.id;
            if (e.target.classList.contains('btn-delete')) {
                if (confirm('Are you sure?')) {
                    saveProducts(getProducts().filter(p => p.id != id));
                    renderAdminProducts();
                }
            }
            if (e.target.classList.contains('btn-edit')) {
                const product = getProducts().find(p => p.id == id);
                document.getElementById('product-id').value = product.id;
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-image').value = product.imageUrl;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-description').value = product.description;
            }
        });
        renderAdminProducts();
    }

    // --- INITIAL PAGE RENDERS (for public pages) ---
    renderBlogPreview();
    renderBlogPosts();
    renderProducts();
    renderReviewPreview();
    renderReviews();
});