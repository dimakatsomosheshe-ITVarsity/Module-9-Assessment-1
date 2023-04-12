(function (){
    var startTime;
    var endTime;
    var origTimePeriod;
    var newTimePeriod;

    var hour = document.querySelector(".hour");
    var min = document.querySelector(".minute");
    var sec = document.querySelector(".second");

    var pauseBtn = document.querySelector(".pause");
    var startBtn = document.querySelector(".start");
    var resetBtn = document.querySelector(".reset");

    var countdownTimer = null;

    startBtn.addEventListener('click', function(){
        if(hour.value==0 && min.value==0 && sec.value==0) return;

        function startInterval(){
            startTime = new Date();
            endTime = getEndTime();

            origTimePeriod = endTime.getTime() - startTime.getTime();
            newTimePeriod = origTimePeriod;

            countdownTimer = setInterval(() => {
                timer()
            }, 1000);
        }

        startInterval();
    });

    function stopInterval(){
       clearInterval(countdownTimer);
    }

    function timer(){

        if(sec.value > 60){
            min.value++;
            sec.value = parseInt(sec.value) - 59;
        }
        if(min.value > 60){
            hour.value++;
            min.value = parseInt(min.value) - 60;
        }

        if(hour.value==0 && min.value==0 && sec.value==0){
            hour.value = "";
            min.value = "";
            sec.value = "";
            stopInterval()
        } else if(sec.value!=0){
            sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`;
        } else if(min.value!=0 && sec.value==0){
            sec.value = 59
            min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`;
        } else if(hour.value!=0 && min.value==0){
            min.value = 60
            hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
        }
    }

    function getEndTime(){
        var dt = new Date();
    
        dt.setHours(dt.getHours() + hour);
        dt.setMinutes(dt.getMinutes() + min);
        dt.setSeconds(dt.getSeconds() + sec);
        return dt;
    }

    pauseBtn.addEventListener('click', function(){
        stopInterval();
    });

    resetBtn.addEventListener('click', function(){
        hour.value = "";
        min.value = "";
        sec.value = "";

        stopInterval();
    })
    
})();
