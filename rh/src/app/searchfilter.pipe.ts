import { Pipe, PipeTransform } from '@angular/core';
import { RegistroAtividade, TabelaInicial } from './siscrh';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  

  transform(tabelaInicial: TabelaInicial[], searchValue:any) {

   

    if (searchValue) {
      searchValue = searchValue.toLocaleLowerCase();
      return tabelaInicial.filter((tabelaInicial) =>
      tabelaInicial.nome.toLocaleLowerCase().indexOf(searchValue) !== -1);
  } else {
      return tabelaInicial;
  }
  
    /* if(!tabelaInicial|| !tabelaInicial){
      return tabelaInicial;
    }
    return tabelaInicial.filter(
      tabelaInicial => 
      searchValue == null ||
      searchValue == '' ||
      tabelaInicial.nome.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())  ||
      tabelaInicial.setor.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      
      ); */
  }
  

}
