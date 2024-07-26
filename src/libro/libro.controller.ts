import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Libro } from 'models/libro';
import { LibroService } from './libro.service';

@Controller('libro')
export class LibroController {
  constructor(private readonly servicio: LibroService) {}
  //crear un libro nuevo
  @Post()
  crearLibro(@Body() libro: Libro): Libro {
    return this.servicio.crearLibro(libro);
  }
  //Obtener libro por ISBN
  @Get(':isbn')
  obtenerLibroIsbn(@Param('isbn') isbn: string): Libro {
    return this.obtenerLibroIsbn(isbn);
  }

  //Obtenerlibro y permitir filtrar por autor/género

  @Get()
  obtenerLibros(
    @Query('autor') autor?: string,
    @Query('genero') genero?: string,
  ): Libro[] {
    return this.servicio.obtenerLibros(autor, genero);
  }
  //Eliminar libro por ISBN
  @Delete()
  eliminarLibroIsbn(@Param('isbn') isbn: string): void {
    return this.servicio.eliminarLibro(isbn);
  }
}
