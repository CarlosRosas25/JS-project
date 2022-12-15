const requestData = async() => {
  const resp = await fetch("./sources/data.json")
  const data = await resp.json()
  startProgram(data)
}

requestData()


let cartList = []
let categories = ["bollería", "repostería", "pastelería", "sánguches", "cafés", "repostería salada"]
let categoryHTML = ""

function startProgram (products) {
  categories.forEach (category => {
  let productsPerCategory = products.filter ((product) => product.category === category)

  categoryHTML += `
  <div class="categoryCard">
    <div class="categoryTitle">
      ${category}
    </div>
    <ul>
      ${createProductsList()}
    </ul>
  </div>
  `

  function createProductsList () {
      let productsList = ""
      productsPerCategory.forEach ((el) => {
        productsList += `
        <li>
          <span>${el.productName}</span>
          <button id=${el.id} class="buttonAddToCart">Add to cart</button>
        </li>
        `
      })
      return productsList
    }
  });

  document.getElementById("container").innerHTML = categoryHTML

  document.addEventListener("click", (event) => {
    if (event.target && event.target.className === "buttonAddToCart") {
      addingProduct(event)

      Toastify({
        text: "Producto agregado",
        duration: 1000,
        gravity: "bottom",
        position: "right",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    }
  });

  function addingProduct(event) {
    let addedProduct = products.find(product => product.id == event.target.id)
    let findingProduct = cartList.some(product => product.id == addedProduct.id)

    if (findingProduct) {
      addedProduct.quantity += 1
    } else {
      cartList.push(addedProduct)
    }
      
    let cartJSON = JSON.stringify(cartList)
    localStorage.setItem("cartItems", cartJSON)
  }
}