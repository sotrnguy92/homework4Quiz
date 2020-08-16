$(document).ready(function () {
  const $container = $(".container");
  const $start = $("#start");
  const $jheading = $(".jumbotron-heading");
  const $pCheck = $(".check");
  const $pLead = $(".lead");
  const $p = $("p");

  let qIndex = 0;
  let timer = 100;
  let highscore = [];
  let quesArr = [
    {
      q: [
        "Inside which HTML element do we put the JavaScript?",
        "<javascript>",
        "<js>",
        "<script>",
        "<scripting>",
      ],
      answer: 3,
    },
    {
      q: [
        "Where is the correct place to insert a JavaScript?",
        "the <body> section",
        "the <head> section",
        "both the <head> and <body> sections",
        "immediately before the closing </html> tag",
      ],
      answer: 1,
    },
    {
      q: [
        'What is the correct syntax for referring to an external script called "xxx.js"?',
        "<script name = 'xxx.js'>",
        "<script href = 'xxx.js'>",
        "<script class = 'xxx.js'>",
        "<script src = 'xxx.js'>",
      ],
      answer: 4,
    },
  ];

  $start.on("click", function () {
    $jheading.empty();
    $p.empty();
    setTimer();
    createQuestion(qIndex);
  });

  let setTimer = function () {
    setInterval(function () {
      if (timer != 0 && qIndex != quesArr.length) {
        timer = timer - 1;
        $(".timer").text("Time: " + timer);
      }
    }, 1000);
  };

  function createQuestion(qIndex) {
    $jheading.empty();
    $pLead.empty();
    $jheading.text(quesArr[qIndex].q[0]);
    $ulist = $("<ul>").addClass("list-group list-group-flush");
    $pLead.append($ulist);
    for (let i = 1; i < quesArr[qIndex].q.length; i++) {
      let $listel = $("<li>").addClass("text-left list-group-item");
      $listel.html(
        $("<button>")
          .addClass("answer btn btn-primary my-2")
          .text(i + ": " + quesArr[qIndex].q[i])
          .attr("index", i)
      );
      $ulist.append($listel);
    }
  }

  $(".container").on("click", "button.answer", function () {
    event.stopPropagation();
    let ind = this.getAttribute("index");

    if (parseInt(ind) === quesArr[qIndex].answer) {
      $pCheck.empty();
      $pCheck.append(
        $("<div>")
          .addClass("alert alert-light")
          .attr("role", "alert")
          .text("correct")
      );
      setTimeout(function () {
        $pCheck.empty();
      }, 1000);
      qIndex++;
    } else {
      $pCheck.empty();
      $pCheck.append(
        $("<div>")
          .addClass("alert alert-light")
          .attr("role", "alert")
          .text("incorrect")
      );
      setTimeout(function () {
        $pCheck.empty();
      }, 1000);
      timer = timer - 10;
      $(".timer").text("Time: " + timer);
      qIndex++;
    }
    if (qIndex === quesArr.length) {
      // display the highscore screen
      $jheading.text("All Done!");
      $pLead.text("Your score is: " + timer);
      $pLead.append('</br> Your Initials <input type="text" id="myText" >');
      $('input').val('');
      $pLead.append($("<button>").addClass("submit").text("Submit"));
      $(document).on("click", "button.submit", function () {
        event.stopPropagation();
        scoreScreen();
      });

      return;
    } else if (qIndex < quesArr.length) {
      createQuestion(qIndex);
    }
  });

  function scoreScreen() {
    let currentScore = {};
    currentScore["initials"] = $("#myText").val();
    currentScore["score"] = timer;
    highscore.push(currentScore);
    viewScores();
  }

  function viewScores() {
    const $ul = $("<ul>").addClass("list-group list-group-flush");
    $jheading.text("Highscores");
    $pLead.empty();
    highscore.forEach((element) => {
      if(element.initials != undefined){
      const $li = $("<li>").addClass("badge list-group-item text-left");
      $ul.append($li.append(element.initials + ": " + element.score));
  }
});
    $pLead.append($ul);
    $pLead.append($("<button>").addClass("restart").text("Restart"));
    $(document).on("click", "button.restart", function () {
      event.stopPropagation();
      qIndex = 0;
      timer = 100;
      createQuestion(qIndex);
    });
    $pLead.append($("<button>").addClass("clear").text("Clear Scores"));
    $(document).on("click", "button.clear", function () {
      event.stopPropagation();
      highscore = [];
      viewScores(qIndex);
    });
  }
  $(document).on("click", "h5.highscores", function () {
    event.stopPropagation();
    qIndex = quesArr.length;
    viewScores(qIndex);
  });


});
