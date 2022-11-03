import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Producto } from 'src/app/modelo/producto.model';
import { ProductoServicio } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  producto: Producto ={
    nombre: '',
    precio: 0,
    cantidad: 0
  }

  @ViewChild("productoForm") productoForm:NgForm; 
  @ViewChild("botonCerrar") botonCerrar:ElementRef;

  constructor(private productosServicio: ProductoServicio,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.productosServicio.getProductos().subscribe(
      productos => {
        this.productos = productos;
      }
    )
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.productos) {
      this.productos.forEach(producto => {
        if (producto.precio)
          saldoTotal += producto.precio;
      })
    }
    return saldoTotal;
  }

  agregar({value, valid}: {value:Producto, valid:boolean}){
    if(!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      this.productosServicio.agregarProducto(value);
      this.productoForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  
}
