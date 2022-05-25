import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-painel-config',
  templateUrl: './painel-config.component.html',
  styleUrls: ['./painel-config.component.css']
})
export class PainelConfigComponent implements OnInit {

  constructor(private route:ActivatedRoute) {
    this.idUser= this.route.snapshot.params["idUser"];
   }
idUser:any
  ngOnInit(): void {
  }

}
