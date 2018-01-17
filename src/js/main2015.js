$.getJSON("//extras.sfgate.com/editorial/sheetsdata/projectslist2015.json", function(data){

	for (var i = 0; i < data.length; i++) {

    $("#best-projects").append(
    	"<div class='best-proj'><a target='_parent' href=' " + 
    	data[i].link + "'>" + 
    	"<div class='img'><img src='"+data[i].wcm_img+"'>" +  
    	"<div class='title'>" + 
    	data[i].title + "</div>" +
    	"</div>"
    );
    
	}
});
