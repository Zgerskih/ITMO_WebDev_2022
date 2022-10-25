


class IHaveWehicle {
  constructor(color, speed, weight, price) {
    this.color = color;
    this.speed = speed
    this.weight= weight
    this.price= price
  }
}
let car = new IHaveWehicle("red", 250, 1200, "1200$" )

let bicicle = new IHaveWehicle("yellow", 40, 30, "25$")

function changeColor(inputWehicle, inputcolor) {
  if(inputWehicle.hasOwnProperty("color")){
    inputWehicle.color = inputcolor;
  }
}

console.log("car befor: ", car.color, car.speed, car.weight, car.price);
changeColor(car, "red")
console.log("car after: ", car.color);


console.log("bicicle befor: ", bicicle.color, bicicle.speed, bicicle.weight, bicicle.price);
changeColor(bicicle, "blue")
console.log("bicicle after: ", bicicle.color);

