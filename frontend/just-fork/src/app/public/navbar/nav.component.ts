import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { PublicService } from "../public.service";


@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
    visible: boolean = false; 
    islog: boolean = false;
    userLog: boolean = false;
    adminLog: boolean = false;  
    userName: string = ""; 
    notlog: boolean = false; 


    constructor(private publicService: PublicService, private cookieService: CookieService) {}

    ngOnInit(){
        this.userName = ""; 
        this.getPermissionUser(); 
        let timerId = setInterval(() => {
            if(this.notlog == true){
                console.log("asd")
                this.visible = true; 
                
                clearInterval (timerId)
            } 
          if(this.userName != ""){
              this.visible = true; 
              clearInterval (timerId)
          }
      }, 100);
      }
    
      getPermissionUser(){
        const value: string = this.cookieService.get('token');
        if(value){
            this.publicService.getPermissionAdmin().subscribe(
                result => {
                    this.adminLog = true; 
                    this.userName = result; 
                }, err => {
                }
            )
            this.publicService.getPermissionUser().subscribe(
                result => {
                    this.userLog = true; 
                    this.userName = result; 
                }, err => {
                }
            )
        }else {
            this.notlog = true; 
        }
      }
}