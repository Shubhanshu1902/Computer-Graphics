import { Quadrilateral, Circle, Triangle } from "./lib/threeD.js";

export class Grid {
    constructor(grid, size, scene) {
        this.grid = grid;
        this.size = size;
        this.n = this.grid.length;
        this.m = this.grid[0].length;
        this.scene = scene;
        this.rotationAngle = 0;
        this.primitives = JSON.parse(JSON.stringify(this.grid));
        console.log(this.m,this.n)
        this.createGrid();
    }

    createGrid = () => {
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.grid[j][i] === 1) {
                    if (
                        i === 0 ||
                        j === 0 ||
                        i === this.m - 1 ||
                        j === this.n - 1
                    ) {
                        var quad = new Quadrilateral(
                            [i * this.size, j * this.size],
                            [i * this.size, (j + 1) * this.size],
                            [(i + 1) * this.size, (j + 1) * this.size],
                            [(i + 1) * this.size, j * this.size],
                            [0.0, 0.0, 1.0, 1.0]
                        );
                        this.scene.add(quad);
                        this.primitives[j][i] = quad;
                    } else {
                        var quad = new Quadrilateral(
                            [i * this.size, j * this.size],
                            [i * this.size, (j + 1) * this.size],
                            [(i + 1) * this.size, (j + 1) * this.size],
                            [(i + 1) * this.size, j * this.size],
                            [1.0, 1.0, 1.0, 1.0]
                        );
                        this.scene.add(quad);
                        this.primitives[j][i] = quad;
                    }
                }
                // Movable places
                else if (this.grid[j][i] === 0 || this.grid[j][i] === 2) {
                    var quad = new Quadrilateral(
                        [i * this.size, j * this.size],
                        [i * this.size, (j + 1) * this.size],
                        [(i + 1) * this.size, (j + 1) * this.size],
                        [(i + 1) * this.size, j * this.size],
                        [0.0, 0.0, 0.0, 1.0]
                    );

                    this.scene.add(quad);
                    this.primitives[j][i] = quad;
                }
            }
        }
    };

    mod = (n, m) => {
        return ((n % m) + m) % m;
    };

    rotateGrid = dir => {
        this.rotationAngle = this.mod(this.rotationAngle + dir * 90, 360);
        this.grid_center = [this.n/2*this.size,this.m/2*this.size]

        console.log(this.rotationAngle)
        if (this.rotationAngle === 90) {
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    var delta_x = this.n * this.size
                    var delta_y = 0
                    if(this.grid[i][j] === 1 || this.grid[i][j] === 0 || this.grid[i][j] === 2)
                        this.primitives[i][j].transform.rotateAboutPoint(delta_x,delta_y,Math.PI/2)
                }
            }
        }
        else if (this.rotationAngle === 180){
            for(let i = 0; i < this.n; i++){
                for(let j = 0; j < this.m; j++){
                    var delta_x = this.m * this.size
                    var delta_y = this.n * this.size
                    if(this.grid[i][j] === 1 || this.grid[i][j] === 0 || this.grid[i][j] === 2)
                        this.primitives[i][j].transform.rotateAboutPoint(delta_x,delta_y,Math.PI)
                }
            }
        }
        else if(this.rotationAngle === 270){
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    var delta_x = 0;
                    var delta_y = this.m * this.size;
                    if(this.grid[i][j] === 1 || this.grid[i][j] === 0 || this.grid[i][j] === 2)
                        this.primitives[i][j].transform.rotateAboutPoint(delta_x,delta_y,Math.PI*1.5);
                }
            }
        }

        else if(this.rotationAngle === 0){
            for(let i = 0; i < this.n; i++){
                for(let j = 0; j < this.m; j++){
                    if(this.grid[i][j] === 1 || this.grid[i][j] === 0 || this.grid[i][j] === 2)
                        this.primitives[i][j].transform.rotateAboutPoint(0,0,0.0);
                }
            }
        }
    };
}
