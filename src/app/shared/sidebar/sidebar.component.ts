import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  
})
export class SidebarComponent  {

  constructor( private gifServicio: GifsService){}

  get historial(){
    return this.gifServicio.historial
  }

  buscar(termino: string){
  this.gifServicio.buscarGifs(termino);
  }

}
