import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agent } from 'src/app/api/agent';
import { Crypto } from 'src/app/model/crypto';
import { Portfolio } from 'src/app/model/portfolio';
import { Transaction } from 'src/app/model/transaction';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css']
})
export class BuyPageComponent implements OnInit {

  cryptoRates: Crypto[];
  isloaded = false;
  selected = false;
  interval;
  cryptoList = new Map<string,number>();
  UserFromService: User;
  portfolio: Portfolio;
  transaction: Transaction = { portfolioId: 0, transactionAmount: 0, cryptoName:"", transactionType:"buy" };
  
  constructor(private service:Agent,private router: Router) { 
  }

  ngOnInit(): void {
    // this.stayLoggedInForTestingPurpose();
    this.loadPortfolio();
  }

  loadPortfolio() {
    this.isloaded = false;
    this.service.portfolioFromAPI.then(
      portfolio => { 
        this.portfolio = portfolio;
        this.loadCryptos();
        this.isloaded = true;
      }
    )
    .then(() => {
      this.runIntervals();
    });
  }

  runIntervals() {
    this.interval = setInterval(this.loadCryptos, 60000);
  }

  loadCryptos = async() => {
    await this.service.getCrypto()
    .then(cryptos => {
      this.cryptoRates = cryptos;
    })
  }
  //DELETE AFTER FINISH BUILDING APP AND REPLACE WITH this.getInvestmentByPortfolio();
  stayLoggedInForTestingPurpose() {
    this.isloaded = false;
    this.service.getUser('someone', 'password')
      .then(user => {
        this.service.getPortfolio(user.userid).then(portfolio => {
          this.portfolio = portfolio;
          this.loadCryptos();
        });
      })
  }

  backToPortfolio() {
    this.interval = clearInterval(this.interval);
    this.router.navigate(['portfolio']);
  }

  checkValues(e: any){
    let val = 0;
    if(e.target.checked == true){
      val = parseInt((document.getElementById(e.target.value) as HTMLInputElement).value);
      this.cryptoList.set(e.target.value, val);
      this.selected = true;
    }else{
      this.cryptoList.delete(e.target.value);
      if (this.cryptoList.size == 0) {
        this.selected = false;
      }
    }
  }

  updateValues(e:any){
    if(this.cryptoList.has(e.target.id)){
      this.cryptoList.set(e.target.id,parseInt(e.target.value));
    }   
  }

  verifyBalance():boolean{
    let total = 0;
    this.cryptoList.forEach((value: number, key: string) => {
     total += value;
   })
   if(this.portfolio.nonInvestedBalance<total){
     alert("insuffisant balance");
     return false;
   }
   return true;
  }

  buyCrypto() {    

    if(this.verifyBalance()){
      this.cryptoList.forEach((value: number, key: string) => {
      this.transaction.portfolioId = this.portfolio.portfolioId;
      this.transaction.cryptoName = key;
      this.transaction.transactionAmount = value;

      this.service.addTransaction(this.transaction).then(
        transaction => {
          if (transaction != undefined){
            alert(`You bought $${value} of ${key} at the rate of: ${transaction.cryptoRate} for ${transaction.shares} shares`);
          } else {
            alert("transaction failed ");
          }
          this.interval = clearInterval(this.interval);
          this.router.navigate(['investment']);
        })
      });        
    }

  }
}
