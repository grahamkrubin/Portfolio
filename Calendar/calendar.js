const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let shownDate;

let dateObj; //date object
let currentMonth; //current month
let monthNum; //    
let today;
let weekdayNum;
let currentYear;
let weekdayString;
let referenceDate; 
let lastDay;  //last day of month (m-f)
let firstDay;  // first day of month (m-f)
let sessionCookie;
let displayDay; //date displayed on popup
let monthActual; //month displayed on popup

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SETUP PAGE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function setup(){
    dateObj = new Date();
    currentMonth = dateObj.getMonth();
    monthNum = currentMonth;
    today = dateObj.getDate();
    weekdayNum = dateObj.getDay();
    currentYear = dateObj.getFullYear();
    weekdayString = daysOfTheWeek[weekdayNum];
    referenceDate = today;
    sessionCookie = null;
    fillCalendarDates();
    //checking if logged in by checking session cookie
    console.log(firstDay);
    console.log(lastDay);
    fetch("checkLogin.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
        if(data.success){
            setCookie(data.token); //set cookie
            hideLogin(); // hide login and replace with only logout button
            prepPostLogin();
        }
        else{
            for(let i = 0; i<contentArr.length; i++){
                contentArr[i].innerHTML = "";
            }
            console.log("not logged in");
        }
    });
}

function hideLogin(){
    $(document).ready(function(){
        $("#username").hide();
        $("#password").hide();
        $("#login_btn").hide();
        $("#newuser").hide();
        $("#newpass").hide();
        $("#create_btn").hide();
        $("#logout_btn").show();
        $("#logged-user").show();
        });
}

function prepPostLogin(){
     let events = [];
     fetch("getCalendarEvents.php", {
            method: 'POST',
            //body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function(data){
            if(data.success){
                console.log(data.userid);
                events = data.dataset;
                console.log(data.dataset);
            }
            else{
                console.log(`Error: ${data.message}`);
            }
        })
        .then(
            function(){
            //console.log("ran2");
           // console.log("loggg");
            //console.log(events);
            displayEvents(events);
            //console.log("ran");
            }
        );
}

