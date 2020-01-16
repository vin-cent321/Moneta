import React from "react";
import './MatchIt.css';
import jquery from 'jquery';
var JQ = jquery;

function matchit() {
    var order = [];             // array to contain images 
        var disorder = [];          // array randomized for game display
        var randQ = [];             // array of potential 'find a ____' elements
        var query, item;
        var points = 0;
        // arrays 0-11 awaiting DB name and image of relative
        var fam0 = [];
        var fam1 = [];
        var fam2 = ['Vermin Supreme','https://tinyurl.com/r7nx2kv'];
        var fam3 = [];
        var fam4 = [];
        var fam5 = [];
        var fam6 = ['Rent is too damn high','https://tinyurl.com/tz9c5x5'];
        var fam7 = [];
        var fam8 = [];
        var fam9 = [];
        var fam10 = [];
        var fam11 = ['Grandpa Harold', 'https://tinyurl.com/upsbrvm'];
        // arrays prefilled with images for game
        var birds = ['bird','https://tinyurl.com/uykf59u','https://tinyurl.com/vmyheeb'];
        var cats = ['cat','https://tinyurl.com/wa2kax4','https://tinyurl.com/vuytnfd'];
        var people = ['person','https://tinyurl.com/s5ktf3a','https://tinyurl.com/vcgadry'];
        var cars = ['car','https://tinyurl.com/ujw7s8z','https://tinyurl.com/ucls739'];
        
        var burgers = ['burger','https://tinyurl.com/rpkd9wg','https://tinyurl.com/ty27utc'];
        var squirrels = ['squirrel','https://tinyurl.com/rufez6w','https://tinyurl.com/upky2yv'];
        var buildings = ['building','https://tinyurl.com/rgtjql4','https://tinyurl.com/tahqdsj'];
        var pies = ['pie','https://tinyurl.com/qklvdt2','https://tinyurl.com/s6ce9nz'];
    
        var lamps = ['lamp','https://tinyurl.com/vmccxdk','https://tinyurl.com/qrqa9dv'];
        var plants = ['plant','https://tinyurl.com/utuz77l','https://tinyurl.com/u3xrbx7'];
        var buckets = ['bucket','https://tinyurl.com/unmhn8j','https://tinyurl.com/v9n7ukm'];
        var balls = ['ball','https://tinyurl.com/snecm65','https://tinyurl.com/rvkkmj3'];

        // calls buildA which pushes 1 of each image url from presets
        // then checks fam0-fam11 to replace order with fam data if it exists
        //      buildOrder();
        // uses randQ and rand() to find 1 random query ('find the bird') 
        //      buildQ()
        // initializes game
        game()
        // takes x (array.length) and returns a random int from 0-x
        function rand(x){
            return Math.floor(Math.random() * x);
        }
        // takes x (preset image array)
        // pushes 'array title' into RandQ from x[0]
        // slices 'array title' and pushes 1 image from x array
        function buildA(x){
            randQ.push(x[0])
            x = x.slice(1,x.length);
            order.push(x[rand(x.length)]);
        }
        // dumps arrays for reuse
        // calls buildA(x) to form question options and centralize game imgs
        // uses hasData to repalce presets with family data
        function buildOrder(){
            order = [];
            disorder = [];
            randQ = [];
            
            buildA(birds);
            buildA(cats);
            buildA(people);
            buildA(cars);
            
            buildA(burgers);
            buildA(squirrels);
            buildA(buildings);
            buildA(pies);
            
            buildA(lamps);
            buildA(plants);
            buildA(buckets);
            buildA(balls);
            
            hasData(fam0,0);
            hasData(fam1,1);
            hasData(fam2,2);
            hasData(fam3,3);
            hasData(fam4,4);
            hasData(fam5,5);
            hasData(fam6,6);
            hasData(fam7,7);
            hasData(fam8,8);
            hasData(fam9,9);
            hasData(fam10,10);
            hasData(fam11,11);
            console.log(randQ);
        };
        
        // takes x (fam array) and y (index) to replace preset at y index with fam data iff exists
        function hasData(x,y) {
            if(x.length>0){
                order[y] = x[1];
                randQ[y] = x[0];
            };
        };
        
        // randomly selects 1 index from RandQ to form the 'find the ___' question
        function buildQ(){
            query = randQ[rand(randQ.length)];
            JQ('.question').text(`Find the JQ{query}`)
        };

        function inArray(x) {
                if (fam0.includes(x)) {return fam0[0]}
                if (fam1.includes(x)) {return fam1[0]}
                if (fam2.includes(x)) {return fam2[0]}
                if (fam3.includes(x)) {return fam3[0]}
                if (fam4.includes(x)) {return fam4[0]}
                if (fam5.includes(x)) {return fam5[0]}
                if (fam6.includes(x)) {return fam6[0]}
                if (fam7.includes(x)) {return fam7[0]}
                if (fam8.includes(x)) {return fam8[0]}
                if (fam9.includes(x)) {return fam9[0]}
                if (fam10.includes(x)) {return fam10[0]}
                if (fam11.includes(x)) {return fam11[0]}
                if (birds.includes(x)) {return birds[0]}
                if (cats.includes(x)) {return cats[0]}
                if (people.includes(x)) {return people[0]}
                if (cars.includes(x)) {return cars[0]}
                if (burgers.includes(x)) {return burgers[0]}
                if (squirrels.includes(x)) {return squirrels[0]}
                if (buildings.includes(x)) {return buildings[0]}
                if (pies.includes(x)) {return pies[0]}
                if (lamps.includes(x)) {return lamps[0]}
                if (plants.includes(x)) {return plants[0]}
                if (buckets.includes(x)) {return buckets[0]}
                if (balls.includes(x)) {return balls[0]}
            }
        function game() {
            JQ('.cont').html(' ');
            JQ('.answer').html('&nbsp;');
            JQ('img').removeClass('fade')
            buildOrder();
            buildQ()
            score(0);
            let x;
            while (disorder.length !== order.length) {
                x = order[rand(order.length)];
                if (!disorder.includes(x)) disorder.push(x);
            };
            for (var i=0;i<disorder.length;i++){
                JQ('.cont').append(`<img src=JQ(disorder[i]) className='image' alt=' '>`);
            };
        }
        function score(x) {
            points += x
            JQ('.scorecard').text('Score: ' + points);
        }
        // dumps .cont to remove previous imgs
        // declares x 
        // while disorder and order are !=
        // adds random index from order to disorder if not already in disorder
        // appends all indexes from disorder into .cont with <img> tags
        // calls buildOrder to create a new list for next game 
        JQ('.btn').on('click',function(){ 
            JQ('.cont').html(' ');
            let x;
            while (disorder.length !== order.length) {
                x = order[rand(order.length)];
                 if (!disorder.includes(x)) disorder.push(x);
            };
            for (var i=0;i<disorder.length;i++){
                JQ('.cont').append(<img src={disorder[i]} className='image' alt='' />)
            };
            buildOrder();
        })
        
        // checks to see if img clicked == query and returns yes/no
        // Unexpected behaviour only runs once 
        JQ(document).on('click', '.image', function(){
            console.log(JQ(this)[0].src)
            JQ('img').addClass('fade')
            JQ(this).removeClass('fade')
            item = JQ(this)[0].src
            if (inArray(item) === query) {
                JQ('.answer').text(`Yes, that is a JQ{query}.`)
                score(1)
            }else {
                JQ('.answer').text(`No, that is not a JQ{query}. It is a JQ{inArray(item)} `)
                }
            setTimeout(function(){ game(); }, 3000);
        })
}

function MatchIt() {
    matchit()
    setTimeout(function(){ 
        return (
            <>
        <div className="question" id="question">&nbsp;</div>
        <div className="answer" id="answer">&nbsp;</div>
        <div className="cont" id="cont"></div>
        <div className='scorecard'> &nbsp;</div>
            </>
        );
    },5000)
    
}

export default MatchIt;