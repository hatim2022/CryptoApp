import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'src/app/api/agent';
import { Portfolio } from 'src/app/model/portfolio';
import { Transaction } from 'src/app/model/transaction';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sell-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.css']
})
export class SellPageComponent implements OnInit {
  investment;
  transaction: Transaction = { portfolioId: 0, shares: 0, cryptoName:"", transactionType:"sell" };
  userFromService: User;
  portfolioFromService: Portfolio;
  isloaded: boolean = false;

  constructor(private route: Router,private service: Agent) {
    this.investment = this.route.getCurrentNavigation().extras.state;
  }


  ngOnInit(): void {
    // this.stayLoggedInForTestingPurpose();
    this.loadPortfolio();
  }

  loadPortfolio() {
    this.service.portfolioFromAPI.then(
      portfolio => { this.portfolioFromService = portfolio;
      this.isloaded = true;
      }
    )
  }

  //DELETE AFTER FINISH BUILDING APP AND REPLACE WITH this.getInvestmentByPortfolio();
  stayLoggedInForTestingPurpose() {
    this.isloaded = false;
    this.service.getUser('someone', 'password')
      .then(user => {
        this.service.getPortfolio(user.userid).then(portfolio => {
          this.portfolioFromService = portfolio;
          this.loadPortfolio();
        });
      })
  }

  onSubmit(){

    this.transaction.cryptoName = this.investment.key;
    this.transaction.shares = this.investment.value[1];
    this.transaction.portfolioId = this.portfolioFromService.portfolioId;

    this.service.sellTransaction(this.transaction).then(
      portfolio => {
        if(portfolio != undefined){
          alert("you sold " + this.transaction.shares + " shares of " + this.transaction.cryptoName);
        }else{
          alert("transaction failed ");
        }
        this.route.navigate(['investment']);
      }
    )

  }

  goBack() {
    this.route.navigate(['investment']);
  }

}
