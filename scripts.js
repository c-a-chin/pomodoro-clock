// store clock data (MSD = most significant digit, LSD = least significant digit)
var minuteMsd = Number($("#minute-msd").text()),
    minuteLsd = Number($("#minute-lsd").text()),
    secondMsd = Number($("#second-msd").text()),
    minuteLsd = Number($("#second-lsd").text()),
    isRunning = false; //to check to timer should be running

// buttons to increase/decrease timer will increase/decrease LSD, only change MSD if necessary
// will pass in named functions so we can turn the buttons off/on when timer starts/stops
// if LSD gets increased past 9, set to 0 and add 1 to MSD
function minuteIncrease(){
	$("#minute-up").click(function(){
		minuteLsd = Number($("#minute-lsd").text());
		minuteMsd = Number($("#minute-msd").text());

		if(minuteLsd+1 > 9){
			minuteLsd = 0;
			minuteMsd += 1;
			// animate the text change
			$("#minute-lsd").slideUp(function(){
				$("#minute-lsd").text(minuteLsd);
				$("#minute-lsd").slideDown();
			})
			
			$("#minute-msd").slideUp(function(){
				$("#minute-msd").text(minuteMsd);
				$("#minute-msd").slideDown();
			})
		} else{
			minuteLsd += 1;
			// animate the text change
			$("#minute-lsd").slideUp(function(){
				$("#minute-lsd").text(minuteLsd);
				$("#minute-lsd").slideDown();
			})
		}
	})
}

// if LSD gets decreased past 0 AND MSD is 0, set both to 0 (cant go under 0:0)
// if LSD gets decreased past 0, set to 9 and subtract 1 from MSD
function minuteDecrease(){
	$("#minute-down").click(function(){
		minuteLsd = Number($("#minute-lsd").text());
		minuteMsd = Number($("#minute-msd").text());

		if(minuteLsd-1 < 0 && minuteMsd == 0){
			$("#minute-lsd").slideUp(function(){
				$("#minute-lsd").text('0');
				$("#minute-lsd").slideDown();
			})
			
			$("#minute-msd").slideUp(function(){
				$("#minute-msd").text('0');
				$("#minute-msd").slideDown();
			})
		}
		else if(minuteLsd-1 < 0){
			minuteLsd = 9;
			minuteMsd -= 1;
			// animate the text change
			$("#minute-lsd").slideUp(function(){
				$("#minute-lsd").text(minuteLsd);
				$("#minute-lsd").slideDown();
			})
			
			$("#minute-msd").slideUp(function(){
				$("#minute-msd").text(minuteMsd);
				$("#minute-msd").slideDown();
			})
		} else{
			minuteLsd -= 1;
			// animate the text change
			$("#minute-lsd").slideUp(function(){
				$("#minute-lsd").text(minuteLsd);
				$("#minute-lsd").slideDown();
			})
		}
	})
}

// seconds cannot increase past 59, if so, set to 0
function secondIncrease(){
	$("#second-up").click(function(){
		secondLsd = Number($("#second-lsd").text());
		secondMsd = Number($("#second-msd").text());

		if(secondLsd+1 > 9 && secondMsd == 5){ //if increase past 59 seconds change seconds to 0 and add 1 minute
			$("#second-lsd").slideUp(function(){
				$("#second-lsd").text('0');
				$("#second-lsd").slideDown();
			})
			
			$("#second-msd").slideUp(function(){
				$("#second-msd").text('0');
				$("#second-msd").slideDown();
			})

			$("#minute-up").click();
		}
		else if(secondLsd+1 > 9){
			secondLsd = 0;
			secondMsd += 1;
			// animate the text change
			$("#second-lsd").slideUp(function(){
				$("#second-lsd").text(secondLsd);
				$("#second-lsd").slideDown();
			})
			
			$("#second-msd").slideUp(function(){
				$("#second-msd").text(secondMsd);
				$("#second-msd").slideDown();
			})
		} else{
			secondLsd += 1;
			// animate the text change
			$("#second-lsd").slideUp(function(){
				$("#second-lsd").text(secondLsd);
				$("#second-lsd").slideDown();
			})
		}
	})
}

