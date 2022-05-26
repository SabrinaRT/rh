import { Pipe, PipeTransform } from '@angular/core';
import { RegistroAtividade } from './siscrh';

@Pipe({
  name: 'searchfilter2'
})
export class SearchfilterPipe2 implements PipeTransform {

  transform( registroAtividade: RegistroAtividade[], searchValue:String) {
   
    if(!registroAtividade|| !registroAtividade){
      return registroAtividade;
    }
    return registroAtividade.filter(
      registroAtividade => 
      searchValue == null ||
      searchValue == '' ||
      registroAtividade.dadosPessoais.nome_completo.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())  ||
      registroAtividade.dadosPessoais.cpf.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      
      );
  }
  

}