function displayEvents(eventsArr){
    for(let i =0; i<contentArr.length; i++){
        contentArr[i].innerHTML = "";
    }
    if(eventsArr.length == 0){
        console.log("no events");
        return;
    }
    for(let i = 0; i<eventsArr.length; i++){
        let singleEventArr = eventsArr[i];
        let eventDateArr = singleEventArr[1].split("-");
        let dayOfEvent = Number(eventDateArr[2]);
        let monthOfEvent = Number(eventDateArr[1])-1;
        let yearOfEvent = Number(eventDateArr[0]);
        if(monthOfEvent == monthNum && yearOfEvent == currentYear){
            contentArr[firstDay + dayOfEvent-1].innerHTML = singleEventArr[0] + " and maybe others. (click to show)";
        }
        else if(monthOfEvent == (monthNum+11)%12 && yearOfEvent == currentYear || monthOfEvent == 11 && yearOfEvent == currentYear-1){
            if(dayOfEvent <= getNumDays(monthOfEvent) && dayOfEvent > getNumDays(monthOfEvent)-firstDay){
                contentArr[getNumDays(monthOfEvent)-dayOfEvent].innerHTML = singleEventArr[0] + "and others... click to show";
            }
        }
        else if(monthOfEvent == (monthNum+13)%12 && yearOfEvent == currentYear || monthOfEvent == 0 && yearOfEvent == currentYear + 1){
            if(dayOfEvent >=1 && dayOfEvent <= contentArr.length-(firstDay+getNumDays(monthNum))){
            let index = Number(firstDay + getNumDays(monthNum) + dayOfEvent);
            contentArr[index-1].innerHTML = singleEventArr[0] + "and others... click to show";
            }
            
        }
        
    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DISPLAY MONTH~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    //let counter = 0;
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
	shownDate.innerHTML = "<strong>"+monthsOfTheYear[monthNum]+", "+currentYear+"</strong>";
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
    let newYear;
    if(monthNum ==11){
        currentYear++;
        newYear = currentYear;
    }
    else{
        newYear = currentYear;
    }
    dateObj.setFullYear(newYear);
	monthNum = monthNum==11 ? 0 : monthNum+=1;
	dateObj.setMonth(monthNum);
    dateObj.setDate(1);
	//what the new day of the week will be
	weekdayNum = (lastDay == 6) ? 0 : lastDay+1;
	weekdayString = daysOfTheWeek[weekdayNum];
	//since we are going to start at "setDate(1)" everytime, we can set referenceDate to 1
	referenceDate = 1;
	//refill the calendar
	fillCalendarDates();
    fetch("checkLogin.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
        if(data.success){
            setCookie(data.token); //set cookie
            hideLogin(); // hide login and replace with only logout button
            prepPostLogin();
        }
        else{
            for(let i = 0; i<contentArr.length; i++){
                contentArr[i].innerHTML = "";
            }
            console.log("not logged in");
        }
    });
}
function backwards(){
    let newYear;
    if(monthNum ==0){
        currentYear--;
        newYear = currentYear;
    }
    else{
        newYear = currentYear;
    }
    dateObj.setFullYear(newYear);
	monthNum = monthNum==0 ? 11 : monthNum-=1;
	dateObj.setDate(getNumDays(monthNum));
	dateObj.setMonth(monthNum);
	weekdayNum = (firstDay == 0) ? 6 : firstDay-1;
	weekdayString = daysOfTheWeek[weekdayNum];
	referenceDate = getNumDays(monthNum);
	fillCalendarDates();
    fetch("checkLogin.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
        if(data.success){
            setCookie(data.token); //set cookie
            hideLogin(); // hide login and replace with only logout button
            prepPostLogin();
        }
        else{
            for(let i = 0; i<contentArr.length; i++){
                contentArr[i].innerHTML = "";
            }
            console.log("not logged in");
        }
    });
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LOGIN STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form
    console.log(username);
    console.log(password);
    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };
    console.log(data);
    fetch("login.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then( function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
        if(data.success){
            setCookie(data.token);
            hideLogin();
            prepPostLogin();
        }
        else{
            console.log(`You were not logged in ${data.message}`);
        }
    });
        //.then(data.success ? setCookie(data.token) : console.log("Login failed"));
        //.then(data => console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`))
        
}

