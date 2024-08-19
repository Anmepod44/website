let products = null;
// get datas from file json
fetch("/products")
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})

function addDataToHTML(){
let listProductHTML = document.querySelector('.listProduct');



// add new datas
if(products != null) // if has data
{
    products.forEach(product => {
        console.log(product)
        let newProduct = document.createElement('a');
        newProduct.href = window.location.href+'/details?id=' + product.pk;
        newProduct.classList.add('item');
        newProduct.innerHTML = 
        `<img src="static/${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>`;
        listProductHTML.appendChild(newProduct);

    });
}
}
