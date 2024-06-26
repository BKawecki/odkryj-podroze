import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SearchComponent } from './search/search.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { VacationCardComponent } from './vacation-card/vacation-card.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RegisterComponent } from './register/register.component';
import {MatMenuModule} from '@angular/material/menu';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import {MatStepperModule} from '@angular/material/stepper';

const appRoutes: Routes = [
  { path: 'users', component: LoginComponent},
  { path: '', component: SearchComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'user-panel', component: UserPanelComponent },
  { path: 'cart', component: CartComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    VacationCardComponent,
    LoginComponent,
    RegisterComponent,
    UserPanelComponent,
    FooterComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatChipsModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes),
    MatPaginatorModule,
    MatMenuModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