function secondDecrease(){
	$("#second-down").click(function(){
		secondLsd = Number($("#second-lsd").text());
		secondMsd = Number($("#second-msd").text());

		if(secondLsd-1 < 0 && secondMsd == 0){ //if decrease past 0 seconds change seconds to 59 and subtract 1 minute
			$("#second-lsd").slideUp(function(){
				$("#second-lsd").text('9');
				$("#second-lsd").slideDown();
			})
			
			$("#second-msd").slideUp(function(){
				$("#second-msd").text('5');
				$("#second-msd").slideDown();
			})

			$("#minute-down").click();
		}
		else if(secondLsd-1 < 0){
			secondLsd = 9;
			secondMsd -= 1;
			// animate the text change
			$("#second-lsd").slideUp(function(){
				$("#second-lsd").text(secondLsd);
				$("#second-lsd").slideDown();
			})
			
			$("#second-msd").slideUp(function(){
				$("#second-msd").text(secondMsd);
				$("#second-msd").slideDown();
			})
		} else{
			secondLsd -= 1;
			// animate the text change
			$("#second-lsd").slideUp(function(){
				$("#second-lsd").text(secondLsd);
				$("#second-lsd").slideDown();
			})
		}
	})
}

// set button event listeners
$("#minute-up").click(minuteIncrease());
$("#minute-down").click(minuteDecrease());
$("#second-up").click(secondIncrease());
$("#second-down").click(secondDecrease());

// ERROR HANDLING EVENT LISTENERS FOR CONTENTEDITABLE DIVS -- time is editable manually if user doesnt want to use buttons
// if anything other than the right numbers are entered, reset to previous numbers
// on focus in, store current values in temp variables
var tempMinuteLsd, tempMinuteMsd, tempSecondLsd, tempSecondMsd;
$("#minute-msd, #minute-lsd, #second-msd, #second-lsd").focus(function(){
	tempMinuteLsd = $("#minute-lsd").text();
	tempMinuteMsd = $("#minute-msd").text();
	tempSecondLsd = $("#second-lsd").text();
	tempSecondMsd = $("#second-msd").text();
})
// on focus out, change value back to previous if necessary
$("#minute-msd").focusout(function(){
	// use regexp to test if input was anything other than 0-9, or longer than 2 chars
	var re = /[^0-9]/g;
	if(re.test($(this).text()) || $(this).text().length > 1){
		$(this).text(tempMinuteMsd);
		minuteMsd = Number($("#minute-msd").text());
	}
})
$("#minute-lsd").focusout(function(){
	// use regexp to test if input was anything other than 0-9, or longer than 2 chars
	var re = /[^0-9]/g;
	if(re.test($(this).text()) || $(this).text().length > 1){
		$(this).text(tempMinuteLsd);
		minuteLsd = Number($("#minute-lsd").text());
	}
})
$("#second-lsd").focusout(function(){
	var re = /[^0-9]/g;
	if(re.test($(this).text()) || $(this).text().length > 1){
		$(this).text(tempSecondLsd);
		secondLsd = Number($("#second-lsd").text());
	}
})
// MSD for second counter can only be 0-5
$("#second-msd").focusout(function(){
	// use regexp to test if input was anything other than 0-5
	var re = /[^0-5]/g;
	if(re.test($(this).text()) || $(this).text().length > 1){
		$(this).text(tempSecondMsd);
		secondMsd = Number($("#second-msd").text());
	}
})





// START/PAUSE/RESET BUTTONS
var interval; //declare interval globally so we can access in start/pause functions
$("#start-button").click(function(){
	interval = setInterval(function(){
		// if timer is up, stop timer and play alarm sound
		if(minuteMsd == 0 && minuteLsd == 0 &&
			secondMsd == 0 && secondLsd == 0){
			$("#pause-button").click();
			$("#reset-button").click();
		} else{
			// else, count timer down 1 second
			$("#second-down").click();
		}
	}, 1000);
})
$("#pause-button").click(function(){
	clearInterval(interval);
})

$("#reset-button").click(function(){
	$("#minute-msd").text("2");
	$("#minute-lsd").text("5");
	$("#second-lsd, #second-msd").text("0");

	minuteMsd = $("#minute-msd").text();
	minuteLsd = $("#minute-lsd").text();
	secondMsd = $("#second-msd").text();
	secondLsd = $("#second-lsd").text();
})





