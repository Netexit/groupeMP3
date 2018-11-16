<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>WaveForm</title>
  <link rel="stylesheet" href="./style/waveform.css">
</head>
<body>

  <canvas id="canvas1" height="50" width="100"></canvas>

  <style>
    canvas {
      border: 1px solid black;
      transition: all 1s ease;
      height: 50px;
    }
  </style>

  <script>
    var canvas = document.getElementById('canvas1'),
    ctx = canvas.getContext('2d');

    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 30, 30);

    // changing width attribute clears canvas element (in most broswers)
    // changing width attribute isn't animated by CSS transition
    setTimeout(function () {
      canvas.width = "200";
    }, 2000);

    // changing CSS rule for width is animated, although if no CSS rule for width already exists, then a width of 0px is taken as the starting point
    setTimeout(function () {
      ctx.fillStyle = "red";
      ctx.fillRect(10, 10, 30, 30);
      canvas.style.width = "100px";
    }, 4000);
  </script>

</body>
</html>
