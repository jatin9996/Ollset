import * as React from 'react';
import { Query, DataManager, UrlAdaptor } from "@syncfusion/ej2-data"; 
    
export class CalendarBase extends React.PureComponent {
    rendereComplete() {
        /**custom render complete function */
    }
    componentDidMount() {
        setTimeout(() => {
            this.rendereComplete();
        });
    }
}
    