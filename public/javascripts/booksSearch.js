function bookSearch() {
    const search = document.getElementById("search").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const title = item.volumeInfo.title || "No title available";
                    const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No author available";
                    resultDiv.innerHTML += `<div><strong>${title}</strong><br>Author(s): ${authors}<br><br></div>`;
                });
            } else {
                resultDiv.innerHTML = "No results found.";
            }
        })
        .catch(error => {
            resultDiv.innerHTML = "Error fetching data.";
            console.error(error);
        });
}

document.getElementById("btn").addEventListener("click", bookSearch);