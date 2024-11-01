import { Component, OnInit } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { AlertController } from '@ionic/angular'; 
import { Picture } from '../picture';

@Component({
  selector: 'app-my-pictures',
  templateUrl: './my-pictures.page.html',
  styleUrls: ['./my-pictures.page.scss'],
})
export class MyPicturesPage implements OnInit {
  pictures: Picture[] = []; 
  filteredPictures: Picture[] = []; 
  searchTerm: string = '';

  constructor(private pictureService: PictureService,
    private alercontroller: AlertController
  ) { }

  ngOnInit() {
    this.getAllPictures();
  }

  getAllPictures() {
    this.pictureService.getPictures().subscribe(
      response => {
        this.pictures = response.map((picture: Picture) => ({
          ...picture,
          filename: `http://localhost:8080/${picture.filename}` // Asegúrate de que la URL sea correcta
        }));
        this.filteredPictures = this.pictures;
        console.log('Pictures retrieved', this.pictures);
      },
      error => {
        console.error("Error fetching pictures:", error); // Manejo de errores
      }
    );
}

  filterPictures() {
    // Filtra las imágenes según el término de búsqueda
    this.filteredPictures = this.searchTerm
      ? this.pictures.filter((b: Picture) => 
          b.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.pictures; 
  }
  async presentConfirm(id: number) {
    const alert = await this.alercontroller.create({
      header: 'Confirmar Borrado',
      message: '¿Estás seguro de que deseas borrar esta imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.deletePicture(id);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  deletePicture(id: number) {
    this.pictureService.deletePicture(id).subscribe(
      response => {
        console.log('Picture deleted:', response);
        this.getAllPictures(); // Recargar las imágenes después de eliminar
      },
      error => {
        console.error('Error deleting picture:', error);
      }
    );
  }
}
