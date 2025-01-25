import { NgModule } from '@angular/core';

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({ declarations: [],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        HttpClientModule,
        MatSidenavModule,
        MatDatepickerModule,
    ], imports: [MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatSidenavModule,
        MatDatepickerModule], providers: [HttpClient, MatDatepickerModule, provideHttpClient(withInterceptorsFromDi())] })
export class MaterialModule {}
