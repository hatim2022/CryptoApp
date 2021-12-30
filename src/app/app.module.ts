import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { TransactionModule } from './transaction/transaction.module';
import { InvestmentModule } from './investment/investment.module';
import { SellModuleModule } from './sell-module/sell-module.module';
import { BuyModuleModule } from './buy-module/buy-module.module';
import { NewuserModule } from './newuser/newuser.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    PortfolioModule,
    TransactionModule,
    InvestmentModule,
    SellModuleModule,
    BuyModuleModule,
    NewuserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
