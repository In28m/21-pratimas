const BASE_URL = "https://sophisticated-humane-dandelion.glitch.me"
const container = document.querySelector(".container")

const fetchProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`)
        const data = await response.json()
        displayProducts(data)
    } catch (error) {
        console.error(error)
    }
}

const displayProducts = (products) => {
    container.innerHTML = ''
    
    products.forEach((product, index) => {
        if (index % 4 === 0) {
            const row = document.createElement('div')
            row.classList.add('row')
            container.appendChild(row)
        }

        const row = container.lastElementChild
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p>${product.title}</p>
            <h3>€${product.price}</h3>
            <button onclick="deleteProduct(${product.id})">Ištrinti</button>
        `
        row.appendChild(productDiv)
    })
}

const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Nepavyko ištrinti produkto')
        }

        location.reload()
    } catch (error) {
        console.error(error)
    }
}

fetchProducts()





