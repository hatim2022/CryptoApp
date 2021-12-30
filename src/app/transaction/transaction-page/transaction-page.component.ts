import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/model/portfolio';
import { Transaction } from 'src/app/model/transaction';
import { Agent } from 'src/app/api/agent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit {
  portfolio: Portfolio;
  transactions: Transaction[];
  isLoaded = false;

  constructor(private service: Agent, private route:Router) { }

  ngOnInit(): void {
    this.getTransactionForPortfolio();
  }
  
  getTransactionForPortfolio(){
    this.isLoaded = false;
    this.service.portfolioFromAPI.then(portfolio => {
      this.portfolio = portfolio;
    })
    .then(()=>{
      this.service.getTransaction(this.portfolio.portfolioId).then(transactions => {
        this.transactions = transactions;
        this.transactions = this.transactions.reverse();
        this.isLoaded = true;
      })
    })
  }
  
  viewTransactions() {
    this.service.getTransaction(this.portfolio.portfolioId);
  }

  goToPortfolio() {
    this.route.navigate(['portfolio']);
  }
}
