// pizza class: represents a pizza
class Pizza {
    constructor(title, price, heat, toppings, image, id) {
        this.title = title;
        this.price = price;
        this.heat = heat;
        this.toppings = toppings;
        this.image = image;
    }
};

//UI class: handle UI Tasks
class UI {
    static displayPizzas() {

        const pizzas = Store.getPizzas();

        pizzas.forEach((pizza) => UI.addPizzaToList(pizza));
    }

    static addPizzaToList(pizza){
        const list = document.querySelector('#pizza-menu');

        const row = document.createElement('div')

        row.innerHTML = `
        <div id="pizza-container" class="pizza-container">
            <img id="img" class="image" src="${pizza.image}" alt="">
            <h2>${pizza.title}</h2>
            <div> Heat level from 0 to 3: ${pizza.heat}</div>
            <div>${pizza.price} $</div>
            <div>${pizza.toppings}</div>
            <button class="delete" id="deleteBtn">Delete</button>
        </div>
        `
        list.appendChild(row)
    }

    static deletePizza(el) {

        if(confirm('Are you sure you want to delete this pizza?')) {

            if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            }

        };
    };

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#heat').value = '';
        document.querySelector('#toppings').value = '';
        document.querySelector('#image').value = '';
    }
}
//Store Class: Handles Storage
class Store {
   static getPizzas() {
       let pizzas;
       if(sessionStorage.getItem('pizzas') === null) {
       pizzas = [];           
       } else {
           pizzas = JSON.parse(sessionStorage.getItem('pizzas'))
       }
       return pizzas;

    };

    static addPizza(pizza) {
        const pizzas = Store.getPizzas();

        pizzas.push(pizza);
        sessionStorage.setItem('pizzas', JSON.stringify(pizzas));
    };

    static removePizza(id){
        const pizzas = Store.getPizzas();

        pizzas.forEach((pizza, index)=> {
            if(pizza.id === id) {
                pizzas.splice(index, 1);
            };
        });
        sessionStorage.setItem('pizzas', JSON.stringify(pizzas));
    };
};

// Event: Display Pizzas
document.addEventListener('DOMContentLoaded', UI.displayPizzas);

// Event: add a pizza

document.querySelector('#input-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let error = document.getElementById('error');

    // get form values
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const heat = document.querySelector('#heat').value
    const toppings = document.querySelector('#toppings').value
    const image = document.querySelector('#image').value



    // Validate
    if(title.length >= 30 || toppings.length <= 2) {
        let errorDiv = document.createElement('div');
        errorDiv.textContent = 'Title maximum length is 30 and toppings minimum length is 2'
        error.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 2000)

    } else {
        error.remove();
     //Instatiate pizza
    const pizza = new Pizza(title, price, heat, toppings, image);

    // Add pizza to  UI
    UI.addPizzaToList(pizza);

    // add pizza to store
    Store.addPizza(pizza);
   
    // clear fields 
    UI.clearFields();
    };


});

// Event: remove a pizza
document.querySelector('#pizza-menu').addEventListener('click', (e) => {
    //remove pizza from UI 
    UI.deletePizza(e.target)

    //Remove pizza from store
    Store.removePizza(e.target.parentElement.previousElementSlibling.textContent);
});