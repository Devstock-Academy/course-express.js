const output = document.getElementById('output')
const button = document.getElementById('get-products-btn')

const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/products')
    const products = await response.json()
    output.innerHTML = ''
    products.forEach((product) => {
      const div = document.createElement('div')
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
      `
      output.appendChild(div)
    })
  } catch (error) {
    console.error(error)
  }
}

const form = document.getElementById('product-form')

button.addEventListener('click', getProducts)
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  const name = formData.get('name')
  const price = formData.get('price')
  const quantity = formData.get('quantity')

  try {
    const response = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, quantity }),
    })
    if (!response.ok) throw new Error('Network response was not ok')
    const product = await response.json()
    console.log('Product created:', product)
  } catch (error) {
    console.error(error)
  }
})
