async function fetchData() {
    try {
        const response = await fetch("data.json")
        if (!response.ok) {
            throw new Error('Не удвлось получить даные с json')
        }
        const data = await response.json()
        const productBox = document.querySelector('.product__box')
        data.forEach(({ image, name, description, price,}) => {
const product =
`<div class="product">
            <button class="btn__del">DEls</button>
            <div class="content">
                <img src="${image}" alt="${name}" class="product__img">
                <div class="product__desc">
                    <h2 class="product__name">${name}</h2>
                    <p class="product__description">${description}</p>
                    <p class="product__price_label"><span class="product__price">${price}</span></p>
                </div>
            </div>
        </div>`;
            productBox.insertAdjacentHTML('beforeend', product)   

        } )

            const btns = document.querySelectorAll('.btn__del')
            console.log(btns);
            btns.forEach(element => {
                element.addEventListener('click',() => {
                    const product = element.closest('.product')
                    product.remove()
                })
        });



    } catch (error) {
        console.error(error)
    }
}

fetchData();