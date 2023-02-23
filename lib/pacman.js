import { Transform } from "./transform.js";

export class Pacman {
    constructor(center, r, color, scene, grid, size) {
        this.vertexPositions = [];
        // Rendering pacman as a circle but as 45 to 315 degrees
        for (let i = 45; i < 315; i++) {
            this.vertexPositions = this.vertexPositions.concat([
                center[0],
                center[1],
                0.0,
            ]);
            this.vertexPositions = this.vertexPositions.concat([
                center[0] + r * Math.cos((i * 2 * Math.PI) / 360),
                center[1] + r * Math.sin((i * 2 * Math.PI) / 360),
                0.0,
            ]);
            this.vertexPositions = this.vertexPositions.concat([
                center[0] + r * Math.cos(((i + 1) * 2 * Math.PI) / 360),
                center[1] + r * Math.sin(((i + 1) * 2 * Math.PI) / 360),
                0.0,
            ]);
        }
        this.grid = grid;
        this.vertexPositions = new Float32Array(this.vertexPositions);
        this.type = "pacman";
        this.color = color;
        this.transform = new Transform();
        this.pos = [0, 0];
        this.ogCenter = [center[0], center[1]];
        this.rotatedAngle = 0;
        this.scene = scene;
        this.gridAngle = 0;
        this.m = grid[0].length;
        this.n = grid.length;
        this.size = size;
    }

    getCurrPosition = () => {
        this.curr_pos = [
            (this.ogCenter[1] + this.pos[1] - this.size / 2) / this.size,
            (this.ogCenter[0] + this.pos[0] - this.size / 2) / this.size,
        ];
        return this.curr_pos;
    };

    // Direction :- in which direction will pacman move
    // Grid :- Current map
    // size :- size of each square in grid
    // canvasSize :- [width,height]
    move = direction => {
        var size = this.size;
        if (direction === "r") {
            this.pos[0] += size;
            this.rotatedAngle = 0;
            this.transform.setTranslate(this.pos);
        }
        if (direction === "l") {
            this.pos[0] -= size;
            this.rotatedAngle = 180;
            this.transform.translateAndRotate(
                this.ogCenter,
                [-this.pos[0], -this.pos[1]],
                Math.PI
            );
        }
        if (direction === "u") {
            this.pos[1] -= size;
            this.rotatedAngle = 270;
            this.transform.translateAndRotate(
                this.ogCenter,
                [-this.pos[1], this.pos[0]],
                (3 * Math.PI) / 2
            );
        }
        if (direction === "d") {
            this.pos[1] += size;
            this.rotatedAngle = 90;
            this.transform.translateAndRotate(
                this.ogCenter,
                [this.pos[1], -this.pos[0]],
                Math.PI / 2
            );
        }
    };

    mod = (n, m) => {
        return ((n % m) + m) % m;
    };

    rotate = () => {
        if (this.rotatedAngle === 90)
            this.transform.translateAndRotate(
                this.ogCenter,
                [this.pos[1], -this.pos[0]],
                Math.PI / 2
            );
        else if (this.rotatedAngle === 180)
            this.transform.translateAndRotate(
                this.ogCenter,
                [-this.pos[0], -this.pos[1]],
                Math.PI
            );
        else if (this.rotatedAngle === 270)
            this.transform.translateAndRotate(
                this.ogCenter,
                [-this.pos[1], this.pos[0]],
                (3 * Math.PI) / 2
            );
        else if (this.rotatedAngle === 0)
            this.transform.translateAndRotate(
                this.ogCenter,
                [this.pos[0], this.pos[1]],
                0
            );
    }

    // direction > 0 for clockwise
    // direction < 0 for anticlockwise
    rotatePacman = direction => {
        this.rotatedAngle = this.mod(this.rotatedAngle + direction * 90, 360);
        this.rotate()
    };

    setPos = (pos) => {
        this.pos = pos
        console.log(this.pos)
    }

    scalePacman = () => {
        this.transform.setScale(
            1.2,
            1.2,
            this.ogCenter,
            (this.rotatedAngle * Math.PI) / 180,
            this.pos
        );
    };

    clear = () => {};
}
