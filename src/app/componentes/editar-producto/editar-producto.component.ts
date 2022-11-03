import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Producto } from 'src/app/modelo/producto.model';
import { ProductoServicio } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  productos: Producto[];
  producto: Producto ={
    nombre: '',
    precio: 0,
    cantidad: 0
  }

  id:string;

  constructor(private productosServicio: ProductoServicio,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.productosServicio.getProducto(this.id).subscribe((producto) => {
        this.producto = producto;
      });
    }

    guardar({value, valid}: {value:Producto, valid:boolean}){
      if(!valid){
        this.flashMessages.show('Por favor llena el formulario correctamente',{
          cssClass:'alert-danger', timeout:4000
        });
      }else{
        value.id = this.id;
        //modificar cliente
        this.productosServicio.modificarProducto(value);
        this.router.navigate(['/']);
      }
    }
  
    eliminar(){
      if(confirm('¿Seguro que desea eliminar el producto?  (Este cambio es Permanente)')){
        this.productosServicio.eliminarProducto(this.producto);
        this.router.navigate(['/']);
      }
    }

}
