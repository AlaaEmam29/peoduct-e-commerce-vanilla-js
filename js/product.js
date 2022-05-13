"use strict";
const productContainer = document.querySelector(".single-product-container");
const url = "https://course-api.com/javascript-store-single-product";

const fetchSingleProduct = async () => {
try
{
    productContainer.innerHTML = `<h2 class="text-center py-3">Loading...</h2>   `;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const response = await fetch(`${url}?id=${id}`);
    const {fields} = await response.json();
    
    return fields;
}
catch (err)
{
    productContainer.innerHTML= `<h3 class="error text-center py-5 fs-1">there was an error ,  please try again!!</h3>;`

}
 
};
const displayProduct = async (product) => {
    const {name,company,price,description,colors} = product;
    const {url} = product.image[0];
    document.title = name.toUpperCase();
    const colorList = colors.map((color)=>{
        return `<span class="color" style="background-color: ${color}"></span>`
    }).join(' ');
    productContainer.innerHTML = `
    <div class="col-lg-6">
    <div class="product-image bg-danger">
        <img src="${url}" class="w-100 img" alt="${company}">
    </div>
</div>
<div class="col-lg-6">
    <div class="product-info">
        <h3 class="py-1">${name}
        </h3>
        <h5 class="text-muted py-1">${company}</h5>
        <span>${price / 100}$</span>
        <div class="product-colors py-1">
        ${colorList}
        </div>
        <p>
${description}
        </p>
        <button class="btn btn-primary">Add To Cart</button>
    </div>
</div>

    
    
    
    `

}
const startApi = async () =>
{
    const data = await fetchSingleProduct();
    await displayProduct(data);
}
startApi()