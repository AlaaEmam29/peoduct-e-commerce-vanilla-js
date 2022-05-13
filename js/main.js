"use strict";
const productContainer = document.querySelector(".product-container")
const url = 'https://course-api.com/javascript-store-products';

const fetchData = async ()=>
{
    productContainer.innerHTML=`<div class="loading m-auto"></div>`;
try
{
const response = await fetch(url);
const data = await response.json();
return data;
}
catch (e) {
productContainer.innerHTML= `<p class="error fs-3">there was an error</p>;`
}


}

const displayAllData = async (products)=>
{
const productList = products.map((product)=>{
    const { id } = product;
    const {company,name,price} = product.fields;
    const {url} = product.fields.image[0];
    const formatPrice = price/100;

    return `
    <a href="product.html?id=${id}" class="text-decoration-none col-xl-4 col-lg-6 mb-4">
    <div class="single-product">
      <div class="p-2 product-url">
        <img
          src="${url}" 
          class="single-product-img"
          alt="${company}"
        />
      </div>
      <h5 class="text-muted pt-3">${name}</h5>
      <span><strong>${formatPrice}$</strong></span>
    </div>
  </a>
    
    `
}).join(' ')
productContainer.innerHTML = productList

}
const ready=async ()=> {
   const data=  await fetchData();
    await displayAllData(data)
}
ready()
