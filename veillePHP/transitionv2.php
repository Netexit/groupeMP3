<!DOCTYPE html>
<html>
<head>
<style>
#myDIV {
  border-right:1px solid #000000;
  position:relative;
  z-index:20;
}

#myDIV:hover {
    background-color: coral;
    width: 570px;
    height: 500px;
    padding: 100px;
    border-radius: 50px;
}
</style>
</head>
<body>

<p>Mouse over the DIV element and it will change, both in color and size!</p>

<p>Click the "Try it" button and mouse over the DIV element again. The change will now happen gradually, like an animation:</p>

<button onclick="myFunction()">Try it</button>

<canvas id="myDIV"></canvas>

<script>
function myFunction() {
    document.getElementById("myDIV").style.WebkitTransition = "all 2s"; // Code for Safari 3.1 to 6.0
    document.getElementById("myDIV").style.transition = "all 2s";       // Standard syntax
}
</script>
</body>
</html>
