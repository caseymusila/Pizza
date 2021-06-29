const display = new Display();

const store = new Store();

//add a pizza order on submit
document.getElementById('pizzaForm').addEventListener('submit', function(event){

    //prevent submission without inputs
    event.preventDefault();

    const size = document.querySelector('#pizzaSize');
    const crust = document.querySelector('#pizzaCrust');
    const toppings = document.querySelector('#pizzaToppings');
    const numPizzas = document.querySelector('#numPizzas');
    const delivery = document.querySelector('#delivery');

    //create an object for the constructor function
    const pizza = new Pizza(this.size.value, this.crust.value, this.toppings.value,this.numPizzas.value, this.delivery.value );

    //validate input fields
    display.validateField(pizza,store);


})


//display constructor function
function Display(){
    this.size = document.querySelector('#pizzaSize');
    this.crust = document.querySelector('#pizzaCrust');
    this.toppings = document.querySelector('#pizzaToppings');
    this.numPizzas = document.querySelector('#numPizzas');
    this.delivery = document.querySelector('#delivery');
    this.pizzas =document.querySelector("#pizzas-list")
}

//pizza constructor function
function Pizza(size,crust,toppings,numPizzas,delivery){
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.numPizzas = numPizzas;
    this.delivery = delivery;
    
}
//Local storage constructor
function Store(){

}

//checking validation for fields
Display.prototype.validateField = function(pizza,store){
    //check if inputs are empty

    if(this.delivery.value == 'yes delivery'){
        var location = prompt("Enter location of delivery");
        alert("Your order will be deliered at "+ location + " delivery charge will be $20 ");

    }

    if(this.size.value === '' ||this.crust.value === ''|| this.toppings.value  === ''|| this.numPizzas.value  === ''|| this.delivery.value === ''){
        alert("fill all fields");

    }else{
        // alert(" all fields have been filled");
        this.addPizza(pizza);
        store.addPizzas(pizza);
        this.clearFields();
    }
}


Display.prototype.addPizza = function(pizza){

    const div = document.createElement('div');
    
    let sizePrice =0;
   if(pizza.size =='large'){
     sizePrice = 10;
   }else if(pizza.size == 'medium'){
        sizePrice = 7;

   }else if(pizza.size == 'small'){
        sizePrice = 5;
   }else{
       sizePrice= 0;
   }
 
   let crustPrice=0;
   if(pizza.crust == 'crispy' ){
        crustPrice = 1;
   }else if(pizza.crust == 'stuffed'){
        crustPrice = 2;
   }else if(pizza.crust == 'glutten Free'){
        crustPrice = 2;
   }else{
        crustPrice = 0;
   }

   let toppingsPrice=0;
   if(pizza.toppings== 'onions' ){
        toppingsPrice = 1;
   }else if(pizza.toppings == 'tomatoes'){
        toppingsPrice = 1;
   }else if(pizza.toppings == 'mushrooms'){
        toppingsPrice = 1;
   }else if(pizza.toppings == 'olives'){
      toppingsPrice = 1;
   }else if(pizza.toppings== 'bacon' ){
        toppingsPrice = 2;
    }else if(pizza.toppings == 'sausage'){
        toppingsPrice = 2;
    }else if(pizza.toppings == 'chicken'){
        toppingsPrice = 2;
    }else if(pizza.toppings == 'beef'){
        toppingsPrice = 2;
    }else{
        toppingsPrice = 0;
   }


   let deliveryPrice
   if(pizza.delivery == 'yes delivery'){

        deliveryPrice= 20;
    }else{
        deliveryPrice=0;
    }
   let totalPrice;

   if(pizza.numPizzas == 1){
   totalPrice= sizePrice + crustPrice + toppingsPrice +deliveryPrice;

   }else{
   totalPrice= (sizePrice + crustPrice + toppingsPrice +deliveryPrice)*pizza.numPizzas;

   }


    div.classList.add('col-11', 'mx-auto', 'col-md-6', 'my-3', 'col-lg-8');


  div.innerHTML= ` <table class="table table-dark  ">
  <thead class="">
    <tr>
      
      <th scope="col">Title</th>
      <th scope="col">Order</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
      
    <tr>
      <td>Size</td>
      <td>${pizza.size}</td>
      <td>$ ${sizePrice}</td>
    </tr>
    <tr>
  
      <td>Crust</td>
      <td>${pizza.crust}</td>
      <td>$ ${crustPrice}</td>
    </tr>
    <tr>
  
      <td>Toppings</td>
      <td>${pizza.toppings}</td>
      <td>$ ${toppingsPrice}</td>
    </tr>
    <tr>
  
      <td>Num Pizzas</td>
      <td>${pizza.numPizzas}</td>
      <td>-</td>
    </tr>
    <tr>
  
      <td>Delivery</td>
      <td>${pizza.delivery}</td>
      <td>$ ${deliveryPrice}</td>
    </tr>
    
    <tr>
  
      <td>Total</td>
      <td></td>
      <td>$<span id="card-total-price"> ${totalPrice}</span></td>
    </tr>
    <tr>
      
  </tbody>
</table>`;




    //appending new pizza order table to the pizza list.
   this.pizzas.appendChild(div)
//    this.cardTotals();
   this.showTotals()



}



Display.prototype.showTotals = function(){
    //an array to get the totals for the item count and item price
    const totals = [];
    const itemPrice = document.querySelectorAll('#card-total-price');
    
    itemPrice.forEach((item)=>{
        //pushing items to my array using the .push Javascript array method
        totals.push(item.textContent)
        console.log(item.textContent)
    })
    console.log(itemPrice)
    console.log(totals)
    
    let intTotals = totals.map((i)=>Number(i));
    console.log(intTotals)
    
    let totalMoney = intTotals.reduce(function(a,b){
        return a+b;
    },0)
    console.log(totalMoney)
    document.querySelector('.total-price').textContent = totalMoney;

}

Display.prototype.clearFields = function(){
    this.size = '';
    this.crust = '';
    this.toppings = '';
    this.numPizza = '';
    this.delivery = '';


    
}

Store.prototype.getPizzas= function(){
    let pizzas;
    if(localStorage.getItem('pizzas') === null){
        pizzas = []
    }else{
        pizzas = JSON.parse(localStorage.getItem('pizzas'))
    }
    return pizzas;

}

Store.prototype.addPizzas = function(pizza){
    const pizzas = this.getPizzas();
    pizzas.push(pizza);

    localStorage.setItem('pizzas' ,JSON.stringify(pizzas))
}

Display.prototype.displayPizzas = function(){
    const pizzas = store.getPizzas();

    pizzas.forEach((pizza)=>{
        this.addPizza(pizza);
    })
}

document.addEventListener('DOMContentLoaded', 
display.displayPizzas())



$(document).ready(function(){
       
       
        $('#pizzas-total').hide()

        $('#btnCheckout').click(function(){
          
                
                $('#pizzas-total').show()
        });
})
