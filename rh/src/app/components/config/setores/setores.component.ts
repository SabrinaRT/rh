import { Component, OnInit } from '@angular/core';
import { Setores } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.css']
})
export class SetoresComponent implements OnInit {
  Setores:Setores[]
  constructor(private siscrhService:SiscrhService) { }

  ngOnInit(): void {
    this.siscrhService.getSetoresList().subscribe((data)=>{
      this.Setores =data;
    })
  }

}
