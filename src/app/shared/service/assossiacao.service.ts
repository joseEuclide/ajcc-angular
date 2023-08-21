import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assossiacao } from '../model/associacao';

@Injectable({
  providedIn: 'root'
})
export class AssossiacaoService {

  // Url da API

  // Conexao Local
  // apiUrl = "http://localhost:8080/";

  // Conexao no Heroku
  //apiUrl = "https://casacompanheira.herokuapp.com/";

  // Conexao Com Back.End na AWS Elastic Beanstalk
  //apiUrl = "http://ajcc-association.eu-north-1.elasticbeanstalk.com/";

  // Conexao Com o Back-End no Render.com
  apiUrl ="https://ajcc.onrender.com/";
  

  options!: {
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };

  // Indicacao de que os dados enviados sao do tipo JSON 
  httpOptions = {
    headers : new Headers({
      'content-type':'application/json'
    })
  }

  

  // Construtor do Service
  constructor(private httpClient : HttpClient) { }

  // Metodo Responsável Em Fazer O Usuario Entrar No Sistema
  public entrarNoSistema(associacao : any):Observable<Assossiacao>{
    
    
    return this.httpClient.post<any>(this.apiUrl+"entrar",associacao)
  }

  // Metodo Responsável Em Cadastrar Novo Usuario No Sistema
  public cadastrarNovoUsuario(associacao : any):Observable<Assossiacao>{
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('http-equiv','Content-Security-Policy')
      .set('content','upgrade-insecure-requests');  
    console.log(headers)
    return this.httpClient.post<any>(this.apiUrl+"cadastrar",associacao,{'headers':headers})
  }
}
