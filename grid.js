import { Pacman, Quadrilateral, Triangle, Circle } from "./lib/threeD.js";

export class Grid {
    constructor(map, size, scene, pacmanRadius, palleteRadius) {
        this.og = map;
        this.map = map;
        this.size = size;
        this.n = map.length;
        this.m = map[1].length;
        this.scene = scene;
        this.pacmanRadius = pacmanRadius;
        this.palleteRadius = palleteRadius;
        this.ogPrimitives = JSON.parse(JSON.stringify(this.map));
        this.primitives = JSON.parse(JSON.stringify(this.map));
        this.ghosts = {
            4: 0,
            5: 0,
            6: 0,
            7: 0,
        };
        this.temp = JSON.parse(JSON.stringify(this.map));
        this.rotationGrid = 0;
    }

    createPacman = (i, j) => {
        var color = [1.0, 1.0, 0.0, 1.0];
        this.pacman = new Pacman(
            [(i + 0.5) * this.size, (j + 0.5) * this.size],
            this.pacmanRadius,
            color,
            this.scene,
            this.map,
            this.size
        );
        this.primitives[j][i] = this.pacman;
        this.ogPrimitives[j][i] = this.pacman;
        this.scene.add(this.pacman);
    };

    createGhosts = (i, j, color, number) => {
        const ghost = new Triangle(
            [i * this.size + this.size / 2, j * this.size + 0.1 * this.size],
            [i * this.size, (j + 1) * this.size - 0.1 * this.size],
            [(i + 1) * this.size, (j + 1) * this.size - 0.1 * this.size],
            color
        );

        this.ghosts[parseInt(number)] = [ghost, i, j];
        this.primitives[j][i] = ghost;
        this.ogPrimitives[j][i] = ghost;
        this.scene.add(ghost);

        if (this.rotationGrid === 90) {
            this.primitives[j][i].transform.rotateAboutPoint(
                this.n * this.size,
                0,
                Math.PI / 2
            );
        }
    };

    createQuadrilateral = (i, j, color) => {
        var quad = new Quadrilateral(
            [i * this.size, j * this.size],
            [i * this.size, (j + 1) * this.size],
            [(i + 1) * this.size, (j + 1) * this.size],
            [(i + 1) * this.size, j * this.size],
            color
        );

        this.primitives[j][i] = quad;
        this.ogPrimitives[j][i] = quad;
        this.scene.add(quad);
    };

    createPallete = (i, j, circleRadius, color) => {
        var vert = [(i + 0.5) * this.size, (j + 0.5) * this.size];
        var circle = new Circle(vert, circleRadius, color);
        this.primitives[j][i] = circle;
        this.ogPrimitives[j][i] = circle;
        this.scene.add(circle);
    };

