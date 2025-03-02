import { CommonModule } from '@angular/common';
import { Component, Input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GenericPaginatorConfigModel, PaginatorEmitEvent } from '@shared-models/generic-paginator.model';
import { FontAwesomeProviders } from 'assets/fontawesome/font-awesome-icons.provider';

@Component({
  selector: 'app-generic-paginator',
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './generic-paginator.component.html',
  styleUrl: './generic-paginator.component.scss'
})
export class GenericPaginatorComponent {

  fontAwesomeProviders = FontAwesomeProviders;

  displayPageSizeOptions = false;
  
  onDisplayPageSizeOptions(){
    this.displayPageSizeOptions = !this.displayPageSizeOptions;
  }

  private _paginatorConfig = signal<GenericPaginatorConfigModel>({
    pageOptionsFirstTitle: '',
    pageOptionsSecondTitle: '',
    pageInfoTitle: '',
    pageInfoSeparator: '-',
    pageNumber: 1,
    pageSize: 0,
    totalRecords: 0,
    totalPages: 1,
    pageSizeOptions: []
  });

  @Input({required: true}) set paginatorConfig(value: GenericPaginatorConfigModel) {
    this._paginatorConfig.set(value);
  }

  get paginatorConfig() {
    return this._paginatorConfig();
  }

  paginatorEvent = output<PaginatorEmitEvent>(); 

  private emitPaginatorEvent() {
    this.paginatorEvent.emit({
      pageNumber: this._paginatorConfig().pageNumber,
      pageSize: this._paginatorConfig().pageSize
    });
  }

  onHandlePageOptionSelected(option: number) {
    this._paginatorConfig.update(config => ({ ...config, pageSize: option }));
    this.emitPaginatorEvent(); 
  }

  onHandleNextPage() {
    this._paginatorConfig.update(config => ({ ...config, pageNumber: config.pageNumber + 1 }));
    this.emitPaginatorEvent();
  }

  onHandlePreviousPage() {
    this._paginatorConfig.update(config => ({ ...config, pageNumber: config.pageNumber - 1 }));
    this.emitPaginatorEvent();
  }
}
