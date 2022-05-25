import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  constructor(private route:ActivatedRoute) { 
    this.idUser = this.route.snapshot.params["idUser"];
  }
idUser:any

  ngOnInit(): void {
  }

}
