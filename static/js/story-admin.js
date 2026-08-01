// STORY STORE ADMIN JS HANDLERS

// Modal Triggers
function openAddBookModal() {
    const modal = document.getElementById('bookFormModal');
    const form = document.getElementById('adminBookForm');
    const titleElem = document.getElementById('modalFormTitle');

    form.reset();
    form.action = '/admin/story-store/book/add';
    titleElem.textContent = 'Add New Book';

    document.getElementById('coverPreviewImg').style.display = 'none';
    document.getElementById('galleryPreviewGrid').innerHTML = '';

    modal.classList.add('active');
}

function closeBookModal() {
    document.getElementById('bookFormModal').classList.remove('active');
}

function closePreviewModal() {
    document.getElementById('bookDetailsModal').classList.remove('active');
}

function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').classList.remove('active');
}

// Edit Book Loader
function editBook(bookId) {
    fetch(`/admin/story-store/book/${bookId}/details`)
        .then(res => res.json())
        .then(book => {
            if (book.error) {
                alert('Failed to fetch book details.');
                return;
            }
            const modal = document.getElementById('bookFormModal');
            const form = document.getElementById('adminBookForm');
            const titleElem = document.getElementById('modalFormTitle');

            form.action = `/admin/story-store/book/${bookId}/edit`;
            titleElem.textContent = `Edit Book: ${book.name}`;

            document.getElementById('form_title').value = book.name || '';
            document.getElementById('form_author').value = book.author || '';
            document.getElementById('form_publisher').value = book.publisher || '';
            document.getElementById('form_category').value = book.category || '';
            document.getElementById('form_genre').value = book.genre || '';
            document.getElementById('form_language').value = book.language || '';
            document.getElementById('form_isbn').value = book.isbn || '';
            document.getElementById('form_pub_date').value = book.pub_date || '';
            document.getElementById('form_price').value = book.price || 0;
            document.getElementById('form_discount_price').value = book.discount_price || 0;
            document.getElementById('form_stock').value = book.stock || 0;
            document.getElementById('form_pages').value = book.pages || 300;
            document.getElementById('form_description').value = book.description || '';

            const coverPrev = document.getElementById('coverPreviewImg');
            if (book.image) {
                coverPrev.src = `/static/${book.image}`;
                coverPrev.style.display = 'block';
            } else {
                coverPrev.style.display = 'none';
            }

            modal.classList.add('active');
        })
        .catch(err => console.error('Error fetching book details:', err));
}

// Preview Book Modal
function previewBook(bookId) {
    fetch(`/admin/story-store/book/${bookId}/details`)
        .then(res => res.json())
        .then(book => {
            if (book.error) return;

            document.getElementById('previewModalCover').src = `/static/${book.image}`;
            document.getElementById('previewModalCategory').textContent = book.category;
            document.getElementById('previewModalTitle').textContent = book.name;
            document.getElementById('previewModalAuthor').textContent = `By ${book.author || 'AK Authors'} · ${book.publisher || 'AK Pub'}`;
            document.getElementById('previewModalPrice').textContent = `₹${book.price}`;
            document.getElementById('previewModalIsbn').textContent = book.isbn || 'N/A';
            document.getElementById('previewModalStock').textContent = `${book.stock} units`;
            document.getElementById('previewModalGenre').textContent = book.genre || 'N/A';
            document.getElementById('previewModalLang').textContent = book.language || 'English';
            document.getElementById('previewModalDesc').textContent = book.description || 'No description provided.';

            document.getElementById('bookDetailsModal').classList.add('active');
        })
        .catch(err => console.error('Error fetching preview:', err));
}

// Delete Confirmation Modal
function confirmDeleteBook(bookId, bookTitle) {
    const modal = document.getElementById('deleteConfirmModal');
    const form = document.getElementById('deleteBookForm');
    const textElem = document.getElementById('deleteConfirmText');

    form.action = `/admin/story-store/book/${bookId}/delete`;
    textElem.innerHTML = `Are you sure you want to delete <strong>"${bookTitle}"</strong>?<br/><small style="color:var(--text-color-light);">This will safely remove the book and its uploaded cover & gallery images.</small>`;

    modal.classList.add('active');
}

// Quick Stock Adjustment via AJAX
function adjustBookStock(bookId, action, amount) {
    const formData = new FormData();
    formData.append('action', action);
    formData.append('amount', amount);

    fetch(`/admin/story-store/book/${bookId}/stock`, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            const stockElem = document.getElementById(`stock-val-${bookId}`);
            if (stockElem) {
                stockElem.textContent = `${data.new_stock} units`;
            }
        }
    })
    .catch(err => console.error('Stock adjust error:', err));
}

// Image File Upload Previews
function previewCoverImage(input) {
    const imgElem = document.getElementById('coverPreviewImg');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgElem.src = e.target.result;
            imgElem.style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function previewGalleryImages(input) {
    const container = document.getElementById('galleryPreviewGrid');
    container.innerHTML = '';
    if (input.files) {
        Array.from(input.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.height = '60px';
                img.style.borderRadius = '.3rem';
                img.style.border = '1px solid var(--card-border)';
                container.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }
}
