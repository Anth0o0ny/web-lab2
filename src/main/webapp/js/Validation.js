const min = -3;
const max = 3;

qS("#yText").oninput = revalidateY;
qS("#yText").onchange = revalidateY;

function revalidateY() {
    changeY(validateY());
}

$(".xBtn:radio").change(() => {
    changeX(validateX());
});

$(".rBtn:radio").change(() => {
    changeR(validateR());
});

el("mainForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let yAns = validateY();
    let xAns = validateX();
    let rAns = validateR();

    let answer = changeY(yAns) + changeX(xAns) + changeR(rAns);

    if (!(answer.length > 0)) {
        $.ajax({
            type: "GET",
            url: "./controller-servlet",
            data: {
                xCoordinate: getX(),
                yCoordinate: getY(),
                radius: getR()
            },
            success: function (response) {
                let gsonHits = JSON.parse(response);
                fillGraph(gsonHits);
                updateTable(gsonHits);
            }
        })
    }
});

function updateTable(gsonHits) {
    $('#dataTable tr:last').after(
        `<tr> " +
        "<td>${gsonHits.X_VALUE}</td> " +
        "<td>${gsonHits.Y_VALUE}</td> " +
        "<td>${gsonHits.R_VALUE}</td> " +
        "<td>${gsonHits.HIT}</td> " +
        "<td>${gsonHits.EXECUTION_TIME}</td> " +
        "<td>${gsonHits.CURRENT_TIME}</td> " +
        "</tr>`
    );
}

function fillGraph(gsonHits) {
    for (let i = 0; i < gsonHits.length; i++) {
        let obj = JSON.parse(gsonHits[i]);
        board.create('point', [obj.x, obj.y], {name: '', size: 2, fixed: true});
    }
}

function changeY(yAns) {
    if (yAns !== "") {
        qS("#yError").innerHTML = yAns;
        qS("#yErrDialog").style.background = "crimson";
    } else {
        qS("#yError").innerHTML = getY();
        qS("#yErrDialog").style.background = "greenyellow";
    }
    return yAns;
}

function changeX(xAns) {
    if (xAns !== "") {
        qS("#xError").innerHTML = xAns;
        qS("#xErrDialog").style.background = "crimson";
    } else {
        qS("#xError").innerHTML = getX();
        qS("#xErrDialog").style.background = "greenyellow";
    }
    return xAns;
}

function changeR(rAns) {
    if (rAns !== "") {
        qS("#rError").innerHTML = rAns;
        qS("#rErrDialog").style.background = "crimson";
        qS("canvas").classList.remove("cursor");
    } else {
        qS("#rError").innerHTML = getR();
        qS("#rErrDialog").style.background = "greenyellow";
        qS("canvas").classList.add("cursor");
    }
    return rAns;
}

function validateY() {

    let y = getY();

    if (y.replace(/\s/g, "") === "" || y === "") {
        return "Y не может быть пустым";
    }

    y = y.trim();

    if (!(/^-?\d*[.,]?\d+$/.test(y))) {
        return "Y - десятичное число";
    }
    if (y < min || y > max) {
        return min + " <= Y <= " + max;
    }
    if (y.length > 10) {
        return "Длина поля Y < 11"
    }

    return "";
}

function validateX() {
    let x = getX();
    if (isNaN(x)) {
        return "Не выбран X";
    } else {
        return "";
    }
}

function validateR() {
    let r = getR();
    if (isNaN(r)) {
        return "Не выбран R";
    } else {
        return "";
    }
}

function getX() {
    let xSet = elByClassname("xBtn");
    let x;
    for (let i = 0; i < xSet.length; i++) {
        if (xSet[i].checked) {
            x = xSet[i].value;
            break;
        }
    }
    return x;
}

function getY() {
    return qS("#yText").value;
}

function getR() {
    let rSet = elByClassname("rBtn");
    let r;
    for (let i = 0; i < rSet.length; i++) {
        if (rSet[i].checked) {
            r = rSet[i].value;
            break;
        }
    }
    return r;
}

function qS(element) {
    return document.querySelector(element);
}

function el(element) {
    return document.getElementById(element);
}

function elByClassname(element) {
    return document.getElementsByClassName(element)
}
