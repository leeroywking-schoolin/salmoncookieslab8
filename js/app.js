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

var tableMain = document.getElementById('tablebody');

// You need to pass this constructor function the max, min and cookie per sale, also the name 
function LocationConstructor(max, min, cookiepersale, rowTitle) {
  this.maxCustPerHour = max;
  this.minCustPerHour = min;
  this.cookiesPerSale = cookiepersale;
  this.rowTitle = rowTitle;
  this.cookiesByHour = [];
}
LocationConstructor.prototype.randRange = function() {
  return Math.floor((Math.random() * (this.maxCustPerHour - this.minCustPerHour)) + this.minCustPerHour)
};
LocationConstructor.prototype.render = function () {
  var newRow = document.createElement('tr');
  newRow.textContent = ('');
  tableMain.appendChild(newRow);
  var total = 0;
  var rowTitleRend = document.createElement('td');
  rowTitleRend.textContent = this.rowTitle;
  newRow.appendChild(rowTitleRend);
  for (var i = 0; i < hours.length; i++) {
    var liEl = document.createElement('td');
    var numCustomerPerHour = this.randRange();
    var cookiesPerHour = Math.floor(numCustomerPerHour * this.cookiesPerSale);
    liEl.textContent = `${cookiesPerHour} `;
    newRow.appendChild(liEl);
    this.cookiesByHour.push(cookiesPerHour);
    total = cookiesPerHour + total;
  }
  var liEltotal = document.createElement('td');
  liEltotal.textContent = `${total} `;
  this.cookiesByHour.push(total);
  newRow.appendChild(liEltotal);
};

var firstAPObject = new LocationConstructor(65, 23, 6.3, 'First and Pike');
var seaTacObject = new LocationConstructor(24, 2, 1.2, 'SeaTac Airport');
var seaCentObject = new LocationConstructor(38, 11, 3.7, 'Seattle Center');
var capHillObject = new LocationConstructor(38, 20, 2.3, 'Capitol Hill');
var alkiBeachObject = new LocationConstructor(16, 2, 4.6, 'Alki');

function tableHeadRender(headElement) {
  var blank = document.createElement('th');
  blank.innerHTML = ('');
  headElement.appendChild(blank);
  for (var hourCount = 0; hourCount < hours.length; hourCount++) {
    var tableHeadRow = document.createElement('th');
    tableHeadRow.textContent = hours[hourCount];
    headElement.appendChild(tableHeadRow)
  }
  var totals = document.createElement('th');
  totals.innerHTML = ('Totals');
  headElement.appendChild(totals);
};


function tableFootRender(footElement) {
  var total = document.createElement('td');
  var grandTotal = 0;
  var label = document.createElement('td');
  label.innerHTML = ('By Hour Totals');
  footElement.appendChild(label);
  // debugger;
  for (var i=0;i<hours.length;i++) {
    var entry = document.createElement('td');
      var sum = 0;
      for(var j =0 ; j < objList.length; j++ ){
        sum = sum + objList[j].cookiesByHour[i];

      };
      grandTotal = grandTotal + sum;
      entry.textContent = (sum);
      footElement.appendChild(entry)
    };
    total.textContent = (grandTotal);
    footElement.appendChild(entry);
    footElement.appendChild(total);
  };


var objList = [firstAPObject, seaTacObject, seaCentObject, capHillObject, alkiBeachObject]

function render() {
  tableHeadRender(tablehead);

  for (var i = 0; i < objList.length; i++) {
    objList[i].render();
  }
  tableFootRender(rowtotals);
}

render();

function addNewStore(max, min, avg, name) {
  var newStoreObj = new LocationConstructor(max, min, avg, name);
  objList.push(newStoreObj);
  var element = document.getElementById("rowtotals");

  element.parentNode.removeChild(element);

  newStoreObj.render();
  var newTotal = document.createElement('tr');
  newTotal.id = 'rowtotals';
  tableMain.appendChild(newTotal);
  tableFootRender(rowtotals);

}


var newstoreList = document.getElementById('newstore-list');
var newstoreForm = document.getElementById('newstore-form');
var allComments = [];

var Comment = function (max, min, avg, name) {
  this.max = max;
  this.min = min;
  this.avg = avg;
  this.name = name;
};

Comment.prototype.render = function () {
  var liEl = document.createElement('li');
  // liEl.innerHtml = '<b>' + this.username + ': </b><em>' + this.text + '</em>';
  liEl.innerHTML = ' <b>' + this.max + ': </b><em>' + this.min + '</em>' + this.avg + name;
  return liEl;

};

function handleStoreSubmit(event) {
  event.preventDefault();
  var max = event.target.max.value;
  var min = event.target.min.value;
  var avg = event.target.avg.value;
  var name = event.target.name.value;
  if(max <= min || max <= 0 || min <= 0 || avg <= 0){
    alert('Max must be greater than min, no negative numbers.'); clearInput() }
  // debugger;
  else {addNewStore(max,min,avg,name)};


  // var newStore = new LocationConstructor(max, min, avg, elementId, name);
function clearInput(){
  event.target.max.value = null;
  event.target.min.value = null;
  event.target.avg.value = null;
  event.target.name.value = null;
}
}

newstoreForm.addEventListener('submit', handleStoreSubmit);