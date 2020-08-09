$(document).ready(function(){

    const $container = $('.container');
    const $start = $('#start');
    const $jheading = $('.jumbotron-heading');
    const $p = $('p');
    const $pLead = $('.lead');

    let quesObj =[ 
    {
        q: ["Inside which HTML element do we put the JavaScript?", '<javascript>', '<js>', '<script>', '<scripting>'],
        answer: 2

    }
]

    $start.on('click', function(){
        $jheading.empty();
        $p.empty();
        createQuestion();
    });
    
    function createQuestion(questionindex){
        $jheading.text(quesObj[0].q[0]);
        $ulist = $('<ul>').addClass('list-group list-group-flush');
        $p.append($ulist);
        for (let i = 1; i<quesObj[0].q.length; i++){
            let $listel = $('<li>').addClass('text-left list-group-item');
            $listel.html($('<button>').addClass('answer btn btn-primary my-2').text(i +': ' + quesObj[0].q[i]).attr('index',i));
            $ulist.append($listel);
        }
    }

    $('.container').on('click', 'button.answer' , function(){
        event.stopPropagation();
        console.log($(this).attr('index'));
    })

})
