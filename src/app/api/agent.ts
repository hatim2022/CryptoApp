import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Portfolio } from "../model/portfolio";
import { Transaction } from "../model/transaction";
import { User } from "../model/user";
import { Investment } from "../model/investment";
import { Crypto } from "../model/crypto";

@Injectable({
    providedIn: 'root'
})
export class Agent {
    url = 'https://cryptoappdemo1.herokuapp.com';

    public userFromAPI: Promise<User>;
    public portfolioFromAPI: Promise<Portfolio>;

    constructor(private http: HttpClient) {}

    //get user
    getUser(username: string | string, password: string | string): Promise<User> {
        let user = this.http.post<User>(this.url + '/login', {
            'username': username,
            'password': password
        })
        .toPromise()
        .catch(error => {
            console.error(error.error);
            return undefined;
        });

        this.userFromAPI = user;

        return user;
    }

    //post new user
    postUser (username: string | string, password: string | string, email: string | string) {
      let user = this.http.post<User>(this.url + '/create', {
        'username': username,
        'password': password,
        'email': email
      })
      .toPromise()
      .catch(error => {
          console.error(error.error);
          return undefined;
      });

      return user;
    }

    //get portfolio
    getPortfolio(userId: string | number): Promise<Portfolio> {
        let portfolio = this.http.get<Portfolio>(this.url + `/${userId}/getportfolio`)
            .toPromise();

        this.portfolioFromAPI = portfolio;

        return portfolio;
    }

    getTransaction(portfolioId: string | number): Promise<Transaction[]> {
        return this.http.get<Transaction[]>(this.url + `/${portfolioId}/transactions`)
        .toPromise();
    }

    getInvestment(portfolioId: string | number): Promise<Investment[]> {
        return this.http.get<Investment[]>(this.url + `/getInvestments/${portfolioId}`)
        .toPromise();
    }

    deposit(amount: number,userId: string | number): Promise<Portfolio>{
        let portfolio= this.http.put<Portfolio>(this.url + `/${userId}/deposit`,{
        'value':amount
        })
        .toPromise();
        this.portfolioFromAPI = portfolio;
        return portfolio;
    }

    withdraw(amount: number,userId: string | number): Promise<Portfolio> {
        let portfolio= this.http.put<Portfolio>(this.url + `/${userId}/withdraw`,{
            'value':amount
        })
        .toPromise();
        this.portfolioFromAPI = portfolio;
        return portfolio;
    }

    getCrypto(): Promise<Crypto[]> {
        return this.http.get<Crypto[]>(this.url + `/getCryptos`)
        .toPromise()
        .catch(error => {
            console.error(error.error);
            return undefined;
        });
    }
    
    addTransaction(transaction: Transaction): Promise<Transaction> {
    
        let transactionResponse = this.http.post<Transaction>(this.url +'/'+transaction.portfolioId+'/newtransaction', {
            "transactionAmount":transaction.transactionAmount,
            "cryptoName":transaction.cryptoName,
            "transactionType":transaction.transactionType
        })
        .toPromise()
        .catch(error => {
            console.error(error.error);
            return undefined;
        });

        return transactionResponse;
    }

    sellTransaction(transaction: Transaction): Promise<Transaction>{
        let transactionResponse = this.http.post<Transaction>(this.url +'/'+transaction.portfolioId+'/selltransaction', {
            "shares":transaction.shares,
            "cryptoName":transaction.cryptoName,
            "transactionType":transaction.transactionType
        })
        .toPromise()
        .catch(error => {
            console.error(error.error);
            return undefined;
        });

        return transactionResponse;
    }

}
