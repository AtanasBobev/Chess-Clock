let display = {
    hideMenu: function() {
        document.querySelector(".container#menu").style.display = 'none';
    },
    showMenu: function() {
        document.querySelector(".container#menu").style.display = 'block';
    },
    showSelection: function() {
        document.querySelector("#main").classList.remove('d-none');
    },
    hideSelection: function() {
        document.querySelector("#main").classList.add('d-none');
    },
    showDesktopClock: function() {
        document.querySelector("#desktopClock").classList.remove('d-none');
    },
    hideDesktopClock: function() {
        document.querySelector("#desktopClock").classList.add('d-none');
    },
    showDesktopSummary: function() {
        document.querySelector("#desktopSummary").classList.remove('d-none');
    },
    hideDesktopSummary: function() {
        document.querySelector("#desktopSummary").classList.add('d-none');
    }
}
let setupGame = {
    TimePlayer1: 0,
    TimePlayer2: 0,
    dataEntry: function(minutes, seconds, additionalSeconds) {
        display.hideMenu();
        display.showSelection();
        document.querySelector("#minutesPlayer1").value = minutes;
        document.querySelector("#minutesPlayer2").value = minutes;
        document.querySelector("#secondsPlayer1").value = seconds;
        document.querySelector("#secondsPlayer2").value = seconds;
        document.querySelector("#additionalSeconds1").value = additionalSeconds;
        document.querySelector("#additionalSeconds2").value = additionalSeconds;
    },
    initiateGame: function() {
        if (this.validateData()) {
            display.hideSelection();
            display.showDesktopClock();
            inGame.initialEstablish();
            this.TimePlayer1 = ((document.querySelector("#minutesPlayer1").value * 60) + Number(document.querySelector("#secondsPlayer1").value));
            this.TimePlayer2 = ((document.querySelector("#minutesPlayer2").value * 60) + Number(document.querySelector("#secondsPlayer2").value));
            document.querySelector("#secondClock").innerText = inGame.secondsToMinutes(this.TimePlayer2);
            document.querySelector("#firstClock").innerText = inGame.secondsToMinutes(this.TimePlayer1);
            document.querySelector("#name1Game").innerText = document.querySelector("#name1").value;
            document.querySelector("#name2Game").innerText = document.querySelector("#name2").value;


            Swal.fire({
                title: 'Are you ready to start the game?',
                text: "It's going to be epic!",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Start',
                cancelButtonText: 'Back'
            }).then((result) => {
                if (result.value) {
                    inGame.initialEstablish();
                    inGame.startTimer();
                } else {
                    display.hideDesktopClock();
                    display.showSelection();
                }
            })

        }
    },
    validateData: function() {
        if (document.querySelector("#minutesPlayer1").value <= 9999 && document.querySelector("#minutesPlayer1").value >= 0 && document.querySelector("#minutesPlayer1").value % 1 == 0) {
            if (document.querySelector("#minutesPlayer2").value <= 9999 && document.querySelector("#minutesPlayer2").value >= 0 && document.querySelector("#minutesPlayer2").value % 1 == 0) {
                if (document.querySelector("#secondsPlayer1").value <= 9999 && document.querySelector("#secondsPlayer1").value >= 0 && document.querySelector("#secondsPlayer1").value % 1 == 0) {
                    if (document.querySelector("#secondsPlayer2").value <= 9999 && document.querySelector("#secondsPlayer2").value >= 0 && document.querySelector("#secondsPlayer2").value % 1 == 0) {
                        if (document.querySelector("#additionalSeconds1").value <= 9999 && document.querySelector("#additionalSeconds1").value >= 0 && document.querySelector("#additionalSeconds1").value % 1 == 0) {
                            if (document.querySelector("#additionalSeconds2").value <= 9999 && document.querySelector("#additionalSeconds2").value >= 0 && document.querySelector("#additionalSeconds2").value % 1 == 0) {
                                if (document.querySelector("#name1").value.length <= 50) {
                                    if (document.querySelector("#name2").value.length <= 50) {
                                        if (document.querySelector("#minutesPlayer1").value > 0 || document.querySelector("#secondsPlayer1").value > 0) {
                                            if (document.querySelector("#minutesPlayer2").value > 0 || document.querySelector("#secondsPlayer2").value > 0) {
                                                return true;
                                            } else {
                                                swal("Warning!", "Player 2 starting time should be more than 0", "warning");
                                            }
                                        } else {
                                            swal("Warning!", "Player 1 starting time should be more than 0", "warning");
                                        }
                                    } else {
                                        swal("Warning!", "The field that contains player 2 name should not be more than 50 characters", "warning");
                                    }
                                } else {
                                    swal("Warning!", "The field that contains player 1 name should not be more than 50 characters", "warning");
                                }
                            } else {
                                swal("Warning!", "The field that contains player 2 additional seconds per move should be a positive integer in a range between 0 and 9999", "warning");
                            }
                        } else {
                            swal("Warning!", "The field that contains player 1 additional seconds per move should be a positive integer in a range between 0 and 9999", "warning");
                        }

                    } else {
                        swal("Warning!", "The field that contains player 2 seconds should be a positive integer in a range between 0 and 9999", "warning");
                    }
                } else {
                    swal("Warning!", "The field that contains player 1 seconds should be a positive integer in a range between 0 and 9999", "warning");
                }
            } else {
                swal("Warning!", "The field that contains player 2 minutes should be a positive integer in a range between 0 and 9999", "warning");
            }
        } else {
            swal("Warning!", "The field that contains player 1 minutes should be a positive integer in a range between 0 and 9999", "warning");
        }
    },
    resetForm: function() {
        document.querySelector("#name1").value = '';
        document.querySelector("#name2").value = '';
        document.querySelector("#minutesPlayer1").value = '';
        document.querySelector("#minutesPlayer2").value = '';
        document.querySelector("#secondsPlayer1").value = '';
        document.querySelector("#secondsPlayer2").value = '';
        document.querySelector("#additionalSeconds1").value = '';
        document.querySelector("#additionalSeconds2").value = '';
    }
}
let inGame = {
    timeLeftPlayer1: setupGame.TimePlayer1,
    timeLeftPlayer2: setupGame.TimePlayer2,
    initialEstablish: function() {
        this.timeLeftPlayer1 = setupGame.TimePlayer1;
        this.timeLeftPlayer2 = setupGame.TimePlayer2;
    },
    secondsToMinutes: function(time) {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    },
    startTimer: function() {
        startTime = (new Date).getTime() / 10000;
        Player1Interval = setInterval(this.decreaseTimePlayer1, 1000);
        document.querySelector("#firstClock").style.textDecoration = 'underline';
        document.querySelector("#name1Game").style.color = 'black';
        document.querySelector("#name2Game").style.color = 'grey';
        document.querySelector("#secondClock").style.color = 'grey';


    },
    decreaseTimePlayer1: function() {
        if (!inGame.pausedState) {
            inGame.timeLeftPlayer1--;
            if (inGame.timeLeftPlayer1 <= 0) {
                clearInterval(Player1Interval);
                document.querySelector("#firstClock").innerText = "No time left!";
                document.querySelector("#firstClock").style.fontSize = '5vmax';
                document.querySelector("#firstClock").style.color = 'red';
                document.querySelector("#firstClock").style.textDecoration = 'none';
                document.querySelector("#firstClock").style.border = '1px solid red';
                document.querySelector("#firstClock").style.padding = '1vmax';
                document.querySelector("#firstClock").style.textAlign = 'center';
                console.log("Still firing")
                inGame.endGameToLobby(1)
                inGame.game = false;
            } else {
                document.querySelector("#firstClock").innerText = inGame.secondsToMinutes(Number(inGame.timeLeftPlayer1));
            }
        }
    },
    Player1IntervalRunning: true,
    game: true,
    decreaseTimePlayer2: function() {
        if (!inGame.pausedState) {
            inGame.timeLeftPlayer2--;
            if (inGame.timeLeftPlayer2 <= 0) {
                clearInterval(Player2Interval);
                document.querySelector("#secondClock").innerText = "No time left!";
                document.querySelector("#secondClock").style.fontSize = '5vmax';
                document.querySelector("#secondClock").style.color = 'red';
                document.querySelector("#secondClock").style.textDecoration = 'none';
                document.querySelector("#secondClock").style.border = '1px solid red';
                document.querySelector("#secondClock").style.padding = '1vmax';
                document.querySelector("#secondClock").style.textAlign = 'center';
                console.log("Still firing")
                inGame.endGameToLobby(2)
                inGame.game = false;
            } else {
                document.querySelector("#secondClock").innerText = inGame.secondsToMinutes(Number(inGame.timeLeftPlayer2));
            }
        }
    },

    switchRole: function() {
        if (inGame.game && !inGame.pausedState) {
            if (inGame.Player1IntervalRunning) {
                time1.push((Math.abs(startTime - ((new Date).getTime() / 10000))) * 10)
                startTime = (new Date).getTime() / 10000;
                inGame.timeLeftPlayer1 = inGame.timeLeftPlayer1 + Number(document.querySelector("#additionalSeconds1").value);
                document.querySelector("#firstClock").innerText = inGame.secondsToMinutes(Number(inGame.timeLeftPlayer1));
                clearInterval(Player1Interval);
                Player2Interval = setInterval(inGame.decreaseTimePlayer2, 1000);
                inGame.Player1IntervalRunning = false;
                document.querySelector("#firstClock").style.textDecoration = 'none';
                document.querySelector("#secondClock").style.textDecoration = 'underline';
                document.querySelector("#name1Game").style.color = 'grey';
                document.querySelector("#name2Game").style.color = 'black';
                document.querySelector("#secondClock").style.color = 'black';
                document.querySelector("#firstClock").style.color = 'grey';
            } else {
                time2.push((Math.abs((startTime - (new Date).getTime() / 10000))) * 10);
                startTime = (new Date).getTime() / 10000;
                inGame.timeLeftPlayer2 = inGame.timeLeftPlayer2 + Number(document.querySelector("#additionalSeconds2").value)
                document.querySelector("#secondClock").innerText = inGame.secondsToMinutes(Number(inGame.timeLeftPlayer2));
                document.querySelector("#name1Game").style.color = 'black';
                document.querySelector("#name2Game").style.color = 'grey';
                document.querySelector("#firstClock").style.textDecoration = 'underline';
                document.querySelector("#secondClock").style.textDecoration = 'none';
                document.querySelector("#secondClock").style.color = 'grey';
                document.querySelector("#firstClock").style.color = 'black';


                clearInterval(Player2Interval);
                Player1Interval = setInterval(inGame.decreaseTimePlayer1, 1000);
                inGame.Player1IntervalRunning = true;
            }
        } else {
            clearInterval(Player1Interval);
            clearInterval(Player2Interval);
        }
    },
    pausedState: false,
    pauseGame: function() {
        if (!this.pausedState) {
            startTime = (new Date).getTime() / 10000;
            if (inGame.Player1IntervalRunning) {
                clearInterval(Player1Interval);
            } else {
                clearInterval(Player2Interval);
            }
            document.querySelector("#restart").classList.remove('d-none');
            document.querySelector("#stop").classList.remove('d-none');

            this.pausedState = true;
            document.querySelector("#pause").src = 'Images/Play.svg'
        } else {
            document.querySelector("#restart").classList.add('d-none');
            document.querySelector("#stop").classList.add('d-none');
            this.pausedState = false;
            if (inGame.Player1IntervalRunning) {
                Player1Interval = setInterval(inGame.decreaseTimePlayer1, 1000);
            } else {
                Player2Interval = setInterval(inGame.decreaseTimePlayer2, 1000);
            }
            document.querySelector("#pause").src = 'Images/Pause.svg';
        }
    },
    endGameToLobby: function(lost) {
        document.querySelector("#restart").classList.remove('d-none');
        inGame.pausedState = true;
        if (lost == 1) {
            anime({
                targets: '#name1Game',
                transform: 'scale(0.5,0.5)',
                left: '-100%',
                easing: 'easeInOutQuad',
            });
            anime({
                targets: '#firstClock',
                transform: 'scale(0.5,0.5)',
                left: '-100%',
                easing: 'easeInOutQuad'
            });
            anime({
                targets: '#pause',
                transform: 'scale(0.5,0.5)',
                left: '-100%',
                easing: 'easeInOutQuad'
            });
            anime({
                targets: '#name2Game',
                deley: 2000,
                left: '50%',
                top: "40%",
                easing: 'easeInOutQuad'
            });
            anime({
                targets: '#secondClock',
                deley: 3000,
                left: '50%',
                top: "80%",
                easing: 'easeInOutQuad'
            });
            document.querySelector("#name2Game").style.color = 'gold';
            document.querySelector("#name2Game").style.fontSize = '8vmax';
            document.querySelector("#name2Game").innerText += " won";
            document.querySelector("#secondClock").style.fontSize = '10vmax'
            document.querySelector("#secondClock").style.color = 'gold'
            document.querySelector("#name2Game").style.textDecoration = 'underline'

        } else {
            anime({
                targets: '#name2Game',
                left: '-100%',
                easing: 'easeInOutQuad',
            });
            anime({
                targets: '#secondClock',
                left: '-100%',
                easing: 'easeInOutQuad'
            });
            anime({
                targets: '#pause',
                transform: 'scale(0.5,0.5)',
                left: '-100%',
                easing: 'easeInOutQuad'
            });
            anime({
                targets: '#name1Game',
                deley: 2000,
                left: '50%',
                top: "40%",
                easing: 'easeInOutQuad'
            });
            anime({
                targets: '#firstClock',
                deley: 3000,
                left: '50%',
                top: "80%",
                easing: 'easeInOutQuad'
            });
            document.querySelector("#name1Game").style.color = 'gold';
            document.querySelector("#name1Game").style.fontSize = '8vmax';
            document.querySelector("#name1Game").innerText += " won";
            document.querySelector("#firstClock").style.fontSize = '10vmax'
            document.querySelector("#firstClock").style.color = 'gold'
            document.querySelector("#name1Game").style.textDecoration = 'underline'
        }
        document.querySelector("#restart").style.left = "7vw";
    },
    reset: function() {
        inGame.pausedState = true;
        inGame.game = true;
        Swal.fire({
            title: 'Are sure you would want to reset the game?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                document.querySelector("#secondClock").innerText = inGame.secondsToMinutes(setupGame.TimePlayer2);
                document.querySelector("#firstClock").innerText = inGame.secondsToMinutes(setupGame.TimePlayer1);
                document.querySelector("#name1Game").innerText = document.querySelector("#name1").value;
                document.querySelector("#name2Game").innerText = document.querySelector("#name2").value;
                document.querySelector("#firstClock").innerText = inGame.secondsToMinutes(inGame.timeLeftPlayer1);
                document.querySelector("#secondClock").innerText = inGame.secondsToMinutes(inGame.timeLeftPlayer2);
                document.querySelector("#name2Game").removeAttribute("style")
                document.querySelector("#secondClock").removeAttribute("style")
                document.querySelector("#pause").removeAttribute("style")
                document.querySelector("#name1Game").removeAttribute("style")
                document.querySelector("#firstClock").removeAttribute("style");
                document.querySelector("#name1Game").removeAttribute("style")
                document.querySelector("#firstClock").removeAttribute("style");
                document.querySelector("#pause").removeAttribute("style")
                document.querySelector("#name2Game").removeAttribute("style")
                document.querySelector("#secondClock").removeAttribute("style")
                document.querySelector("#firstClock").style.textDecoration = 'underline';
                document.querySelector("#name1Game").style.color = 'black';
                document.querySelector("#name2Game").style.color = 'grey';
                document.querySelector("#secondClock").style.color = 'grey';
                console.log("execute")
                inGame.timeLeftPlayer1 = setupGame.TimePlayer1;
                inGame.timeLeftPlayer2 = setupGame.TimePlayer2;
                document.querySelector("#restart").classList.add('d-none');
                inGame.pausedState = false;
                document.querySelector("#restart").style.left = '35%';
                document.querySelector("#secondClock").innerText = inGame.secondsToMinutes(setupGame.TimePlayer2);
                document.querySelector("#firstClock").innerText = inGame.secondsToMinutes(setupGame.TimePlayer1);
                clearInterval(inGame.decreaseTimePlayer1);
                clearInterval(inGame.decreaseTimePlayer2);
                clearInterval(Player1Interval);
                clearInterval(Player2Interval);
                inGame.timeLeftPlayer2 = inGame.timeLeftPlayer2 + Number(document.querySelector("#additionalSeconds2").value)
                document.querySelector("#secondClock").innerText = inGame.secondsToMinutes(Number(inGame.timeLeftPlayer2));
                document.querySelector("#name1Game").style.color = 'black';
                document.querySelector("#name2Game").style.color = 'grey';
                document.querySelector("#firstClock").style.textDecoration = 'underline';
                document.querySelector("#secondClock").style.textDecoration = 'none';
                document.querySelector("#secondClock").style.color = 'grey';
                document.querySelector("#firstClock").style.color = 'black';
                startTime = (new Date).getTime() / 10000;
                time1 = [];
                time2 = [];
                clearInterval(Player2Interval);
                Player1Interval = setInterval(inGame.decreaseTimePlayer1, 1000);
                inGame.Player1IntervalRunning = true;
                document.querySelector("#pause").click()
            }
        })
    },
    RealStop: function() {
        Swal.fire({
            title: 'Are you sure you want to end the game?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'End',
            cancelButtonText: 'Back'
        }).then((result) => {
            if (result.value) {
                display.hideDesktopClock();
                display.showDesktopSummary();
                if(inGame.timeLeftPlayer2>inGame.timeLeftPlayer1){
                  document.querySelector("#textAnalysis").innerText=document.querySelector("#name2Game").innerText+' won the game with '+(inGame.timeLeftPlayer2-inGame.timeLeftPlayer1)+"s or "+((1-inGame.timeLeftPlayer1/inGame.timeLeftPlayer2)*100).toFixed(2)+"% difference in time."
                }else if(inGame.timeLeftPlayer2<inGame.timeLeftPlayer1){
                  document.querySelector("#textAnalysis").innerText=document.querySelector("#name1Game").innerText+' won the game with '+(inGame.timeLeftPlayer1-inGame.timeLeftPlayer2)+"s or "+((1-inGame.timeLeftPlayer2/inGame.timeLeftPlayer1)*100).toFixed(2)+"% difference in time."
                }else{
                  document.querySelector("#textAnalysis").innerText="Both players finished the game at the same time!";
                }
                if (time1.length < 2 || time2.length < 2) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'There is not enough data to construct comparison graphs!',
                    })
                } else {
                    for (let i = 1; i < time1.length + 1; i++) {
                        labels1.push(i);
                    }
                    for (let i = 1; i < time2.length + 1; i++) {
                        labels2.push(i);
                    }
                    let ctx1 = document.getElementById('Player1TimeCanvas').getContext('2d');
                    let chart1 = new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: labels1,
                            datasets: [{
                                label: 'Player 1 Time Per Move Comparison',
                                backgroundColor: 'green',
                                borderColor: 'rgb(255, 99, 132)',
                                data: time1
                            }]
                        },
                        options: {
                            responsiveAnimationDuration: 0.5,

                        }
                    });
                    let ctx2 = document.getElementById('Player2TimeCanvas').getContext('2d');
                    let chart2 = new Chart(ctx2, {
                        type: 'bar',
                        data: {
                            labels: labels2,
                            datasets: [{
                                label: 'Player 2 Time Per Move Comparison',
                                backgroundColor: 'red',
                                borderColor: 'rgb(255, 99, 132)',
                                data: time2
                            }]
                        },
                        options: {
                            responsiveAnimationDuration: 0.5,

                        }
                    });
                }
            }
        })
    }


}
document.body.onkeyup = function(e) {
    if (e.keyCode == 32 && !inGame.pausedState) {
        inGame.switchRole();
    }
}
let Player1Interval = 0,
    Player2Interval = 0,
    time1 = [],
    time2 = [],
    startTime, labels1 = [],
    labels2 = [];
