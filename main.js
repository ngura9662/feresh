document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATA MANAGEMENT ---
    const STORAGE_KEYS = {
        POSTS: 'doctor_posts',
        PRODUCTS: 'doctor_products',
    };

    // Initialize with sample data if localStorage is empty
    const initializeData = () => {
        const defaultPosts = [
            { id: 1, title: 'The Importance of a Balanced Diet', content: 'A balanced diet is crucial for good health. It provides the nutrients your body needs to function effectively and helps prevent chronic diseases.', imageUrl: 'https://placehold.co/600x400/a4d4ae/ffffff?text=Healthy+Diet', date: '2025-08-27' },
            { id: 2, title: '5 Simple Exercises for a Healthier Heart', content: 'Regular physical activity is key to heart health. Try brisk walking, swimming, or cycling for at least 30 minutes a day.', imageUrl: 'https://placehold.co/600x400/2a7d80/ffffff?text=Exercise', date: '2025-08-25' },
        ];
        const defaultProducts = [
            { id: 1, name: 'Forever Aloe Vera Gel', description: 'Supports digestive health and a strong immune system with pure, stabilized aloe vera gel.', price: 25.50, imageUrl: 'https://placehold.co/400x400/fefae0/333333?text=Aloe+Gel' },
            { id: 2, name: 'Forever Arctic Sea', description: 'A balanced supplement with Omega-3 to support cardiovascular and cognitive health.', price: 30.00, imageUrl: 'https://placehold.co/400x400/e0fbfc/333333?text=Omega-3' },
        ];

        if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
            localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(defaultPosts));
        }
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
        }
    };

    const getPosts = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [];
    const savePosts = (posts) => localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    const getProducts = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || [];
    const saveProducts = (products) => localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    
    initializeData();

    // --- DYNAMIC CONTENT RENDERING ---
    const renderBlogPreview = () => {
        const container = document.getElementById('blog-preview-container');
        if (!container) return;
        const posts = getPosts().slice(0, 3); // Get latest 3 posts
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

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will be in touch soon.');
            contactForm.reset();
        });
    }

    // --- ADMIN AUTHENTICATION ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === 'admin' && password === '1234') {
                sessionStorage.setItem('loggedIn', 'true');
                window.location.href = 'admin.html';
            } else {
                document.getElementById('login-error').textContent = 'Invalid credentials.';
            }
        });
    }

    // Auth Guard for Admin Page
    if (document.body.parentElement.outerHTML.includes('admin.html') && sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
    }
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('loggedIn');
            window.location.href = 'admin-login.html';
        });
    }

    // --- ADMIN PANEL CRUD LOGIC ---
    // BLOG MANAGEMENT
    const blogForm = document.getElementById('blog-form');
    if (blogForm) {
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
            if (id) { // Editing
                posts = posts.map(p => p.id == id ? { ...p, ...newPost } : p);
            } else { // Adding
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
                if (confirm('Are you sure you want to delete this post?')) {
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
    }

    // PRODUCT MANAGEMENT
    const productForm = document.getElementById('product-form');
    if (productForm) {
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
            if (id) { // Editing
                products = products.map(p => p.id == id ? { ...p, ...newProduct } : p);
            } else { // Adding
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

    // --- INITIAL PAGE RENDERS ---
    renderBlogPreview();
    renderBlogPosts();
    renderProducts();
});