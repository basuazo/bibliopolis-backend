import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { LibroController } from './libro/libro.controller';
import { LibroService } from './libro/libro.service';
import { PedidoController } from './pedido/pedido.controller';
import { PedidoService } from './pedido/pedido.service';

@Module({
  imports: [],
  controllers: [AppController, UsuarioController, LibroController, PedidoController],
  providers: [AppService, UsuarioService, LibroService, PedidoService],
})
export class AppModule {}
