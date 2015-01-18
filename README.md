# calendar-demo
Just a little demo of a little calendar event app I made. Might perfect it later and give it more functionality and fix more bugs.


Things to keep in mind:

- I was going to alow it to refresh on event add, however sometimes it takes time for an event to be added, so instead I created a button on the top that allows the user to refresh the calendar.

- Used JQuery mobile for this one, but made sure it works fine both on mobile devices as well as computers.

- There are 2 actual projects in here, I might eventually combine them using a JavaScript condition statement that would check for the browser and choose which version to use. One uses HTML 5 date-time input to get the times from the user, it is my favorite, and looks the best, but it does have some compability issues, so I've created the "regular version" with drop downs. This doesn't look as pretty (there is of course a way to use the CSS to make it look prettier, but I didn't do it for this project), but it solves the compability issue. 

How it actually works:

The calendar itself is embedded. I've chosen the agenda view, as it just lists all the events. The button on the top refreshes the calendar. The button below the calendar does the "event adding magics". When you press it, it opens a JQuery mobile dialog which contains a form. That form in turn when submitted updates a google docs spreadsheet. That spreadsheet has a Google Script in it (which I post here), which is triggered on form submit. It takes the recently added fields and if all is well with the data it adds it as an event into the public calendar I've created. Sometimes it takes some time to add the event, but that's a Google Calendar thing. After the form is submitted and while the google script is running, the onsubmit event fires which sends the user to the very-JQuery-mobile-looking thank you dialog, which informs the user that form data has been sent.

Here's the Google Script that is connected to our spreadsheet:

//Here we enter the ID for our public calendar in the app...
var calendarId = "oph92dqr1vcn0hgia89c7b0kt8@group.calendar.google.com";
 
//Let's begin with setting our variables.
 
//Column containg the Start Date/Time for the event
var startDtId = 3;
//Column containg the End Date/Time for the event
var endDtId = 4;
//Column containg the title of our event
var titleId = 2;
//Column containg the description for the event
var descId = 5;
//Column containg the Time Stamp for the event (We need this! And it's always 1, no matter what script your create).
var formTimeStampId = 1;
 
function getLatestAndSubmitToCalendar() {
//Allow access to our spreadsheet which contains the events and get the rows
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var lr = rows.getLastRow();
//Date time...
  var startDt = sheet.getRange(lr,startDtId,1,1).getValue();
  var endDt = sheet.getRange(lr,endDtId,1,1).getValue();
//Setting the description of the event
  var desc = sheet.getRange(lr,descId,1,1).getValue();
//Put the value of the title into the variable
  var title = sheet.getRange(lr,titleId,1,1).getValue();
  //At this point we have all the variables: we can safely run out function to create the event
    createEvent(calendarId,title,startDt,endDt,desc);
};
 
 //This function creates the event.
 
function createEvent(calendarId,title,startDt,endDt,desc) {
  var cal = CalendarApp.getCalendarById(calendarId);
  var start = new Date(startDt);
  var end = new Date(endDt);
//I've manually set the location for every event to be in Gainesville, Fl, which is easy to change if I would add a row into the sheet and a field into the form, if we did that we would be able to retreive our location the same way we did other fields.
  var loc = 'Gainesville, Fl';
 
//Here's where we set the event. 
  var event = cal.createEvent(title, start, end, {
      description : desc,
      location : loc
  });
};


Cheers!
