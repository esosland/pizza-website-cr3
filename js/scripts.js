//Business Logic

function Pizza (toppings, size) {
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.pieCost = function () {
  var base = this.size * 1.2;
  var toppings = this.toppings.length * 1.50;
  var price = base + toppings;
  return price;
}

Pizza.prototype.orderReport = function() {
    var string = "";
    string = string.concat(this.size + " inch pizza ");
    if (this.toppings.length > 0) {
      string = string.concat("with ");
      for (var i = 0; i < this.toppings.length; i++) {
        if (this.toppings.length > 1) {
          if (i === this.toppings.length - 1) {
            string = string.concat("& " + this.toppings[i]);
          } else {
            string = string.concat(this.toppings[i] + ", ");
          }
        } else {
          string = string.concat(this.toppings[i]);
        }
      }
    }
    return string;
}

function Order (pizzas, totalPrice) {
  this.pizzas = pizzas;
  this.totalCost = totalPrice;
}

Order.prototype.addPizza = function (pizza) {
  this.pizzas.push(pizza);
  this.totalCost += pizza.pieCost();
}

Order.prototype.pieCost = function () {
  return this.totalCost.toFixed(2);
}

//User Interface Logic

var pizzaOrder = new Order ([], 0);

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var orderCost = 0;
    var toppings = [];
    var size = parseInt($("#size").val());
    $("input:checkbox[name=toppings]:checked").each(function(){
      toppings.push($(this).val());
    });
    var newPizza = new Pizza (toppings, size);
    pizzaOrder.addPizza(newPizza);
    //Output
    $(".order").show();

      for (var i = 0; i < pizzaOrder.pizzas.length; i++) {
        $(".order").last().append("<li>" + pizzaOrder.pizzas[i].orderReport() + " for $" + pizzaOrder.pizzas[i].pieCost().toFixed(2) + "</li>")
      }
      $(".order").append("<p>Total: $" + pizzaOrder.pieCost() + "</p>")
      });


    $("#placeOrder").click(function() {
      alert("Your order has been placed! Thanks for ordering from Saucelandia!");
      location.reload();
  });
});
