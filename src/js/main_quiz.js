$.getJSON("https://extras.sfgate.com/editorial/sheetsdata/quizfeed.json", function(data){
  var i = 0;
  var categorySet = [];
  // Sort data by date
  data.sort(function(a,b){
    return new Date(b['Pub Date']) - new Date(a['Pub Date']);
  });
  console.log("SORTED!", data);
  // Get all possible categories
  for (i = 0; i < data.length; i++) {
    if (categorySet.indexOf(data[i]['Department']) == -1){
      categorySet.push(data[i]['Department']);
      var categoryDiv = $("<div>", {
        class: "section-wrapper " + data[i]['Department'].toLowerCase().split(' ').join('_').split(':').join(''),
        html: `<h2>${data[i]['Department']}</h2>
          <div class='quiz-section'></div>`
      })
      $("#quizzes").append(categoryDiv);
    }
  }
  // Iterate through all rows
  var highlightCount = 0;
  for (i = 0; i < data.length; i++) {
    // Assign byline html if one exists
    var bylineHTML = "";
    if (data[i].Byline){
      bylineHTML = `<div class='quiz-byline'>By ${data[i].Byline}</div>`;
    }

    // Only handle if Done? is yes
    if (typeof data[i]['Done?'] != "undefined" && data[i]['Done?'].toLowerCase() == 'yes'){
      if (highlightCount < 3) {
        // Only show the most recent 3 as highlights
        highlightCount++;
        $("#best-projects").append(
        `<div class='best-proj'>
          <a target='_parent' href='${data[i].URL}'>
            <div class='img-box' style='background-image:url(${data[i].Thumbnail})'></div>
            <div class='title quiz-title'>${data[i].Quiz}</div>
          </a>
          ${bylineHTML}
        </div>`);     
      } else {
        $("." + data[i]['Department'].toLowerCase().split(' ').join('_').split(':').join('') + " .quiz-section").append(
        `<div class='proj'>
          <a target='_parent' href='${data[i].URL}'>
            <div class='img-box' style='background-image:url(${data[i].Thumbnail})'></div>
            <div class='title quiz-title'>${data[i].Quiz}</div>
          </a>
          ${bylineHTML}
        </div>`);   
      }
    }
        
  }

});
