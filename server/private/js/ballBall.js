const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");
const audioPlayer = new Audio("./bgm/bgm.mp3");
const s = document.getElementById("seconds").getContext("2d");
const b = document.getElementById("backgroundTimer").getContext("2d");
const p = document.getElementById("pause").getContext("2d");

// Build global setting
let bigTimer = 1815;
let startingCountdown = [];
let timerHeight = 0;
let ballArrayA = [];
let ballArrayB = [];
let ballArrayC = [];
let arrayOfBallBallA = [];
let arrayOfBallBallB = [];
let arrayOfBallBallC = [];
let gameResult = [];
let turnOn = true;
let points = 0;
let timer;

/////////////////////////////////////   Run in each frame   /////////////////////////////////////
function onResults(results) {
    canvasCtx.save();

    ////////////////////////   Display input image on <canvas class="output_canvas"></canvas>   ////////////////////////
    canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );
    ////////////////////////   Display input image on <canvas class="output_canvas"></canvas>   ////////////////////////

    // 連埋D點點
    // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: "#00FF00", lineWidth: 4 });

    // 遊戲前準備
    // Detect body parts -> Display body parts -> Save body parts
    let modelOutputArr = [];
    let modelOutputArrWithBodyParts = [];
    let arraySaveBodyCoordinate = [];

    // 將(x, y, z)coordinate & 可見度 dum落 modelOutputArr
    if ("poseLandmarks" in results) {
        for (let i = 0; i < 33; i++) {
            modelOutputArr.push({
                body: i,
                x: results.poseLandmarks[i].x,
                y: results.poseLandmarks[i].y,
                visibility: results.poseLandmarks[i].visibility
            });
        }

        // 當可見度大過60%就畫點點
        // 再將個粒點點代表既部位, x-coordinate, y-coordinate dum 落 modelOutputArrWithBodyParts
        for (let output of modelOutputArr) {
            if (output.visibility > 0.6) {
                // canvasCtx.globalCompositeOperation = "destination-over";
                canvasCtx.globalCompositeOperation = "source-over";
                drawLandmarks(canvasCtx, results.poseLandmarks);
                modelOutputArrWithBodyParts.push([
                    { body: output.body, x: output.x, y: output.y }
                ]);
            }
        }
    }
    // 如果有左右手既點點出現就計翻粒點點既位置
    for (let outputForKillBall of modelOutputArrWithBodyParts) {
        let a = Object.values(outputForKillBall[0]);
        const array = [17, 18, 19, 20, 27, 28];
        if (array.includes(a[0])) {
            arraySaveBodyCoordinate.push([
                a[0],
                calculateXCoordinate(a[1]),
                calculateYCoordinate(a[2])
            ]);
            // } else if (a[0] == 19) {
            //  arraySaveBodyCoordinate.push([
            //      a[0],
            //      calculateXCoordinate(a[1]),
            //      calculateYCoordinate(a[2])
            //  ]);
            // } else if (a[0] == 18) {
            //  arraySaveBodyCoordinate.push([
            //      a[0],
            //      calculateXCoordinate(a[1]),
            //      calculateYCoordinate(a[2])
            //  ]);
            // } else if (a[0] == 20) {
            //  arraySaveBodyCoordinate.push([
            //      a[0],
            //      calculateXCoordinate(a[1]),
            //      calculateYCoordinate(a[2])
            //  ]);
            // } else if (a[0] == 27) {
            //  arraySaveBodyCoordinate.push([
            //      a[0],
            //      calculateXCoordinate(a[1]),
            //      calculateYCoordinate(a[2])
            //  ]);
            // } else if (a[0] == 28) {
            //  arraySaveBodyCoordinate.push([
            //      a[0],
            //      calculateXCoordinate(a[1]),
            //      calculateYCoordinate(a[2])
            //  ]);
        }
    }

    // 遊戲開始條件 -> 要Detect到足夠既body parts
    if (arraySaveBodyCoordinate.length >= 2 && bigTimer >= 15) {
        // 遊戲開始前有5秒準備時間
        // startingCountdown第一個數就係開始準備既時間
        startingCountdown.push(Date.now());

        // 開始前3秒會有提示
        let calculateCountdown = Date.now() - startingCountdown[0];

        firstCountDown(calculateCountdown, 2000, 3000, "3");
        countDown(calculateCountdown, 3000, 4000, "2");
        countDown(calculateCountdown, 4000, 5000, "1");

        // 5秒之後開始遊戲
        if (calculateCountdown > 5000 && bigTimer >= 15) {
            // 清除準備時間倒數提示
            s.clearRect(0, 0, 200, 300);

            // 遊戲時間1800秒 = 現實60秒
            // 遊戲時間每30秒 = 現實1秒
            if (bigTimer % 3 === 0) {
                timerHeight += 1;
            }

            if (bigTimer == 14) {
                let smallTimer = bigTimer;
                return smallTimer;
            }

            console.log(ballArrayA);
            // Display Timer (60s countdown)
            b.clearRect(0, 0, innerWidth, innerHeight);
            const grd = b.createLinearGradient(0, 0, 0, innerHeight);
            grd.addColorStop(0, "#F8FE29");
            grd.addColorStop(0.2, "#C8F424");
            grd.addColorStop(0.4, "#5bab3c");
            grd.addColorStop(0.6, "#4B713F");
            grd.addColorStop(0.8, "#244E30");
            b.fillStyle = grd;
            b.fillRect(0, 0, innerWidth, (innerHeight / 600) * timerHeight);

            // Pause
            p.clearRect(0, 0, 400, 400);

            // 播BGM
            audioPlayer.volume = 0.1;
            audioPlayer.play();

            // 控制幾時出波波
            genBallBall(45, 0);
            genBallBall(60, 1);
            genBallBall(75, 2);

            bigTimer -= 1;

            // 一到出波波時間就畫個波波出黎

            drawBallBall(1300, 0);
            drawBallBall(1800, 1);
            drawBallBall(2300, 2);

            // 判斷body parts有冇掂到波波
            // 整走Type A Ball Ball


            for (let coord of arrayOfBallBallB) {
                if (arraySaveBodyCoordinate.length == 4) {
                    let leftHand1 = arraySaveBodyCoordinate[0];
                    let leftHand2 = arraySaveBodyCoordinate[2];
                    let rightHand1 = arraySaveBodyCoordinate[1];
                    let rightHand2 = arraySaveBodyCoordinate[3];
                    let leftFoot = arraySaveBodyCoordinate[4];
                    let rightFoot = arraySaveBodyCoordinate[5];

                    if (
                        checkBodyCoordinate(
                            coord[0],
                            leftHand1[1],
                            coord[1],
                            leftHand1[2],
                            60
                        ) &&
                        checkBodyCoordinate(
                            coord[0],
                            leftHand2[1],
                            coord[1],
                            leftHand2[2],
                            60
                        )
                    ) {
                        ballArrayB[ballArrayB.length - 1].notYetKilled = false;
                    } else if (
                        checkBodyCoordinate(
                            coord[0],
                            rightHand1[1],
                            coord[1],
                            rightHand1[2],
                            60
                        ) &&
                        checkBodyCoordinate(
                            coord[0],
                            rightHand2[1],
                            coord[1],
                            rightHand2[2],
                            60
                        )
                    ) {
                        ballArrayB[ballArrayB.length - 1].notYetKilled = false;
                    }
                    // else if (
                    //  checkBodyCoordinate(
                    //      coord[0],
                    //      leftFoot[1],
                    //      coord[1],
                    //      leftFoot[2],
                    //      60
                    //  )
                    // ) {
                    //  // console.log("leftFoot");
                    //  for (let i = 0; i < ballArrayB.length; i++) {
                    //      ballArrayB[ballArrayB.length - 1].notYetKilled = false;
                    //  }
                    // } else if (
                    //  checkBodyCoordinate(
                    //      coord[0],
                    //      rightFoot[1],
                    //      coord[1],
                    //      rightFoot[2],
                    //      60
                    //  )
                    // ) {
                    //  // console.log("rightFoot");
                    //  for (let i = 0; i < ballArrayB.length; i++) {
                    //      ballArrayB[ballArrayB.length - 1].notYetKilled = false;
                    //  }
                    // }
                }
            }

            for (let coord of arrayOfBallBallC) {
                if (arraySaveBodyCoordinate.length == 4) {
                    let leftHand1 = arraySaveBodyCoordinate[0];
                    let leftHand2 = arraySaveBodyCoordinate[2];
                    let rightHand1 = arraySaveBodyCoordinate[1];
                    let rightHand2 = arraySaveBodyCoordinate[3];
                    let leftFoot = arraySaveBodyCoordinate[4];
                    let rightFoot = arraySaveBodyCoordinate[5];

                    if (
                        checkBodyCoordinate(
                            coord[0],
                            leftHand1[1],
                            coord[1],
                            leftHand1[2],
                            60
                        ) &&
                        checkBodyCoordinate(
                            coord[0],
                            leftHand2[1],
                            coord[1],
                            leftHand2[2],
                            60
                        )
                    ) {
                        ballArrayC[ballArrayC.length - 1].notYetKilled = false;
                    } else if (
                        checkBodyCoordinate(
                            coord[0],
                            rightHand1[1],
                            coord[1],
                            rightHand1[2],
                            60
                        ) &&
                        checkBodyCoordinate(
                            coord[0],
                            rightHand2[1],
                            coord[1],
                            rightHand2[2],
                            60
                        )
                    ) {
                        ballArrayC[ballArrayC.length - 1].notYetKilled = false;
                    }
                    // else if (
                    //  checkBodyCoordinate(
                    //      coord[0],
                    //      leftFoot[1],
                    //      coord[1],
                    //      leftFoot[2],
                    //      60
                    //  )
                    // ) {
                    //  // console.log("leftFoot");
                    //  for (let i = 0; i < ballArrayC.length; i++) {
                    //      ballArrayC[ballArrayC.length - 1].notYetKilled = false;
                    //  }
                    // } else if (
                    //  checkBodyCoordinate(
                    //      coord[0],
                    //      rightFoot[1],
                    //      coord[1],
                    //      rightFoot[2],
                    //      60
                    //  )
                    // ) {
                    //  // console.log("rightFoot");
                    //  for (let i = 0; i < ballArrayC.length; i++) {
                    //      ballArrayC[ballArrayC.length - 1].notYetKilled = false;
                    //  }
                    // }
                }
            }
        }
    }
    // Detect唔到足夠body parts就會暫停倒數 & BGM & Show Pause
    else if (
        arraySaveBodyCoordinate.length < 2 &&
        bigTimer < 1815 &&
        bigTimer > 15
    ) {
        audioPlayer.pause();
        p.lineWidth = 10;
        p.arc(200, 200, 180, 0, 2 * Math.PI);
        p.fillStyle = "white";
        p.fillRect(140, 115, 30, 180);
        p.fillRect(240, 115, 30, 180);
        p.strokeStyle = "white";
        p.stroke();
    } else if (bigTimer === 14) {
        if (turnOn) {
            for (let killedOrNot of ballArrayA) {
                let plus = 0;
                let minus = 0;
                gameResult.push(killedOrNot.notYetKilled);
                for (let trueOrFalse of gameResult) {
                    if (trueOrFalse === true) {
                        minus++;
                    } else {
                        plus++;
                    }
                    points = 10 * plus - 10 * minus;
                }
                if (points < 0) {
                    points = 0;
                }
            }
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            arraySaveBodyCoordinate.length = 0;
            turnOn = false;
            /////////////////////////////////   Provide points of the game to database   /////////////////////////////////
            providePointsOfTheGame(points);
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const params = urlParams.get("matchId");

            window.location = `/summary.html?matchId=${params}`;
        }
    }
    canvasCtx.restore();
}

