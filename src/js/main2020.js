$.getJSON("https://sfc-project-files.s3.amazonaws.com/project-feeds/interactive_projects_list_2020.json", function(data){

	for (var i = 0; i < data.length; i++) {

	  if (data[i].best_of) {
      $("#best-projects").append(
      	"<div class='best-proj'><a target='_parent' href=' " +
      	data[i].link + "'>" +
      	"<div class='img'><svg viewBox='0 0 16 8'></svg><img src='"+data[i].wcm_image+"'></div>" +
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

		console.log(data[i].title )

	}



});
