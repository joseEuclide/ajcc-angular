import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssossiacaoService } from 'src/app/shared/service/assossiacao.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

    // Declaracao de Variaveis

  inicio = true;
  info = false;
  equipe = false;
  contactos = false;
  entrarRef = true;
  criarRef = false;
  public associacao! : FormGroup;
  msg = false
  msg2 = false
  referencia : string = ""
  tenhoReferencia = false
  exibirContrato = false
  esconderCriar = false
  preencherFormulario = false
  descricaoServico = false
  servico : string = ""
  descricao : string = ""
  progressBar = false
  numeroDeAssociado : String =""

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
    this.descricaoServico = false
  }


  estadoRerenciar(estado : String){
    if(estado=="criar"){
      this.entrarRef = false;
      this.criarRef = true;
      this.esconderCriar = true
      this.exibirContrato = false
      this.msg2 = false

     
      
    }else{
      this.entrarRef = true;
      this.criarRef = false;
      this.esconderCriar = false
      this.exibirContrato = false
    }
    this.descricaoServico = false
  }

  entrar(){
    this.progressBar = true
    this.descricaoServico = false
    console.log("Entrou No Entrar")
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
    
    this.progressBar = true
    this.msg2 = false
    this.tenhoReferencia = false
    this.descricaoServico = false
    console.log("Entrou No Criar")
   
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
  aderir(numero : number){
    if(numero == 1){
      this.servico = "Registro De Nascimento / Bilhete De Identidade"
      this.descricao = "Apoiar o Cidadão na obtenção do registo de nascimento e o respectivo bilhete de identidade de modo a conferir-lhe o direito a cidadania e os demais direitos consagrados e estabelecidos na constituição da República de Angola."
    }else if(numero == 2){
      this.servico = "Formação Profissional"
      this.descricao = "Mobilizar,identificar e Selecionar jovens desfavorecidos com vocação, talento e com desejo ou necessidade de formação profissional de modo a dotar e muní-los de capacidade e competências técnicas e profissionais para o mercado de trabalho."
    }else if(numero == 3){
      this.servico = "Formação Académica"
      this.descricao = "Apoiar os jovens desfavorecidos a busca de formação académica através de parcerias e bolsas de estudo. Apoiar na orientação e seleção de cursos médios ou superiores com saídas profissionais ou de emprego mais concorridas no mercado em função do contexto."
    }else if(numero == 4){
      this.servico = "Emprego"
      this.descricao = "Apoiar os jovens na busca de emprego através de parcerias público-privado e na capacitação para a criação de auto-emprego ou pequenas cooperativas, micro empresas ou empreendedorismo."
    }else if(numero == 5){
      this.servico = "Saúde"
      this.descricao = "Apoiar os cidadãos que se encontram limitados ou condicionados de estudar e trabalhar por motivos de saúde no âmbito dos acordos e parcerias estabelecidas."
    }else if(numero == 6){
      this.servico = "Apoio Social e Acompanhamento"
      this.descricao = "Apoiar as crianças, adolescentes, jovens e idosos nos mais diversos e variados temas socias, que não constam nos outros serviços. Fazer Acompanhamento de todos os cidadão que estejam a beneficiar-se de todos os serviços da Associação."
    }
    this.descricaoServico = true
  }
  acessar(){
    this.descricaoServico = false
    this.progressBar = false
    this.entrarRef = true
    this.tenhoReferencia = false
    this.criarRef = false
    this.esconderCriar = false
    this.preencherFormulario = false
    this.msg = false
    this.exibirContrato = false
  }
}
