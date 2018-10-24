<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>WaveForm</title>
  <link rel="stylesheet" href="./style/waveform.css">
</head>
<body>

  <div id="container">
    <img class="img" src="./libs/png/a.png" alt=""/><!--onclick="navigate()"-->
    <canvas id="canvas" width="0"></canvas><!--400x200-->
  </div>

  <!--<button id="startAndPause" onclick="start()">Play</button>-->

  <audio id="audio" controls="controls" hidden>
    <source id="current" src="" type="audio/mpeg" />
  </audio>

  <input onclick="play()" type="button" value="Play" id="startAndPause"></input>

  <script src="./script/waveform.js"></script>

</body>
</html>
