$.getJSON("//extras.sfgate.com/editorial/sheetsdata/projectslist2017.json?", function(data){

	for (var i = 0; i < data.length; i++) {

	  if (data[i].best_of) {
      $("#best-projects").append(
      	"<div class='best-proj'><a target='_parent' href=' " + 
      	data[i].link + "'>" + 
      	"<div class='img'><img src='"+data[i].wcm_image+"'>" +  
      	"<div class='title'>" + 
      	data[i].title + "</div>" +
      	"</div>"
      );
	  }

	  else  {
	      $("#projects").append(
      	"<div class='proj'><a target='_parent' href=' " + 
      	data[i].link + "'>" + 
      	"<div class='img'><img src='"+data[i].wcm_image+"'>" +  
      	"<div class='title'>" + 
      	data[i].title + "</div>" +
      	"</div>"
      );
	  }

	}



});
