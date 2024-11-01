import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-my-galleries',
  templateUrl: './my-galleries.page.html',
  styleUrls: ['./my-galleries.page.scss'],
})
export class MyGalleriesPage implements OnInit {

  galleries: any = [];

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.getAllGalleries();
  }
  getAllGalleries(){
    this.galleryService.getGalleries().subscribe(response =>{
      this.galleries = response;
    })
  }

}
