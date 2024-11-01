import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  endpoint = "http://localhost:8080/api/galleries"

  constructor(private httpClient: HttpClient) { }

  getGalleries(): Observable <any> {
    return this.httpClient.get(this.endpoint);
  }
  
}
