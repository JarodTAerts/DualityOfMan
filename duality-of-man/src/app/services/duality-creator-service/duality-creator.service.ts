import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DualityCreatorService {
  // Constants
  FONT_SIZE = 32;

  DUALITY1_POSITION1 = [238, 140];
  DUALITY2_POSITION1 = [415, 190];
  DUALITY1_POSITION2 = [195, 520];
  DUALITY2_POSITION2 = [330, 460];
  MAN_POSITION = [260, 823];
  MAN_OFFSET = ['man'.length / 2 * this.FONT_SIZE / 2, this.FONT_SIZE / 2];

  IMAGE_SIZE = 100;
  IMAGE_OFFSET = this.IMAGE_SIZE / 2;

  // Main image and canvas to draw on
  dualityImage = new Image();
  dualityCanvas;

  constructor() {
    // Load image and set up canvas
    this.dualityImage.src = '../../../assets/DualityOfMan.PNG';
    this.dualityCanvas = document.createElement('canvas');
    this.dualityCanvas.hidden = true;
    this.dualityCanvas.width = 574; this.dualityCanvas.height = 964;
  }

  /**
   * Function that takes two dualities and creates a duality of man image from the base duality image
   * @param duality1 First Duality that will be added to the image. Could be image or string
   * @param duality2 Second Duality. Can also be image or string
   */
  public createDualityImage(duality1: any, duality2: any) {
    // Get the drawing context from the canvas and set it up with the base image
    var context = this.dualityCanvas.getContext('2d');
    context.drawImage(this.dualityImage, 0, 0);
    context.font = this.FONT_SIZE.toString()+"px Roboto";

    // Check and see if dualities are a string or image and handle accordingly
    if (typeof duality1 === "string") {
      // Draw text on canvas
      let offset = [duality1.length / 2 * this.FONT_SIZE / 2, this.FONT_SIZE / 2]
      this.drawOutlinedText(context, duality1, this.DUALITY1_POSITION1, offset, 'black', 'white');
      this.drawOutlinedText(context, duality1, this.DUALITY1_POSITION2, offset, 'black', 'white');
    } else {
        context.drawImage(duality1, this.DUALITY1_POSITION1[0] - this.IMAGE_OFFSET, this.DUALITY1_POSITION1[1] - this.IMAGE_OFFSET);
        context.drawImage(duality1, this.DUALITY1_POSITION2[0] - this.IMAGE_OFFSET, this.DUALITY1_POSITION2[1] - this.IMAGE_OFFSET);
    }
    if (typeof duality2 === "string") {
      // Draw text on canvas
      let offset = [duality2.length / 2 * this.FONT_SIZE / 2, this.FONT_SIZE / 2]
      this.drawOutlinedText(context, duality2, this.DUALITY2_POSITION1, offset, 'black', 'white');
      this.drawOutlinedText(context, duality2, this.DUALITY2_POSITION2, offset, 'black', 'white');
    } else {
      // Draw image on canvas
      context.drawImage(duality2, this.DUALITY2_POSITION1[0] - this.IMAGE_OFFSET, this.DUALITY2_POSITION1[1] - this.IMAGE_OFFSET);
      context.drawImage(duality2, this.DUALITY2_POSITION2[0] - this.IMAGE_OFFSET, this.DUALITY2_POSITION2[1] - this.IMAGE_OFFSET);
    }

    this.drawText(context, "Man", this.MAN_POSITION, this.MAN_OFFSET, 'black');

    var image = this.dualityCanvas.toDataURL("image/jpg");

    return (image);
  }


  /**
   * Function that will take a context and draw outlined text on it. Helpful for drawing readable text on light backgrounds
   */
  private drawOutlinedText = function (context, text, posArr, posOffset, outlineColor, color) {
    context.strokeStyle = outlineColor;
    context.lineWidth = 3;
    context.strokeText(text, posArr[0] - posOffset[0], posArr[1] + posOffset[1]);
    this.drawText(context, text, posArr, posOffset, color);
  }

  /**
   * Function that will draw text on a canvas context
   */
  private drawText = function (context, text, posArr, posOffset, color) {
    context.fillStyle = color;
    context.fillText(text, posArr[0] - posOffset[0], posArr[1] + posOffset[1]);
  }
}
