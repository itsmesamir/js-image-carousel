var container = document.getElementById('carousel-container');
var imgWrapper = document.getElementById('image-wrapper');
var imgItem = document.getElementsByClassName('img-item');
var IMAGE_WIDTH = 600;
var IMAGE_HEIGHT = 400;
container.style.width = IMAGE_WIDTH + 'px';
container.style.height = IMAGE_HEIGHT + 'px';
container.style.position = 'relative';
container.style.overflow = 'hidden';
imgWrapper.style.width = imgItem.length * IMAGE_WIDTH;
imgWrapper.style.position = 'relative';
imgWrapper.style.transition = 'all 20ms 500ms';

var arrowLeft;
var arrowRight;

function createArrow() {
    arrowLeft = document.createElement("i");
    arrowLeft.classList = "fas fa-chevron-left";
    arrowRight = document.createElement("i");
    arrowRight.classList = "fas fa-chevron-right";
    arrowLeft.style.color = 'white';
    arrowLeft.style.top = "50%";
    arrowLeft.style.transform = 'translateY(-50%)';
    arrowLeft.style.position = "absolute";
    arrowLeft.style.padding = "15px";
    arrowLeft.style.fontSize = "20px";
    arrowLeft.style.backgroundColor = "rgba(0,0,0,0.6)";
    arrowLeft.style.cursor = "pointer";

    arrowRight.style.color = 'white';
    arrowRight.style.position = "absolute";
    arrowRight.style.top = "50%";
    arrowRight.style.transform = 'translateY(-50%)';
    arrowRight.style.right = '0';
    arrowRight.style.fontSize = "20px";
    arrowRight.style.padding = "15px";
    arrowRight.style.background = "rgba(0,0,0,0.6)";
    arrowRight.style.cursor = "pointer";
    container.appendChild(arrowLeft);
    container.appendChild(arrowRight);

    function mouseEffect(arrow) {
        arrow.addEventListener('mouseover', function() {
            arrow.style.background = "white";
            arrow.style.color = "rgba(0,0,0,0.6)";
        })
        arrow.addEventListener('mouseout', function() {
            arrow.style.color = "white";
            arrow.style.background = "rgba(0,0,0,0.6)";
        })
    }
    mouseEffect(arrowLeft);
    mouseEffect(arrowRight);
}

createArrow();
var dotArr = [];

function createDot(id) {
    var dot = document.createElement('div');
    dot.id = id;
    dot.style.width = '15px';
    dot.style.height = '15px';
    dot.classList.add('inactive');
    dot.style.display = 'flex';
    dot.style.alignContent = 'center';
    dot.style.alignItems = 'center';
    dot.style.position = 'absolute';
    dot.style.bottom = "15px";
    dot.style.cursor = "pointer";
    dot.style.borderRadius = '50%';
    dot.style.textAlign = "center";
    dot.style.left = "48%";
    dot.style.transform = 'translateX(-100%)';
    dot.style.marginLeft = (a * 22) + 'px';
    if (id === 0) {
        dot.classList.add('current-dot');
        dot.classList.add('active');
    }
    dot.addEventListener('click', function() {
        var currentSlider = document.querySelector('.current-slider');
        var currentDot = document.querySelector('.current-dot');
        var nextSlider = imgItem[id];
        moveSlider(currentSlider, nextSlider);
        dotStatusUpdate(currentDot, dot, id);

    })
    container.appendChild(dot);
    dotArr.push(dot);
}

function dotStatusUpdate(currentDot, nextDot, id) {
    currentDot.classList.remove('active', 'current-dot');
    nextDot.classList.add('active', 'current-dot');
}

for (var a = 0; a < imgItem.length; a++) {
    var item = imgItem[a];
    item.style.width = IMAGE_WIDTH + 'px';
    item.style.height = IMAGE_HEIGHT + 'px';
    item.style.objectFit = 'cover';
    item.style.left = IMAGE_WIDTH * a + 'px';

    createDot(a);
}

function moveSlider(currentSlider, nextSlider) {
    imgWrapper.style.transform = 'translateX(-' + nextSlider.style.left + ')';
    currentSlider.classList.remove('current-slider');
    nextSlider.classList.add('current-slider');
}

arrowRight.addEventListener('click', function() {
    var currentSlider = document.querySelector('.current-slider');
    var nextSlider = currentSlider.nextElementSibling;
    var currentDot = document.querySelector('.current-dot');
    var nextDot = currentDot.nextElementSibling;
    if (nextSlider !== null) {
        moveSlider(currentSlider, nextSlider);
    } else {
        nextSlider = imgWrapper.firstElementChild;
        nextDot = dotArr[0];
        moveSlider(currentSlider, nextSlider);
    }
    dotStatusUpdate(currentDot, nextDot);
});
arrowLeft.addEventListener('click', function() {
    var currentSlider = document.querySelector('.current-slider');
    var prevSlider = currentSlider.previousElementSibling;
    var currentDot = document.querySelector('.current-dot');
    var nextDot = currentDot.previousElementSibling;
    if (prevSlider !== null) {
        moveSlider(currentSlider, prevSlider);
    } else {
        prevSlider = imgWrapper.lastElementChild;
        nextDot = dotArr[dotArr.length - 1];
        moveSlider(currentSlider, prevSlider);
    }
    dotStatusUpdate(currentDot, nextDot);
});