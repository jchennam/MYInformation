import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';  
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class ServiceProvider {  
    private wpcontext:WebPartContext;  
    public constructor(context: WebPartContext) {  
       this.wpcontext= context;  
      }
      
     // readonly b:string = JSON.stringify({});
       public readonly myMethod = "GET";
     // Check this for headers and body --> https://gist.github.com/TBag/f9cc4ee5acdab75064abbfa78eb0b1c3 
     //https://siddharthvaghasia.com/2019/05/16/sharepoint-online-how-to-pass-parameters-to-spfx-extension-by-creating-a-webpart-interface/
      private httpClientOptionsForGlobal: IHttpClientOptions = {  
        //headers: new Headers({  
//"x-rapidapi-host": "covid-19-data.p.rapidapi.com",  
//"x-rapidapi-key": "<REPLACE WHIT WITH YOUR APIKEY>"  
//}),  
        method: this.myMethod,  
        mode: "cors", 
       // body: this.b      
  };  
  public async getZipInfo(zip : string) {  
  
   var response = await this.wpcontext.httpClient  
  .get("https://api.zippopotam.us/us/" + zip, HttpClient.configurations.v1,this.httpClientOptionsForGlobal);  
  console.log("2. service provider response with readonly var");
  console.log(response);  
  var responeJson : any = await response.json(); 
  return responeJson;  
  }  
    
}  