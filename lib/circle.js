import { Transform } from "./transform.js";

export class Circle {
    constructor(center, r, color) {
        this.vertexPositions = [];
        for (let i = 0; i < 360; i++) {
            this.vertexPositions = this.vertexPositions.concat([center[0], center[1], 0.0]);
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

        this.vertexPositions = new Float32Array(this.vertexPositions);
        this.type = "circle";
        this.color = color;
        this.transform = new Transform();
    }
}
