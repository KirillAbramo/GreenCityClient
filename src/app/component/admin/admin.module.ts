import {MatTableModule} from '@angular/material/table';

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminNavComponent} from './admin-nav/admin-nav.component';
import {PlacesComponent} from './places/places.component';
import {UsersComponent} from './users/users.component';
import {NgFlashMessagesModule} from 'ng-flash-messages';
import {ErrorComponent} from '../general/error/error.component';
import {BrowserModule} from '@angular/platform-browser';
import {IconsModule, TableModule} from 'angular-bootstrap-md';
import {NgxPaginationModule} from 'ngx-pagination';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatCheckboxModule,
  MatDialogModule, MatDialogRef,
  MatIconModule,
  MatPaginatorModule,
  MatSelectModule,
  MatMenuModule, MAT_DIALOG_DATA
} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {PaginationModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UpdateCafeComponent} from './update-cafe/update-cafe.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {AgmCoreModule} from '@agm/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {EditFavoriteNameComponent, FavoritePlaceComponent} from '../user/favorite-place/favorite-place.component';
import {AdminService} from '../../service/admin/admin.service';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogService} from './confirm-modal/confirmation-dialog-service.service';
import {AdminComponent} from './admin.component';

@NgModule({
  declarations: [AdminNavComponent, AdminComponent, PlacesComponent, UsersComponent, ErrorComponent, ConfirmModalComponent, UpdateCafeComponent],
  exports: [
    AdminNavComponent,
    AdminComponent,
    UsersComponent,
    PlacesComponent,
    ErrorComponent,
    BrowserModule,
    TableModule,
  ],
  imports: [
    CommonModule,
    NgFlashMessagesModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    IconsModule,
    NgbModule,
    MatDialogModule,
    NgSelectModule,
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7q2v0VgRy60dAoItfv3IJhfJQEEoeqCI',
      libraries: ['places']
    }),
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    ConfirmationDialogService,
    AdminService
  ],
  entryComponents: [ConfirmModalComponent, UpdateCafeComponent],
  bootstrap: [AdminComponent],
})
export class AdminModule {
}
