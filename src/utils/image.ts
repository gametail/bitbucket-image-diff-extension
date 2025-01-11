export function convertImageToCanvas(image: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d")?.drawImage(image, 0, 0);
    return canvas;
}
