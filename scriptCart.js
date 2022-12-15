let cartContainer = document.getElementById("productsList")
let totalContainer = document.getElementById("totalPrice")

let cartHTML = ""
let parsedCartItems = JSON.parse(localStorage?.getItem("cartItems"))
let cartArray = parsedCartItems ? parsedCartItems : []

function displayCart (cartProducts) {
  if (cartProducts.length >= 1){
    cartProducts.forEach(product => {
      cartHTML += `
      <div class="productName">${product.productName}</div>
      <div>${product.cost}</div>
      <div>${product.quantity}</div>
      <div class="subtotal">${product.cost*product.quantity}</div>
      <div><img id=${product.id} class="binIcon" src="./sources/images/bin.png" alt="bin"/></div>
      `
    }); 
  } else {
    cartHTML += `
    <div class="emptyCart">Carrito vacío</div>
    `
  }
  cartContainer.innerHTML = cartHTML
}

displayCart(cartArray)

function displayTotals () {

  let subtotals = document.getElementsByClassName("subtotal")
  let subTotal = 0
  for (let i = 0; i < subtotals.length; i++) {
    subTotal += Number(subtotals[i].innerText)
  }

  let igv = (18*subTotal)/100
  let total = (subTotal+igv).toFixed(2)

  totalContainer.innerHTML = `
  <div class="one">Total de la compra</div>
  <div class="two">Subtotal</div>
  <div class="three">${subTotal}</div>
  <div class="four">IGV</div>
  <div class="five">${igv}</div>
  <div class="six">Total</div>
  <div class="seven">${total}</div>
  <div class="totalBottons">
    <button class="buttonCancel">Cancelar compra</button>
    <button class="buttonPrintTicket">Emitir boleta</button>
  </div>
  `
}

displayTotals()

document.addEventListener("click", (event) => {
  if (event.target && event.target.className === "binIcon") {
    cartArray = cartArray.filter(product => product.id != event.target.id)
    let cartJSON = JSON.stringify(cartArray)
    localStorage.setItem("cartItems", cartJSON)
    cartHTML = ""
    displayCart(cartArray)
    displayTotals()
  }
  if (event.target && event.target.className === "buttonPrintTicket") {
    Swal.fire({
      title: 'Imprimiendo boleta',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    })
  }
  if (event.target && event.target.className === "buttonCancel") {
    localStorage.clear()
    cartHTML = ""
    displayCart([])
    displayTotals()
    Swal.fire({
      title: 'Compra cancelada',
      icon: 'error',
      timer: 2000,
      showConfirmButton: false,
    })
  }
})