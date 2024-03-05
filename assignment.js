"use strict";
import { drawScene } from "./draw-scene.js";
import { initBuffers } from "./innit-buffers.js";
var VSHADER_SOURCE = 
`
attribute vec4 a_Position;
attribute vec3 a_VertexNormal;
attribute vec4 a_Normal;

attribute vec2 a_TextureCoordWall;
attribute vec2 a_TextureCoordGround;
attribute vec2 a_TextureCoordRoof;
attribute vec2 a_TextureCoordDoor;

uniform mat4 u_MvpMatrix;
uniform mat4 u_NormalMatrix;
uniform vec3 u_LightDirection;
uniform vec3 u_LightColor;

varying highp vec2 v_TextureCoordWall;
varying highp vec2 v_TextureCoordGround;
varying highp vec2 v_TextureCoordRoof;
varying highp vec2 v_TextureCoordDoor;
varying highp vec3 v_LightPosition;

void main() {
  gl_Position = u_MvpMatrix * a_Position;
  v_TextureCoordWall = a_TextureCoordWall;
  v_TextureCoordGround = a_TextureCoordGround;
  v_TextureCoordRoof = a_TextureCoordRoof;
  v_TextureCoordDoor = a_TextureCoordDoor;

  highp vec3 ambientLight = vec3(1.0);
  highp vec3 directionalLightColor = vec3(1.0, 1.0, 1.0);
  highp vec3 directionalVector = normalize(vec3(5.0, 5.0, 5.0));
  
  highp vec4 transformedNormal = u_NormalMatrix * vec4(a_VertexNormal, 1.0);
  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  v_LightPosition = ambientLight + (directionalLightColor * directional);
}
`
var FSHADER_SOURCE =
`
precision mediump float;
varying highp vec2 v_TextureCoordWall;
varying highp vec2 v_TextureCoordGround;
varying highp vec2 v_TextureCoordRoof;
varying highp vec2 v_TextureCoordDoor;
varying highp vec3 v_LightPosition;

uniform sampler2D u_TextureWall;
uniform sampler2D u_TextureGround;
uniform sampler2D u_TextureRoof;
uniform sampler2D u_TextureDoor;

void main() {
  const float groundYMin = -0.5; 
  const float groundYMax = 0.0; 
  const float wallYMin = 0.0;
  const float wallYMax = 1.0;

  if (v_TextureCoordWall.y > wallYMin && v_TextureCoordWall.y <= wallYMax)
  {
    gl_FragColor = texture2D(u_TextureWall, v_TextureCoordWall);
  }
  else if (v_TextureCoordRoof.y > wallYMin && v_TextureCoordRoof.y < 1.0)
  {
    gl_FragColor = texture2D(u_TextureRoof, v_TextureCoordRoof);
  }
  else if (v_TextureCoordDoor.y > wallYMin && v_TextureCoordDoor.y < 1.0)
  {
    gl_FragColor = texture2D(u_TextureDoor, v_TextureCoordDoor);
  }
  else 
  {
    gl_FragColor = texture2D(u_TextureGround, v_TextureCoordGround);
  }
  gl_FragColor *= vec4(v_LightPosition, 1.0);
}
`
let cubeRotation = 0.0;
let deltaTime = 0;
var textures = new Array();

main();
function main()
{
  var canvas = document.getElementById("canvas"); 
  var gl = getWebGLContext(canvas);
  var shaderProgram = initShaderProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "a_Position"),
      normalPosition: gl.getAttribLocation(shaderProgram, "a_VertexNormal"),
      textureCoordinates: {
        textureCoordWall: gl.getAttribLocation(shaderProgram, "a_TextureCoordWall"),
        textureCoordGround: gl.getAttribLocation(shaderProgram, "a_TextureCoordGround"),
        textureCoordRoof: gl.getAttribLocation(shaderProgram, "a_TextureCoordRoof"),
        textureCoordDoor: gl.getAttribLocation(shaderProgram, "a_TextureCoordDoor"),
      }
    },
    uniformLocations: {
      uTextureWall: gl.getUniformLocation(shaderProgram, "u_TextureWall"),
      uTextureGround: gl.getUniformLocation(shaderProgram, "u_TextureGround"),
      uTextureRoof: gl.getUniformLocation(shaderProgram, "u_TextureRoof"),
      uTextureDoor: gl.getUniformLocation(shaderProgram, "u_TextureDoor"),
      uMvpMatrix: gl.getUniformLocation(shaderProgram, "u_MvpMatrix"),
      uNormalMatrix: gl.getUniformLocation(shaderProgram, "u_NormalMatrix"),
      uLightColor: gl.getUniformLocation(shaderProgram, "u_LightColor"),
      uLightDirection: gl.getUniformLocation(shaderProgram, "u_LightDirection"),
      uDiffuseLight: gl.getUniformLocation(shaderProgram, "u_DiffuseLight"),  
      uAmbientLight: gl.getUniformLocation(shaderProgram, "u_AmbientLight"),
    },
  };
  
  var buffers = initBuffers(gl);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  initTextures(gl, "resources/textures/wooden-wall-background-or-wood-texture-photo.jpg", textures);
  initTextures(gl, "resources/textures/grass.jpg", textures);
  initTextures(gl, "resources/textures/roof-top.jpg", textures);
  initTextures(gl, "resources/textures/wood-door.jpg", textures);
  let then = 0;

  var currentAngle = [0.0, 0.0];
  initEventHandlers(canvas, currentAngle);
  
  var viewProjMatrix = new Matrix4();
  viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 100.0);
  viewProjMatrix.lookAt(3.0, 3.0, 7.0, 0, 0, 0, 0, 1, 0);

  function render()
  {
    drawScene(gl, programInfo, buffers, textures, currentAngle, viewProjMatrix);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

function initShaderProgram(gl, vsSource,fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.getShaderInfoLog(fragmentShader);
  gl.linkProgram(shaderProgram);

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}


function initTextures(gl, sFilename, textures)
{
  var anz = textures.length;
  textures[anz] = {};
  textures[anz].texture = gl.createTexture();
  textures[anz].image = new Image();
  textures[anz].image.onload = function()
  {
    gl.bindTexture(gl.TEXTURE_2D, textures[anz].texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[anz].image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    if (isPowerOf2(textures[anz].image.width) && isPowerOf2(textures[anz].image.height))
    {  
      gl.generateMipmap(gl.TEXTURE_2D);
    }
    else
    { 
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  textures[anz].image.src = sFilename;
}
function initEventHandlers(casnvas, currentAngle)
{
  var dragging = false;
  var lastX = -1;
  var lastY = -1;
  canvas.onmousedown = function(ev)
  {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom)
    {
      lastX = x;
      lastY = y;
      dragging = true;
    }
  }
  canvas.onmouseup = function(ev)
  {
    dragging = false;
  }
  canvas.onmousemove = function(ev)
  {
    var x = ev.clientX;
    var y = ev.clientY;
    if (dragging)
    {
      var factor = 100 / canvas.height;
      var dx = factor * (x - lastX);
      var dy = factor * (y - lastY);
      currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0),-90.0);
      currentAngle[1] = currentAngle[1] + dx;
    }
    lastX = x;
    lastY = y;
  }
}