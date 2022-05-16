import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root' //esta propiedad significa que el servicio está global en la aplicación
})
export class GifsService {

  private apiKey: string = 'U8nqAHa1rEAJqgsQQmW23JJANcVK1KnV';
  private _historial: string[] = [];
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  public resultados: Gif[] = [];
  private limit: string = '6';

  get historial() {
    return [...this._historial];
  }


  constructor( private http: HttpClient ){

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('ultimoResultado')!) || []
  }

  buscarGifs( queryDeBusqueda: string = ''){

    queryDeBusqueda = queryDeBusqueda.trim().toLowerCase();

    if ( !this._historial.includes( queryDeBusqueda )) {
      this._historial.unshift(queryDeBusqueda);
      this._historial = this._historial.splice(0,8);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams().set('api_key', this.apiKey).set('limit', this.limit).set('q', queryDeBusqueda);

    console.log(params.toString())
    console.log(this.limit);

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe( (resp) => {
      
      this.resultados = resp.data;
      localStorage.setItem('ultimoResultado', JSON.stringify(this.resultados))
    })
  }

  cantidadResultados( limite: string ='3') {
   
  }
  }
