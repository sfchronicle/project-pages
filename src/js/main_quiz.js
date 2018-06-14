$.getJSON("https://extras.sfgate.com/editorial/sheetsdata/quizfeed.json", function(data){
  var i = 0;
  var categorySet = [];
  // Sort data by date
  data.sort(function(a,b){
    return new Date(b['Pub Date']) - new Date(a['Pub Date']);
  });
  //console.log(data);
  // Iterate through all rows
  var highlightCount = 0;
  for (i = 0; i < data.length; i++) {
    // Assign byline html if one exists
    var bylineHTML = "";
    if (data[i].Byline){
      bylineHTML = `<div class='quiz-byline'>By ${data[i].Byline}</div>`;
    }

    // Get publish var because it reads in a little weird
    var shouldPublish = data[i]['Publish to Page'];
    if (!shouldPublish){
      shouldPublish = data[i]['Publish to Page '];
    }

    // Only handle if Publish to Page is yes
    if (shouldPublish && shouldPublish.toLowerCase() == 'yes'){
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
        // First, make sure there's a place for the item to appear
        if (categorySet.indexOf(data[i]['Department']) == -1){
          categorySet.push(data[i]['Department']);
          var categoryDiv = $("<div>", {
            class: "section-wrapper " + data[i]['Department'].toLowerCase().split(' ').join('_').split(':').join(''),
            html: `<h2>${data[i]['Department']}</h2>
              <div class='quiz-section'></div>`
          })
          $("#quizzes").append(categoryDiv);
        }

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

  // Get empty sections
  var removalArray = [];
  $(".quiz-section").each(function(index, item){
    if ($(this).html() == ""){
      removalArray.push($(this).closest(".section-wrapper"));
    }
  });
  // Remove them
  for (i = 0; i < removalArray.length; i++){
    removalArray[i].remove();
  }

});
