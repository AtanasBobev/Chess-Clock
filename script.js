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
            this.TimePlayer1 = ((document.querySelector("#minutesPlayer1").value * 60) + document.querySelector("#secondsPlayer1").value) / 10;
            this.TimePlayer2 = ((document.querySelector("#minutesPlayer2").value * 60) + document.querySelector("#secondsPlayer2").value) / 10;
            document.querySelector("#secondClock").innerText = inGame.secondsToMinutes(this.TimePlayer2)
            document.querySelector("#firstClock").innerText = inGame.secondsToMinutes(this.TimePlayer1)


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
                if (result.value) {} else {
                    alert("Getting you back!")
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
    }
}
