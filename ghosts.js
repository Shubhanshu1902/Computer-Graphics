import { Triangle } from "./lib/threeD.js";

export class Ghosts {
    constructor(grid, size, scene) {
        this.grid = grid;
        this.size = size;
        this.n = grid.length;
        this.m = grid[0].length;
        this.scene = scene;
        this.primitives = [0,0,0,0]
        this.createGhosts()
    }

    createGhosts = () => {
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.grid[j][i] === 4) {
                    const ghost1 = new Triangle(
                        [
                            i * this.size + this.size / 2,
                            j * this.size + 0.1 * this.size,
                        ],
                        [i * this.size, (j + 1) * this.size - 0.1 * this.size],
                        [
                            (i + 1) * this.size,
                            (j + 1) * this.size - 0.1 * this.size,
                        ],
                        [51 / 255, 254 / 255, 254 / 255, 1.0]
                    );
                    this.primitives[0] = [ghost1,i,j]
                    this.scene.add(ghost1);
                } else if (this.grid[j][i] === 5) {
                    const ghost1 = new Triangle(
                        [
                            i * this.size + this.size / 2,
                            j * this.size + 0.1 * this.size,
                        ],
                        [i * this.size, (j + 1) * this.size - 0.1 * this.size],
                        [
                            (i + 1) * this.size,
                            (j + 1) * this.size - 0.1 * this.size,
                        ],
                        [254 / 255, 153 / 255, 205 / 255, 1.0]
                    );
                    this.primitives[1] = [ghost1,i,j]
                    this.scene.add(ghost1);
                } else if (this.grid[j][i] === 6) {
                    const ghost1 = new Triangle(
                        [
                            i * this.size + this.size / 2,
                            j * this.size + 0.1 * this.size,
                        ],
                        [i * this.size, (j + 1) * this.size - 0.1 * this.size],
                        [
                            (i + 1) * this.size,
                            (j + 1) * this.size - 0.1 * this.size,
                        ],
                        [254 / 255, 204 / 255, 50 / 255, 1.0]
                    );
                    this.primitives[2] = [ghost1,i,j]
                    this.scene.add(ghost1);
                } else if (this.grid[j][i] === 7) {
                    const ghost1 = new Triangle(
                        [
                            i * this.size + this.size / 2,
                            j * this.size + 0.2 * this.size,
                        ],
                        [i * this.size, (j + 1) * this.size- 0.1 * this.size],
                        [(i + 1) * this.size, (j + 1) * this.size- 0.1 * this.size],
                        [1.0, 0.0, 0.0, 1.0]
                    );
                    this.primitives[3] = [ghost1,i,j]
                    this.scene.add(ghost1);
                }
            }
        }
    };

    changeColor = (l) => {
        if(l){
            console.log(this.primitives)
            for(let i = 0; i < this.primitives.length; i++){
                this.scene.remove(this.primitives[i][0])
                var i1 = this.primitives[i][1]
                var j1 = this.primitives[i][2] 
                const ghost1 = new Triangle(
                    [
                        i1 * this.size + this.size / 2,
                        j1 * this.size + 0.2 * this.size,
                    ],
                    [i1 * this.size, (j1 + 1) * this.size - 0.1 * this.size],
                    [(i1 + 1) * this.size, (j1 + 1) * this.size - 0.1 * this.size],
                    [0.0, 0.0, 1.0, 1.0]
                );
                this.primitives[i] = (ghost1,i1,j1)
                this.scene.add(ghost1);
            }
        }

        else{
            for(let i = 0; i < this.primitives.length; i++){
                this.scene.remove(this.primitives[i][0])
            }
            this.createGhosts()
        }
    }  

    onRotateGrid = (rotationAngle) => {
        for(let i = 0; i< this.primitives.length; i++){
            this.primitives[i][j].   
        }
    }
}
