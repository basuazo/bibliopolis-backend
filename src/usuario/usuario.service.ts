import { Get, Injectable } from '@nestjs/common';
import { Usuario } from 'models/usuario';
import { UsuarioDTO } from 'models/usuario.dto';

@Injectable()
export class UsuarioService {
  //crear arreglo
  private usuarios: Usuario[] = [];

  //agregar usuario
  crearUsuario(usuario: Usuario): void {
    usuario.id = this.usuarios.length + 1;
    for (let i: number = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].correoElectronico == usuario.correoElectronico) {
      }
      return null;
    }
    this.usuarios.push(usuario);
  }

  //obtener usuario por id.}
  obtenerUsuarioId(id: number): Usuario {
    for (let i: number = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id == id) {
        return this.usuarios[i];
      }
    }
  }
  //obtener todos los usuarios menos password
  obtenerUsuarios(): UsuarioDTO[] {
    let usuariosDTO: UsuarioDTO[] = [];
    for (let i: number = 0; i < this.usuarios.length; i++) {
      usuariosDTO.push(
        new UsuarioDTO(
          this.usuarios[i].id,
          this.usuarios[i].nombre,
          this.usuarios[i].correoElectronico,
          this.usuarios[i].direccion,
          this.usuarios[i].historialPedidos,
        ),
      );
    }
    return usuariosDTO;
  }
  //eliminar usuarios por id.
  eliminarUsuario(id: number): void {
    for (let i: number = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id == id) {
        this.usuarios.splice(i - 1);
      }
    }
  }
}
