import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { Usuario } from 'models/usuario';
import { UsuarioDTO } from 'models/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly servicio: UsuarioService) {}
  // crear usuario
  @Post()
  crearUsuario(@Body() usuario: Usuario): Usuario {
    return this.servicio.crearUsuario(usuario);
  }

  //obtener usuario por id
  @Get(':id')
  obtenerUsuarioId(@Param('id') id: number): Usuario {
    return this.servicio.obtenerUsuarioId(id);
  }
  //Obtener todos los usuarios
  @Get()
  obtenerUsuarios(): UsuarioDTO[] {
    return this.servicio.obtenerUsuarios();
  }

  //Eliminar usuario por id

  @Delete(':id')
  borrarUsuarioId(@Param('id') id: number): void {
    return this.servicio.eliminarUsuario(id);
  }
}
