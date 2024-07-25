import { Libro } from './libro';
export class itemPedido {
  constructor(
    public libro: Libro,
    public cantidad: number,
  ) {}
}
