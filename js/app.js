'use strict';

var hours = [
  '6:00am',
  '7:00am',
  '8:00am',
  '9:00am',
  '10:00am',
  '11:00am',
  '12:00am',
  '1:00pm',
  '2:00pm',
  '3:00pm',
  '4:00pm',
  '5:00pm',
  '6:00pm',
  '7:00pm',
  '8:00pm'
];


var firstAndPike = document.getElementById('1andpike');
var seaTac = document.getElementById('seatac');
var seattleCenter = document.getElementById('seacenter');
var caphill = document.getElementById('caphill');
var alki = document.getElementById('alkibeach');
var tablehead = document.getElementById('tablehead');
var tablefoot = document.getElementById('rowtotals');

var firstAndPikestaff = document.getElementById('1andpikestaff');
var seaTacstaff = document.getElementById('seatacstaff');
var seattleCenterstaff = document.getElementById('seacenterstaff');
var caphillstaff = document.getElementById('caphillstaff');
var alkistaff = document.getElementById('alkibeachstaff');

// var tablehead = document.getElementById('tablehead');

// You need to pass this constructor function the max, min and cookie per sale, also the htmlElement from above ie var locationObject = new LocationConstructor(100,30,3.5,html id));
function LocationConstructor(max,min,cookiepersale,htmlElementId,staffID,rowTitle) {
  this.maxCustPerHour = max;
  this.minCustPerHour = min;
  this.cookiesPerSale = cookiepersale;
  this.rowTitle = rowTitle;
  this.staffID = staffID;
  this.randRange = function(){
    return Math.floor((Math.random() *(this.maxCustPerHour - this.minCustPerHour)) + this.minCustPerHour)};
  this.cookiesPerHour= this.numCustomerPerHour * this.cookiesPerSale
  this.cookiesByHour= []
  this.employeesByHour = [] 
  this.render= function () {
    var total = 0
    var rowTitleRend = document.createElement('td');
    rowTitleRend.textContent = this.rowTitle;
    htmlElementId.appendChild(rowTitleRend);
    for (var i = 0; i < hours.length; i++) {
      var liEl = document.createElement('td');
      var numCustomerPerHour = this.randRange();
      var cookiesPerHour = Math.floor(numCustomerPerHour * this.cookiesPerSale);
      liEl.textContent = `${cookiesPerHour} `;
      htmlElementId.appendChild(liEl);
      this.cookiesByHour.push(cookiesPerHour);
      total = cookiesPerHour + total;
    }
    var liEltotal = document.createElement('td');
    liEltotal.textContent = `${total} `;
    this.cookiesByHour.push(total);
    htmlElementId.appendChild(liEltotal);
  }

  this.employee= function(){
   
    var rowTitleRend = document.createElement('td');
    rowTitleRend.textContent = this.rowTitle;
    staffID.appendChild(rowTitleRend);
    var highest = 0;
    for (var i = 0; i < hours.length; i++) {
      var liEl = document.createElement('td');
      var customers = Math.floor(this.cookiesByHour[i] / this.cookiesPerSale);
      function necessaryEmployees(){
        if ((customers / 20) < 2) {return 2}
        else {return Math.ceil(customers/20)}
      }
      var nec = necessaryEmployees()
      this.employeesByHour.push(nec);
      if (nec > highest){highest = nec}
      else {};
      liEl.textContent = `${nec} `;
      staffID.appendChild(liEl);
    }
    var emptotal = document.createElement('td');
    emptotal.textContent = `${highest} employees`;
    this.employeesByHour.push(highest);
    staffID.appendChild(emptotal);
  }
};

var firstAPObject = new LocationConstructor(65,23,6.3,firstAndPike,firstAndPikestaff,'First and Pike');
var seaTacObject = new LocationConstructor(24,2,1.2,seatac,seatacstaff, 'SeaTac Airport');
var seaCentObject = new LocationConstructor(38,11,3.7,seacenter,seacenterstaff,'Seattle Center');
var capHillObject = new LocationConstructor(38,20,2.3,caphill,caphillstaff,'Capitol Hill');
var alkiBeachObject = new LocationConstructor(16,2,4.6,alkibeach,alkibeachstaff,'Alki');

function tableHeadRender(headElement){
  var blank = document.createElement('th');
  blank.innerHTML = ('');
  headElement.appendChild(blank);
  for (var hourCount = 0; hourCount < hours.length; hourCount++){
    var tableHeadRow = document.createElement('th');
    tableHeadRow.textContent = hours[hourCount];
    headElement.appendChild(tableHeadRow)
  }
  var totals = document.createElement('th');
  totals.innerHTML = ('Totals');
  headElement.appendChild(totals);
};

function tableFootRender(footElement){
  var label = document.createElement('td');
  label.innerHTML = ('By Hour Totals');
  footElement.appendChild(label);
  for (var i= 0; i < hours.length +1; i++){
    var entry = document.createElement('td');
    entry.textContent = (firstAPObject.cookiesByHour[i] + 
      seaTacObject.cookiesByHour[i] + 
      seaCentObject.cookiesByHour[i] + 
      capHillObject.cookiesByHour[i] +
      alkiBeachObject.cookiesByHour[i])
      footElement.appendChild(entry)
  }
}

function tableFootstaffRender(footElement){
  var label = document.createElement('td');
  label.innerHTML = ('By Hour Totals');
  footElement.appendChild(label);
  for (var i= 0; i < hours.length +1; i++){
    var entry = document.createElement('td');
    entry.textContent = (firstAPObject.employeesByHour[i] + 
      seaTacObject.employeesByHour[i] + 
      seaCentObject.employeesByHour[i] + 
      capHillObject.employeesByHour[i] +
      alkiBeachObject.employeesByHour[i])
      footElement.appendChild(entry)
  }
}
firstAPObject.render();
seaTacObject.render();
seaCentObject.render();
capHillObject.render();
alkiBeachObject.render();

tableHeadRender(tablehead);
tableFootRender(rowtotals);
tableHeadRender(tableheadstaff);


firstAPObject.employee();
seaTacObject.employee();
seaCentObject.employee();
capHillObject.employee();
alkiBeachObject.employee();

tableFootstaffRender(rowtotalsstaff);