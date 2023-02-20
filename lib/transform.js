import { vec3, mat4 } from "https://cdn.skypack.dev/gl-matrix";

export class Transform {
    constructor() {
        this.translate = vec3.create();
        vec3.set(this.translate, 0, 0, 0);

        this.scale = vec3.create();
        vec3.set(this.scale, 1, 1, 1);

        this.rotationAngle = 0;
        this.rotationAxis = vec3.create();
        vec3.set(this.rotationAxis, 1, 0, 0);

        this.modelTransformMatrix = mat4.create();
        mat4.identity(this.modelTransformMatrix);

        this.updateModelTransformMatrix();
    }

    resetMatrix = () => {
        mat4.identity(this.modelTransformMatrix);
    };

    setScale = (xscale, yscale, pos,angle,del_pos) => {
        var scaleMatrix = mat4.create();
        var toOrigin = mat4.create();
        var rotate = mat4.create();
        var toInit = mat4.create();
        var toNewPoint = mat4.create();

        vec3.set(this.scale, xscale, yscale, 1.0);
        mat4.fromScaling(scaleMatrix, this.scale);

        vec3.set(this.translate, pos[0], pos[1], 0.0);
        mat4.fromTranslation(toOrigin, this.translate);

        this.rotationAngle = angle;
        mat4.fromRotation(rotate, this.rotationAngle, [0, 0, 1]);

        vec3.set(this.translate, -pos[0], -pos[1], 0.0);
        mat4.fromTranslation(toInit, this.translate);

        vec3.set(this.translate, del_pos[0], del_pos[1], 0.0);
        mat4.fromTranslation(toNewPoint, this.translate);

        mat4.multiply(this.modelTransformMatrix, toNewPoint, toOrigin);
        mat4.multiply(
            this.modelTransformMatrix,
            this.modelTransformMatrix,
            rotate
        )
        mat4.multiply(
            this.modelTransformMatrix,
            this.modelTransformMatrix,
            scaleMatrix
        );
        mat4.multiply(
            this.modelTransformMatrix,
            this.modelTransformMatrix,
            toInit
        );
    };

    updateModelTransformMatrix() {
        // @ToDO
        // 1. Reset the transformation matrix
        // 2. Use the current transformations values to calculate the latest transformation matrix
    }

    setTranslate = (dist = [0, 0]) => {
        vec3.set(this.translate, dist[0], dist[1], 0);
        mat4.fromTranslation(this.modelTransformMatrix, this.translate);
    };

    setRotate = angle => {
        this.rotationAngle = angle;
        // vec3.set(this.rotationAxis, 0, 0, 1);
        mat4.fromRotation(
            this.modelTransformMatrix,
            this.rotationAngle,
            [0, 0, 1]
        );
    };

    translateAndRotate = (pos, del_pos, angle) => {
        var toOrigin = mat4.create();
        var rotate = mat4.create();
        var toInit = mat4.create();
        var toNewPoint = mat4.create();

        vec3.set(this.translate, pos[0], pos[1], 0.0);
        mat4.fromTranslation(toOrigin, this.translate);

        this.rotationAngle = angle;
        mat4.fromRotation(rotate, this.rotationAngle, [0, 0, 1]);

        vec3.set(this.translate, -pos[0], -pos[1], 0.0);
        mat4.fromTranslation(toInit, this.translate);

        vec3.set(this.translate, del_pos[0], del_pos[1], 0.0);
        mat4.fromTranslation(toNewPoint, this.translate);

        mat4.multiply(this.modelTransformMatrix, toOrigin, rotate);
        mat4.multiply(
            this.modelTransformMatrix,
            this.modelTransformMatrix,
            toNewPoint
        );
        mat4.multiply(
            this.modelTransformMatrix,
            this.modelTransformMatrix,
            toInit
        );
    };

    rotateAboutPoint = (delta_x, delta_y, rotationAngle) => {
        var rotation = mat4.create();
        mat4.fromRotation(rotation, rotationAngle, [0, 0, 1]);

        var translate = mat4.create();
        vec3.set(this.translate, delta_x, delta_y, 0.0);
        mat4.fromTranslation(this.modelTransformMatrix, this.translate);

        // mat4.multiply(this.modelTransformMatrix,this.modelTransformMatrix,translate)
        mat4.multiply(
            this.modelTransformMatrix,
            this.modelTransformMatrix,
            rotation
        );
    };
}
