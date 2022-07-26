var flag = true;
var arr = [];
var myarr = [];
var level;
var check;
var beep;
var resetvalue = 0;
var timeout;

// Action listener for start button
document.querySelector(".start").addEventListener("click",function() {
  if (flag) {
    initialiseGame();
    flag = false;
    level = 2;
  }
  this.classList.add("buttonDisappear");

});

// Action Listener for keypress
document.addEventListener("keypress", function() {
  if (flag) {
    initialiseGame();
    flag = false;
    level = 2;
  }
});

// Action Listener for Mouse Click
for (var i = 0; i < 4; i++) {
  document.querySelectorAll(".box")[i].addEventListener("click", function() {

    // used tempo var bcoz can't use this inside timeout function
    var tempo = this;

    clearTimeout(timeout);
    console.log("timeout cleared due to button click");
    // onClick Flash
    tempo.classList.add("flash");
    setTimeout(function() {
      tempo.classList.remove("flash");
    }, 100);

    // onClick audio
    beep = new Audio("audio/box" + this.dataset.value + ".wav");
    beep.play();

    // insert my clicked value in myarray
    myarr.push(this.dataset.value);
    check = verify();

    // if result not matched
    if (!check) {
      reset(0);

    }

    // flag used to distinguish from reset
    if (myarr.length == arr.length && flag == false) {
      changeHeading();
      flash();
      myarr = [];
    }
    else if(flag==false){
      timeup();
      console.log("time out set due to button click");
    }


  });
}

function initialiseGame() {
  document.querySelector(".heading").innerHTML = "Level 1";
  flash();

}

function changeHeading() {
  var head = document.querySelector(".heading");
  head.innerHTML = "Level " + level;
  level++;
}

function flash() {
  var rand = Math.floor(Math.random() * 4) + 1;
  arr.push(rand);

  // to display flash

  setTimeout(function() {
    document.querySelector(".box" + rand).classList.add("flash");
    timeup();
    console.log("time out set due to random generation");
  }, 500);

  setTimeout(function() {
    document.querySelector(".box" + rand).classList.remove("flash");
  }, 800);

  // random key audio
  setTimeout(function() {
    beep = new Audio("audio/box" + rand + ".wav");
    beep.play();
  }, 500);



}

function verify() {
  var equal = true;
  for (var i = 0; i < myarr.length; i++) {
    if (myarr[i] != arr[i]) {
      equal = false;
      break;
    }
  }
  return equal;
}

function reset(resetvalue) {
  flag = true;
  arr = [];
  myarr = [];
  if(resetvalue == 0) {
      document.querySelector(".heading").innerHTML = "Game Over, Press a Key! or Click Start button!";
  }
  else {
    document.querySelector(".heading").innerHTML = "Time UP, Press a Key! or Click Start button!";
  }


  // to display red light for wrong answer
  document.querySelector("body").classList.add("wrongans");
  setTimeout(function() {
    document.querySelector("body").classList.remove("wrongans");
  }, 100);

  // play wrong audio beep
  beep = new Audio("audio/wrong.wav");
  beep.play();

  //display start button again
  document.querySelector(".start").classList.remove("buttonDisappear");
}

function timeup() {
  timeout = setTimeout(function() {
    reset(1);
  },5000);
}