// Load model
const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
});
pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.6
});
pose.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await pose.send({ image: videoElement });
    },
    width: 1280,
    height: 720
});
camera.start();

// Generate random coordinate for ball ball
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function xCoordinate() {
    let x = getRandomIntInclusive(200, 1080);
    return x;
}
function yCoordinate() {
    let y = getRandomIntInclusive(200, 600);
    return y;
}

function randomRadius() {
    let r = getRandomIntInclusive(40, 80);
    return r;
}

// Check wether body part coordinate in ball ball
function checkBodyCoordinate(circleX, bodyX, circleY, bodyY, radius) {
    return (
        (circleX - bodyX) * (circleX - bodyX) +
            (circleY - bodyY) * (circleY - bodyY) <
        radius * radius
    );
}

// Find body part coordinate
function calculateXCoordinate(x) {
    return parseInt(x * 1280);
}
calculateXCoordinate(50);
function calculateYCoordinate(y) {
    return parseInt(y * 720);
}

function firstCountDown(timer, a, b, text) {
    if (timer >= a && timer < b) {
        s.font = "300px Verdana";
        s.fillStyle = "white";
        s.fillText(text, 5, 240);
    }
}

function countDown(timer, a, b, text) {
    if (timer >= a && timer < b) {
        s.clearRect(0, 0, 200, 300);
        s.font = "300px Verdana";
        s.fillStyle = "white";
        s.fillText(text, 5, 240);
    }
}

