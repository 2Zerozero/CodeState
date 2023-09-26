
export const getAllBooks = async () => {

    const response = await fetch('http://localhost:3080/api/books');
    return await response.json();
}

export const createBook = async (data) => {
    const response = await fetch('http://localhost:3080/api/book', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({book: data})
      })
    return await response.json();
}