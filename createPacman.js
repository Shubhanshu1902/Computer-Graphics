import { Pacman } from "./lib/threeD.js";

export const createPacman = (i,j,pacmanRadius,color,size,scene,grid) => {
    const pacman = new Pacman(
        [(i + 0.5)*size,(j+0.5)*size],
        pacmanRadius,
        color,
        scene,
        grid,
        size
    )    
    return pacman;
}