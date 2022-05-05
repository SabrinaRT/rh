import { Pipe, PipeTransform } from '@angular/core';
import { TabelaInicial } from './siscrh';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(tabelaInicial: TabelaInicial[], searchValue:string) {
   
    if(!tabelaInicial|| !tabelaInicial){
      return tabelaInicial;
    }
    /* return tabelaInicial.filter((tabelaInicial:any)=>{ tabelaInicial.nome.toLocaleLowerCase().includes(searchValue.toLowerCase())}); */
    return tabelaInicial.filter(
      tabelaInicial => 
      searchValue == null ||
      searchValue == '' ||
      tabelaInicial.nome.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())  ||
      tabelaInicial.setor.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) /* ||


      tabelaInicial.nome.toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase()) */);
     /*  return tabelaInicial.filter(item => item.nome.indexOf(searchValue) > -1); */
  }
  

}
