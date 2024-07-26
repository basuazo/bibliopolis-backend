import { Body, Controller, Param, Post, Get, Query, Put } from '@nestjs/common';
import { itemPedido } from 'models/itempedido';
import { Pedido } from 'models/pedido';
import { Usuario } from 'models/usuario';
import { PedidoService } from './pedido.service';
@Controller('pedido')
export class PedidoController {
  constructor(private readonly servicio: PedidoService) {}
  //     crear un nuevo pedido
  @Post()
  crearPedido(
    @Body('usuario') usuario: Usuario,
    @Body('items') items: itemPedido[],
  ): Pedido {
    return this.servicio.crearPedido(usuario, items);
  }
  // Obtener un pedido según su Id
  @Get(':id')
  obtenerPedidoId(@Param('id') id: number): Pedido {
    return this.servicio.obtenerPedidoId(id);
  }
  // Obtener todos los pedidos y permitir filtrar por estado y/o usuario
  @Get()
  obtenerPedidos(
    @Query('estado') estado?: string,
    @Query('usuario') usuario?: Usuario,
  ): Pedido[] {
    return this.servicio.obtenerPedidos(estado, usuario);
  }

  // Modificar el estado de un pedido según su id
  @Put(':id/estado')
  editarPedido(
    @Param('id') id: number,
    @Body('estado') nEstado: string,
  ): Pedido {
    return this.servicio.modificarEstadoPedido(id, nEstado);
  }
}
