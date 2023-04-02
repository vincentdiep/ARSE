export const Canvas = () => {
    // Get canvas element
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Create a variable to store the current mouse position
    let currentPos = { x: 0, y: 0 };
    let saved_shapes = {
    shapes:[
        /*
        {
        id:1,
        name:'Refrigerators',  // reactive, connected to input element on side
        shape:'rectangle',
        color:'#FF0000',   // reactive
        pos: {
            x:0,y:0,
            w:100,h:200
        }
        }
        */
    ]
    }
    let temp_shape = null;

    // Create a variable to store the rectangle position and size
    let rect = { x: 0, y: 0, w: 0, h: 0 };

    // Create a variable to store the grid size
    const gridSize = 10;

    // Function to snap a value to the grid size
    function snapToGrid(value) {
    return Math.round(value / gridSize,0) * gridSize;
    }

    // Function to draw the rectangle
    function drawRect(r) {
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);
    ctx.stroke();
    }

    function clearScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function drawTempShape() {
        if (temp_shape) {
            drawRect(temp_shape.pos);
        }
    }
    function drawSavedShapes() {
        saved_shapes.shapes.forEach( (s) => {
            if ('shape' in s && s.shape == 'rectangle') {
            drawRect(s.pos);
            }
        })
    }

    function fixOffsetX(x) {
    const canvasRect = canvas.getBoundingClientRect();
    x = x - canvasRect.left
    return x
    }
    function fixOffsetY(y) {
    const canvasRect = canvas.getBoundingClientRect();
    y = y - canvasRect.top
    return y
    }

    canvas.addEventListener("mousedown", (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    currentPos = {
        x: fixOffsetX(e.clientX),
        y: fixOffsetY(e.clientY)
    }
    rect.x = snapToGrid(currentPos.x);
    rect.y = snapToGrid(currentPos.y);
    canvas.addEventListener("mousemove", mousemove);
    });

    // Event listener for mouse up
    canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener("mousemove", mousemove);
    rect.w = snapToGrid(rect.w);
    rect.h = snapToGrid(rect.h);
    saved_shapes.shapes.push(temp_shape)
    temp_shape = null;

    clearScreen();
    drawSavedShapes();
    });

    // Function to track mouse movement
    function mousemove(e) {
    rect.w = fixOffsetX(e.clientX) - currentPos.x;
    rect.h = fixOffsetY(e.clientY) - currentPos.y;
    rect.w = snapToGrid(rect.w);
    rect.h = snapToGrid(rect.h);
    
    temp_shape = {
        name:'',
        shape:'rectangle',
        pos:{
            x:snapToGrid(currentPos.x),
            y:snapToGrid(currentPos.y),
            w:rect.w,
            h:rect.h
            }
        };
    clearScreen();
    drawSavedShapes();
    drawTempShape();
    }
}