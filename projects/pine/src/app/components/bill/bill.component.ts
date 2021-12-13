import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, BillService } from '../../services/bill.service'

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  order: Order | undefined;
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private billService: BillService,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const orderId: string = routeParams.get('id') || '';

    this.billService.getData(orderId)
    .subscribe((data) => {
      this.order = { ...data };
    });
  }

}
