import { createOptimizedPicture } from '../../scripts/aem.js';

// Function to fetch product data from the API with query parameters
async function fetchProducts(apiUrl, params) {
    const url = new URL(apiUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    try {
        const response = await fetch(url);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
     
export default async function decorate(block) {
   // console.log(block.children);
   const data = {};

   [...block.children].forEach(row => {
       const key = row.firstElementChild.textContent;
       const value = row.children[1].textContent;
       data[key] = value;
   });
  
   const response = await fetch(data.URL);
   const jsonData = await response.json();
 

    // Assuming data contains URL and other parameters
    const apiUrl = data.URL;
    const queryParams = {
        limit: data.Condition
    };

    // Fetch product data
    const products = await fetchProducts(apiUrl, queryParams);

    // Clear existing content in the block
    block.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'product-cards-container';
    block.appendChild(container);

    // Populate the block with product cards
    products.forEach(product => {
        const row = document.createElement('div');
        row.className = 'product-card';
        const heroImage = document.createElement('img');
        heroImage.src=product.image;
       
        const title = document.createElement('h3');
        title.textContent = product.title;
        const description = document.createElement('p');
        description.textContent = product.description;
        const price = document.createElement('p');
        price.textContent = `$${product.price}`;

        row.appendChild(heroImage);
        row.appendChild(title);
        row.appendChild(description);
        row.appendChild(price);
        container.appendChild(row);
    })
    }

