import { Injectable } from '@nestjs/common';
import { Libro } from 'models/libro';
@Injectable()
export class LibroService {
  //definir array
  private libros: Libro[] = [];

  // crear un nuevo libro, debe verificar que el ISBN no exista.
  crearLibro(libro: Libro): void {
    for (let i: number = 0; i < this.libros.length; i++) {
      if (this.libros[i].isbn == libro.isbn) {
      }
      return null;
    }
    this.libros.push(libro);
  }

  // Obtener un libro según su ISBN
  obtenerLibroIsbn(isbn: string): Libro {
    for (let i: number = 0; i < this.libros.length; i++) {
      if (this.libros[i].isbn == isbn) {
        return this.libros[i];
      }
    }
  }
  // Obtener todas los libros y permitir filtrar por autor y/o género (Si no se envían los filtros de autor o género debe devolver todos los libros,)
  obtenerLibros(autor?: string, genero?: string): Libro[] {
    return this.libros.filter((libro) => {
      return (
        (!autor || libro.autor === autor) &&
        (!genero || libro.genero === genero)
      );
    });
  }
  // Eliminar un libro según su ISBN
  eliminarLibro(isbn: string): void {
    for (let i: number = 0; i < this.libros.length; i++) {
      if (this.libros[i].isbn == isbn) {
        this.libros.splice(i - 1);
      }
    }
  }
}
