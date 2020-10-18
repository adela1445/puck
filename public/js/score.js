const endMusic = document.querySelector("#dogLaugh");
$(document).ready(function() {
const id = localStorage.getItem("name");
  $("#scoreTransition").hide();
  $("#scoreTransition").fadeIn(400);
  endMusic.play();
  $.get("/api/user_data").then(data => {
    $(".userName").text(data.email);
  });
  $.get("/api/save/" + id).then(data => {
    
   let sort = data.sort( (a, b) => {
      return parseFloat(b.score) - parseFloat(a.score);
  });
    for (let i = 0; i < 10; i++) {
      let scoreCol = $("<p>").text(sort[i].score)
      let levelCol= $("<p>").text(sort[i].level)
    $("#scores").append(scoreCol);
      $("#level").append(levelCol);
    }
  });
});