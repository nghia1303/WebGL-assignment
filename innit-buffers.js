function initBuffers(gl)
{
    const positionBuffer = initPositionBuffer(gl, positions);
    const textureBufferWall = initTextureBuffer(gl, textureCoordinatesWall);
    const textureBufferGround = initTextureBuffer(gl, textureCoordinatesGround);
    const textureBufferRoof = initTextureBuffer(gl, textureCoordinatesRoof);
    const textureBufferDoor = initTextureBuffer(gl, textureCoordinatesDoor);
    const normalBuffer = initNormalBuffer(gl);
    const indexBuffer = initIndexBuffer(gl);
    return {
        positions: positionBuffer,
        textures: {
            textureBufferWall: textureBufferWall,
            textureBufferGround: textureBufferGround,
            textureBufferRoof: textureBufferRoof,
            textureBufferDoor: textureBufferDoor,
        },
        normals: normalBuffer,
        indices: indexBuffer,
    };
}

const textureCoordinatesWall = [
    // Front
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Back
    1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
    // Top
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Bottom
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Right
    1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
    // Left
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
];

const textureCoordinatesDoor = [
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,

    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,

    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,   
]

const textureCoordinatesRoof = [
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,

    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
];

const textureCoordinatesGround = [
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,

    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
];

const positions = [
    // Front face
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -0.999, -1.0, 1.0, -0.999, -1.0, 1.0, -0.999, 1.0, -1.0, -0.999, 1.0,

    // Right face
    1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 

    // Roof
    -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 0, 2.0, 0.0, 1.0, 1.0, 1.0,
    
    1.0, 1.0, -1.0,
    
    // Ground
    3.0, -1.0, 3.0, 3.0, -1.0, -3.0, -3.0, -1.0, -3.0, -3.0, -1.0, 3.0,

    // Door
    -0.5, -1.0, 1.001, -0.5, 0.0, 1.001, 0.5, 0.0, 1.001, 0.5, -1.0, 1.001,
]

const vertexNormals = [
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   // v4-v7-v6-v5 back

    // Roof
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

    // Ground
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
];

function initNormalBuffer(gl)
{
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    return normalBuffer;
}

function initPositionBuffer(gl, positions)
{
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
}

function initTextureBuffer(gl, textureCoordinates)
{
    const textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    return textureBuffer;
}

function initIndexBuffer(gl)
{
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    const indices = [
        0,
        1,
        2,
        0,
        2,
        3, // front
        4,
        5,
        6,
        4,
        6,
        7, // back
        8,
        9,
        10,
        8,
        10,
        11, // top
        12,
        13,
        14,
        12,
        14,
        15, // bottom
        16,
        17,
        18,
        16,
        18,
        19, // right
        20,
        21,
        22,
        20,
        22,
        23, // left
        24,
        25,
        26,
        24,
        26,
        27,
        27,
        26,
        28,
        25,
        26,
        28, // roof 
        29,
        30,
        31,
        29,
        31,
        32, // ground
        33,
        34,
        35,
        33,
        35,
        36, // door
    ];
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW
      );
    return indexBuffer;
}

export { initBuffers };