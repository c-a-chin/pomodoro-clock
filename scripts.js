// store clock data (MSD = most significant digit, LSD = least significant digit)
var minuteMsd = Number($("#minute-msd").text()),
    minuteLsd = Number($("#minute-lsd").text()),
    secondMsd = Number($("#second-msd").text()),
    minuteLsd = Number($("#second-lsd").text());

// buttons to increase/decrease timer will increase/decrease LSD, only change MSD if necessary
// if LSD gets increased past 9, set to 0 and add 1 to MSD
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


// if LSD gets decreased past 0 AND MSD is 0, set both to 0 (cant go under 0:0)
// if LSD gets decreased past 0, set to 9 and subtract 1 from MSD
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


// seconds cannot increase past 59, if so, set to 0
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
	if(re.test($(this).text()) || $(this).text().length != 1){
		$(this).text(tempMinuteMsd);
		minuteMsd = Number($("#minute-msd").text());
	}
})
$("#minute-lsd").focusout(function(){
	// use regexp to test if input was anything other than 0-9, or longer than 2 chars
	var re = /[^0-9]/g;
	if(re.test($(this).text()) || $(this).text().length != 1){
		$(this).text(tempMinuteLsd);
		minuteLsd = Number($("#minute-lsd").text());
	}
})
$("#second-lsd").focusout(function(){
	var re = /[^0-9]/g;
	if(re.test($(this).text()) || $(this).text().length != 1){
		$(this).text(tempSecondLsd);
		secondLsd = Number($("#second-lsd").text());
	}
})
// MSD for second counter can only be 0-5
$("#second-msd").focusout(function(){
	// use regexp to test if input was anything other than 0-5
	var re = /[^0-5]/g;
	if(re.test($(this).text()) || $(this).text().length != 1){
		$(this).text(tempSecondMsd);
		secondMsd = Number($("#second-msd").text());
	}
})




// START/STOP/RESET BUTTONS
var interval; //declare interval globally so we can access in start/stop functions
$("#start-button").click(function(){
	// disable time changing buttons, enable when stop is clicked
	$("#reset-button, #start-button, #minute-up, #minute-down, #second-up, #second-down").attr("disabled", "true");
	$("#reset-button, #start-button, #minute-up, #minute-down, #second-up, #second-down").addClass("disabled-button");
	// disable contenteditable
	$("#minute-lsd, #minute-msd, #second-lsd, #second-msd").attr("contenteditable", 'false');

	// create interval
	interval = setInterval(function(){
		// if timer is up, stop timer and play alarm sound
		if(minuteMsd == 0 && minuteLsd == 0 &&
			secondMsd == 0 && secondLsd == 0){
			$("#stop-button").click();
			$("#reset-button").click();
			// play FOGHORN!!!
			document.getElementById("alarm-sound").play();
			// display alert
			$(".modal").modal('show');
		} else{
			// else, count timer down 1 second
			$("#second-down").click();
		}
	}, 1000);
})
$("#stop-button").click(function(){
	clearInterval(interval);
	// enable buttons/contenteditable
	$("#reset-button, #start-button, #minute-up, #minute-down, #second-up, #second-down").removeAttr("disabled");
	$("#reset-button, #start-button, #minute-up, #minute-down, #second-up, #second-down").removeClass("disabled-button");
	$("#minute-lsd, #minute-msd, #second-lsd, #second-msd").attr("contenteditable", 'true');
})

$("#reset-button").click(function(){
	$("#minute-msd").text("2");
	$("#minute-lsd").text("5");
	$("#second-lsd, #second-msd").text("0");

	minuteMsd = $("#minute-msd").text();
	minuteLsd = $("#minute-lsd").text();
	secondMsd = $("#second-msd").text();
	secondLsd = $("#second-lsd").text();
});


