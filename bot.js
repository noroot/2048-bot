/**
 * 2048 game bot
 * usage: startgame and paste code to browser development console
 */

function explode( delimiter, string ) {	// Split a string by string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: kenneth
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	var emptyArray = { 0: '' };

	if ( arguments.length != 2
		|| typeof arguments[0] == 'undefined'
		|| typeof arguments[1] == 'undefined' )
	{
		return null;
	}

	if ( delimiter === ''
		|| delimiter === false
		|| delimiter === null )
	{
		return false;
	}

	if ( typeof delimiter == 'function'
		|| typeof delimiter == 'object'
		|| typeof string == 'function'
		|| typeof string == 'object' )
	{
		return emptyArray;
	}

	if ( delimiter === true ) {
		delimiter = '1';
	}

	return string.toString().split ( delimiter.toString() );
}

function keyDown(evt)
{
    var key;
//    var el  =  document.getElementById("hack");
    var left;
    if(!evt)
    {
        evt = window.event;
        if(!evt.which)
        {
            key  =  evt.keyCode;   
        }
    }
	else if(evt)
    {
        key = evt.which;   
    }	
}

function fireKey(el, key)
{
	
//	var keys = [37, 38, 39,40];
//	var key = keys[Math.floor(Math.random() * keys.length)];
	

    if(document.createEventObject)
    {
        var eventObj = document.createEventObject();
        eventObj.keyCode = key;
        el.fireEvent("onkeydown", eventObj);   
    }
	else if(document.createEvent)
    {
        var eventObj = document.createEvent("Events");
        eventObj.initEvent("keydown", true, true);
        eventObj.which = key;
        el.dispatchEvent(eventObj);
    } 
	
	// console.log('fire');
}


function logscore() 
{
	var tiles = [128, 256, 512, 1024, 2048];
	var arlen = tiles.length;
	for(var i = 0; i <= arlen;i++) 
	{
		score = tiles[i];
		if (document.getElementsByClassName("tile-" + score).length != 0)
		{
			console.log("MAX SCORE=" + score);
		}
		else
		{
			console.log("FAIL");
		}
	}
}

// define key codes

var left = 37;
var up = 38;
var right = 39;
var down = 40;

var clicks = 0;
var tries = 0;


document.documentElement.focus();
document.onkeydown = keyDown;


//var fired = 0;
var matrix_object = [];
var matrix = [];
var selected_turn = 0;
var	prefered_turn = 0;


var gamebox = document.getElementsByClassName("game-container")[0];


function calculate_turn()
{
	var fired = 0;
	
	var arr = document.getElementsByClassName('tile');
	selected_turn = 0;
	prefered_turn = 0;

	var turns = [];	
	matrix_object = [];

	// prepare object for more smart solving (not used in future)
	for(var i=0; i <= arr.length; i++)
	{
		var el = arr[i];
		if (el)
		{
			var t = explode("-", el.classList[1]);
			var tilescore = t[1];
			var t = explode("-", el.classList[2]);
			var tp = {'score': tilescore, 'x':t[2], 'y':t[3]};
			if (tp.x!=='undefined')
			{
				matrix_object.push(tp);
			}
		}
		
	}
	
	// TODO:
	// make clever work here
	

	// until clever work done just go random
	if (prefered_turn == 0 || selected_turn == 0)
	{
		var keys = [up,right,down]; // tricky turns, without left turn in case of win
		var key = keys[Math.floor(Math.random() * keys.length)];
		selected_turn = key;
	}
	return selected_turn;
}

function make_turn()
{
	
	if (document.getElementsByClassName("game-over").length > 0)
	{
		console.clear();
		logscore();
		tries++;
		console.log("Restart (" + tries + ", "+clicks+")");
		clicks = 0;
		document.getElementsByClassName("restart-button")[0].click();
		
	}
	else if (document.getElementsByClassName("game-won").length > 0)
	{
		clearInterval(interval);
		console.log("win");
	}
	else
	{
		clicks++;
		var turn = calculate_turn();
		fireKey(gamebox, turn);
		
	}
	
}

var interval = setInterval(make_turn, 500);
console.log(matrix_object);