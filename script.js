let display={
  hideMenu:function(){
document.querySelector(".container#menu").style.display='none';
  },
  showMenu:function(){
    document.querySelector(".container#menu").style.display='block';
  },
  showSelection:function(){
document.querySelector("#main").classList.remove('d-none');
  },
  hideSelection:function(){
    document.querySelector("#main").classList.add('d-none');
  }
}
let setupGame={
  dataEntry:function(minutes,seconds,additionalSeconds){
    display.hideMenu();
    display.showSelection();
  document.querySelector("#minutesPlayer1").value=minutes;
  document.querySelector("#minutesPlayer2").value=minutes;
  document.querySelector("#secondsPlayer1").value=seconds;
  document.querySelector("#secondsPlayer2").value=seconds;
document.querySelector("#additionalSeconds1").value=additionalSeconds;
document.querySelector("#additionalSeconds2").value=additionalSeconds;
  }
}