    createAllGhosts = () => {
        this.ghosts = {
            4: 0,
            5: 0,
            6: 0,
            7: 0,
        };

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                if (this.og[i][j] === 4) {
                    this.createGhosts(
                        j,
                        i,
                        [51 / 255, 254 / 255, 254 / 255, 1.0],
                        4
                    );
                } else if (this.og[i][j] === 5) {
                    this.createGhosts(
                        j,
                        i,
                        [254 / 255, 153 / 255, 205 / 255, 1.0],
                        5
                    );
                } else if (this.og[i][j] === 6) {
                    this.createGhosts(
                        j,
                        i,
                        [254 / 255, 204 / 255, 50 / 255, 1.0],
                        6
                    );
                } else if (this.og[i][j] === 7) {
                    this.createGhosts(j, i, [1.0, 0.0, 0.0, 1.0], 7);
                }
            }
        }
    };

    createAllGhostsBlue = () => {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                if (this.map[i][j] === 4) {
                    this.createGhosts(j, i, [0, 0, 1, 1], 4);
                } else if (this.map[i][j] === 5) {
                    this.createGhosts(j, i, [0, 0, 1, 1], 5);
                } else if (this.map[i][j] === 6) {
                    this.createGhosts(j, i, [0, 0, 1, 1], 6);
                } else if (this.map[i][j] === 7) {
                    this.createGhosts(j, i, [0, 0, 1, 1], 7);
                }
            }
        }
    };

    createMap = () => {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                if (
                    this.map[i][j] === 1 &&
                    (i === 0 || j === 0 || i === this.n - 1 || j === this.m - 1)
                ) {
                    this.createQuadrilateral(j, i, [0.0, 0.0, 1.0, 1.0]);
                } else if (this.map[i][j] === 1) {
                    this.createQuadrilateral(j, i, [1.0, 1.0, 1.0, 1.0]);
                } else if (this.map[i][j] === -1) {
                    this.createPacman(j, i);
                } else if (this.map[i][j] === 0) {
                    this.createPallete(j, i, this.palleteRadius, [
                        249 / 255,
                        177 / 255,
                        144 / 255,
                        1.0,
                    ]);
                } else if (this.map[i][j] === 2) {
                    this.createPallete(j, i, this.palleteRadius * 1.5, [
                        249 / 255,
                        177 / 255,
                        144 / 255,
                        1.0,
                    ]);
                }
            }
        }

        this.createAllGhosts();
    };

    markVisitedPallete = (i, j, radius) => {
        this.scene.remove(this.primitives[i][j]);
        this.temp[i][j] = 3;
        this.createPallete(j, i, radius, [0.0, 1.0, 0.0, 1.0]);
    };

    changeGhostColor = () => {
        if (this.flow === 0) {
            console.log(this.ghosts);
            for (const [key, val] of Object.entries(this.ghosts)) {
                this.scene.remove(val[0]);
            }
            this.createAllGhostsBlue();
        } else if (this.flow === 1) {
            for (const [key, val] of Object.entries(this.ghosts)) {
                this.scene.remove(val[0]);
            }
            this.createAllGhosts();
            this.flow = 2;
        }
    };

    returnPacmanToItsPos = direction => {
        var center = this.pacman.ogCenter;
        var pos = this.pacman.pos;
        var curr_pos = [
            (center[1] + pos[1] - this.size / 2) / this.size,
            (center[0] + pos[0] - this.size / 2) / this.size,
        ];

        if (this.rotationGrid === 90) {
            this.pacman.transform.setTranslate(
                [curr_pos[0] + curr_pos[1] - this.n + 1] * this.size,
                [curr_pos[1] - curr_pos[0]] * this.size
            );
        } else {
            this.pacman.move(direction);
        }
    };

    movePacman = direction => {
        if (this.rotationGrid != 0) this.unRotate();
        var center = this.pacman.ogCenter;

        if (this.rotationGrid === 90) {
            if (direction === "r") direction = "u";
            else if (direction === "d") direction = "r";
            else if (direction === "u") direction = "l";
            else if (direction === "l") direction = "d";
        }
        if (this.rotationGrid === 180) {
            if (direction === "r") direction = "l";
            else if (direction === "d") direction = "u";
            else if (direction === "u") direction = "d";
            else if (direction === "l") direction = "r";
        }
        if (this.rotationGrid === 270) {
            if (direction === "r") direction = "d";
            else if (direction === "d") direction = "l";
            else if (direction === "u") direction = "r";
            else if (direction === "l") direction = "u";
        }
        // this.translatePacman();
        var pos = this.pacman.pos;

        var curr_pos = [
            (center[1] + pos[1] - this.size / 2) / this.size,
            (center[0] + pos[0] - this.size / 2) / this.size,
        ];

        // var curr_pos = [this.PacPos[0] / this.size, this.PacPos[1] / this.size];
        if (
            direction === "r" &&
            (this.map[curr_pos[0]][curr_pos[1] + 1] === 0 ||
                this.map[curr_pos[0]][curr_pos[1] + 1] == 2 ||
                this.map[curr_pos[0]][curr_pos[1] + 1] == -1)
        ) {
            if (this.temp[curr_pos[0]][curr_pos[1] + 1] === 0) {
                this.markVisitedPallete(
                    curr_pos[0],
                    curr_pos[1] + 1,
                    this.palleteRadius
                );
                if (this.flow === 0) this.flow = 1;
                this.changeGhostColor();
            } else if (this.temp[curr_pos[0]][curr_pos[1] + 1] === 2) {
                this.markVisitedPallete(
                    curr_pos[0],
                    curr_pos[1] + 1,
                    this.palleteRadius * 1.5
                );
                this.flow = 0;
                this.changeGhostColor();
            }
            this.pacman.move("r");
        } else if (
            direction === "l" &&
            (this.map[curr_pos[0]][curr_pos[1] - 1] === 0 ||
                this.map[curr_pos[0]][curr_pos[1] - 1] == 2 ||
                this.map[curr_pos[0]][curr_pos[1] - 1] == -1)
        ) {
            if (this.temp[curr_pos[0]][curr_pos[1] - 1] === 0) {
                this.markVisitedPallete(
                    curr_pos[0],
                    curr_pos[1] - 1,
                    this.palleteRadius
                );
                if (this.flow === 0) this.flow = 1;
                this.changeGhostColor();
            } else if (this.temp[curr_pos[0]][curr_pos[1] - 1] === 2) {
                this.markVisitedPallete(
                    curr_pos[0],
                    curr_pos[1] - 1,
                    this.palleteRadius * 1.5
                );
                this.flow = 0;
                this.changeGhostColor();
                this.pacman.scalePacman();
            }
            this.pacman.move("l");
        } else if (
            direction === "d" &&
            (this.map[curr_pos[0] + 1][curr_pos[1]] === 0 ||
                this.map[curr_pos[0] + 1][curr_pos[1]] == 2 ||
                this.map[curr_pos[0] + 1][curr_pos[1]] == -1)
        ) {
            if (this.temp[curr_pos[0] + 1][curr_pos[1]] === 0) {
                this.markVisitedPallete(
                    curr_pos[0] + 1,
                    curr_pos[1],
                    this.palleteRadius
                );
                if (this.flow === 0) this.flow = 1;
                this.changeGhostColor();
            } else if (this.temp[curr_pos[0] + 1][curr_pos[1]] === 2) {
                this.markVisitedPallete(
                    curr_pos[0] + 1,
                    curr_pos[1],
                    this.palleteRadius * 1.5
                );
                this.flow = 0;
                this.changeGhostColor();
                this.pacman.scalePacman();
            }
            this.pacman.move("d");
        } else if (
            direction === "u" &&
            (this.map[curr_pos[0] - 1][curr_pos[1]] === 0 ||
                this.map[curr_pos[0] - 1][curr_pos[1]] == 2 ||
                this.map[curr_pos[0] - 1][curr_pos[1]] == -1)
        ) {
            if (this.temp[curr_pos[0] - 1][curr_pos[1]] === 0) {
                this.markVisitedPallete(
                    curr_pos[0] - 1,
                    curr_pos[1],
                    this.palleteRadius
                );
                if (this.flow === 0) this.flow = 1;
                this.changeGhostColor();
            } else if (this.temp[curr_pos[0] - 1][curr_pos[1]] === 2) {
                this.markVisitedPallete(
                    curr_pos[0] - 1,
                    curr_pos[1],
                    this.palleteRadius * 1.5
                );
                this.flow = 0;
                this.changeGhostColor();
                this.pacman.scalePacman();
            }
            this.pacman.move("u");
        }

        if (this.flow === 0) {
            this.pacman.scalePacman();
        }
        if (this.rotationGrid != 0) this.rotate();
        // this.returnPacmanToItsPos(direction)
    };

    // 1 for clockwise
    // -1 for anticlockwise
    rotatePacman = direction => {
        if (this.rotationGrid != 0) this.unRotate();
        this.pacman.rotatePacman(direction);
        if (this.rotationGrid != 0) this.rotate();
    };

    mod = (n, m) => {
        return ((n % m) + m) % m;
    };

    translateGhosts = () => {
        if (this.rotationGrid === 90) {
            for (const [key, val] of Object.entries(this.ghosts)) {
                val[0].transform.setTranslate([
                    -(val[2] + val[1] - this.n + 1) * this.size,
                    (val[1] - val[2]) * this.size,
                ]);
            }
        } else if (this.rotationGrid === 180) {
            for (const [key, val] of Object.entries(this.ghosts)) {
                val[0].transform.setTranslate([
                    -(2 * val[1] - this.m + 1) * this.size,
                    -(2 * val[2] - this.n + 1) * this.size,
                ]);
            }
        } else if (this.rotationGrid === 270) {
            for (const [key, val] of Object.entries(this.ghosts)) {
                val[0].transform.setTranslate([
                    (val[2] - val[1]) * this.size,
                    -(val[1] + val[2] - this.m + 1) * this.size,
                ]);
            }
        }
    };

    modifyPacman = (x, y) => {
        x = Math.floor(x / this.size);
        y = Math.floor(y / this.size);
        console.log(this.map[x][y], x, y);
        if (x > this.m - 1 || y > this.n - 1) {
            return;
        }

        if (
            this.map[x][y] === 1 ||
            this.map[x][y] === 4 ||
            this.map[x][y] === 5 ||
            this.map[x][y] === 6 ||
            this.map[x][y] === 7
        ) {
            console.log("hell o");
            return;
        }
        console.log("hello");
        this.scene.remove(this.pacman);
        this.createPacman(x, y);
    };

    translatePacman = () => {
        var angle = (this.pacman.rotatedAngle * Math.PI) / 180;
        var pos = this.pacman.pos;
        var center = this.pacman.ogCenter;

        var curr_pos = [
            (center[1] + pos[1] - this.size / 2) / this.size,
            (center[0] + pos[0] - this.size / 2) / this.size,
        ];

        this.PacPos = [0, 0];
        if (this.rotationGrid === 90) {
            var centerTranslation = [
                this.n * this.size - center[1] - center[0],
                -center[1] + center[0],
            ];

            if(this.pacman.rotatedAngle === 0){
                angle = Math.PI/2;
                console.log("hello")
                centerTranslation = [
                    centerTranslation[1],
                    -centerTranslation[0]   
                ]

                this.PacPos = [
                    centerTranslation[0] + pos[0],
                    centerTranslation[1] + pos[1],
                ];
            }

            else if (this.pacman.rotatedAngle === 90) {
                angle = Math.PI
                centerTranslation = [
                    -centerTranslation[0],
                    -centerTranslation[1],
                ];

                this.PacPos = [
                    centerTranslation[0] + pos[1],
                    centerTranslation[1] - pos[0]
                ]
            }

            else if (this.pacman.rotatedAngle === 180){
                angle = Math.PI/2 * 3
                centerTranslation = [
                    -centerTranslation[1],
                    centerTranslation[0]
                ]

                this.PacPos = [
                    centerTranslation[0] - pos[0],
                    centerTranslation[1] - pos[1]
                ]

            }

            else if (this.pacman.rotatedAngle === 270){
                angle = 0
                centerTranslation = [
                    centerTranslation[0],
                    centerTranslation[1]
                ]

                this.PacPos = [
                    centerTranslation[0] - pos[1],
                    centerTranslation[1] + pos[0]
                ]
            }
            // this.pacman.setPos(newPos);
        } else if (this.rotationGrid === 180) {
            var centerTranslation = [
                -(2 * center[0] - this.m * this.size),
                -(2 * center[1] - this.n * this.size),
            ];

            if(this.pacman.rotatedAngle === 270){
                angle = Math.PI/2;
                console.log("hello")
                centerTranslation = [
                    centerTranslation[1],
                    -centerTranslation[0]   
                ]

                this.PacPos = [
                    centerTranslation[0] - pos[1],
                    centerTranslation[1] + pos[0],
                ];
            }

            else if (this.pacman.rotatedAngle === 0) {
                angle = Math.PI
                centerTranslation = [
                    -centerTranslation[0],
                    -centerTranslation[1],
                ];

                this.PacPos = [
                    centerTranslation[0] + pos[0],
                    centerTranslation[1] + pos[1]
                ]
            }

            else if (this.pacman.rotatedAngle === 90){
                angle = Math.PI/2 * 3
                centerTranslation = [
                    -centerTranslation[1],
                    centerTranslation[0]
                ]

                this.PacPos = [
                    centerTranslation[0] + pos[1],
                    centerTranslation[1] - pos[0]
                ]

            }

            else if (this.pacman.rotatedAngle === 180){
                angle = 0
                centerTranslation = [
                    centerTranslation[0],
                    centerTranslation[1]
                ]

                this.PacPos = [
                    centerTranslation[0] - pos[0],
                    centerTranslation[1] - pos[1]
                ]
            }
            // this.pacman.setPos(newPos)
        } else if (this.rotationGrid === 0) {
            var centerTranslation = [0, 0];

            if(this.pacman.rotatedAngle === 90){
                angle = Math.PI/2;
                console.log("hello")
                centerTranslation = [
                    centerTranslation[1],
                    -centerTranslation[0]   
                ]

                this.PacPos = [
                    centerTranslation[0] + pos[0],
                    centerTranslation[1] - pos[1],
                ];
            }

            else if (this.pacman.rotatedAngle === 180) {
                angle = Math.PI
                centerTranslation = [
                    -centerTranslation[0],
                    -centerTranslation[1],
                ];

                this.PacPos = [
                    centerTranslation[0] - pos[1],
                    centerTranslation[1] - pos[0]
                ]
            }

            else if (this.pacman.rotatedAngle === 270){
                angle = Math.PI/2 * 3
                centerTranslation = [
                    -centerTranslation[1],
                    centerTranslation[0]
                ]

                this.PacPos = [
                    centerTranslation[0] - pos[0],
                    centerTranslation[1] + pos[1]
                ]

            }

            else if (this.pacman.rotatedAngle === 0){
                angle = 0
                centerTranslation = [
                    centerTranslation[0],
                    centerTranslation[1]
                ]

                this.PacPos = [
                    centerTranslation[0] + pos[0],
                    centerTranslation[1] + pos[1]
                ]
            }
        } else if (this.rotationGrid === 270) {
            var centerTranslation = [
                center[1] - center[0],
                this.m * this.size - center[0] - center[1],
            ];

            if(this.pacman.rotatedAngle === 180){
                angle = Math.PI/2;
                console.log("hello")
                centerTranslation = [
                    centerTranslation[1],
                    -centerTranslation[0]   
                ]

                this.PacPos = [
                    centerTranslation[0] - pos[0],
                    centerTranslation[1] - pos[1],
                ];
            }

            else if (this.pacman.rotatedAngle === 270) {
                angle = Math.PI
                centerTranslation = [
                    -centerTranslation[0],
                    -centerTranslation[1],
                ];

                this.PacPos = [
                    centerTranslation[0] - pos[1],
                    centerTranslation[1] + pos[0]
                ]
            }

            else if (this.pacman.rotatedAngle === 0){
                angle = Math.PI/2 * 3
                centerTranslation = [
                    -centerTranslation[1],
                    centerTranslation[0]
                ]

                this.PacPos = [
                    centerTranslation[0] + pos[0],
                    centerTranslation[1] + pos[1]
                ]

            }

            else if (this.pacman.rotatedAngle === 90){
                angle = 0
                centerTranslation = [
                    centerTranslation[0],
                    centerTranslation[1]
                ]

                this.PacPos = [
                    centerTranslation[0] + pos[1],
                    centerTranslation[1] - pos[0]
                ]
            }
        }

        console.log(pos, this.PacPos, curr_pos, center, centerTranslation);

        this.pacman.transform.translateAndRotate(center, this.PacPos, angle);
    };

    transpose = matrix => {
        return matrix.reduce(
            (prev, next) =>
                next.map((item, i) => (prev[i] || []).concat(next[i])),
            []
        );

        return matrix;
    };

    mirror = matrix => {
        matrix.map(x => {
            return x.reverse();
        });
        return matrix;
    };

    rotateGrid = (direction = 1) => {
        this.rotationGrid = this.mod(this.rotationGrid + direction * 90, 360);
        this.rotate();
    };

    unRotate = () => {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                this.primitives[i][j].transform.rotateAboutPoint(0, 0, 0);
            }
        }

        // this.pacman.rotate();
    };

    rotate = () => {
        var deltaX = 0;
        var deltaY = 0;
        var angle = (this.rotationGrid * Math.PI) / 180;
        if (this.rotationGrid === 90) {
            deltaX = this.n * this.size;
            deltaY = 0;
        } else if (this.rotationGrid === 180) {
            deltaX = this.m * this.size;
            deltaY = this.n * this.size;
        } else if (this.rotationGrid === 270) {
            deltaX = 0;
            deltaY = this.m * this.size;
        }

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                this.primitives[i][j].transform.rotateAboutPoint(
                    deltaX,
                    deltaY,
                    angle
                );
            }
        }

        this.translateGhosts();
        this.translatePacman();

        // this.pacman.rotate();
    };
}