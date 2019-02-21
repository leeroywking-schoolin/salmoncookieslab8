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

var tableMain = document.getElementById('tablemain');

function createRow(rowID){
  var newRow = document.createElement('tr');
  newRow.id = rowID;
  tableMain.appendChild(newRow);
}

var firstAndPike = document.getElementById('1andpike');
var seaTac = document.getElementById('seatac');
var seattleCenter = document.getElementById('seacenter');
var caphill = document.getElementById('caphill');
var alki = document.getElementById('alkibeach');


var tablehead = document.getElementById('tablehead');
var tablefoot = document.getElementById('rowtotals');


// You need to pass this constructor function the max, min and cookie per sale, also the htmlElement from above ie var locationObject = new LocationConstructor(100,30,3.5,html id));
function LocationConstructor(max,min,cookiepersale,htmlElementId,rowTitle) {
  this.maxCustPerHour = max;
  this.minCustPerHour = min;
  this.cookiesPerSale = cookiepersale;
  this.rowTitle = rowTitle;
  this.randRange = function(){
    return Math.floor((Math.random() *(this.maxCustPerHour - this.minCustPerHour)) + this.minCustPerHour)};
  this.cookiesPerHour= this.numCustomerPerHour * this.cookiesPerSale
  this.cookiesByHour= []
  this.employeesByHour = [] 
  this.render= function () {
    var total = 0;
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
};

var firstAPObject = new LocationConstructor(65,23,6.3,firstAndPike,'First and Pike');
var seaTacObject = new LocationConstructor(24,2,1.2,seatac, 'SeaTac Airport');
var seaCentObject = new LocationConstructor(38,11,3.7,seacenter,'Seattle Center');
var capHillObject = new LocationConstructor(38,20,2.3,caphill,'Capitol Hill');
var alkiBeachObject = new LocationConstructor(16,2,4.6,alkibeach,'Alki');

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

var objList = [firstAPObject,seaTacObject,seaCentObject,capHillObject,alkiBeachObject]

function render(){
  tableHeadRender(tablehead);

  for (var i =0; i< objList.length; i ++){
    objList[i].render();
  }
  tableFootRender(rowtotals);
}

render();

var chatList = document.getElementById('chat-list');
var chatForm = document.getElementById('chat-form');
var allComments = [];

var Comment = function(max, min, avg, elementId, name) {
  this.max = max;
  this.min = min;
  this.avg = avg;
  this.elementId = elementId;
  this.name = name;
};

Comment.prototype.render = function() {
  var liEl = document.createElement('li');
  // liEl.innerHtml = '<b>' + this.username + ': </b><em>' + this.text + '</em>';
  liEl.innerHTML = ' <b>' + this.max + ': </b><em>' + this.min + '</em>' + this.avg + elementId + name;
  return liEl;

};

function handleCommentSubmit(event) {
  event.preventDefault();
  var max = event.target.max.value;
  var min = event.target.min.value;
  var avg = event.target.avg.value;
  var elementId = event.target.elementId.value;
  var name = event.target.elementId.value;


  var newStore = new LocationConstructor(max, min, avg, elementId, name);

  event.target.max.value = null;
  event.target.min.value = null;
  event.target.avg.value = null;
  event.target.elementId.value = null;
  event.target.name.value = null;

  
  allComments.unshift(newComment);
  renderAllComments();
}

// function renderAllComments() {
//   chatList.innerHTML = '';
//   for(var i = 0; i < allComments.length; i++) {
//     chatList.appendChild(allComments[i].render());
//   }
// }

chatForm.addEventListener('submit', handleCommentSubmit);