function genBallBall(number, index) {
    let group = [ballArrayA, ballArrayB, ballArrayC];
    let ballColor = ["#fcd703", "#03dbfc", "#fc036b"];
    let ballObjectTemplate = {
        startTime: Date.now(),
        isAlive: true,
        notYetKilled: true,
        xCoordinate: xCoordinate(),
        yCoordinate: yCoordinate(),
        radius: randomRadius(),
        color: ballColor[index],
        lineWidth: 7
    };
    if (bigTimer >= 15 && bigTimer % number === 0) {
        group[index].push(ballObjectTemplate);
    }
}

function drawBallBall(number, index) {
    let group = [ballArrayA, ballArrayB, ballArrayC];
    let group2 = [arrayOfBallBallA, arrayOfBallBallB, arrayOfBallBallC];
    for (let ball of group[index]) {
        if (Date.now() - ball.startTime < 1800) {
            // 1400
            if (ball.isAlive && ball.notYetKilled) {
                canvasCtx.beginPath();
                canvasCtx.lineWidth = ball.lineWidth;
                canvasCtx.globalCompositeOperation = "source-over";
                canvasCtx.arc(
                    ball.xCoordinate,
                    ball.yCoordinate,
                    ball.radius,
                    0,
                    2 * Math.PI
                );
                canvasCtx.strokeStyle = ball.color;
                canvasCtx.stroke();
                group2[index].push([ball.xCoordinate, ball.yCoordinate]);
            }
        }
    }
}

