document.addEventListener("DOMContentLoaded", function () {
    fetch('../models/cars.json')
        .then(response => response.json())
        .then(data => {
            const carGallery = document.querySelector('.car-gallery');
            const carouselImage = document.querySelector('.highlighted-image');
            const highlightedDetails = document.querySelector('.highlighted-details');
            const searchBar = document.getElementById('search-bar');
            const itemsPerPageSelect = document.getElementById('items-per-page');
            const prevBtn = document.querySelector('.pagination .prev-btn');
            const nextBtn = document.querySelector('.pagination .next-btn');
            const carouselNextBtn = document.querySelector('.carousel .next-btn');
            const pageInfo = document.querySelector('.pagination .page-info');

            let currentPage = 1;
            let itemsPerPage = parseInt(itemsPerPageSelect.value);
            let filteredData = data;
            let currentImageIndex = 0;

            itemsPerPageSelect.addEventListener('change', function() {
                itemsPerPage = parseInt(itemsPerPageSelect.value);
                currentPage = 1;
                displayPage(filteredData, currentPage, itemsPerPage);
            });

            searchBar.addEventListener('input', function() {
                const searchTerm = searchBar.value.toLowerCase();
                filteredData = data.filter(car => 
                    car.name.toLowerCase().includes(searchTerm) ||
                    car.type.toLowerCase().includes(searchTerm) ||
                    car.description.toLowerCase().includes(searchTerm)
                );
                currentPage = 1;
                displayPage(filteredData, currentPage, itemsPerPage);
            });

            function displayPage(data, page, itemsPerPage) {
                carGallery.innerHTML = '';
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const paginatedData = data.slice(start, end);

                paginatedData.forEach(car => {
                    const carCard = document.createElement('div');
                    carCard.classList.add('car-card');

                    carCard.innerHTML = `
                        <img src="${car.image}" alt="Car Image">
                        <h3>${car.name}</h3>
                        <p class="price">${car.price}</p>
                        <p>${car.type}</p>
                        <p>${car.description}</p>
                    `;

                    carGallery.appendChild(carCard);

                    carCard.addEventListener('click', function () {
                        const modal = document.getElementById('image-modal');
                        const modalImg = document.getElementById('modal-img');
                        modal.style.display = 'block';
                        modalImg.src = car.image;
                    });
                });

                updatePaginationControls(data, page, itemsPerPage);
            }

            function updatePaginationControls(data, page, itemsPerPage) {
                const totalItems = data.length;
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                pageInfo.textContent = `Page ${page} of ${totalPages}`;

                prevBtn.disabled = page === 1;
                nextBtn.disabled = page === totalPages;

                prevBtn.onclick = function() {
                    if (page > 1) {
                        displayPage(data, --page, itemsPerPage);
                    }
                };

                nextBtn.onclick = function() {
                    if (page < totalPages) {
                        displayPage(data, ++page, itemsPerPage);
                    }
                };
            }

            function updateHighlightedDetails(car) {
                highlightedDetails.innerHTML = `
                    <p>${car.description}</p>
                    <h2>${car.name}</h2>
                    <p>${car.type} <span class="rating">${car.rating} <img src="../assets/icon/star.png" alt="Star Icon" /></span></p>
                `;
            }

            function updateHighlightedCar(index) {
                const car = data[index];
                carouselImage.src = car.image;
                updateHighlightedDetails(car);
            }

            carouselNextBtn.onclick = function() {
                currentImageIndex = (currentImageIndex + 1) % data.length;
                updateHighlightedCar(currentImageIndex);
            };

            displayPage(data, currentPage, itemsPerPage);
            updateHighlightedCar(currentImageIndex);

            const modal = document.getElementById('image-modal');
            const closeBtn = document.getElementsByClassName('close-btn')[0];

            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        })
        .catch(error => console.error('Error fetching car data:', error));
});
