$.getJSON("https://sfc-project-files.s3.amazonaws.com/project-feeds/interactive_projects_list_2015.json", function(data){

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
