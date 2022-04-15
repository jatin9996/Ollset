import { UrlAdaptor, Query  } from "@syncfusion/ej2-data"; 

export class CustomGraphQLAdaptor extends UrlAdaptor  {

    constructor(options) {
        
        super(options);
        this.opt = options;
        this.schema = this.opt.response;
        this.query = this.opt.query; 
        this.variables = this.opt.variables;
        this.getVariables = () => this.variables; 
        this.getQuery = () => this.query; 
    }

    processQuery(datamanager, query) { 
        var result = super.processQuery.apply(this, arguments); 
        var tmp = JSON.parse(result.data); 
        var vars = this.getVariables() || {};
        var data = JSON.stringify({ 
            query: this.getQuery(), 
            variables: vars 
        }); 
        result.data = data; 
        return result; // form query based on your need 
    } 

    processResponse(data, context, query) { 
        let modifyData = {...data};
        modifyData.data.eventCalendar.items.forEach((e) => {
            e.StartTime = new Date(e.startTime.replace(/-/ig,'/').replace(/\./ig,':')).toISOString();
            e.EndTime = new Date(e.endTime.replace(/-/ig,'/').replace(/\./ig,':')).toISOString();
            delete(e.startTime);
            delete(e.endTime);
        });
        // console.log(modifyData.data.eventCalendar.items);
        return modifyData.data.eventCalendar.items;  // should return result and count  
    }

     generateData(inserted, action) { 
        let parsed = JSON.parse(inserted.data); 
        inserted.data = JSON.stringify({ 
            query: this.opt.getMutation(action), 
            variables: parsed 
        }); 
        return inserted; 
    } 

}