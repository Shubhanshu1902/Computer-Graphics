import { Circle } from "./lib/threeD.js";

export class Pallets {
    constructor(grid, palletRadius, size, scene) {
        this.grid = grid;
        this.size = size;
        this.scene = scene;
        this.n = this.grid.length;
        this.m = this.grid[0].length;
        this.normalRadius = palletRadius;
        let temp2 = new Array(this.m);
        temp2.fill(0);
        this.copyGrid = new Array(this.n);
        this.copyGrid.fill(temp2);
        this.rotationAngle = 0;
        this.primitives = JSON.parse(JSON.stringify(this.grid));
        this.createPoints();
    }

    createPoints = () => {
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.grid[j][i] === 0) {
                    var vert = [(i + 0.5) * this.size, (j + 0.5) * this.size];
                    var color = [249 / 255, 177 / 255, 144 / 255, 1.0];
                    var c1 = new Circle(vert, this.normalRadius, color);
                    this.primitives[j][i] = c1;
                    this.scene.add(c1);
                }

                if (this.grid[j][i] === 2) {
                    var vert = [(i + 0.5) * this.size, (j + 0.5) * this.size];
                    var color = [249 / 255, 177 / 255, 144 / 255, 1.0];
                    var c1 = new Circle(vert, this.normalRadius * 1.5, color);
                    this.primitives[j][i] = c1;
                    this.scene.add(c1);
                }
            }
        }
    };

    markVisited = (i, j) => {
        if (this.copyGrid[i][j] === 0) {
            this.scene.remove(this.primitives[i][j]);
            if (this.grid[i][j] === 0) {
                var vert = [(j + 0.5) * this.size, (i + 0.5) * this.size];
                var color = [0.0, 1.0, 0.0, 1.0];
                var c1 = new Circle(vert, this.normalRadius, color);
                this.primitives[i][j] = c1;
                this.scene.add(c1);
            } else if (this.grid[i][j] === 2) {
                var vert = [(j + 0.5) * this.size, (i + 0.5) * this.size];
                var color = [0.0, 1.0, 0.0, 1.0];
                var c1 = new Circle(vert, this.normalRadius * 1.5, color);
                this.primitives[i][j] = c1;
                this.scene.add(c1);
            }
        }

        if (this.grid[i][j] === 0) {
            return false;
        } else if (this.grid[i][j] === 2 && this.copyGrid[i][j] === 0) {
            this.copyGrid[i][j] = 1;
            return true;
        }
        console.log(i, j);
        return false;
    };

    mod = (n, m) => {
        return ((n % m) + m) % m;
    };

    rotatePallets = dir => {
        this.rotationAngle = this.mod(this.rotationAngle + dir * 90, 360);
        this.grid_center = [(this.n / 2) * this.size, (this.m / 2) * this.size];

        if (this.rotationAngle === 90) {
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    var delta_x = this.n * this.size;
                    var delta_y = 0;
                    if (this.grid[i][j] === 0 || this.grid[i][j] === 2)
                        this.primitives[i][j].transform.rotateAboutPoint(
                            delta_x,
                            delta_y,
                            Math.PI / 2
                        );
                }
            }
        } else if (this.rotationAngle === 180) {
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    var delta_x = this.m * this.size;
                    var delta_y = this.n * this.size;
                    if (this.grid[i][j] === 0 || this.grid[i][j] === 2)
                        this.primitives[i][j].transform.rotateAboutPoint(
                            delta_x,
                            delta_y,
                            Math.PI
                        );
                }
            }
        } else if (this.rotationAngle === 270) {
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    var delta_x = 0;
                    var delta_y = this.m * this.size;
                    if (this.grid[i][j] === 0 || this.grid[i][j] === 2)
                        this.primitives[i][j].transform.rotateAboutPoint(
                            delta_x,
                            delta_y,
                            Math.PI * 1.5
                        );
                }
            }
        } else if (this.rotationAngle === 0) {
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.m; j++) {
                    if (this.grid[i][j] === 0 || this.grid[i][j] === 2)
                        this.primitives[i][j].transform.rotateAboutPoint(
                            0,
                            0,
                            0.0
                        );
                }
            }
        }
    };
}
