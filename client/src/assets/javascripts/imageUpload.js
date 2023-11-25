const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");

function showImage() {
    let imgLink = URL.createObjectURL(inputFile.files[0])
    imgView.style.backgroundImage = `url(${imgLink})`
    imgView.textContent = ""
    imgView.style.border = 0;
}

inputFile.addEventListener("change",showImage());

dropArea.addEventListener("dragover", function (e) {
    e.preventDefault();
})

dropArea.addEventListener("drop", function (e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    showImage();
})