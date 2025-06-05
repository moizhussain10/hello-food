let cart = [];

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

// ✅ Search a restaurant by name
function searchRestaurant() {
  let input = document.getElementById("searchBox");
  let nameToFind = input.value.trim().toLowerCase();
  let found = false;

  let restaurantList = localStorage.getItem("restaurant-list");
  if (restaurantList) {
    restaurantList = JSON.parse(restaurantList);
  } else {
    restaurantList = [];
  }

  for (let i = 0; i < restaurantList.length; i++) {
    let email = restaurantList[i];
    let storedName = localStorage.getItem(email + "_restaurant"); // ✅ FIXED

    if (storedName && storedName.toLowerCase() === nameToFind) {
      let categories = JSON.parse(localStorage.getItem(email + "categories")) || [];
      let items = JSON.parse(localStorage.getItem(email + "items")) || [];
      
      showRestaurant(email, storedName, categories, items);
      found = true;
      break;
    }

  
  }




  if (!found) {
    alert("Restaurant not found");
    document.getElementById("restaurantResultName").textContent = "";
    document.getElementById("categoryList").innerHTML = "";
    document.getElementById("itemList").innerHTML = "";
  }else{
    document.getElementById("restaurantResultName").textContent = "";
  }
}

// ✅ Show restaurant's categories and items
function showRestaurant(email, restaurantName, categories, items) {
  document.getElementById("restaurantResultName").textContent = "Menu from: " + restaurantName;

  let catList = document.getElementById("categoryList");
  catList.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    catList.innerHTML += "<li>" + categories[i] + "</li>";
  }

  let itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    itemList.innerHTML += `
      <div class="card" style="width: 18rem; margin: 10px;">
        <img src="${item.image}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text">Rs. ${item.price}</p>
          <button onclick="addToCartManual(${i})">Add to Cart</button>
        </div>
      </div>
    `;
  }

  // ✅ Save for cart usage later
  localStorage.setItem("currentRestaurantItems", JSON.stringify(items));
}

// ✅ Add to Cart
function addToCartManual(index) {
  let itemList = localStorage.getItem("currentRestaurantItems");
  if (itemList) {
    itemList = JSON.parse(itemList);
  } else {
    alert("No restaurant items found.");
    return;
  }

  let item = itemList[index];
  if (!item) {
    alert("Item not found at index " + index);
    return;
  }

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(item.name + " added to cart!");
  showCart();
}

// ✅ Show Cart
function showCart() {
  let cartList = document.getElementById("cartList");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<li style='color: gray;'>Cart is empty.</li>";
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    cartList.innerHTML += `
      <li>
        <b>${item.name}</b> - Rs. ${item.price}<br>
        <img src="${item.image}" width="100">
      </li>
    `;
  }
}

// ✅ Clear Cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  showCart();
}
