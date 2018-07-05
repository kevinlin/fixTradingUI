import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Direction } from '../../model/direction.enum';
import { OperationType } from '../../model/operation-type.enum';
import { TradingOperation } from '../../model/trading-operation';
import { TradingOperationService } from '../../service/trading-operation.service';

@Component({
  selector: 'app-trading-execution-detail',
  templateUrl: './trading-operation-detail.component.html',
  styleUrls: ['./trading-operation-detail.component.css']
})
export class TradingOperationDetailComponent implements OnInit {

  @Input() selectedOperation: TradingOperation;

  DirectionValues = Object.values(Direction).filter(e => typeof(e) == "string");
  OperationTypeValues = Object.values(OperationType).filter(e => typeof(e) == "string");

  constructor(private tradingOperationService: TradingOperationService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  saveExecution() {
    this.tradingOperationService.save(this.selectedOperation).subscribe(result => {
      this.selectedOperation = result;
      this.snackBar.open('Trading Operation: \'' + this.selectedOperation.tradingStrategy.name + '\'' + '-' + this.selectedOperation.date, 'saved', { duration: 3000 });
    })
  }

  cancelChanges() {
    this.selectedOperation = null;
  }

}
