// Instant Search with 300ms Debounce
let searchDebounceTimer = null;

const searchInput = document.getElementById('instantSearchInput');
const dropdown = document.getElementById('liveSearchDropdown');

if (searchInput && dropdown) {
    searchInput.addEventListener('input', function() {
        clearTimeout(searchDebounceTimer);
        const query = this.value.trim();

        if (query.length < 2) {
            dropdown.style.display = 'none';
            dropdown.innerHTML = '';
            return;
        }

        searchDebounceTimer = setTimeout(() => {
            fetch(`/story-store/api/search?q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    if (!data || data.length === 0) {
                        dropdown.innerHTML = '<div style="padding:1rem; text-align:center; color:var(--text-color-light);">No matching books found</div>';
                    } else {
                        let html = '';
                        data.forEach(book => {
                            html += `
                                <a href="/story-store/book/${book.id}" style="display:flex; align-items:center; gap:1rem; padding:.75rem 1rem; border-bottom:1px solid rgba(255,255,255,0.05); color:#fff; text-decoration:none; transition:background .2s;">
                                    <img src="/static/${book.image}" alt="${book.name}" style="width:40px; height:50px; object-fit:cover; border-radius:.25rem;">
                                    <div style="flex:1;">
                                        <div style="font-weight:600; font-size:.9rem; color:var(--title-color);">${highlightMatch(book.name, query)}</div>
                                        <small style="color:var(--text-color-light); font-size:.75rem;">By ${book.author || 'AK Authors'} &middot; ${book.category}</small>
                                    </div>
                                    <div style="font-weight:bold; color:var(--first-color);">₹${book.price}</div>
                                </a>
                            `;
                        });
                        dropdown.innerHTML = html;
                    }
                    dropdown.style.display = 'block';
                })
                .catch(err => {
                    console.error('Search API error:', err);
                });
        }, 300);
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span style="background:var(--first-color); color:#fff; padding:0 2px; border-radius:2px;">$1</span>');
}

// AJAX Wishlist Toggle & Counter Update
function toggleWishlist(bookId, btnElem) {
    fetch(`/story-store/wishlist/toggle/${bookId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        // Update header wishlist counters
        document.querySelectorAll('.wishlist-badge-count').forEach(badge => {
            badge.textContent = data.wishlist_count;
        });

        // Toggle heart color
        if (btnElem) {
            if (data.in_wishlist) {
                btnElem.style.color = '#e74c3c';
                btnElem.title = 'Remove from Wishlist';
            } else {
                btnElem.style.color = '#ffffff';
                btnElem.title = 'Add to Wishlist';
            }
        }
    })
    .catch(err => console.error('Wishlist toggle error:', err));
}
