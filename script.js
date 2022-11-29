import products from "./sources/data.js";

let cartList = []

let categories = ["bollería", "repostería", "pastelería", "sánguches", "cafés", "repostería salada"]
let categoryHTML = ""

categories.forEach (category => {
  let productsPerCategory = products.filter ((product) => product.category === category)

  categoryHTML += `
  <div class="categoryCard">
    <button class="categoryButton">
      <h2>${category.toUpperCase()}</h2>
    </button>
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
    cartList.push(products.find((product) => product.id == event.target.id))
    
    let cartJSON = JSON.stringify(cartList)
    localStorage.setItem("cartItems", cartJSON)
  }
})
