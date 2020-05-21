import { Component, OnInit, HostListener } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DualityCreatorService } from './../services/duality-creator-service/duality-creator.service';
import { DualityAccessorService } from '../services/duality-accessor-service/duality-accessor.service';
import { hostViewClassName } from '@angular/compiler';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  // Services
  dualityCreatorService: DualityCreatorService;
  //dualityAccessorService: DualityAccessorService;

  // Bound Variables
  dualityImageSource = "../../assets/DualityOfMan.PNG";

  image1ChangedEvent: any = '';
  image2ChangedEvent: any = '';
  croppedImage1: any = '';
  croppedImage2: any = '';

  duality1Text = '';
  duality2Text = '';

  duality1ShowText = true;
  duality2ShowText = true;

  constructor(dualityCreatorService: DualityCreatorService, dualityAccessorService: DualityAccessorService) {
    this.dualityCreatorService = dualityCreatorService;
    //this.dualityAccessorService = dualityAccessorService;
  }

  ngOnInit() {
    //this.onClickGenerate();
  }

  /**
   * Function that is called automatically when a new image file is selected for Duality 1
   * @param event Event when different image is selected for the Duality 1 cropper
   */
  file1ChangeEvent(event: any): void {
    this.image1ChangedEvent = event;
  }

  /**
  * Function that is called automatically when a new image file is selected for Duality 2
  * @param event Event when different image is selected for the Duality 2 cropper
  */
  file2ChangeEvent(event: any): void {
    this.image2ChangedEvent = event;
  }

  /**
   * Function automatically called by the cropper when the image for Duality 1 is cropped
   * @param event Event created when the image in the cropper for Duality 1 is cropped
   */
  image1Cropped(event: ImageCroppedEvent) {
    this.croppedImage1 = event.base64;
  }

  /**
  * Function automatically called by the cropper when the image for Duality 2 is cropped
  * @param event Event created when the image in the cropper for Duality 2 is cropped
  */
  image2Cropped(event: ImageCroppedEvent) {
    this.croppedImage2 = event.base64;
  }

  /**
   * Functions that arent being used but are necessary for the cropper
   */
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  /**
   * Function that takes the contents from the inputs and actually creates the Duality image that the user
   * can download and displays it on the screen
   */
  public onClickGenerate() {

    let duality1;
    let duality2;

    // Get proper text or images for each of the dualities
    if (this.duality1ShowText) {
      duality1 = this.duality1Text;
    } else {
      var image = new Image();
      image.src = this.croppedImage1;
      duality1 = image;
    }

    if (this.duality2ShowText) {
      duality2 = this.duality2Text;
    } else {
      var image = new Image();
      image.src = this.croppedImage2;
      duality2 = image;
    }

    // Set scoped self variable so we can access class wide properties within onload functions
    let self = this;

    /**
     * This is a pretty jank part of the code so it warrents a pretty long explaintion. Basically the async bullshit of javascript can sometimes be difficult.
     * I was facing the problem that the images that were sent into the duality-creator service were not always fully loaded. Oddly, when I debugged/printed the src
     * it was apparent that these images were in fact loaded in the service, but they did not always print on the duality image. Therefore, I had to check to make sure they
     * were both loaded before calling the service if either duality was set to image. The best way that came to mind was to just check if they both were images and
     * call the service twice if they both were. It isn't the best method and it is kinda slow, but it at least works to put the images on the duality picture all the time.
     */
    if (!this.duality1ShowText) {
      duality1.onload = () => {
        self.dualityImageSource = self.dualityCreatorService.createDualityImage(duality1, duality2);
      }
    }
    if (!this.duality2ShowText) {
      duality2.onload = () => {
        self.dualityImageSource = self.dualityCreatorService.createDualityImage(duality1, duality2);
      }
    }

    // Call service not in onload if both dualities are text 
    if (this.duality1ShowText && this.duality2ShowText) {
      this.dualityImageSource = this.dualityCreatorService.createDualityImage(duality1, duality2);
      // Add this duality to the database
      //this.dualityAccessorService.AddDuality(this.duality1Text, this.duality2Text).subscribe();
    }
  }

  /**
   * Function that is called when the download button is clicked and downloads the duality image
   */
  public onClickDownload() {
    // Create link to download image from
    var link = document.createElement('a');
    link.hidden = true;
    link.download = "dualityOfMan.png";
    link.href = this.dualityImageSource;
    // Append to body and click (need to append for download to work on firefox) then remove from body so it doesn't grow the DOM
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Function that will scroll to an HTML Element 
   * @param el Element to scroll to
   */
  scroll(el: HTMLElement) {
    let emWidth = window.window.innerWidth / parseFloat(getComputedStyle(document.querySelector('body'))['fontSize']);

    // Only scroll to picture if it is in mobile mode and the image is below the entries
    if(emWidth <= 60){
      el.scrollIntoView();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    let emWidth = event.target.innerWidth / parseFloat(getComputedStyle(document.querySelector('body'))['fontSize']);

    if(emWidth>60){
      document.getElementById('nav').scrollIntoView();
    }
  }
}