function setCookie(cookie){
    sessionCookie = cookie;
    console.log("set cookie");
    console.log(cookie);
    //hideLogin();
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~POPUP CONTENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let dateArr = document.getElementsByClassName("calendar-row-date-cell");
let contentArr = document.getElementsByClassName("calendar-row-content-cell");


for(let i = 0; i <contentArr.length; i++){
    contentArr[i].addEventListener('click', function(){
        openEventPopup(i);
        });
    contentArr[i].addEventListener('click', function(){
        openModifyPopup(i);
        });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~MODIFYING POPUP~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let dateOfModifiedEvent;

function openModifyPopup(index){
    console.log("opened modify/del");
    let clickedDay = index-firstDay+1;
    let daysThisMonth = getNumDays(monthNum);
    let monthText;
    if(clickedDay<1){
        let lastMonth = (monthNum == 0)? 11 : (monthNum-1);
        let lastMonthDays = getNumDays(lastMonth);
        monthText = monthsOfTheYear[lastMonth];
        displayDay = lastMonthDays+clickedDay;
        monthActual = lastMonth;
    }
    else if(clickedDay>daysThisMonth){
        let nextMonth = monthNum == 11 ? 0 : monthNum+1;
        console.log(clickedDay-daysThisMonth);
        monthText = monthsOfTheYear[nextMonth];
        displayDay = clickedDay-daysThisMonth;
        monthActual = nextMonth;
    }
    else{
        monthText = monthsOfTheYear[monthNum];
        displayDay = clickedDay;
        monthActual = monthNum;
    }
    document.getElementById("temp-date-mod-popup").textContent = monthText+", "+displayDay+" "+currentYear;
    
    const concatDate = String(currentYear)+"-"+String(monthActual+1)+"-"+String(displayDay);
    dateOfModifiedEvent = concatDate;
    const data = { 'date': concatDate };
    console.log(data);
    let eventsShownArr = [];
    if(sessionCookie!=null){
        
        fetch("showEventsOnDay.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
            if(data.success){
                document.getElementById("event-mod-div").style.display = "block";
                eventsShownArr = data.dataset;
                //hideLogin();
                //prepPostLogin();
                //console.log("yes");
                console.log(eventsShownArr);
                displayEventsOnModifyPopup(eventsShownArr);
            }
            else{
                closeModPopup(); //if no events, just close it
                console.log(`Error: ${data.message}`);
            }
    });
    }
    else{
        console.log("not logged in lol");
    }
    
    
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ADDING POPUP~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function openEventPopup(index){
    console.log("opened");
    let clickedDay = index-firstDay+1;
    let daysThisMonth = getNumDays(monthNum);
    let monthText;
    if(clickedDay<1){
        console.log("month: ");
        let lastMonth = (monthNum == 0)? 11 : (monthNum-1);
        console.log(lastMonth);
        console.log("day:");
        let lastMonthDays = getNumDays(lastMonth);
        console.log(lastMonthDays+clickedDay);
        monthText = monthsOfTheYear[lastMonth];
        displayDay = lastMonthDays+clickedDay;
        monthActual = lastMonth;
    }
    else if(clickedDay>daysThisMonth){
        console.log("month: ");
        let nextMonth = monthNum == 11 ? 0 : monthNum+1;
        console.log(nextMonth);
        console.log("day:");
       // let lastMonthDays = getNumDays(nextMonth);
        console.log(clickedDay-daysThisMonth);
        monthText = monthsOfTheYear[nextMonth];
        displayDay = clickedDay-daysThisMonth;
        monthActual = nextMonth;
    }
    else{
        console.log("month: ");
        console.log(monthNum);
        console.log("day: ");
        console.log(clickedDay);
        monthText = monthsOfTheYear[monthNum];
        displayDay = clickedDay;
        monthActual = monthNum;
    }
    
    document.getElementById("temp-date-popup").textContent = "Event Date: "+monthText+", "+displayDay+" "+currentYear;
    document.getElementById("event-div").style.display = "block";
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ADD EVENT SUBMIT IN POPUP~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let submit = document.getElementById("event-submit"); //event submit button
    submit.addEventListener("click", function(){
    addEvent(displayDay, monthActual, currentYear);
    });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~MODIFY EVENT SUBMIT IN POPUP~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function displayEventsOnModifyPopup(eventsArr){
    let deleter = null;
    let closer = null;
    let modifier = null;
    document.getElementById("event-mod-form").innerHTML = "<button type='button' id='event-modify-submit' class='btn'>Modify event</button><button type='button' id='event-destroy-submit' class='btn'>Delete event</button><button type='button' id='close-mod-popup' class='btn close'>Close</button>";
    for(let i = 0; i<eventsArr.length; i++){
        let event = eventsArr[i];
        title = event[0];
        start = (((event[1].split(" "))[1]).split(":"))[0] + ":" + (((event[1].split(" "))[1]).split(":"))[1];
        end = (((event[2].split(" "))[1]).split(":"))[0] + ":" + (((event[2].split(" "))[1]).split(":"))[1];
        event_id = event[3];
        document.getElementById("event-mod-form").innerHTML =
        "<input type='radio' class='event-moddel-clicker' name='event-moddel-clicker' value='"+event_id+"'>"+title+"<br> Start:"+start+" End: "+end+"</input><br>"+document.getElementById("event-mod-form").innerHTML;
    }
    console.log("finished");
    deleter = document.getElementById('event-destroy-submit');
    deleter.addEventListener("click", deleteEvent);
    
    closer = document.getElementById("close-mod-popup");
    closer.addEventListener("click", closeModPopup);
    
    modifier = document.getElementById('event-modify-submit');
    modifier.addEventListener("click", modifyEvent);
}
let selectedEventGlobal;
function openRealModifyPopup(selectedEvent){ //shows the popup for modifying events
    let modifyBox = document.getElementById('mod-div');
    modifyBox.style.display = "block";
    selectedEventGlobal = selectedEvent;
}
function realModifyEvent(){ //function used for submitting the data
    let modifiedTitle;
    let modifiedDesc;
    let modifiedStart;
    let modifiedEnd;
    let curr_ev_start = mod_event_start;
    let curr_ev_end = mod_event_end;
    console.log(curr_ev_end);
    console.log(curr_ev_start);
    //selectedEventGlobal = HELP HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    let dateOfEv = String(dateOfModifiedEvent);
    modifiedTitle = String(document.getElementById("mod-title").value);
    modifiedDesc = String(document.getElementById("mod-desc").value);
    let inputtedDate = String(document.getElementById("mod-date").value);
    if(inputtedDate.length>3){
        dateOfEv = inputtedDate;
    }
    let inputted_start = document.getElementById("mod-start").value;
    let inputted_end = document.getElementById("mod-end").value;
    if(inputted_start.length<=1){
        modifiedStart = curr_ev_start;
    }
    else{
        modifiedStart = dateOfEv + " " +String(document.getElementById("mod-start").value);
    }
    if(inputted_end.length<=1){
        modifiedEnd = curr_ev_end;
    }
    else{
        modifiedEnd = dateOfEv + " " +String(document.getElementById("mod-end").value);
    }
   
    
    console.log(modifiedTitle);
    console.log(modifiedDesc);
    console.log(modifiedStart);
    console.log(modifiedEnd);
    console.log(selectedEventGlobal);
    console.log(dateOfEv);
    if(modifiedTitle == ""){
        alert("You must enter a title!");
        return;
    }
    
    if(modifiedStart.length<3){
        alert("You must enter a starting time!");
        return;
    }
    
    const data = {
    'mod-title': modifiedTitle,
    'mod-desc': modifiedDesc,
    'mod-start': modifiedStart,
    'mod-end': modifiedEnd,
    'event_id': selectedEventGlobal.value,
    'mod-date': dateOfEv
    };
    
    console.log(data);
    
    fetch("modifyEvent.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data.success ? data.end : `Failed to modify event ${data.message}`))
        .then(closeRealModPopup());
    
}
function closeRealModPopup(){
    document.getElementById("mod-title").value = "";
    document.getElementById("mod-desc").value = "";
    document.getElementById("mod-start").value = "";
    document.getElementById("mod-end").value = "";
     fetch("checkLogin.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
        if(data.success){
            setCookie(data.token); //set cookie
            hideLogin(); // hide login and replace with only logout button
            prepPostLogin();
        }
        else{
            for(let i = 0; i<contentArr.length; i++){
                contentArr[i].innerHTML = "";
            }
            console.log("not logged in");
        }
    });
    document.getElementById("mod-div").style.display = "none";
}
document.getElementById('close-real-mod-popup').addEventListener("click", closeRealModPopup);
document.getElementById('modify-submit').addEventListener("click", realModifyEvent);

let mod_event_start;
let mod_event_end;

function modifyEvent(){
    console.log("pressed modify");
    eventArr = document.getElementsByClassName("event-moddel-clicker");
    let selectedEvent;
    for(let i = 0; i<eventArr.length; i++){
        if(eventArr[i].checked){
            selectedEvent = eventArr[i];
        }
    }
    if(selectedEvent == null){
        alert("Did not choose event to be modified!");
    }
    else{
        const data = {
    'selected-event-id': selectedEvent.value
    };
    
    console.log(data);
    
    fetch("getStartAndEnd.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function(data){
            if(data.success){
                mod_event_start = data.start;
                mod_event_end = data.end;
                closeModPopup();
                openRealModifyPopup(selectedEvent);
                closeModPopup();
            }
            else{
                console.log(`Error: ${data.message}`);
            }
            
        });
        /*
              data => console.log(data.success ? "Modified Event" : `Failed to modify event ${data.message}`))
        }
        .then(closeRealModPopup());
        
        closeModPopup();
        openRealModifyPopup(selectedEvent);
        closeModPopup();
    */
    }
}

function deleteEvent(){
    console.log("pressed delete");
    eventArr = document.getElementsByClassName("event-moddel-clicker");
    let selectedEvent;
    for(let i = 0; i<eventArr.length; i++){
        if(eventArr[i].checked){
            selectedEvent = eventArr[i];
        }
    }
    if(selectedEvent == null){
        alert("Did not choose event to be deleted!");
    }
    else{
        const data = {'event_id':selectedEvent.value};
        fetch("deleteEvent.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
            if(data.success){
                alert("you have deleted the event!");
                closeModPopup();
            }
            else{
                console.log(`Error: ${data.message}`);     
            }
    });
    }
    
}
function addEvent(dayEntered, monthEntered, yearEntered){
    console.log("pressed submit");
    
    const title = document.getElementById("event-title").value; // Get the username from the form
    const desc = document.getElementById("event-desc").value;
    let start = document.getElementById("event-start").value;
    let end = document.getElementById("event-end").value;
    let day = String(dayEntered);
    let month = String(monthEntered+1);
    const year = yearEntered;
    let recurrDays = "";
    let recurrWeeks = "";
    let checkboxArr = document.getElementsByClassName("recurr-day-of-week");
    let radioArr = document.getElementsByClassName("recurr-week-freq");
    console.log(day);
    console.log(month);
    console.log(year);
    
    if(month.length<2){
        month = "0"+month;
    }
    if(day.length<2){
        day = "0"+day;
    }
    console.log(day.length);
    console.log(month.length);
    console.log("MOTHERFUCKERRR");
    let dateString = year + "-"+month+"-"+day;
    console.log(start.length);
    console.log("last was length");
    if(title == ""){
        alert("You must enter a title!");
        return;
    }
    if(start.length<3){
        alert("You must enter a starting time!");
        return;
    }
    start = dateString + " "+start+":00";
    end = dateString + " "+end+":00";
    for(let i = 0; i<checkboxArr.length; i++){
        
        if(checkboxArr[i].checked){
            recurrDays += checkboxArr[i].value;
        }
        
    }
    for(let i = 0; i<radioArr.length; i++){
        
        if(radioArr[i].checked){
            recurrWeeks = radioArr[i].value;
        }
        
    }
    console.log(title);
    console.log(desc);
    console.log(start);
    console.log(end);
    console.log(day);
    console.log(month);
    console.log(year);
    console.log(recurrDays);
    console.log(recurrWeeks);
    // Make a URL-encoded string for passing POST data:
    
    console.log(dateString);
   
    const data = {
    'title': title,
    'description': desc,
    'start': start,
    'end': end,
    'date': dateString,
    'recurrDays': recurrDays,
    'recurrWeeks': recurrWeeks
    };
    
    console.log(data);
    // use a foreach around this fetch using the 




    
    // const arrayOfDays = recuringEveryWeekOneDay(data);
    // arrayOfDays.forEach(function(dayData) {
        fetch("eventAdding.php", {
            method: 'POST',
            body: JSON.stringify(dayData),
            headers: { 'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => data.success ? alert("Added Event") : alert(`Failed to add event ${data.message}`))
        .then(closePopup());
    // });
    
    
    
}



/*-----------------------------------------------------Recuring Dates-----------------------------------------------------*/

function recuringEveryWeekOneDay(data) {
    // const data = {
    //     'date': "2018-10-08",
    //     'description': "no",
    //     'end': "2018-10-08 23:11:00",
    //     'start': "2018-10-08 11:11:00",
    //     'title': "new"
    // };
    const startTime = " " + data.start.split(" ")[1];
    const endTime = " " + data.end.split(" ")[1];
    
    const datePieces = data.date.split("-");
    let dynamicData = data;
    let allDays = Array();
    allDays.push(data);
    let factor;
    if (recurrWeeks=="other") {
        factor = 2;
    } else if (recurrWeeks=="every") {
        factor = 1;
    } else {
        factor = 0;
        return allDays;
    }
    
    let theDay = Number(datePieces[2]);
    let theMonth = Number(datePieces[1])-1;
    alert(theMonth);
    let theYear = Number(datePieces[0]);
    let maxDays = numDaysInMonth(theMonth, theYear);
    alert("Date: " + data.date);
    let weeksCounted = 1;
    while (weeksCounted <52/factor) {
        while (theMonth < 12) {
            dynamicData.date = String(theYear)+"-"+String(theMonth)+"-"+((theDay<10&&theDay>0) ? ("0"+String(theDay)) : (String(theDay)));
            dynamicData.start = dynamicData.date + startTime;
            dynamicData.end = dynamicData.date + endTime;
            allDays.push(dynamicData);
                alert(dynamicData.date);
                weeksCounted += 1;
            while (theDay <= maxDays-(factor*7)) {
                //all weeks repeated in a month
                theDay += factor*7;
                dynamicData.date = String(theYear)+"-"+String(theMonth)+"-"+((theDay<10&&theDay>0) ? ("0"+String(theDay)) : (String(theDay)));
                dynamicData.start = dynamicData.date + startTime;
                dynamicData.end = dynamicData.date + endTime;
                allDays.push(dynamicData);
                alert(dynamicData.date);
                //remember to change date in end and start
                weeksCounted += 1;
            }
            maxDays = numDaysInMonth(theMonth, theYear);
            alert("MaxDays: " + String(maxDays))
            let nextTheDay = factor*7-(maxDays-theDay);
            if (nextTheDay<=7*factor) {theDay = nextTheDay;}
            if (theDay == 0) {
                theDay = maxDays
            } else {
                theMonth += 1;
            }
        }
        theMonth = 0;
        theYear+=1;
    }
    return allDays;
}



function numDaysInMonth(month, year) {
        let days = 31;
        switch(month) {
            case 0,2,4,6,7,9,11:
                days = 31;
                break;
            case 3, 5, 8, 10:
                days = 30;
                break;
            case 1:
                if (year%4==0) {
                    days = 29;
                } else days = 28;
        }
        return Number(days);
}


















function closeModPopup(){
    let eventRadioArr = document.getElementsByClassName("event-moddel-clicker");
    for(let i = 0; i<eventRadioArr.length; i++){
        eventRadioArr[i].checked = false;
    }
     fetch("checkLogin.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
        if(data.success){
            setCookie(data.token); //set cookie
            hideLogin(); // hide login and replace with only logout button
            prepPostLogin();
        }
        else{
            for(let i = 0; i<contentArr.length; i++){
                contentArr[i].innerHTML = "";
            }
            console.log("not logged in");
        }
    });
    document.getElementById("event-mod-div").style.display = "none";
}
function closePopup(){
    let title = document.getElementById("event-title");
    let desc = document.getElementById("event-desc");
    let start = document.getElementById("event-start");
    let end = document.getElementById("event-end");
    let datepopup = document.getElementById("temp-date-popup");
    datepopup.textContent = "";
    title.value="";
    desc.value="";
    start.value="";
    end.value="";
    let checkboxArr = document.getElementsByClassName("recurr-day-of-week");
    let radioArr = document.getElementsByClassName("recurr-week-freq");
    for(let i = 0; i<checkboxArr.length; i++){
        checkboxArr[i].checked = false;
    }
    for(let i = 0; i<radioArr.length; i++){
        radioArr[i].checked = false;
    }
     fetch("checkLogin.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(function(data){  //use this instead of data=>data.success because I want to set two operations after the conditional
        if(data.success){
            setCookie(data.token); //set cookie
            hideLogin(); // hide login and replace with only logout button
            prepPostLogin();
        }   
        else{
            for(let i = 0; i<contentArr.length; i++){
                contentArr[i].innerHTML = "";
            }
            console.log("not logged in");
        }
    });
    document.getElementById("event-div").style.display = "none";
}



document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
document.getElementById("close-popup").addEventListener("click", closePopup);
shownDate = document.getElementById("full-date");
document.addEventListener("DOMContentLoaded", setup, false);
document.getElementById("right-button").addEventListener("click", forwards);
document.getElementById("left-button").addEventListener("click", backwards);
