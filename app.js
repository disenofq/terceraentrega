class Product{
    constructor(type, brand, price){
        this.id = id;
        this.type = type;
        this.brand = brand;
        this.price = price;
        this.stock = stock;
    }
}

let products = [
    {id:1, type: 'mate', style: 'flores', price: 500, stock: 50},
    {id:2, type: 'bombilla', style: 'alpaca', price: 300, stock: 50},
    {id:3, type: 'cazuela', style: 'barro', price: 400, stock: 30},
]


let cart = []

//ajax

const URL = "./json/productos.json";

$.ajax({
    method: "GET",
    dataType: "json",
    url: URL,
}).done((response) => {     
    response.forEach((product) =>{
        $("#ajax_container").append(
            `<p>${product.type} el estilo es ${product.style} y su precio es: $${product.price}</p><br>`
        )
    });
});

//Agregar al carrito

function addToCart(){
    let inputProduct = document.getElementById("input-product");
    let product = products.find(
        (e) => e.type === inputProduct.value.toLowerCase()
    );
    if(product){
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        showProducts()
    }else{
        let msj = document.createElement("div");
        msj.innerHTML = `<div class ="alert alert-danger" role ="alert">
        El producto ingresado no se encuentra disponible, por favor verifique su ingreso</div>`
        container.appendChild(msj);
    }
    }

    //Vaciar el carrito

    function emptyCart(){
        localStorage.clear()
            cart = [];
        container.innerHTML = "";
        showProducts()
    }

    // ver los productos en forma de lista
    
    function showProducts(){
        const cartStorage = JSON.parse(localStorage.getItem("cart"));
        if(cartStorage !==null){
            let container = document.getElementById("container");
            container.innerHTML = "";
            for(const product of cartStorage){
                let contenedor = document.createElement("div");
                contenedor.innerHTML = `<div>
                                        <h5>${product.type}</h5>
                                        <p>${product.style}</p>
                                        <p>${product.price}</p>}
                                        </div> `
                let button = document.createElement("button");
                button.innerHTML = "Ver en carrito";
                button.addEventListener("click", (event) => {
                    console.log("El cliente agregó un producto al carrito con el siguiente id: ");
                    console.log(event.target.id)
                });
                container.appendChild(contenedor);
                container.appendChild(button);
            };
        };
    };
    showProducts();
    //función calcular total

    function totalMountCart(){
        const totalPrice = cart.reduce((total, item) => item.price + total, 0);
        let msj = document.createElement("div");
        msj.innerHTML =`<div class ="alert alert-danger" role ="alert">
        El monto total de la compra es: ${totalPrice} </div>`
        container.appendChild(msj);
    }

    $("#input-product").click(() => {
        $("#input-product").val("");
    })

    let buttonBuy = document.getElementById("button-addon2");
    buttonBuy.addEventListener("click", addToCart);

    let totalCart = document.getElementById("button-addon3");
    totalCart.addEventListener("click", totalMountCart);

    let emptyAll = document.getElementById("button-addon4");
    emptyAll.addEventListener("click", emptyCart);




