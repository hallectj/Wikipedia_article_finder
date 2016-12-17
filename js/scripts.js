$(document).ready(function(){
  translateWikiDiv();
});

function translateWikiDiv(){  
  $("#wiki_search").bind("keypress", function(e){
    if(e.keyCode == 13){
      $("#wiki_search_btn").trigger("click");
    }
  });
  
  
  $("#wiki_search_btn").on("click", function(){
    getWikis();
    $(".wiki_headline_div").animate({
      top: "+20%"
    }, 500, resultBoxesAnimate);
  });
}

function resultBoxesAnimate(){
  //only need wiki_headline_div class once and never again for animation.
  $(".wiki_headline_div").removeClass("wiki_headline_div");
  $(".result_boxes").each(function(index){
    $(this).delay(250*index).fadeIn(450);
  });
}

function getWikis(){
  //Resets the result wrapper to nothing prior to start
  //that way every ajax call won't append itself to the old
  $("#result_wrapper").html("");
  setTimeout(function(){
      resultBoxesAnimate();
  }, 500);
  
  var searchTerm = $("#wiki_search").val();
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&limit=10&callback=?"
  $.ajax({
    type: "GET",
    dataType: "json",
    url: url,
    success: function(response){
      //console.log(response);
      var out = $("#result_wrapper");
      for(var i = 0; i<response[1].length; i++){
        out.prepend("\
            <div class='panel panel-default result_boxes'>\
              <div class='panel-heading panel-bg'>\
                <h2 class='title panel-title'>" + response[1][i] + "</h2>\
              </div>\
              <div class='panel-body'>\
                <p>" + response[2][i] + "  \
                  <br><a href='" + response[3][i] + "'>Read More...</a>" + "</p>\
              </div>\
            </div>\
        ");
      }
    },
    error: function(err){
      console.log("error ", err.statusText);
    }
  }); 
}