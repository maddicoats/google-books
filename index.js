document.querySelector('.search').addEventListener("submit", (event) => {
    event.preventDefault();
    return (
        getBooks(),
        document.querySelector("header").classList.remove("height")
        )
})

const fetchBooks = async (input) => {
   const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`);

   return await response.json()
};

async function getBooks() {
    const input = document.querySelector('#search-input').value;

    const data = await fetchBooks(input);

    let output = '';
    try {
        data.items.forEach(book => {
        output += `
            <div class="bookcard">
                <div>
                    <img class="bookcard--img" src=${
                        book.volumeInfo.imageLinks === undefined || null 
                            ? "./placeholder.png" 
                            : `${book.volumeInfo.imageLinks.thumbnail}`
                    }>
                    
                    <div>
                        <a href=${book.volumeInfo.canonicalVolumeLink} target="_blank">
                        <button class="bookcard--button">more info  <i class="fa-solid fa-arrow-up-right-from-square bookcard--button--icon"></i></button></a></div>
                    </div>

                <div>
                    <h3 class="bookcard--title">${
                        book.volumeInfo.title 
                            ? book.volumeInfo.title 
                            : "<i>title unavailable</i>"
                        }</h3>

                    <h4 class="bookcard--author">${
                        book.volumeInfo.authors 
                            ? "by " + book.volumeInfo.authors.join(', ') 
                            : "<i>author unavailable</i>"
                    }</h4>

                    <p class="bookcard--description">${
                        book.volumeInfo.description 
                            ? book.volumeInfo.description 
                            : "<i>description unavailable</i>"
                    }</p>
                </div>
            </div>
        `;
    });
    } catch {
        output += `
            <div class="bookcard">
                <p class="bookcard--error">
                    No results available for "${input}" 
                    <i class="fa-solid fa-heart-crack"></i>
                </p>
            </div>
        `
    }
    
    document.querySelector("#output").innerHTML = output;
}


