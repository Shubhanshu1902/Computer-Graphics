import { Grid } from "./grid.js";
import { vertexShaderSrc } from "./shaders/vertex.js";
import { fragmentShaderSrc } from "./shaders/fragment.js";
import { Scene, WebGLRenderer, Shader } from "./lib/threeD.js";
import { map1, map2,map3 } from "./Maps.js";

const renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

document.body.appendChild(renderer.domElement);

const shader = new Shader(
    renderer.glContext(),
    vertexShaderSrc,
    fragmentShaderSrc
);

shader.use();
const scene = new Scene();

const init = (map, size, scene) => {
    var pointRadius = size / 5;
    var pacmanRadius = size / 2.5;
    const gr1 = new Grid(map, size, scene, pacmanRadius, pointRadius);
    gr1.createMap();
    return gr1
};

var grid = init(map1, 25, scene);
var count = 0;

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "c":
            scene.clear();
            count = (count + 1) % 3;
            if (count === 1) {
                grid = init(map2,25,scene)
            }
            else if (count === 0){
                grid = init(map1,25,scene)
            }
            else if(count === 2){
                grid = init(map3,25,scene)
            }

            break;

        case "ArrowRight":
            grid.movePacman("r")
            break;

        case "ArrowLeft":
            grid.movePacman("l")
            break;

        case "ArrowUp":
            grid.movePacman("u")
            break;

        case "ArrowDown":
            grid.movePacman("d")
            break;

        case "(":
            grid.rotatePacman(1)
            break;

        case ")":
            grid.rotatePacman(-1)
            break;

        case "[":
            grid.rotateGrid(1)
            break;

        case "]":
            grid.rotateGrid(-1)
            break;

        case "m":
            var x,y;
            document.addEventListener("mousedown",(event) =>{
                const rect = renderer.gl.canvas.getBoundingClientRect()
                x = event.clientX - rect.left
                y = event.clientY - rect.top 
                grid.modifyPacman(x,y)
            })

            break;

        default:
            break
    }
});

renderer.setAnimationLoop(animation);

//Draw loop
function animation() {
    renderer.clear(0, 0, 0, 1);
    renderer.render(scene, shader);
}
