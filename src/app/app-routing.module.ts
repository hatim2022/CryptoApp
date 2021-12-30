import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { PortfolioPageComponent } from './portfolio/portfolio-page/portfolio-page.component';
import { TransactionPageComponent } from './transaction/transaction-page/transaction-page.component';
import { InvestmentPageComponent } from './investment/investment-page/investment-page.component';
import { SellPageComponent } from './sell-module/sell-page/sell-page.component';
import { BuyPageComponent } from './buy-module/buy-page/buy-page.component';
import { NewuserComponent } from './newuser/newuser.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent},
  { path: 'portfolio', component: PortfolioPageComponent},
  { path: 'transaction', component: TransactionPageComponent},
  { path: 'investment', component: InvestmentPageComponent},
  { path: 'sellInvestment', component: SellPageComponent},
  { path: 'buyInvestment', component: BuyPageComponent},
  { path: 'newuser', component: NewuserComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
