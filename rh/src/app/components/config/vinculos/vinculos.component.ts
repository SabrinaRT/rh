import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Vinculos } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-vinculos',
  templateUrl: './vinculos.component.html',
  styleUrls: ['./vinculos.component.css']
})
export class VinculosComponent implements OnInit {
  Vinculos:Vinculos[]
  constructor(private siscrhService:SiscrhService) { }

  ngOnInit(): void {
    this.siscrhService.getVinculosList().subscribe((data)=>{
      this.Vinculos =data;
    })
  }

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  // example
  go() {
    this.viewport.scrollToIndex(23)
  }

}