function areTheyInside (index) {
    let group = [ballArrayA, ballArrayB, ballArrayC];
    let group2 = [arrayOfBallBallA, arrayOfBallBallB, arrayOfBallBallC];
    for (let coord of group2[index]) {
        if (arraySaveBodyCoordinate.length === 6) {
            let leftHand1 = arraySaveBodyCoordinate[0];
            let leftHand2 = arraySaveBodyCoordinate[2];
            let rightHand1 = arraySaveBodyCoordinate[1];
            let rightHand2 = arraySaveBodyCoordinate[3];
            let leftFoot = arraySaveBodyCoordinate[4];
            let rightFoot = arraySaveBodyCoordinate[5];

            let situation1 = checkBodyCoordinate(
                coord[0],
                leftHand1[1],
                coord[1],
                leftHand1[2],
                60
            ) &&
            checkBodyCoordinate(
                coord[0],
                leftHand2[1],
                coord[1],
                leftHand2[2],
                60
            );

            let situation2

            if (

            ) {
                ballArrayA[ballArrayA.length - 1].notYetKilled = false;
            } else if (
                checkBodyCoordinate(
                    coord[0],
                    rightHand1[1],
                    coord[1],
                    rightHand1[2],
                    60
                ) &&
                checkBodyCoordinate(
                    coord[0],
                    rightHand2[1],
                    coord[1],
                    rightHand2[2],
                    60
                )
            ) {
                ballArrayA[ballArrayA.length - 1].notYetKilled = false;
                console.log(ballArrayA);
            } else if (
                checkBodyCoordinate(
                    coord[0],
                    leftFoot[1],
                    coord[1],
                    leftFoot[2],
                    60
                )
            ) {
                // console.log("leftFoot");
                for (let i = 0; i < ballArrayA.length; i++) {
                    ballArrayA[ballArrayA.length - 1].notYetKilled = false;
                }
            } else if (
                checkBodyCoordinate(
                    coord[0],
                    rightFoot[1],
                    coord[1],
                    rightFoot[2],
                    60
                )
            ) {
                // console.log("rightFoot");
                for (let i = 0; i < ballArrayA.length; i++) {
                    ballArrayA[ballArrayA.length - 1].notYetKilled = false;
                }
            }
        }
    }
}

//////////////////////////////////   React with Database   //////////////////////////////////
async function providePointsOfTheGame(numberP) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const params = urlParams.get("matchId");

    const formBody = {
        points: numberP,
        matches_live_id: params
    };
    await fetch("/ballBall/reaction", {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(formBody)
    });
}
//////////////////////////////////   React with Database   //////////////////////////////////
