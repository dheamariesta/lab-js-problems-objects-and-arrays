// Customer Object
var Customer = function (customerInfo) {
  // ** your code here**
  this.id = customerInfo.id;
  this.name = customerInfo.name;
  this.carRented = null;
};

// Car Object
var Car = function (carInfo) {
  // ** your code here**
  this.id = carInfo.id;
  this.producers = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPricePerDay = carInfo.rentalPrice;

  this.available = true;
  this.customer = null;
  this.rentalDuration = 0;

  var quotePrice = function(){
    return rentalDuration * rentalPrice;
  }

  this.reserve = function(cust, rentalDuration){
    if (this.available){
      this.available = false;
      this.customer = cust;
      this.rentalDuration = rentalDuration;
      return true;
    } else{
      return false;
    }

  }

  this.returned = function(){
    if (available){
      return console.log("Sorry, this car have already been returned");
    } else {
      this.available = true;
      this.customer = null;
      this.rentalDuration = null;
    }
  }

};

// Vendor Object
var Vendor = function(name) {
  this.name = name;
  this.cars = [];
  this.customers = [];

  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  // **your code here**
  this.addCar = function(carObj){
    if(this.getCar(carObj)){
      console.log("ID already exists");
    } else {
      this.cars.push(carObj);
      console.log("Car added to warehouse");
    }
  }

  this.addCustomer = function(customerObj){
    if (this.getCustomer(customerObj)){
      console.log("ID already exists");
    } else {
      this.customers.push(customerObj);
      console.log("Customer added to warehouse");
    }
  }

  this.removeCar = function(carID){
      var carIndex = this.findCarIndex(carID);
      if (carIndex >= 0){
        this.cars.splice(carIndex,1);
        console.log("Car deleted");
      } else {
        console.log("Car not found");
      }

  }

  this.removeCustomer = function(customerID){
      var customerIndex = this.findCustomerIndex(customerID);
      if (customerIndex >= 0){
        this.customers.splice(customerIndex,1);
        console.log("Customer deleted");
      } else {
        console.log("Customer not found");
      }

  }

  this.availableCars = function(){
    var availableCarsArray = this.cars.filter(function(car){
      return (car.available === true);
    });
    return availableCarsArray;
  }

  this.rentCar = function(customerID, rentalDuration){
    //var list = this.availableCars();
    if (this.availableCars() === null){
      console.log("All our cars have been rented");
    } else {
      var cust = this.getCustomer(customerID);
      if (cust){
        var selectedCar = this.availableCars()[0];
        cust.carRented = selectedCar;
        this.availableCars()[0].reserve(cust, rentalDuration);
        console.log("The car has been reserved");
      } else {
        console.log("Please provide a valid customer ID");
      }
    }
  }

  this.returnCar = function(customerID){
    var cust = this.getCustomer(customerID);
    if (cust){
      cust.carRented.returned(null);
      cust.carRented = null;
      console.log("Thank you for using our service");
    } else {
      console.log("Please provide a valide customerID");
    }
  }

  this.totalRevenue = function(){
    /*reduce(
      accumulator,
      currentValue,
      currentIndex,
      array)
      */

    // return this.cars.reduce();
  }
};


// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};
var customerA = new Customer(customerInfo);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};

var carA = new Car(carInfo);

var vendor = new Vendor('Jens Limited');
vendor.addCustomer(customerA);

console.log(vendor.availableCars());
vendor.addCar(carA);
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 5);
