const cartBox = document.querySelector('.cart_box');
const productBox = document.querySelector('.product__box');

const cart = [];

function updateCart() {
    // Очищаем содержимое корзины
    cartBox.innerHTML = '';

    // Перебираем товары в корзине и создайте соответствующие элементы HTML
    cart.forEach((product, index) => {
        const { image, name, description, price } = product;
        const cartProduct = `
            <div class="cart_product">
                <button class="remove_from_cart" data-index="${index}">Remove</button>
                <img src="${image}" alt="${name}" class="product__img">
                <div class="product__desc">
                    <h2 class="product__name">${name}</h2>
                    <p class="product__description">${description}</p>
                    <p class="product__price_label"><span class="product__price">${price}</span></p>
                </div>
            </div>`;
        cartBox.insertAdjacentHTML('beforeend', cartProduct);
    });

    // Проверяем, нужно ли скрыть раздел "Cart Items"
    if (cart.length === 0) {
        document.querySelector('.cart').style.display = 'none';
    } else {
        document.querySelector('.cart').style.display = 'block';
    }

    // Добовляем обработчики событий для кнопок удаления товара из корзины
    const removeButtons = document.querySelectorAll('.remove_from_cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const indexToRemove = button.getAttribute('data-index');
            if (indexToRemove !== null) {
                // Удаляем товар из корзины
                cart.splice(indexToRemove, 1);
                // Обновляем отображение корзины
                updateCart();
            }
        });
    });
}

async function fetchData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error('Не удалось получить данные с JSON');
        }
        const data = await response.json();
        
        data.forEach(({ image, name, description, price }) => {
            const product = `
                <div class="product">
                    <button class="add_to_cart">Add to Cart</button>
                    <div class="content">
                        <img src="${image}" alt="${name}" class="product__img">
                        <div class="product__desc">
                            <h2 class="product__name">${name}</h2>
                            <p class="product__description">${description}</p>
                            <p class="product__price_label"><span class="product__price">${price}</span></p>
                        </div>
                    </div>
                </div>`;
            productBox.insertAdjacentHTML('beforeend', product);
        });

        const addToCartButtons = document.querySelectorAll('.add_to_cart');
        addToCartButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const product = button.closest('.product');
                const productData = {
                    image: product.querySelector('.product__img').src,
                    name: product.querySelector('.product__name').textContent,
                    description: product.querySelector('.product__description').textContent,
                    price: product.querySelector('.product__price').textContent,
                };

                // Добовляем товар в корзину
                cart.push(productData);
                // Обновляем отображение корзины
                updateCart();
            });
        });

    } catch (error) {
        console.error(error);
    }
}

fetchData();
