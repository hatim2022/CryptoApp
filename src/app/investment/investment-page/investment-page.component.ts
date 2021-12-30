import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/model/portfolio';
import { Investment } from 'src/app/model/investment';
import { Agent } from 'src/app/api/agent';
import { Router } from '@angular/router';
import { Crypto } from 'src/app/model/crypto';


@Component({
  selector: 'app-investment-page',
  templateUrl: './investment-page.component.html',
  styleUrls: ['./investment-page.component.css']
})
export class InvestmentPageComponent implements OnInit {

  portfolio : Portfolio;
  investments : Investment[];
  isLoaded = false;
  interval;
  cryptoRates: Crypto[];
  totalReturn = 0;

  constructor(private router: Router, private service: Agent) {}
  filteredInvestments = new Map<string, number[]>();
   
  ngOnInit(): void {
    // this.stayLoggedInForTestingPurpose();
    this.getInvestmentByPortfolio();
  }
  
  //DELETE AFTER FINISH BUILDING APP AND REPLACE WITH this.getInvestmentByPortfolio();
  stayLoggedInForTestingPurpose() {
    this.isLoaded = false;
    this.service.getUser('someone', 'password')
      .then(user => {
        this.service.getPortfolio(user.userid).then(portfolio => {
          this.portfolio = portfolio;
          this.getInvestmentByPortfolio();
        });
      })
  }

  getInvestmentByPortfolio() {
    this.isLoaded = false;
    this.service.portfolioFromAPI.then(portfolio =>{
        this.portfolio = portfolio;
    })
    .then(() => {
      this.service.getInvestment(this.portfolio.portfolioId).then(investments => {
        this.investments = investments;
      })
      .then(() => {
        this.getCryptos();
        this.isLoaded = true;
      })
      .then(() => {
        this.runIntervals();
      })
    })
  }

  runIntervals() {
    this.interval = setInterval(this.getCryptos, 60000);
  }

  filterInvestments() {
    this.totalReturn = 0;
    let usedCryptNames = new Set<string>();
    for (let currInvest of this.investments) {
        usedCryptNames.add(currInvest.cryptoName);
    }

    for(let name of usedCryptNames) {

      let investmentsForCrypto = this.investments.filter(investment => investment.cryptoName == name);

      let investAmtForCrypto = investmentsForCrypto.reduce((investAmtSum, currInv) => investAmtSum + currInv.investedAmount, 0);
      let sharesForCrypto = investmentsForCrypto.reduce((sharesSum, currInv) => sharesSum + currInv.shares, 0);
      let currentRate = this.getCryptoByName(name);

      let currentReturn = currentRate * sharesForCrypto;      
      let percentRateChange = ((currentReturn / investAmtForCrypto)-1)*100;
      this.totalReturn += currentReturn;
      
      this.filteredInvestments.set(name, [investAmtForCrypto, sharesForCrypto, currentRate,percentRateChange,currentReturn]);
    }
  }

  backToPortfolio() {
    this.interval = clearInterval(this.interval);
    this.router.navigate(['portfolio']);
  }

  //use the list from getCryptos()
  getCryptoByName(symbol: string): number {
    for (let crypto of this.cryptoRates) {
      if (crypto.id === symbol) {
        return crypto.current_price;
      }
    }
    return 0;
  }

  //get everything from java API and save to a list
  getCryptos = async() => {
    await this.service.getCrypto()
    .then(cryptos => {
      this.cryptoRates = cryptos;
      this.filterInvestments();
    })
  }

  sellInvestment(investment){
    this.interval = clearInterval(this.interval);
    this.router.navigateByUrl("/sellInvestment",{state:investment})
  }

}