document.querySelector('#search-button').addEventListener("click", event => {
    return (
        console.log(document.querySelector('#search-input').value),
        getBooks()
        )
})

async function getBooks(event) {
    const input = document.querySelector('#search-input').value;

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`);

    const data = await response.json();
    //const book = data.items[0].volumeInfo

    // book.imageLinks.smallThumbnail = document.querySelector('.book--image').src
    // book.title = document.querySelector('.book--title').innerHTML
    // book.authors = document.querySelector('.book--author').innerHTML
    console.log(data)
    let output = '';
    data.items.forEach(book => {
        console.log(book.volumeInfo.imageLinks.smallThumbnail)
        output += `
            <div class="bookcard">
            <ul>
                <img class="bookcard--img" src=${book.volumeInfo.imageLinks.smallThumbnail}>
                
                <li class="bookcard--title">${book.volumeInfo.title}</li>

                <liclass="bookcard--author">${book.volumeInfo.authors}</li>

                <div><a href=${book.volumeInfo.canonicalVolumeLink}><button class="bookcard--button">details</button></a></div>
            </ul>
            </div>
        `;
    });

    // Display the search result
    document.querySelector("#output").innerHTML = output;

}

document.querySelector("#search-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        document.querySelector("#search-button").click();
    }
});
