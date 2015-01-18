//When the document is ready we can start running the rest of our code

$(document).ready(function() {
	//Some old resizing functions...
	
  function resizeIframe(){
    $('iframe').attr("width", $(window).width());
}

$(function(){
    //initial load
    resizeIframe();
});
//on every window resize
$(window).resize(resizeIframe);

  
}); //document.ready

//This function will call the reload of the calendar frame when called.

function reload(){
	var iframe = document.getElementById('calendarFrame');
iframe.src = iframe.src;
}
