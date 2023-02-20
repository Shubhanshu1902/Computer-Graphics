export const vertexShaderSrc = `      
	attribute vec3 aPosition;
    uniform mat4 uModelMatrix;
	uniform vec3 uResolution;
    
	void main () {     
		vec4 updatedPosition = uModelMatrix * vec4(aPosition,1);
		vec3 clipspace = updatedPosition.xyz/uResolution * 2.0 - 1.0;
		gl_Position =  vec4(clipspace*vec3(1,-1,0.0), 1.0);
	}                          
`;