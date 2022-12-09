<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Лабораторная №2</title>
    <style>
        @import "styles/MainPage.css";
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
</head>

<body
        class="bcground"
>
<!-- Вёрстка страницы -->
<form id="mainForm" method="get" action="controller-servlet">
    <table id="layout">
        <!-- Первая строка -- шапка -->
        <tr>
            <td>
                <div class="emoji">
                    <img id="leftEmoji" src="images/ogBuba.jpg"  width="200px">
                </div>
            </td>
            <td id="cap" colspan="2">
                <div id="capBlock">
                   <b><i>Og Buba Пушкин Антон Сергеевич</i></b>,<b>объединение: <i>P32121</i></b>, вариант(расклад событий): <b><i>212131</i></b>
                </div>
            </td>
            <td>
                <div class="emoji" >
                    <img  id="rightEmoji" src="images/opp.jpg" width="256px">
                </div>
            </td>
        </tr>
        <!-- Вторая строка -- ... -->
        <tr id="data">
            <!-- Столбец с выбором X -->
            <td>
                <fieldset id="xFieldSet">
                    <legend id="xLegend">
                        <b>Выберите координату X</b>
                    </legend>
                    <br>
                    <div class="radioX">
                        <input id="x5" type="radio" name="xCoordinate" value="5" class="xBtn">
                        <label for="x5">5</label>
                    </div>
                    <br>
                    <div class="radioX">
                        <input id="x4" type="radio" name="xCoordinate" value="4" class="xBtn">
                        <label for="x4">4</label>
                    </div>
                    <br>
                    <div class="radioX">
                        <input id="x3" type="radio" name="xCoordinate" value="3" class="xBtn">
                        <label for="x3">3</label>
                    </div>
                    <br>
                    <div class="radioX">
                        <input id="x2" type="radio" name="xCoordinate" value="2" class="xBtn">
                        <label for="x2">2</label>
                    </div>
                    <br>
                    <div class="radioX">
                        <input id="x1" type="radio" name="xCoordinate" value="1" class="xBtn">
                        <label for="x1">1</label>
                    </div>
                    <br>
                    <div class="radioX">
                        <input id="x0" type="radio" name="xCoordinate" value="0" class="xBtn">
                        <label for="x0">0</label>
                    </div>
                    <br>
                    <div class="radioX">
                        <input id="x-1" type="radio" name="xCoordinate" value="-1" class="xBtn">
                        <label for="x-1">-1</label>
                    </div>
                    <br>
                    <div class="radioX">
                        <input id="x-2" type="radio" name="xCoordinate" value="-2" class="xBtn">
                        <label for="x-2">-2</label>
                    </div>
                    <br>
                    <div class="radioX">
                        <input id="x-3" type="radio" name="xCoordinate" value="-3" class="xBtn">
                        <label for="x-3">-3</label>
                    </div>
                    <br>
                </fieldset>
            </td>
            <!-- Столбец с выбором Y и R -->
            <td id="choosingColumn">
                <div>
                    <label for="yText">
                        <b>Введите координату Y:</b>
                    </label>
                    <p>
                        <input id="yText" name="yCoordinate" type="text" maxlength="10" placeholder="-3 ... 3">
                    </p>
                </div>
                <div>
                    <fieldset id="rFieldSet">
                        <legend id="rLegend">
                            <b>Выберите радиус R</b>
                        </legend>
                        <div class="radioR">
                            <input id="r3" type="radio" name="radius" value="3" class="rBtn">
                            <label for="r3">3</label>
                        </div>
                        <br>
                        <div class="radioR">
                            <input id="r2.5" type="radio" name="radius" value="2.5" class="rBtn">
                            <label for="r2.5">2.5</label>
                        </div>
                        <br>
                        <div class="radioR">
                            <input id="r2" type="radio" name="radius" value="2" class="rBtn">
                            <label for="r2">2</label>
                        </div>
                        <br>
                        <div class="radioR">
                            <input id="r1.5" type="radio" name="radius" value="1.5" class="rBtn">
                            <label for="r1.5">1.5</label>
                        </div>
                        <br>
                        <div class="radioR">
                            <input id="r1" type="radio" name="radius" value="1" class="rBtn">
                            <label for="r1">1</label>
                        </div>
                        <br>
                    </fieldset>
                </div>
                <br>
                <div>
                    <input id="accButton" type="submit" value="Стреляй в opp'a">
                </div>
            </td>
            <!-- Столбец с графиком -->
            <td id="visualisation">
                <article>
                    <canvas id="graphic"></canvas>
                    <script src="js/Graph.js"></script>
                </article>
                <h3>Размеры opp'a</h3>
            </td>
            <!-- Столбец с окном для ошибок -->
            <td>
                <h2>Твои данные</h2>
                <br>
                <div class="errDialog" id="yErrDialog">Y:<br><span id="yError"></span></div>
                <br>
                <div class="errDialog" id="xErrDialog">X:<br><span id="xError"></span></div>
                <br>
                <div class="errDialog" id="rErrDialog">R:<br><span id="rError"></span></div>
            </td>
        </tr>
        <!-- Третья строка -- ... -->
        <tr>
            <td>
                <div class="birth">
                    <img id="leftBirth" src="images/ogBuda.jpg" width="256px">
                </div>
            </td>
            <td colspan="2">
                <table id="dataTable">
                    <tr id="capRow">
                        <td>X</td>
                        <td>Y</td>
                        <td>R</td>
                        <td>Попадание</td>
                        <td>Время работы скрипта, нс</td>
                        <td>Текущее время</td>
                    </tr>
                </table>
            </td>
            <td>
                <div class="birth">
                    <img id="rightBirth" src="images/ogMe.jpg" height="175px">
                </div>
            </td>
        </tr>
    </table>
</form>
<script src="js/Validation.js"></script>
</body>

</html>