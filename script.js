document.addEventListener('DOMContentLoaded', loadIngredients);

function addIngredient() {
    const nameInput = document.getElementById('ingredientInput');
    const quantityInput = document.getElementById('quantityInput');
    const ingredientName = nameInput.value.trim();
    const ingredientQuantity = quantityInput.value.trim();
    
    if (ingredientName === "") {
        alert("재료 이름을 입력해주세요.");
        return;
    }

    const item = {
        name: ingredientName,
        quantity: ingredientQuantity || "수량 없음"
    };

    saveToLocalStorage(item);
    renderIngredient(item);

    nameInput.value = "";
    quantityInput.value = "";
    nameInput.focus();
}

function renderIngredient(item) {
    const list = document.getElementById('ingredientList');
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = `${item.name} ${item.quantity}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "삭제";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        list.removeChild(li);
        removeFromLocalStorage(item);
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

}

function saveToLocalStorage(item) {
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    ingredients.push(item);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}

function loadIngredients() {
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    ingredients.forEach(item => renderIngredient(item));
}

function removeFromLocalStorage(itemToRemove) {
    let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
    ingredients = ingredients.filter(item => !(item.name === itemToRemove.name && item.quantity === itemToRemove.quantity));
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}

document.getElementById('ingredientInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addIngredient();
    }
});

document.getElementById('quantityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addIngredient();
    }
});