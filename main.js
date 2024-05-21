const url = "https://picsum.photos/v2/list";
const cacheName = "imageSave";
// const img = document.querySelector("img")
// console.log(img);

function fetchAndCacheImage() {

    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error ('Something went wrong')
        }
        return response.json()
    })
    .then((data) => {
        console.log(data);
        document.getElementById('saveToCache').addEventListener("click", (item) => {

        caches.open(cacheName)
        .then((cache) => {
            data.forEach((item) => {
                cache.add(item.download_url)
            })
            alert("You have saved the images")
        })
        .catch((err) => {
            console.log("Error saving image", err);
          });

        })
        
    })
    .catch((err) => {
        console.log("Error fetch image", err);
    })
}

function getImage() {
    caches.open(cacheName)
    .then((cache) => {
        return cache.keys()
    })
    .then((keys) => {
        keys.forEach((request) => {
                // console.log(request.url); 
                let img = document.createElement('img')
                img.src = request.url
                img.alt = "An image"
                img.style.width = '30%'
                document.querySelector('.image-group').appendChild(img)
            });
        
    })
    .catch((err) => {
        console.log(err);
    })

}



function init() {
    fetchAndCacheImage()
    getImage()
}

window.addEventListener("DOMContentLoaded", init)