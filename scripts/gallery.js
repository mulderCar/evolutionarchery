document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {
        let folder = item.getAttribute("data-folder");
        let imgElement = item.querySelector("img");

        let images = [];
        let currentIndex = 0;

        // Load images dynamically
        fetch(`images/gallery/${folder}/images.json`)
            .then(response => response.json())
            .then(data => {
                images = data;
                if (images.length > 0) {
                    imgElement.src = `images/gallery/${folder}/${images[0]}`;
                }

                // Cycle through images every 5 seconds
                setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    imgElement.src = `images/gallery/${folder}/${images[currentIndex]}`;
                }, 5000);
            })
            .catch(error => console.error(`Error loading images for ${folder}:`, error));
    });
});
