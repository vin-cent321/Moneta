import React from 'react';
import './Findit.css';

function findit() {
    // prepare cards
    let card = []
    // prepare query
    let query;
    // store title related img urls
    let birds = ['bird','https://tinyurl.com/uykf59u','https://tinyurl.com/vmyheeb'];
    let cats = ['cat','https://tinyurl.com/wa2kax4','https://tinyurl.com/vuytnfd'];
    let people = ['person','https://tinyurl.com/s5ktf3a','https://tinyurl.com/vcgadry'];
    let cars = ['car','https://tinyurl.com/ujw7s8z','https://tinyurl.com/ucls739'];
    // prepare organization of master array
    var order = [];
    // randomize
    function rand(x){
        return Math.floor(Math.random() * x);
    };
    let randQ = [];
    // takes titled image url and pushes it into order array
    function buildA(x){
        for(var i=0;i<x.length;i++){
            order.push(x[i])
        };
    };
    // pushing each sub array into main array
    function buildOrder(){
        buildA(birds);
        buildA(cats);
        buildA(people);
        buildA(cars);
    }
    buildOrder();
    // verifying image pushes
    console.log('order', order);
    // shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        };
        // screen output shuffled
        $('.cont').append('<hr>');
        for (var i=0; i<order.length;i++){
            if (order[i][0] === 'h'){
                let alt;
                if (birds.includes(order[i])) {
                    alt='bird'
                };
                if (cats.includes(order[i])) {
                    alt='cat'
                };
                if (people.includes(order[i])) {
                    alt='person'
                };
                if (cars.includes(order[i])) {
                    alt='car'
                };
                $('.cont').append(`<img src=${order[i]} id=${i} alt=${alt} />`);
            }
        }
            console.log('disorder', order);
    }
    // call to shuffle
    shuffleArray(order);
    // check status and win condition
    function buildQ(){
        randQ =[];
        for (var i=0; i<order.length;i++){
            if (order[i][0] != 'h'){
                randQ.push(order[i])
            };
        };
        console.log('randQ =',randQ);
        query = randQ[rand(randQ.length)];
        $('.question').text(`Find the ${query}`);
    }
    buildQ();

    $('img').on('click',function(){
        console.log($(this)[0].src,$(this)[0].alt);
        let item = $(this)[0].alt;
        if (item === query) {
            $('.answer').text(`Yes, that is a ${query}.`)
        }else {
        $('.answer').text(`No, that is not a ${query}, it is a ${item} `)
        };
        // reset game IS BROKEN I DONT GET IT
        // $('.cont').html('')
        // console.log('\n Empty order',order)
        // buildOrder()
        // console.log('\n Filled order',order)
        // shuffleArray(order)
        // console.log('\n Shuffled order',order)
        // buildQ()
        // console.log('New query built', query)
    });
};

function Findit() {
    return (
        <>
            <div class="head" id="head"></div>
            <div class="body" id="body">
                <div class="question" id="question"></div>
                <div class="cont" id="cont"></div>
                <div class="answer" id="answer"></div>
            </div>
            <div class="foot" id="foot"></div>
        </>
    );
};

export default Findit;