

// Custom Cursor
const cursor = document.getElementById('customCursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
// Cursor hover effect on interactive elements
['a', 'button', 'select', 'input[type="range"]'].forEach(sel => {
    document.addEventListener('mouseover', e => {
        if (e.target.closest(sel)) cursor.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(sel)) cursor.classList.remove('cursor-hover');
    });
});

AOS.init({ once: false, duration: 1200, easing: 'cubic-bezier(.68,-0.55,.27,1.55)' });

// Product Data (images from your folder)
const products = [
    {
        id: 1,
        image: "./images/products/Double cheese burger.jpg",
        title: "Double Cheese Burger",
        description: "Juicy double patty with cheese and fresh veggies.",
        price: 350,
        category: "Burger",
        rating: 5,
    },
    {
        id: 2,
        image: "./images/products/arabic shawarma.jpg",
        title: "Arabic Shawarma",
        description: "Authentic arabic shawarma with spicy sauce.",
        price: 250,
        category: "Shawarma",
        rating: 4,
    },
    {
        id: 3,
        image: "./images/products/meet pizza.webp",
        title: "Meat Pizza",
        description: "Loaded with meat and cheese, baked to perfection.",
        price: 600,
        category: "Pizza",
        rating: 5,
    },
    {
        id: 4,
        image: "./images/products/Cheese lava burger.jpg",
        title: "Cheese Lava Burger",
        description: "Burger with molten cheese lava inside.",
        price: 400,
        category: "Burger",
        rating: 4,
    },
    {
        id: 5,
        image: "./images/products/chicken grilled shawarma.jpg",
        title: "Chicken Grilled Shawarma",
        description: "Grilled chicken shawarma with fresh veggies.",
        price: 300,
        category: "Shawarma",
        rating: 5,
    },
    {
        id: 6,
        image: "./images/products/chicken grilled shawarma.jpg",
        title: "BBQ Chicken Pizza",
        description: "BBQ chicken, cheese, and tangy sauce on a crispy base.",
        price: 700,
        category: "Pizza",
        rating: 5,
    },
    {
        id: 7,
        image: "./images/products/krunchBurger.png",
        title: "Krunch Burger",
        description: "Crunchy chicken fillet with spicy mayo.",
        price: 320,
        category: "Burger",
        rating: 3,
    },
    {
        id: 8,
        image: "./images/products/chicken shawarma.jpg",
        title: "Chicken Shawarma",
        description: "Classic chicken shawarma with garlic sauce.",
        price: 220,
        category: "Shawarma",
        rating: 4,
    },
    {
        id: 9,
        image: "./images/products/vigge pizza.webp",
        title: "Veggie Pizza",
        description: "Loaded with fresh veggies and cheese.",
        price: 500,
        category: "Pizza",
        rating: 2,
    }
];

// Populate category filter
function populateCategories() {
    const select = document.getElementById('categorySelect');
    const cats = Array.from(new Set(products.map(p => p.category)));
    cats.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

// Render Products with animation
function renderProducts(list) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    if (list.length === 0) {
        grid.innerHTML = `<div class="col-span-3 text-center text-lg text-gray-400 py-12">No products found for selected filters.</div>`;
        return;
    }
    list.forEach((product, idx) => {
        const delay = 100 + idx * 120;
        grid.innerHTML += `
        <div class="product-card fade-in-up" style="animation-delay:${delay}ms" data-aos="zoom-in-up" data-aos-delay="${delay}">
          <div class="product-img-wrap">
            <img src="${product.image}" alt="${product.title}" class="w-full h-44 object-cover rounded-xl" />
          </div>
          <h3 class="text-xl font-bold vip-text mb-2 text-center">${product.title}</h3>
          <div class="flex justify-center items-center gap-2 mb-2">
            <span class="text-lg font-bold text-cyan-300">Rs.${product.price}</span>
            <span class="flex items-center gap-1 ml-2">
              ${'<span class="rating-star">★</span>'.repeat(product.rating)}
              <span class="text-cyan-400 font-bold ml-1">${product.rating}</span>
            </span>
          </div>
          <p class="text-gray-200 text-center mb-4">${product.description}</p>
          <span class="inline-block bg-cyan-700 text-xs px-3 py-1 rounded-full mb-2 self-center">${product.category}</span>
          <button class="w-full py-2 px-4 btn-glow rounded-full font-bold shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group/buy relative overflow-hidden"
            onmouseover="this.classList.add('buy-hover')" onmouseout="this.classList.remove('buy-hover')">
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5 transition-transform duration-300 group-hover/buy:scale-125" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 0 0 6.6 17h10.8a1 1 0 0 0 .95-.7L21 13M7 13V6h13" />
              </svg>
              <span class="uppercase tracking-widest">Buy Now</span>
            </span>
            <span class="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-fuchsia-500/30 opacity-0 group-hover/buy:opacity-100 transition-all duration-300 z-0"></span>
          </button>
        </div>
        `;
    });
    // Animate fade-in
    document.querySelectorAll('.fade-in-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('aos-animate'), 120 + i * 120);
    });
}

// Filtering, Sorting, and Range
function filterAndSortProducts() {
    let price = parseInt(document.getElementById('priceRange').value);
    let sort = document.getElementById('sortSelect').value;
    let minRating = parseFloat(document.getElementById('ratingSelect').value);
    let category = document.getElementById('categorySelect').value;

    let filtered = products.filter(p =>
        p.price <= price &&
        p.rating >= minRating &&
        (category === "All" || p.category === category)
    );

    if (sort === 'low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-low') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
    AOS.refresh();
}

window.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    renderProducts(products);

    document.getElementById('priceRange').addEventListener('input', function () {
        document.getElementById('priceRangeValue').innerText = `Rs.${this.value}`;
        filterAndSortProducts();
    });
    document.getElementById('sortSelect').addEventListener('change', filterAndSortProducts);
    document.getElementById('ratingSelect').addEventListener('change', filterAndSortProducts);
    document.getElementById('categorySelect').addEventListener('change', filterAndSortProducts);
});
