# GalleryApp

Este proyecto nace por la necesidad de desarrollar una aplicación para gestionar Galerías de Arte, sus obras expuestas y los pintores que los ha realizado.

# Base de datos
Para este ejercicio se ha pensado en guardar el nombre de la galería, su ubicación y foto del exterior.
El nombre, apellidos, fecha de nacimiento y foto de los artistas.
El nombre, descripción, revaloración, certificado, precio y foto de la obra.
Por motivos de seguridad y que, al entrar hubiera un modelo inicio de sesión,
se ha optado por crear la tabla user que almacena el username, el password 
y opcional un foto del usuario.

DIAGRAMA ENTIDAD RELACIÓN:
Galerías (1) -> Obras de Arte (m)
Obras de Arte (1) -> Artistas (m)
 
## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

### Prerequisites

Requirements for the software and other tools to build, test and push 
- [VS CODE](https://code.visualstudio.com/)
- [POSTMAN](https://www.postman.com/downloads/)
- [MYSQL](https://www.mysql.com/downloads/)

## Versioning

Esta es la versión 1.2 (se han corregido errores y se han añadido nuevas funcionalidades)

## Author

  - **Alejandro G. Guerra Betancor** -
Proyecto desarrollo con fines educativos.

## License

This project is licensed under the [CC0 1.0 Universal](LICENSE.md)
Creative Commons License - see the [LICENSE.md](LICENSE.md) file for
details

## Test it with POSTMAN
Test this example with the following end-points available here:
https://documenter.getpostman.com/view/38703284/2sAXxY2T5o

# Componentes Ionic Usados
- ion-content
- ion-header
- ion-label
- ion-list
- ion-item
- ion-title
- ion-footer
- ion-toolbar
- ion-fab-button
- ion-fab-list
- ion-tabs
- ion-tab-bar
- ion-card
- ion-icon
