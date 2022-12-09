let canvas = document.getElementById("graphic");
canvas.height = 320;
canvas.width  = 480;
const RADIUS_PIX = 100;
const margin = 10;
let canvasRadius = "R";
drawGraphic(canvas, RADIUS_PIX);

//  Обработка нажатия на график
canvas.addEventListener("mousedown", (event) => {
    if (canvasRadius === "R") {
        return;
    }
    let context = canvas.getContext('2d');
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGraphic(canvas, RADIUS_PIX)

    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, margin/3, 0, 2 * Math.PI);
    context.fill();
    context.closePath();

    const width = canvas.width;
    const height = canvas.height;
    const k = (canvasRadius/RADIUS_PIX);
    let xCoordinate = (x - width/2)*k;
    let yCoordinate = (height/2 - y)*k;

    $.ajax({
        type: "GET",
        url: "./controller-servlet",
        data: {
            xCoordinate: xCoordinate,
            yCoordinate: yCoordinate,
            radius: canvasRadius
        },
        success: function (response) {
            let gsonHits = JSON.parse(response);
            fillGraph(gsonHits);
            updateTable(gsonHits);
        }
    })

}, false)

//  Обработка изменения
$(".rBtn:radio").change(() => {
    let flag = true;
    let rBtn = ".rBtn:radio";
    $(rBtn).each(function () {
        if ($(this).prop("checked")) {
            flag = false;
            canvasRadius = $(this).prop("value");
        // } else {
        //     $(this).attr("disabled", true);
        }
    });
    // if (flag) {
    //     canvasRadius = "R";
    //     $(rBtn).each(function () {
    //         $(this).attr("disabled", false);
    //     });
    // }
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGraphic(canvas, RADIUS_PIX)
});

$(".xBtn:radio").change(() => {
    let flag = true;
    let xBtn = ".xBtn:radio";
    $(xBtn).each(function () {
        if ($(this).prop("checked")) {
            flag = false;
        // } else {
        //     $(this).attr("disabled", true);
        }
    });
    // if (flag) {
    //     $(xBtn).each(function () {
    //         $(this).attr("disabled", false);
    //     });
    // }
});

function drawGraphic(canvas, r) {
    let context = canvas.getContext('2d');
    let HEIGHT = canvas.height - margin;
    let WIDTH = canvas.width - margin;

    context.fillStyle = "rgba(40,40,250,0.55)";

    //  Четверть окружности (2 четверть)
    context.beginPath();
    context.moveTo(WIDTH/2, HEIGHT/2);
    context.arc(WIDTH/2, HEIGHT/2, r/2, 3*Math.PI/2, Math.PI, true);
    context.fill();
    context.closePath();


    //  Треугольник (3 четверть)
    context.beginPath();
    moveTo(WIDTH/2, HEIGHT/2)
    context.lineTo(WIDTH/2, HEIGHT/2+r);
    context.lineTo(WIDTH/2-r, HEIGHT/2);
    context.lineTo(WIDTH/2, HEIGHT/2);
    context.fill();

//  Прямоугольник (4 четверть)
    context.fillRect(WIDTH/2, HEIGHT/2, r/2, r);



    context.fillStyle = "black";

    //  Вертикальная линия снизу вверх (Ось Y)
    context.beginPath();
    context.moveTo(WIDTH/2, HEIGHT);
    context.lineTo(WIDTH/2, 0);
    context.lineTo(WIDTH/2-margin, margin+margin);
    context.lineTo(WIDTH/2+margin, margin+margin);
    context.lineTo(WIDTH/2, 0);
    context.fill();
    context.stroke();

    //  Горизонтальная линия слева направо (Ось X)
    context.beginPath();
    context.moveTo(0, HEIGHT/2);
    context.lineTo(WIDTH, HEIGHT/2);
    context.lineTo(WIDTH-2*margin, HEIGHT/2-margin);
    context.lineTo(WIDTH-2*margin, HEIGHT/2+margin);
    context.lineTo(WIDTH, HEIGHT/2);
    context.fill();
    context.stroke();

    //  Точки на графике
    context.beginPath();
    //  Горизонтальные
    context.moveTo(WIDTH/2-r, HEIGHT/2);
    context.arc(WIDTH/2-r, HEIGHT/2, margin/3, 0, 2 * Math.PI);
    context.moveTo(WIDTH/2-r/2, HEIGHT/2);
    context.arc(WIDTH/2-r/2, HEIGHT/2, margin/3, 0, 2 * Math.PI);
    context.moveTo(WIDTH/2+r/2, HEIGHT/2);
    context.arc(WIDTH/2+r/2, HEIGHT/2, margin/3, 0, 2 * Math.PI);
    context.moveTo(WIDTH/2+r/2, HEIGHT/2);
    context.arc(WIDTH/2+r/2, HEIGHT/2, margin/3, 0, 2 * Math.PI);
    context.moveTo(WIDTH/2+r, HEIGHT/2);
    context.arc(WIDTH/2+r, HEIGHT/2, margin/3, 0, 2 * Math.PI);
    //  Вертикальные
    context.moveTo(WIDTH/2, HEIGHT/2+r);
    context.arc(WIDTH/2, HEIGHT/2+r, margin/3, 0, 2 * Math.PI);
    context.moveTo(WIDTH/2, HEIGHT/2+r/2);
    context.arc(WIDTH/2, HEIGHT/2+r/2, margin/3, 0, 2 * Math.PI);
    context.moveTo(WIDTH/2, HEIGHT/2-r/2);
    context.arc(WIDTH/2, HEIGHT/2-r/2, margin/3, 0, 2 * Math.PI);
    context.moveTo(WIDTH/2, HEIGHT/2-r);
    context.arc(WIDTH/2, HEIGHT/2-r, margin/3, 0, 2 * Math.PI);
    //  Центр
    context.moveTo(WIDTH/2, HEIGHT/2);
    context.arc(WIDTH/2, HEIGHT/2, margin/3, 0, 2 * Math.PI);

    context.fill();
    context.stroke();

    let halfRadius = "R/2"

    if (!isNaN(canvasRadius)) {
        halfRadius = canvasRadius/2;
    }

    context.font = "16px Century Schoolbook";
    //  Верх
    context.fillText(canvasRadius, WIDTH / 2 + margin, HEIGHT / 2 - r + margin / 3);
    context.fillText(halfRadius, WIDTH / 2 + margin, HEIGHT / 2 - r / 2 + margin / 3)
    context.fillText("y", WIDTH / 2 + 1.5 * margin, 1.5 * margin);
    //  Право
    context.fillText(canvasRadius, WIDTH / 2 + r - margin / 3, HEIGHT / 2 - margin);
    context.fillText(halfRadius, WIDTH / 2 + r / 2 - margin, HEIGHT / 2 - margin);
    context.fillText("x", WIDTH - 2 * margin, HEIGHT / 2 - 1.5 * margin);
    //  Низ
    context.fillText("-" + canvasRadius, WIDTH / 2 + margin, HEIGHT / 2 + r + margin / 3);
    context.fillText("-" + halfRadius, WIDTH / 2 + margin, HEIGHT / 2 + r / 2 + margin / 3);
    //  Лево
    context.fillText("-" + canvasRadius, WIDTH / 2 - r - margin, HEIGHT / 2 - margin);
    context.fillText("-" + halfRadius, WIDTH / 2 - r / 2 - 2 * margin, HEIGHT / 2 - margin);

}