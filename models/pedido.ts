import { Usuario } from './usuario';
import { itemPedido } from './itempedido';

export class Pedido {
  constructor(
    public id: number,
    public usuario: Usuario,
    public fechaPedido: Date,
    public estado: string,
    public total: number,
    public items: itemPedido[],
  ) {}
}
