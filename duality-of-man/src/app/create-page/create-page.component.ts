import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  ngOnInit(){
    
  }

  showImg;
  image1ChangedEvent: any = '';
  image2ChangedEvent: any = '';
  croppedImage1: any = '';
  croppedImage2: any = '';

  file1ChangeEvent(event: any): void {
    this.image1ChangedEvent = event;
  }
  file2ChangeEvent(event: any): void {
    this.image2ChangedEvent = event;
  }
  image1Cropped(event: ImageCroppedEvent) {
      this.croppedImage1 = event.base64;
  }
  image2Cropped(event: ImageCroppedEvent) {
    this.croppedImage2 = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

  public onClickSwitchDuality1(){
    var imageDiv = document.getElementById('image1') as HTMLDivElement;
    var textDiv = document.getElementById('text1') as HTMLDivElement;
    var buttonDiv = document.getElementById('switch1') as HTMLButtonElement;
    if(imageDiv.hidden==false){
      imageDiv.hidden=true;
      textDiv.hidden=false;
      buttonDiv.innerText="Switch to Image"
    }else{
      imageDiv.hidden=false;
      textDiv.hidden=true;
      buttonDiv.innerText="Switch to Text"
    }
  }
  public onClickSwitchDuality2(){
    var imageDiv = document.getElementById('image2') as HTMLDivElement;
    var textDiv = document.getElementById('text2') as HTMLDivElement;
    var buttonDiv = document.getElementById('switch2') as HTMLButtonElement;
    if(imageDiv.hidden==false){
      imageDiv.hidden=true;
      textDiv.hidden=false;
      buttonDiv.innerText="Switch to Image"
    }else{
      imageDiv.hidden=false;
      textDiv.hidden=true;
      buttonDiv.innerText="Switch to Text"
    }
  }

  public onClickGenerate(duality1, duality2){

    let drawOutlinedText=function(context, text, posArr, posOffset, outlineColor, color){
      context.strokeStyle=outlineColor;
      context.lineWidth=3;
      context.strokeText(text, posArr[0]-posOffset[0], posArr[1]+posOffset[1]);
      drawText(context, text, posArr, posOffset, color);
    }

    let drawText=function(context, text, posArr, posOffset, color){
      context.fillStyle=color;
      context.fillText(text, posArr[0]-posOffset[0], posArr[1]+posOffset[1]);
    }

    let dual1Pic1=[238,140]
    let dual2Pic1=[415,190]
    let dual1Pic2=[195,520]
    let dual2Pic2=[330,460]
    let man=[260,823]
    let fontSize=32
    let dual1Adj=[duality1.length/2*fontSize/2, fontSize/2]
    let dual2Adj=[duality2.length/2*fontSize/2, fontSize/2]
    let manoffset=['man'.length/2*fontSize/2,fontSize/2]
    let imgSize=100;
    let imgAdj=imgSize/2;
    let dualityImg1=new Image();
    dualityImg1.src=this.croppedImage1;
    let dualityImg2=new Image();
    dualityImg2.src=this.croppedImage2;

    let imageObj=new Image();
    imageObj.src='./assets/DualityOfMan.PNG'
    var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    var downloadButton = document.getElementById('infoLabel') as HTMLButtonElement;
    canvas.hidden=false;
    downloadButton.hidden=false;
    var context = canvas.getContext('2d');

    imageObj.onload = function () {
        context.drawImage(imageObj, 0,0);
        context.font = "32px Arial";
        var imageDiv1 = document.getElementById('image1') as HTMLDivElement;
        var imageDiv2 = document.getElementById('image2') as HTMLDivElement;
        // Draw Text
        if(imageDiv1.hidden){
          drawOutlinedText(context, duality1, dual1Pic1, dual1Adj, 'black', 'white');
          drawText(context, duality1, dual1Pic2, dual1Adj, 'black');
        }else{
          context.drawImage(dualityImg1, dual1Pic1[0]-imgAdj, dual1Pic1[1]-imgAdj);
          context.drawImage(dualityImg1, dual1Pic2[0]-imgAdj, dual1Pic2[1]-imgAdj);
        }

        if(imageDiv2.hidden){
          drawOutlinedText(context, duality2, dual2Pic1, dual2Adj, 'black', 'white');
          drawText(context, duality2, dual2Pic2, dual2Adj, 'black');
        }else{
          context.drawImage(dualityImg2, dual2Pic1[0]-imgAdj, dual2Pic1[1]-imgAdj);
          context.drawImage(dualityImg2, dual2Pic2[0]-imgAdj, dual2Pic2[1]-imgAdj);
        }

        drawText(context, "Man", man, manoffset, 'black')
    };
  
  
  }


  public onClickDownload(){
    var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

    var image = canvas.toDataURL("image/jpg");
    var link = document.createElement('a');
    link.hidden=true;
    link.download = "dualityOfMan.png";
    link.href = image;
    link.click();
  }
}
