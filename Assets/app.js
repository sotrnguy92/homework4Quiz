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

  function setTimer() {
    setInterval(function () {
      if (timer != 0 && qIndex != quesArr.length) {
        timer = timer - 1;
        $(".timer").text("Time: " + timer);
      }
    }, 1000);
  }

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
      alert("you're done");
      return;
    } else if (qIndex < quesArr.length) {
      createQuestion(qIndex);
    }
  });
});
