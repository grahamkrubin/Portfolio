const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let shownDate;

let dateObj = new Date();
let currentMonth = dateObj.getMonth();
let monthNum = currentMonth;
let today = dateObj.getDate();
let weekdayNum = dateObj.getDay();
let currentYear = dateObj.getFullYear();
let weekdayString = daysOfTheWeek[weekdayNum];
let referenceDate = today;
let lastDay;
let firstDay;
/*
function displayMonth() {
	let numDays = getNumDays(monthNum);
	let fullMonth = new Array(numDays);
	//setting today's date as reference point
	fullMonth[referenceDate-1] = [referenceDate, weekdayNum, weekdayString];
	
	//filling all days before today's date
	for (let i = referenceDate-2; i >= 0; i--) {
		weekdayNum = (weekdayNum == 0 ? 6 : weekdayNum-1);
		const tempArr = [i+1, weekdayNum, daysOfTheWeek[weekdayNum]];
		fullMonth[i] = tempArr;
	}

	weekdayNum = dateObj.getDay();

	//filling all days after today's date
	for (let i = referenceDate; i < numDays; i++) {
		weekdayNum = ((weekdayNum == 6) ? 0 : weekdayNum+1);
		const tempArr = [i+1, weekdayNum, daysOfTheWeek[weekdayNum]];
		fullMonth[i] = tempArr;
	}
	lastDay = fullMonth[fullMonth.length-1][1];
	firstDay = fullMonth[0][1];
	lengthPreviousMonth = numDays;
	return fullMonth;
}

function getNumDays(monthNum = (new Date().getMonth())){  //gives you number of days in this month
	let numDays = 31;
	//setting number of days in this month
	if (((monthNum < 7 && monthNum%2==1) || (monthNum >=7 && monthNum%2==0)) && monthNum != 1) {
		numDays -= 1;
		//alert("A");
	}
	//february leap year case
	if (monthNum == 1) {
		numDays = currentYear%4==0 ? numDays-2 : numDays-3;
	}
	return numDays;
}


function fillCalendarDates(){
	//display month, year at top of calendar
	shownDate.innerHTML = monthNum == 11 ? "<strong>"+monthsOfTheYear[monthNum]+", "+(currentYear-1)+"</strong>" : "<strong>"+monthsOfTheYear[monthNum]+", "+currentYear+"</strong>";
	// FILLING THE CALENDAR FOR CURRENT MONTH
	let fullMonth = displayMonth();
	let firstDay = fullMonth[0][1];  //day of the week
	//clearing the last calendar
	for(let f = 0; f<dateArr.length; f++){
		dateArr[f].innerHTML = " ";
	}
	//filling up the calendar with all dates for this month
	for(let i = firstDay; i<fullMonth.length + firstDay; i++){
		dateArr[i].innerHTML = i-firstDay+1;
	}
	
	// FILLING THE CALENDAR FIRST SQUARES FOR LAST MONTH
	let numDays = monthNum==0 ? getNumDays(11) : getNumDays(monthNum-1);
	let counter = 0;
	while(dateArr[counter].innerHTML == " "){
		counter++;
	}
	
	//everyting before the first calendar date
	for(let j = counter-1; j>=0; j--){
		dateArr[j].innerHTML = numDays-((counter-1)-j);
	}
	
	//everything after the first calendar date
	for(let k = counter + fullMonth.length; k<dateArr.length; k++){
		dateArr[k].innerHTML = k-fullMonth.length-counter+1;
	}
}

function forwards() {
	monthNum = monthNum==11 ? 0 : monthNum+=1;
	dateObj.setDate(1);
	dateObj.setMonth(monthNum);
	dateObj.setFullYear((monthNum==11) ? currentYear++ : currentYear);
	//what the new day of the week will be
	weekdayNum = (lastDay == 6) ? 0 : lastDay+1;
	weekdayString = daysOfTheWeek[weekdayNum];
	//since we are going to start at "setDate(1)" everytime, we can set referenceDate to 1
	referenceDate = 1;
	//refill the calendar
	fillCalendarDates();
}
function backwards(){
	monthNum = monthNum==0 ? 11 : monthNum-=1;
	dateObj.setDate(getNumDays(monthNum));
	dateObj.setMonth(monthNum);
	dateObj.setFullYear((monthNum==0) ? currentYear-- : currentYear);
	weekdayNum = (firstDay == 0) ? 6 : firstDay-1;
	weekdayString = daysOfTheWeek[weekdayNum];
	referenceDate = getNumDays(monthNum);
	fillCalendarDates();
}

*/


function getItem(){
    console.log(dateArr)
}




let dateArr = document.getElementsByClassName("calendar-row-date-cell");

for(let i = 0; i <dateArr.length; i++){
    dateArr[i].addEventListener('click', addEvent);
}





/*
shownDate = document.getElementById("full-date");
document.addEventListener("DOMContentLoaded", fillCalendarDates, false);
document.getElementById("right-button").addEventListener("click", forwards);
document.getElementById("left-button").addEventListener("click", backwards);
*/

