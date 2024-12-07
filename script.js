document.addEventListener('DOMContentLoaded', () => {
    const wishList = document.getElementById('wish-list');
    const addButton = document.getElementById('add-button');
    const itemInput = document.getElementById('item-input');
    const priceInput = document.getElementById('price-input');
    const totalPriceElement = document.getElementById('total-price');

    // Load saved wishes from localStorage
    loadWishes();

    // Add new item to the wish list
    addButton.addEventListener('click', () => {
        const item = itemInput.value.trim();
        const price = priceInput.value.trim();

        if (item && price) {
            addWish(item, price);
            itemInput.value = '';
            priceInput.value = '';
            saveWishes();
            updateTotal();
        }
    });

    // Add wish item to the list
    function addWish(item, price) {
        const li = document.createElement('li');
        li.textContent = item;

        const priceSpan = document.createElement('span');
        priceSpan.textContent = `R${parseFloat(price).toFixed(2)}`;
        priceSpan.classList.add('price');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            li.remove();
            saveWishes();
            updateTotal();
        });

        li.appendChild(priceSpan);
        li.appendChild(removeButton);
        wishList.appendChild(li);
    }

    // Save the wish list to localStorage
    function saveWishes() {
        const items = [];
        wishList.querySelectorAll('li').forEach(li => {
            const itemName = li.childNodes[0].textContent;
            const itemPrice = li.querySelector('.price').textContent.replace('R', '');
            items.push({ item: itemName, price: itemPrice });
        });
        localStorage.setItem('wishList', JSON.stringify(items));
    }

    // Load the wish list from localStorage
    function loadWishes() {
        const savedWishes = JSON.parse(localStorage.getItem('wishList')) || [];
        savedWishes.forEach(wish => addWish(wish.item, wish.price));
        updateTotal();
    }

    // Update the total price
    function updateTotal() {
        let total = 0;
        wishList.querySelectorAll('li .price').forEach(priceSpan => {
            total += parseFloat(priceSpan.textContent.replace('R', ''));
        });
        totalPriceElement.textContent = total.toFixed(2);
    }
});
