interface Transaccion {
    id: number;
    fecha: Date;
    monto: number;
    clienteId: number;
    productoId: number;
  }
  
    interface Producto {
      id: number;
      nombre: string;
      descripcion: string;
      precio: number;
    }
  
    async function llenar(cantidad: number, baseDatos: any) {
      for (let i = 0; i < cantidad; i++) {
        const transaccion: Transaccion = {
          id: i + 1,
          fecha: new Date(),
          monto: Math.random() * 1000,
          clienteId: Math.floor(Math.random() * 10) + 1, // Suponiendo 10 clientes
          productoId: Math.floor(Math.random() * 20) + 1 // Suponiendo 20 productos
        };
    
        await baseDatos.transacciones.insertOne(transaccion);
      }
    }
  
  
    async function buscar(idTransaccion: number, baseDatos: any) {
      const transaccion = await baseDatos.transacciones.findOne({ id: idTransaccion });
    
      if (transaccion) {
        const cliente = await baseDatos.clientes.findOne({ id: transaccion.clienteId });
        const producto = await baseDatos.productos.findOne({ id: transaccion.productoId });
    
        console.log(`Transaccion ${transaccion.id}:`);
        console.log(`  Fecha: ${transaccion.fecha}`);
        console.log(`  Monto: ${transaccion.monto}`);
        console.log(`  Cliente: ${cliente.nombre}`);
        console.log(`  Producto: ${producto.nombre}`);
      } else {
        console.error(`Transaccion con ID ${idTransaccion} no encontrada.`);
      }
    }
  
    async function consultar(baseDatos: any) {
      const transacciones = await baseDatos.transacciones.find({});
    
      for (const transaccion of transacciones) {
        const cliente = await baseDatos.clientes.findOne({ id: transaccion.clienteId });
        const producto = await baseDatos.productos.findOne({ id: transaccion.productoId });
    
        console.log(`Transaccion ${transaccion.id}:`);
        console.log(`  Fecha: ${transaccion.fecha}`);
        console.log(`  Monto: ${transaccion.monto}`);
        console.log(`  Cliente: ${cliente.nombre}`);
        console.log(`  Producto: ${producto.nombre}`);
        console.log('-----------------');
      }
    }
  
    import { llenar, buscar, consultar } from './resolver';
  
  (async () => {
    // Conectar a la base de datos (reemplazar con implementación real)
    const baseDatos = {
      transacciones: {
        insertOne: async () => {},
        findOne: async () => {},
        find: async () => {}
      },
      clientes: {
        findOne: async () => {}
      },
      productos: {
        findOne: async ()