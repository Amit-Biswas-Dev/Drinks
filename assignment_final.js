const loadAllProduct = () =>{
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    displayProduct(data.drinks);
});
}






displayProduct = (products) =>{
    const productContainer = document.getElementById("product-container");

    products.forEach((product) => {
        console.log(product);
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML=`
    <img class ="card-img" src= ${product.strDrinkThumb} alt=""/>
    <h5> Name : ${product.strDrink}</h5>
    <p>Category : ${product.strCategory}</p>
    <h3>Instruction : ${product.strInstructions.slice(0,30)}</h3>
    <button onclick="singleProduct('${product.idDrink}')" >Details</button>
    <button onclick="handleAddToCart('${product.strDrink}','${product.strDrinkThumb}')">Add to cart</button>
    `;
    

        

    productContainer.appendChild(div);


    });
}





const handleAddToCart =(name,image) =>{

  const cartCount = document.getElementById("count").innerText;

  let convertedCount = parseInt(cartCount);

  convertedCount += 1;
  if(convertedCount >= 8) alert();
  document.getElementById("count").innerText = convertedCount;

  const container = document.getElementById("main-container");
  const div = document.createElement("div");
  div.classList.add("cart-info");
  div.innerHTML=`
  <p>${convertedCount}</p>
  <p>${name}</p>
  <img src="${image}">
  `;
  container.appendChild(div);
 
};







const singleProduct = (id) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const drink = json.drinks[0];
      const container = document.getElementById("details-container");
      const modal = document.getElementById("modal"); 

      container.innerHTML = ""; 

      const div = document.createElement("div");
      div.classList.add("cards");

      div.innerHTML = `
        <h4>Name: ${drink.strDrink}</h4>
        <img class="card-img" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
        <p>Category: ${drink.strCategory}</p>
        <h4>Alcoholic : ${drink.strAlcoholic}</h4>
        <h3>Instruction: ${drink.strInstructions.slice(0, 100)}...</h3>
        <button onclick = "closeModal()">Close</button>
      `;

      container.appendChild(div);
      modal.style.display = "block"; 
    })
    .catch((error) => {
      console.error("Error fetching drink details:", error);
    });
};





const searchProducts = () =>{
  const search = document.getElementById("search-input").value.trim();

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
  .then(response => response.json())
  .then(data =>{
    if(data.drinks){
      displayProduct(data.drinks);
      
    }
    else{
      document.getElementById("product-container").innerHTML = "<h2>Your searched drink is not found.</h2>";
    }
  });
};




function closeModal(){
  document.getElementById("modal").style.display = "none";
}

loadAllProduct();