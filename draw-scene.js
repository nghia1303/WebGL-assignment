function drawScene(gl, programInfo, buffers, textures, currentAngle, viewProjMatrix)
{
  gl.clearColor(0.5, 0.2, 0.3, 1.0); 
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.useProgram(programInfo.program);
  
  setVertexAttribute(gl, buffers, programInfo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  
  var MvpMatrix = new Matrix4();
  MvpMatrix.set(viewProjMatrix);
  MvpMatrix.rotate(currentAngle[0], 1.0, 0.0, 0.0);
  MvpMatrix.rotate(currentAngle[1], 0.0, 1.0, 0.0);

  gl.uniform3f(programInfo.uniformLocations.uDiffuseLight, 1.0, 1.0, 1.0);
  var lightDirection = new Vector3([0.5, 3.0, 4.0]);
  lightDirection.normalize();
  gl.uniform3fv(programInfo.uniformLocations.uLightDirection, lightDirection.elements);
  
  gl.uniformMatrix4fv(programInfo.uniformLocations.uMvpMatrix, false, MvpMatrix.elements);
  setTextureCoordAttribute(gl, 2, buffers.textures.textureBufferWall, programInfo.attribLocations.textureCoordinates.textureCoordWall, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textures[0].texture);
  gl.uniform1i(programInfo.uniformLocations.uTextureWall, 0); 
  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  setTextureCoordAttribute(gl, 2, buffers.textures.textureBufferGround, programInfo.attribLocations.textureCoordinates.textureCoordGround, 0);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, textures[1].texture);
  gl.uniform1i(programInfo.uniformLocations.uTextureGround, 1); 
  {
    const vertexCount = 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 36*2 + 12*2;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  setTextureCoordAttribute(gl, 2, buffers.textures.textureBufferRoof, programInfo.attribLocations.textureCoordinates.textureCoordRoof, 0);
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, textures[2].texture);
  gl.uniform1i(programInfo.uniformLocations.uTextureRoof, 2); 
  {
    const vertexCount = 12;
    const type = gl.UNSIGNED_SHORT;
    const offset = 36*2;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  setTextureCoordAttribute(gl, 2, buffers.textures.textureBufferDoor, programInfo.attribLocations.textureCoordinates.textureCoordDoor, 0);
  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, textures[3].texture);
  gl.uniform1i(programInfo.uniformLocations.uTextureDoor, 3);
  {
    const vertexCount = 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 36 * 2 + 12 * 2 + 6 * 2;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}


function setVertexAttribute(gl, buffers, programInfo) {
  const numComponents = 3;
  const type = gl.FLOAT;
  const normalize = false; 
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function setTextureCoordAttribute(gl, num, buffers, textureCoordLocation, offset) {
  if (textureCoordLocation !== undefined)
  {
    const type = gl.FLOAT; 
    const normalize = false;
    const stride = 0; 
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers);
    gl.vertexAttribPointer(
      textureCoordLocation,
      num,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(textureCoordLocation);
  }
}

export { drawScene };
  