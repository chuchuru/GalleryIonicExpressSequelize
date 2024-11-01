import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../interfaces/artis.interface';
import { AlertController } from '@ionic/angular';
import { Camera, Photo, CameraResultType, CameraSource, GalleryPhoto} from '@capacitor/camera';

@Component({
  selector: 'app-my-artists',
  templateUrl: './my-artists.page.html',
  styleUrls: ['./my-artists.page.scss'],
})
export class MyArtistsPage implements OnInit {

  artists: Artist[] = [];
  searchTerm: string = '';
  selectedFile: File | null = null;
  artistForm: FormGroup;

  constructor(
    private artistService: ArtistService,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.artistForm = this.formBuilder.group({
      name: ['', Validators.required],
      surnames: [''],
      dateBirth: ['', Validators.required],
      file: [null] // Para almacenar el archivo
  });
}

  ngOnInit() {
    this.getAllArtists();
  }

  getAllArtists() {
    this.artistService.getArtists().subscribe((response: Artist[]) => {
        this.artists = response;
    });
}

   // Filtrar artistas
   filterArtists() {
    if (this.searchTerm) {
      this.artistService.searchByName(this.searchTerm).subscribe((data: Artist[]) => {
        this.artists = data;
      });
    } else {
      this.getAllArtists();
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Almacena el archivo seleccionado
  }

  // Añadir un artista
  async addArtist() {
    const alert = await this.alertController.create({
      header: 'Añadir Artista',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre' },
        { name: 'surnames', type: 'text', placeholder: 'Apellidos' },
        { name: 'dateBirth', type: 'date', placeholder: 'Fecha de nacimiento' },
        { name: 'filename', type: 'text', placeholder: 'Archivo de imagen' }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Añadir',
          handler: data => {
            const newArtist: Artist = {
              id: 0,  // Backend asignará ID
              name: data.name,
              surnames: data.surnames,
              dateBirth: data.dateBirth,
              
              filename: data.filename
            };
            this.artistService.addArtist(newArtist).subscribe(() => this.getAllArtists());
          }
        }
      ]
    });
    await alert.present();
  }

  // Modificar un artista
  async editArtist(id: number) {
    const artist = this.artists.find(a => a.id === id);
    if (!artist) return;

    const alert = await this.alertController.create({
      header: 'Modificar Artista',
      inputs: [
        { name: 'name', type: 'text', value: artist.name, placeholder: 'Nombre' },
        { name: 'surnames', type: 'text', value: artist.surnames, placeholder: 'Apellidos' },
        { name: 'dateBirth', type: 'date', value: artist.dateBirth, placeholder: 'Fecha de nacimiento' },
        { name: 'filename', type: 'text', value: artist.filename, placeholder: 'Archivo de imagen' }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: data => {
            const updatedArtist: Artist = {
              ...artist,  // Usar los datos existentes
              name: data.name,
              surnames: data.surnames,
              dateBirth: data.dateBirth,
              filename: data.filename
            };
            this.artistService.editArtist(id, updatedArtist).subscribe(() => this.getAllArtists());
          }
        }
      ]
    });
    await alert.present();
  }

  // Eliminar un artista
  async deleteArtist(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar este artista?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.artistService.deleteArtist(id).subscribe(() => this.getAllArtists());
          }
        }
      ]
    });
    await alert.present();
  }


  public async takePhoto(): Promise<Photo> {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    return capturedPhoto;
  }
  public async pickImage(): Promise<GalleryPhoto>{
    // Pick an image
    const capturedPhotos = await Camera.pickImages({
      limit: 1,
      quality: 100
    });

    return capturedPhotos.photos[0];
  }
}

