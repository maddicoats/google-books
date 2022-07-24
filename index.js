document.querySelector('#search-button').addEventListener("click", event => {
    return (
        console.log(document.querySelector('#search-input').value),
        getBooks(),
        document.querySelector("header").classList.remove("height")
        )
})

document.querySelector("#search-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        document.querySelector("#search-button").click();
    }
});

async function getBooks(event) {
    const input = document.querySelector('#search-input').value;

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`);

    const data = await response.json();
    console.log(data)

    let output = '';
    data.items.forEach(book => {
        console.log(book.volumeInfo.imageLinks)
        output += `
            <div class="bookcard">
                <div>
                    <img class="bookcard--img" src=${
                        book.volumeInfo.imageLinks === undefined || null 
                            ? "./not-found.png" 
                            : `${book.volumeInfo.imageLinks.thumbnail}`
                        
                        // book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : "./not-found.png"
                    }>
                    
                    <div><a href=${book.volumeInfo.canonicalVolumeLink} target="_blank"><button class="bookcard--button">more info  <i class="fa-solid fa-arrow-up-right-from-square bookcard--button--icon"></i></button></a></div>
                </div>

                <div>
                    <h3 class="bookcard--title">${book.volumeInfo.title}</h3>

                    <h4 class="bookcard--author">${
                        book.volumeInfo.authors ? "by " + book.volumeInfo.authors.join(', ') : "<i>author unavailable</i>"
                    }</h4>

                    <p class="bookcard--description">${
                        book.volumeInfo.description ? book.volumeInfo.description : "<i>description unavailable</i>"

                        //, book.volumeInfo.description.length>430 ? book.volumeInfo.description = book.volumeInfo.description.substr(0,430)+"..." : book.volumeInfo.description
                        
                    }</p>
                </div>
            </div>
        `;
    });

    // display the results:
    document.querySelector("#output").innerHTML = output;
}


