import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { LibroController } from './libro/libro.controller';
import { LibroService } from './libro/libro.service';

@Module({
  imports: [],
  controllers: [AppController, UsuarioController, LibroController],
  providers: [AppService, UsuarioService, LibroService],
})
export class AppModule {}
