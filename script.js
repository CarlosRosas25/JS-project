const products = [
  {
    productName: "medialuna",
    cost: 8,
    category: "bollería",
    stock: 24
  },
  {
    productName: "croissant",
    cost: 10,
    category: "bollería",
    stock: 20
  },
  {
    productName: "budín de pan y café",
    cost: 9,
    category: "repostería",
    stock: 12
  },
  {
    productName: "milhojas",
    cost: 12,
    category: "pastelería",
    stock: 6
  },
  {
    productName: "arroz con leche",
    cost: 5,
    category: "repostería",
    stock: 14
  },
  {
    productName: "pan con asado",
    cost: 18,
    category: "sánguches",
    stock: 32
  },
  {
    productName: "café americano",
    cost: 6,
    category: "cafés",
    stock: 100 
  },
  {
    productName: "pain au chocolat",
    cost: 12,
    category: "bollería",
    stock: 10
  },
  {
    productName: "cappuccino",
    cost: 9,
    category: "cafés",
    stock: 100
  },
  {
    productName: "pan con chicharrón",
    cost: 22,
    category: "sánguches",
    stock: 25
  },
  {
    productName: "butifarra",
    cost: 15,
    category: "sánguches",
    stock: 41
  },
  {
    productName: "espresso",
    cost: 5,
    category: "cafés",
    stock: 100
  },
  {
    productName: "turrón",
    cost: 7,
    category: "repostería",
    stock: 18
  },
  {
    productName: "merengado de chirimoya",
    cost: 12,
    category: "pastelería",
    stock: 13
  },
  {
    productName: "chemex",
    cost: 14,
    category: "cafés",
    stock: 50
  },
  {
    productName: "cold brew",
    cost: 8,
    category: "cafés",
    stock: 34
  },
  {
    productName: "tiramisú",
    cost: 18,
    category: "pastelería",
    stock: 12
  },
  {
    productName: "empanada de lomo saltado",
    cost: 8,
    category: "repostería salada",
    stock: 24
  },
  {
    productName: "palmier",
    cost: 5,
    category: "bollería",
    stock: 18
  },
  {
    productName: "empanada de ají de pollo",
    cost: 8,
    category: "repostería salada",
    stock: 24
  }
]

/* Este simulador permite a la persona encargada de atención al cliente poder
ingresar los productos que el cliente desea comprar e indicarle el costo total 
a pagar. */
//Digitar la categoría del producto
//Filtrar y mostrar los productos de dicha categoria. Digitar el nombre del producto.
//Digitar la cantidad que desea comprar el cliente. Almacenar el costo.
//Si desea agregar otro producto, se repiten los pasos anteriores.
//Caso contrario, se muestra el costo total incluido IGV(18%).

let carrito = []

function agregarProductos () {
  let categoriaProducto = prompt("Indique la categoría del producto: bollería, repostería, repostería salada, pastelería, cafés, sánguches")
  let categoriaElegida = products.filter((product) => product.category === categoriaProducto)

  let listaProductos = []
  categoriaElegida.forEach((product) => {listaProductos.push(product.productName)});
  
  let producto = prompt(`Digite el nombre del producto: ${listaProductos.join(", ")}`)
  let productoElegido = categoriaElegida.find((product) => product.productName === producto)

  let cantidad = parseInt(prompt(`Hay ${productoElegido.stock} unidades de ${producto}. ¿Cuántas unidades desea adquirir el cliente?`))

  return {producto: productoElegido.productName, costoUnitario: productoElegido.cost, cantidad: cantidad, costoTotal: productoElegido.cost * cantidad}
}

carrito.push(agregarProductos())

let consulta = prompt("¿Desea agregar más productos? (Sí / No)")

while (consulta === "Sí") {
  carrito.push(agregarProductos())
  consulta = prompt("¿Desea agregar más productos? (Sí / No)")
}

const total = carrito.reduce((acc, producto) => acc + producto.costoTotal, 0)
const igv = (18 * total) / 100
alert(`El costo total es ${(total + igv)}`)
