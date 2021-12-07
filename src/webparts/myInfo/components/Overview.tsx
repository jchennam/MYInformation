import * as React from 'react';  
import { IMyInfoProps } from './IMyInfoProps';
import { escape } from '@microsoft/sp-lodash-subset';  
import { WebPartContext } from '@microsoft/sp-webpart-base';  
import {ServiceProvider} from './ServiceProvider';
import {sp} from '@pnp/sp';
import { CurrentUser } from '@pnp/sp/src/siteusers';
import { getDateRangeArray } from '@fluentui/date-time-utilities/lib/dateMath/dateMath';


export interface IOverViewProps {
    context: WebPartContext;
}

export interface IOverViewState {
    data: any;
    contractor : any;
}

export default class OverViewStats extends React.Component<IOverViewProps, IOverViewState> {  
  
    private serviceProvider;
    
    public constructor(props: IOverViewProps, state: IOverViewState) {  
      super(props); 
      this.serviceProvider = new ServiceProvider(this.props.context);  
    
      this.state = {  
        data:{},
        contractor: "No"
      };  
    
    }  
    
    public render(): React.ReactElement<IOverViewProps> {
      if (this.state.contractor == "Yes"){
        return(
          <React.Fragment>
            <h1>Contractor</h1>
          </React.Fragment>
        )
      }
      else {
        return(  
        <React.Fragment>            
           <h1>Zip Information</h1>
           <h2>Country : {this.state.data.country}</h2>
        </React.Fragment>  
      );
        }  
    }  
    
    public async componentDidMount(){  
     // this.getSPData();
      Promise.all([this.getSPData()]).then(() => {
        if (this.state.contractor == "No")
        {
        this.getData();
        }
        else
        {
          console.log("He is a contractor !!!!");
        }
      });
     
    
    }
    
    public getData() {

     // return new Promise(() => {
        const zip = this.getZip();
      //this.getSPData();
      this.serviceProvider.  
      getZipInfo(zip)   
        .then(  
          (result: any): void => {
              console.log("Calling ServiceProvide to get details in sequence with no promise");
             console.log(result);
             this.setState({data:result, contractor: "Yes"}); 
             console.log(this.state.contractor); 
          }  
        )  
        .catch(error => {  
          console.log(error);  
        });  

     // });
      
    }  

    private getZip()
    {
      return "85201";
    }

   /* private getSPData() : void {

      sp.web.currentUser.get().then((r: CurrentUser) => {

        console.log(r['Email']);
      });
    } */

    public getSPData() : Promise<any> {

      return new Promise((resolve, reject) => {

        sp.profiles.myProperties.get().then(function(result) {
          var p = result.UserProfileProperties;
            console.log("1: My User Profile Props woohoo !!!!!!!!");
            var value = "";
            var myValue = "";
            p.forEach(function(prop) {
              if (prop.Key == "Title")
              {
                myValue = prop.Value;
              }
              value += prop.Key + "-" + prop.Value + '\n';
            });
            console.log(myValue);
            resolve("It worked");
      })
      this.setState({contractor: "Yes"});
      });
      //this.getData();
         // console.log(myValue);
          //console.log(value);
      }     
  }