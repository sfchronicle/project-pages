var array_move = function(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
        arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

$.getJSON("https://sfc-project-files.s3.amazonaws.com/project-feeds/sfchronicle_trivia_quiz_schedule_newsquizzes.json", function(data){
  var i = 0;
  var highlightCount = 0;
  var highlightItems = [];
  // Sort data by date
  data.sort(function(a,b){
    return new Date(b['Pub Date']) - new Date(a['Pub Date']);
  });

  // Get the top 3 highlights 
  for (i = 0; i < data.length; i++) {
    if (data[i].Highlight && data[i].Highlight.toLowerCase() == "yes" && highlightItems.length < 3){
      // Add index to array
      highlightItems.unshift(i);
    }
  }
  // Cycle through array and push highlights to front
  for (i = 0; i < highlightItems.length; i++){
    array_move(data, highlightItems[i], 0);
  }

  // Now place all quizzes on page
  for (i = 0; i < data.length; i++) {
    // Assign byline html if one exists
    var bylineHTML = "";
    if (data[i].Byline){
      bylineHTML = `<div class='quiz-byline'>By ${data[i].Byline}</div>`;
    }

    // Get publish var 
    var shouldPublish = data[i]['Publish to Page'];

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
        $(".quiz-section").append(
        `<div class='proj'>
          <a target='_parent' href='${data[i].URL}'>
            <div class='img-box' style='background-image:url(${data[i].Thumbnail})'></div>
            <div class='quiz-department'>${data[i].Department}</div>
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
