const canvas = new fabric.Canvas("canvas", {
  width: 1000,
  height: 600,
  centeredScaling: true,
});
var center;

canvas.renderAll();

const imgAdded = (e) => {
  console.log(e);
  const ele = document.getElementById("img");
  const file = ele.files[0];
  reader.readAsDataURL(file);
};

const reader = new FileReader();
const inpFile = document.getElementById("img");
inpFile.addEventListener("change", imgAdded);

canvas.on("mouse:wheel", function (opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  console.log(zoom);
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 1) zoom = 1;
  if (zoom == 1) {
    canvas.absolutePan({ x: 0, y: 0 }, zoom);
  } else {
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  }
  opt.e.preventDefault();
  opt.e.stopPropagation();
});

canvas.renderAll();

reader.addEventListener("load", () => {
  fabric.Image.fromURL(reader.result, (img) => {
    canvas.add(img);
    canvas.requestRenderAll();
    center = canvas.getVpCenter();
  });
});

var clear = document.getElementById("clear");
clear.addEventListener("click", (e) => {
  e.preventDefault();
  canvas.clear();
});
