import {
    Scene,
    Triangle,
    Quadrilateral,
    WebGLRenderer,
    Shader,
    Circle,
} from "./lib/threeD.js";
import { vertexShaderSrc } from "./shaders/vertex.js";
import { fragmentShaderSrc } from "./shaders/fragment.js";
import { map2, map1 } from "./map.js";
import { Grid } from "./createGrid.js";
import { createPacman } from "./createPacman.js";
import { Pallets } from "./pallets.js";
import { Ghosts } from "./ghosts.js";

const renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

document.body.appendChild(renderer.domElement);

const shader = new Shader(
    renderer.glContext(),
    vertexShaderSrc,
    fragmentShaderSrc
);

shader.use();

const init = (map, size, scene) => {
    var pointRadius = size/5;
    var pacmanRadius = size/2.5;
    const gr1 = new Grid(map, size, scene);
    const pallets = new Pallets(map, pointRadius, size, scene);
    const ghosts = new Ghosts(map,size,scene)

    let i1 = 0
    let j1 = 0

    for(let i = 0;i < map.length; i++){
        for(let j = 0; j < map[0].length; j++){
            if(map[i][j] === -1){
                i1 = i
                j1 = j
                break
            }
        }
    }

    var pacman = createPacman(
        j1,
        i1,
        pacmanRadius,
        [1.0, 1.0, 0.0, 1.0],
        size,
        scene,
        map
    );
    scene.add(pacman);

    return { gr1, pallets, pacman, ghosts };
};

var map = map1;
var count = 0;
var size = 25;
const scene = new Scene();
var vals = init(map, size, scene);
var pacman = vals.pacman;
var pallets = vals.pallets;
var grid = vals.gr1;
var ghosts = vals.ghosts

var currPos = pacman.getCurrPosition()
pallets.markVisited(currPos[0],currPos[1])

document.addEventListener("keydown", event => {
    // console.log(event)
    switch (event.key) {
        case "ArrowRight":
            var currPos = pacman.getCurrPosition()
            var l = pallets.markVisited(currPos[0], currPos[1] + 1);
            ghosts.changeColor(l)
            pacman.move("r");
            pacman.scalePacman(l)
            break;

        case "ArrowLeft":
            var currPos = pacman.getCurrPosition()
            var l = pallets.markVisited(currPos[0], currPos[1] - 1);
            ghosts.changeColor(l)
            pacman.move("l");
            pacman.scalePacman(l)
            break;

        case "ArrowUp":
            var currPos = pacman.getCurrPosition()
            var l = pallets.markVisited(currPos[0] - 1, currPos[1]);
            ghosts.changeColor(l)
            pacman.move("u");
            pacman.scalePacman(l)
            break;

        case "ArrowDown":
            var currPos = pacman.getCurrPosition()
            var l = pallets.markVisited(currPos[0] + 1, currPos[1]);
            ghosts.changeColor(l)
            pacman.move("d");
            pacman.scalePacman(l)
            break;

        case "(":
            pacman.rotate(1);
            break;

        case ")":
            pacman.rotate(-1);
            break;

        case "c":
            count = (count + 1) % 2;
            scene.clear();
            if (count === 0) {
                map = map1;
                size = 25
            } else if (count === 1) {
                map = map2;
                size = 30
            }
            vals = init(map, size, scene);
            pacman = vals.pacman;
            pallets = vals.pallets;
            grid = vals.gr1;
            break;

        case "[":
            grid.rotateGrid(1);
            pallets.rotatePallets(1)
            break;

        case "]":
            grid.rotateGrid(-1);
            pallets.rotatePallets(-1)
            break;

        default:
            break;
    }
});

renderer.setAnimationLoop(animation);

//Draw loop
function animation() {
    renderer.clear(0, 0, 0, 1);
    renderer.render(scene, shader);
}
