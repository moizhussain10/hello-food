let currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  alert("No user is logged in. Redirecting to login page...");
  window.location.href = "login.admin.html";
}

let categories = JSON.parse(localStorage.getItem(currentUser + "categories")) || [];
let items = JSON.parse(localStorage.getItem(currentUser + "items")) || [];
let restaurantName = localStorage.getItem(currentUser + "restaurant") || "";


function saveCategories() {
  localStorage.setItem(currentUser + "categories", JSON.stringify(categories));
}

function saveItems() {
  localStorage.setItem(currentUser + "items", JSON.stringify(items));
}

function saveRestaurantName() {
  let name = document.getElementById("restaurantName").value.trim();
  let currentUser = localStorage.getItem("currentUser");

  if (name === "") {
    alert("Restaurant name cannot be empty.");
    return;
  }

  // Save name
  localStorage.setItem(currentUser + "_restaurant", name);
  alert("Restaurant name saved!");

  // ✅ Add to restaurant-list
  let list = localStorage.getItem("restaurant-list");
  if (list) {
    list = JSON.parse(list);
  } else {
    list = [];
  }

  let already = false;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === currentUser) {
      already = true;
      break;
    }
  }

  if (!already) {
    list.push(currentUser);
    localStorage.setItem("restaurant-list", JSON.stringify(list));
  }

  // Optional: update UI
  document.getElementById("restaurantTitle").textContent = "Restaurant: " + name;
}



// ✅ STEP 5: Add Category
function addCategory() {
  let name = document.getElementById("categoryName").value.trim();

  if (name === "") {
    alert("Category name likho!");
    return;
  }

  categories.push(name);
  saveCategories();
  showCategories();
  showCategoryOptions();
  document.getElementById("categoryName").value = "";
}

// ✅ STEP 6: Show All Categories
function showCategories() {
  let list = document.getElementById("categoryList");
  list.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    list.innerHTML += `<li> ${categories[i]}
       <button onclick='deleteCategory(${i})'>Delete</button></li>`;
  }
}

// ✅ STEP 7: Delete Category
function deleteCategory(index) {
  let catName = categories[index];
  categories.splice(index, 1);
  saveCategories();

  // Remove related items
  let newItems = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].category !== catName) {
      newItems.push(items[i]);
    }
  }

  items = newItems;
  saveItems();

  showCategories();
  showCategoryOptions();
  showItems();
}

// ✅ STEP 8: Update Dropdown
function showCategoryOptions() {
  let select = document.getElementById("itemCategoryDropdown");
  select.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    select.innerHTML += "<option value='" + categories[i] + "'>" + categories[i] + "</option>";
  }
}

// ✅ STEP 9: Add Menu Item
function addItem() {
  let cat = document.getElementById("itemCategoryDropdown").value;
  let name = document.getElementById("itemName").value.trim();
  let desc = document.getElementById("itemDesc").value.trim();
  let price = document.getElementById("itemPrice").value.trim();
  let img = document.getElementById("itemImg").value.trim();

  if (name === "" || desc === "" || price === "" || img === "") {
    alert("Please fill all item fields.");
    return;
  }

  let item = {
    category: cat,
    name: name,
    description: desc,
    price: price,
    image: img
  };

  items.push(item);
  saveItems();
  showItems();

  document.getElementById("itemName").value = "";
  document.getElementById("itemDesc").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemImg").value = "";
}

// ✅ STEP 10: Show Items
function showItems() {
  let list = document.getElementById("itemList");
  list.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    list.innerHTML +=  `<div class="card" style="width: 18rem;">
  <img src="${item.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">${item.description}</p>
    <p class="card-text">${item.price}</p>
    <button onclick='deleteItem(${i})'>Delete</button>
  </div>
</div>;`
  }
}

// ✅ STEP 11: Delete Item
function deleteItem(index) {
  items.splice(index, 1);
  saveItems();
  showItems();
}

// ✅ STEP 12: Show Everything on Page Load

  showCategories();
  showCategoryOptions();
  showItems();

  // Show saved restaurant name if available
  if (restaurantName) {
    document.getElementById("restaurantTitle").textContent = "Restaurant: " + restaurantName;
    document.getElementById("restaurantName").value = restaurantName;
  }
;


