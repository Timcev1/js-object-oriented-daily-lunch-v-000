let store = {meals:[], customers:[], employers:[], deliveries:[],drivers: [], passengers: [], trips: []}

let customerId = 0
class Customer{
  constructor(name, employer = {}){
    this.name = name;
    this.employerId = employer.id;
    this.id = ++customerId;
    store.customers.push(this)
  }
  meals(){
    return this.deliveries().map((del)=>{
      return del.meal()
    })
  }
  deliveries(){
    return store.deliveries.filter((de)=>{
      return de.customerId === this.id
    })
  }
  totalSpent(){
    return this.meals().reduce((total, meal)=>{
      return total + meal.price
    }, 0)
  }
}

let mealId = 0
class Meal{
  constructor(title,price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter((del)=>{
      return del.mealId == this.id
    })
  }
  customers(){
   return this.deliveries().map((delivery)=> {
     return delivery.customer()
   })
 }
  static byPrice(){
    return store.meals.sort((a, b)=>{
      return b.price - a.price
    })
  }
}

let deliveryId = 0
class Delivery {
  constructor(meal={}, customer={}){
    this.mealId = mealId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find((meal)=>{
      return meal.id === this.mealId
    })
  }
  customer(){
    return store.customers.find((customer)=>{
      return customer.id === this.customerId
    })
  }
}

let employerId = 0
class Employer{
  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this)
  }
  employees(){
    return store.customers.filter((customer)=>{
      return customer.employerId === this.id
    })
  }
  deliveries(){
    let all = this.employees().map((employee)=>{
      return employee.deliveries()
    })
    let list = [].concat.apply([], all);
    return list
  }
    meals(){
      let m = this.deliveries().map(function(delivery){
        return delivery.meal();
      })
      return [...new Set(m)];
    }
    mealTotals(){
      let allMeals = this.deliveries().map((delivery) => {
        return delivery.meal()
      })
      let summaryObject = {}
      allMeals.forEach(function(meal){
        summaryObject[meal.id] = 0
       })
      allMeals.forEach(function(meal){
        summaryObject[meal.id] += 1
      })
      return summaryObject;
  }
}





let driverId = 0
class Driver {
  constructor(name){
    this.name = name
    this.id = ++driverId
    store.drivers.push(this)
  }
  trips(){
    return store.trips.filter((trip)=> {
      return trip.driverId == this.id
    })
  }
  passengers(){
    return this.trips().map((trip)=> {
      return trip.passenger()
    })
  }
}

let passengerId = 0

class Passenger {
  constructor(name){
    this.name = name
    this.id = ++passengerId
    store.passengers.push(this)
  }

  trips(){
    return store.trips.filter((trip)=> {
      return trip.passengerId == this.id
    })
  }
  drivers(){
    return this.trips().map((trip)=> {
      return trip.driver()
    })
  }
}

let tripId = 0
class Trip {
  constructor(driver, passenger){
    this.driverId = driverId;
    this.passengerId = passengerId;
    this.id = ++tripId
    store.trips.push(this)
  }
  driver(){
    return store.drivers.find((driver) => { return driver.id === this.driverId })
  }
  passenger(){
    return store.passengers.find((passenger) => { return passenger.id === this.passengerId })
  }
}
