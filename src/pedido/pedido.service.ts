import { BadRequestException, Injectable } from '@nestjs/common';
import { Pedido } from 'models/pedido';
import { Usuario } from 'models/usuario';
import { itemPedido } from 'models/itempedido';
import { Libro } from 'models/libro';
import { LibroService } from 'src/libro/libro.service';
@Injectable()
export class PedidoService {
  //llamada a servicio libro
  constructor(private readonly servicioLibro: LibroService) {}
  //crear array
  private pedidos: Pedido[] = [];
  //     crear un nuevo pedido
  // La fechaPedido debe ser igual a la fecha actual del sistema
  // El total se debe calcular en base al precio de cada libro en el pedido y su cantidad.
  // Se debe validar que exista stock para cada uno de los libros en el pedido.

  crearPedido(usuario: Usuario, librosPedidos: itemPedido[]): Pedido {
    //definición de variables
    let total: number = 0;
    let id: number = this.pedidos.length + 1;
    //Fecha igual a sistema
    let fechaPedido: Date = new Date();

    //validación de stock y cálculo de total
    for (let item of librosPedidos) {
      let libro: Libro = this.servicioLibro.obtenerLibroIsbn(item.libro.isbn);
      if (libro.stock < item.cantidad) {
        throw new Error('Falta stock');
      }
      total += item.cantidad;
    }
    let nuevoPedido = new Pedido(
      id,
      usuario,
      fechaPedido,
      'Pendiente',
      total,
      librosPedidos,
    );
    this.pedidos.push(nuevoPedido);
    return nuevoPedido;
  }

  // Obtener un pedido según su Id

  obtenerPedidoId(id: number): Pedido {
    for (let i: number = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].id == id) {
        return this.pedidos[i];
      }
    }
  }

  // Obtener todos los pedidos y permitir filtrar por estado y/o usuario
  obtenerPedidos(estado?: string, usuario?: Usuario): Pedido[] {
    return this.pedidos.filter((pedido) => {
      return (
        (!estado || pedido.estado === estado) &&
        (!usuario || pedido.usuario === usuario)
      );
    });
  }

  // Modificar el estado de un pedido según su id
  // Si el estado actual del pedido es "pendiente" solo debe permitir el valor "en proceso"
  // Si el estado actual del pedido es "en proceso" solo debe permitir el valor "enviado"
  // Si el estado actual del pedido es "enviado", sólo debe permitir el valor "entregado"
  // Si el estado actual del pedido es "entregado" no se puede modificar
  // Si no debe devolver el 400 con el mensaje “estado incorrecto”
  modificarEstadoPedido(id: number, nEstado: string): Pedido {
    let pedido: Pedido = null;
    //encontar el pedido
    for (let i: number = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].id == id) {
        pedido = this.pedidos[i];
      }
      //verificar estado y restringir actualización.

      switch (pedido.estado) {
        case 'Pendiente':
          if (nEstado !== 'En proceso') {
            throw new BadRequestException('estado incorrecto');
          }
          break;
        case 'En proceso':
          if (nEstado !== 'Enviado') {
            throw new BadRequestException('Estado incorrecto');
          }
          break;
        case 'Enviado':
          if (nEstado !== 'Entregado') {
            throw new BadRequestException('Estado incorrecto');
          }
          break;
        case 'Entregado':
          throw new BadRequestException('Entregado no se puede modificar');
        default:
          throw new BadRequestException('estado Incorrecto');
      }
      pedido.estado = nEstado;
      return pedido;
    }
  }
}
