$(document).ready(function(){

    const $container = $('.container');
    const $start = $('#start');
    const $jheading = $('.jumbotron-heading');
    const $p = $('p');
    const $pLead = $('.lead');

    let quesObj = {
        q1: ["Inside which HTML element do we put the JavaScript?", '<javascript>', '<js>', '<script>', '<scripting>']
    }

    $start.on('click', function(){
        $jheading.empty();
        $p.empty();
        $jheading.text(quesObj.q1[0]);
        $ulist = $('<ul>').addClass('list-group list-group-flush');
        $p.append($ulist);
        for (let i = 1; i<quesObj.q1.length; i++){
            let $listel = $('<li>').addClass('text-left list-group-item');
            $listel.html($('<button>').addClass(' btn btn-primary my-2').text(i +': ' + quesObj.q1[i]));
            $ulist.append($listel);
        //     $btnlist = $('<button>');
        //     $btnlist.
        }

    });


})
