import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssossiacaoService } from 'src/app/shared/service/assossiacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Declaracao de Variaveis

  inicio = true;
  info = false;
  equipe = false;
  contactos = false;
  entrarRef = true;
  criarRef = false;
  public associacao!: FormGroup;
  msg = false
  msg2 = false
  referencia : string=""
  tenhoReferencia = false
  exibirContrato = false
  esconderCriar = false
  preencherFormulario = false
  progressBar = false
  numeroDeAssociado : string=""
  

  // Construtor para Iniciar Objectos
  constructor(
     public fb : FormBuilder,
     public service : AssossiacaoService
  ) { }

  // Metodo que Indica o que Fazer ao Ser Carregado a Pagina
  ngOnInit(): void {
    this.associacao = this.fb.group({
      referencia : ['',[Validators.required]],
      nome : ['',[Validators.required]],
      idade : [0,[Validators.required]],
      genero : ['',[Validators.required]],
      password : ['',[Validators.required]],
      bi : ['',[Validators.required]],
      provincia : ['',[Validators.required]],
      municipio : ['',[Validators.required]],
      data : ['',[Validators.required]],
      servico : ['',[Validators.required]],
      profissao : ['',[Validators.required]],
      telefone : ['',[Validators.required]],
      email : ['',[Validators.required]]

    })
    this.msg = false
    this.msg2 = false
  }

  aoClicar(pagina: string){
    if(pagina=="inicio"){
       this.inicio = true;
       this.info = false;
       this.equipe = false;
       this.contactos = false;
  
    }else if(pagina=="info"){
      this.inicio = false;
      this.info = true;
      this.equipe = false;
      this.contactos = false;
 
   }else if(pagina=="equipe"){
    this.inicio = false;
    this.info = false;
    this.equipe = true;
    this.contactos = false;

   }else{
    this.inicio = false;
    this.info = false;
    this.equipe = false;
    this.contactos = true;
    
  }
    
    console.log("FOI CLICADO")
  }

  estadoRerenciar(estado: string){
    if(estado=="criar"){
      this.entrarRef = false;
      this.criarRef = true;
      this.esconderCriar = true
      this.exibirContrato = false
      this.msg2 = false
      this.associacao.reset()
      
    }else{
      this.entrarRef = true;
      this.criarRef = false;
      this.esconderCriar = false
      this.exibirContrato = false
      this.associacao.reset()
      console.log(this.associacao.value)

    }
  }

  entrar(){
     this.progressBar = true
     this.service.entrarNoSistema(this.associacao.value).subscribe(resposta =>{
      console.log(resposta)
      if(resposta.referencia == null || resposta.referencia == ""){
        this.msg2 = true
      }else{
        this.msg2 = false
        this.tenhoReferencia = true
        this.associacao.reset();
      }
      this.progressBar = false
    })
    
   
  }
  
  criarReferencia(){
    
    this.msg2 = false
    this.tenhoReferencia = false
    this.progressBar = true
    console.log("Entrou No Criar")
    console.log(this.associacao.value)
    this.service.cadastrarNovoUsuario(this.associacao.value).subscribe(resposta =>{
      console.log(resposta)
      this.numeroDeAssociado = resposta.referencia
      this.msg = true
      this.referencia = resposta.referencia
      this.criarRef = true
      this.esconderCriar = true
      this.exibirContrato = false
      this.msg = true
      this.progressBar = false
    }) 
    
    this.preencherFormulario = false
    this.associacao.reset();
  }
  sistema(){
    
  }
  voltar(){
    this.tenhoReferencia = false
    
  }
  voltarCriar(){
    this.esconderCriar = true
    this.exibirContrato = false
  }
  exibir(){
      
      if(this.associacao.value.nome == null ||
          this.associacao.value.password == null ||
          this.associacao.value.idade == 0||
          this.associacao.value.provincia == null||
          this.associacao.value.municipio == null||
          (this.associacao.value.genero == ""|| this.associacao.value.genero == null)||
          (this.associacao.value.data == ""||this.associacao.value.data == null)||
          (this.associacao.value.servico == ""||this.associacao.value.servico == null)||
          (this.associacao.value.profissao == ""||this.associacao.value.profissao == null)||
          (this.associacao.value.telefone == 0  || this.associacao.value.telefone == null)){

            this.msg = false
            this.preencherFormulario = true
            this.associacao.reset();
      }else{
          this.esconderCriar = false
          this.exibirContrato = true
          this.msg = false
          this.preencherFormulario = false
      }
      console.log(this.associacao.value)
  }
  fechar(){
    this.criarRef = false
    this.exibirContrato = false
    this.esconderCriar = false
    this.preencherFormulario = false
  }
  fecharForm(){
    this.associacao.reset();
    this.preencherFormulario = false
  }
}
