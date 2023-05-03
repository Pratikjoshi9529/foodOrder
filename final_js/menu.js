let items = [{
    id: '1',
    category: 'Pizza',
    name: 'Pizza_1',
    price: '50'

}, {
    id: '2',
    category: 'Pizza',
    name: 'Pizza_2',
    price: '50'

}, {
    id: '3',
    category: 'Pizza',
    name: 'Pizza_3',
    price: '50'

}, {
    id: '4',
    category: 'Pizza',
    name: 'Pizza_4',
    price: '50'

}, {
    id: '5',
    category: 'Roti',
    name: 'Roti_1',
    price: '50'

}];
const urlParams = new URLSearchParams(window.location.search);
let table = urlParams.get('table');
let cart = [];
for (x in items) {
    if (items[x].category == 'Pizza') {
        document.getElementById('itemList').innerHTML += "<button class='item bg-transperant p-2 m-2 w-100 ms-0 text-start' onclick='addToCart(" + x + ")'>" + items[x].name + "<span class='float-end'>" + items[x].price + " </span></button> </br>";
    }
}
function addToCart(id, quant = 1) {
    document.getElementById('cart').style.display = "block";
    let total = 0;
    cart.push({ name: items[id].name, price: items[id].price, quant });
    document.getElementById('cart_items').innerHTML = "";
    for (x in cart) {
        document.getElementById('cart_items').innerHTML += "<button class='item bg-transperant p-2 m-2 w-100 ms-0 text-start' onclick='removeFromCart(" + x + ")'>" + cart[x].name + "<span class='float-end'>" + cart[x].price + " </span></button> </br > ";
        total += parseInt(cart[x].price * quant);
    }
    document.getElementById('total').innerText = total;
}
// cartDisplayOrNot
if (cart.length < 1)
    document.getElementById('cart').style.display = "none";
//removeFromcart
function removeFromCart(index, quant = 1) {
    total = 0;
    alert(cart[index].name + "is Removed from Cart")
    if (index > -1) {
        cart.splice(index, 1);
    }
    document.getElementById('cart_items').innerHTML = "";
    for (x in cart) {
        document.getElementById('cart_items').innerHTML += "<button class='item bg-transperant p-2 m-2 w-100 ms-0 text-start' onclick='removeFromCart(" + x + ")'>" + cart[x].name + "<span class='float-end'>" + cart[x].price + " </span></button> </br > ";
        total += parseInt(cart[x].price * quant);
    }
    document.getElementById('total').innerText = total;
    if (cart.length < 1)
        document.getElementById('cart').style.display = "none";
}

//Empty Cart
document.getElementById('empty_cart').addEventListener('click', function () {
    cart = [];
    document.getElementById('total').innerText = 0;
    document.getElementById('cart_items').innerHTML = "";
    document.getElementById('cart').style.display = "none";
})

//cart CheckOut
document.getElementById('Checkout').addEventListener('click', function () {
    let total = parseInt(document.getElementById('total').innerText);
    cart = arrayToString(cart);
    fetch("http://127.0.0.1:8000/api/getdata", {
        method: "POST",
        body: JSON.stringify({
            table: table,
            total: total,
            cart: cart
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json()).then(data => showResponse);
});
function arrayToString(array) {
    let string = "";
    for (x in array) {
        // console.log(array[x]);
        string += "{ name:" + array[x].name + ", price: " + array[x].price + ", quantity:" + array[x].quant + "},";
    }
    return string;
}

// alert(table);