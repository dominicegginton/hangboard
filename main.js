var isPaused;
var workTime, restTime, reps, setRestTime, sets;
var currentRep, currentSet, timer;
var completedHangs;
var state; // 0: Idle, 1: Work, 2: Rest, 3: Set Rest, 4: Done

function onLoad(input, output) {
    isPaused = 1;
    state = 0;
    currentRep = 1;
    currentSet = 1;
    completedHangs = 0;

    // Load settings
    workTime = parseInt(localStorage.getItem("workTime") || "7");
    restTime = parseInt(localStorage.getItem("restTime") || "5");
    reps = parseInt(localStorage.getItem("reps") || "4");
    setRestTime = parseInt(localStorage.getItem("setRestTime") || "120");
    sets = parseInt(localStorage.getItem("sets") || "12");

    timer = 15; // Initial countdown
}

function onExerciseStart(input, output) {
    isPaused = 0;
}

function onExercisePause(input, output) {
    isPaused = 1;
}

function onExerciseContinue(input, output) {
    isPaused = 0;
}

function evaluate(input, output) {
    if (isPaused || state === 4) {
        updateOutput(output);
        return;
    }

    if (timer > 0) {
        timer--;
        if (timer <= 3 && timer > 0) {
            playIndication("Button");
        }
    } else {
        // Transition
        if (state === 0) { // Was Idle/Starting
            state = 1; // Start Work
            timer = workTime;
            playIndication("StartTimer");
        } else if (state === 1) { // Was Work
            completedHangs++;
            if (currentRep < reps) {
                state = 2; // Rest
                timer = restTime;
                playIndication("StopTimer");
            } else {
                // End of rep block
                if (sets === 0 || currentSet < sets) {
                    state = 3; // Set Rest
                    timer = setRestTime;
                    currentRep = 1;
                    currentSet++;
                    playIndication("Interval");
                } else {
                    state = 4; // Done
                    timer = 0;
                    playIndication("Confirm");
                }
            }
        } else if (state === 2) { // Was Rest
            state = 1; // Back to Work
            timer = workTime;
            currentRep++;
            playIndication("StartTimer");
        } else if (state === 3) { // Was Set Rest
            state = 1; // Back to Work
            timer = workTime;
            playIndication("StartTimer");
        }
    }

    updateOutput(output);
}

var updateOutput = function(output) {
    output.state = state;
    output.timer = timer;
    output.rep = currentRep;
    output.totalReps = reps;
    output.set = currentSet;
    output.totalSets = sets;
    output.completedHangs = completedHangs;
};

function getUserInterface(input, output) {
    return {
        template: 't'
    };
}

function getSummaryOutputs(input, output) {
    return [
        {
            id: 'hangs',
            name: 'Hangs completed',
            format: 'Count_Threedigits',
            value: completedHangs
        },
        {
            id: 'sets',
            name: 'Sets completed',
            format: 'Count_Twodigits',
            value: (state === 4 && sets !== 0) ? sets : currentSet - 1
        }
    ];
}
