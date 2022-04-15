
export class ControlHelper {

    jsonData = [];
    constructor(json) {
        this.jsonData = [...json];
    }

    identifyControl(dataset) {
        switch (dataset.component) {
            case 'text':
                return `<input id="${dataset.label.replace(/\s*/ig, '_')}" name="${dataset.label.replace(/\s*/ig, '_')}" className="e-field e-input" type="text" style={{ width: '100%' }} />`
                break;
            
            case 'datepicker':
                return `<DateTimePickerComponent id="${dataset.label.replace(/\s*/ig, '_')}" format='${dataset.format}' data-name="${dataset.label.replace(/\s*/ig, '_')}" value={new Date(props.startTime || props.StartTime)}
                            className="e-field"></DateTimePickerComponent>`;
                break;
            
            case 'options':
                break;
            
            case 'select': 
                 return `<DropDownListComponent id="${dataset.label.replace(/\s*/ig, '_')}" placeholder='${dataset.label}' data-name='${dataset.label.replace(/\s*/ig, '_')}' className="e-field" style={{ width: '100%' }}
                            dataSource={}>
                        </DropDownListComponent>`;
                break;
        }
    }

    getControls(props) {
        let controlsArr = this.jsonData.map((dataset) => (`
                    <tr>
                        <td className="e-textlabel">${dataset.label}</td>
                        <td style={{ colspan: '4' }}>
                            ${this.identifyControl(dataset)}
                            
                        </td>
                    </tr>
                `));
        jsonData.forEach(data => {
            if (!args.element.querySelector(`.${data._uid}`)) {
                let row = createElement('div', { className: data._uid });
                let formElement = args.element.querySelector('.e-schedule-form');
                formElement.firstChild.appendChild(
                row,
                formElement.firstChild.firstChild
                );
                let container = createElement('div', {
                className: 'custom-field-container'
                });
                let inputEle = createElement('input', {
                className: 'e-field',
                attrs: { name: data._uid }
                });
                container.appendChild(inputEle);
                row.appendChild(container);

                switch (data.component) {
                case 'text':
                    let element = new TextBox({
                    id: data.label.replace(' ', '_'),
                    placeholder: data.label,
                    floatLabelType: 'Always'
                    });
                    element.appendTo(inputEle);
                    break;

                case 'options':
                    data.options.map(opt => {
                    let inputEle = createElement('input', {
                        className: 'e-field',
                        attrs: { name: 'EventType' }
                    });
                    let element = new RadioButton({
                        label: opt.label,
                        name: 'payment',
                        value: opt.value,
                        checked: false
                    });
                    element.appendTo(inputEle);
                    });

                    break;

                default:
                    break;
                }

                inputEle.setAttribute('name', data._uid);
            }
        });
        return `
        <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}>
            <tbody>
                <tr>
                    <td className="e-textlabel">Summary</td>
                    <td style={{ colspan: '4' }}>
                        <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Status</td>
                    <td style={{ colspan: '4' }}>
                        <DropDownListComponent id="EventType" placeholder='Choose status' data-name='EventType' className="e-field" style={{ width: '100%' }}
                            dataSource={['New', 'Requested', 'Confirmed']}>
                        </DropDownListComponent>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">From</td>
                    <td style={{ colspan: '4' }}>
                        <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date(props.startTime || props.StartTime)}
                            className="e-field"></DateTimePickerComponent>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">To</td>
                    <td style={{ colspan: '4' }}>
                        <DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="EndTime" value={new Date(props.endTime || props.EndTime)}
                            className="e-field"></DateTimePickerComponent>
                    </td>
                </tr>
                <tr>
                    <td className="e-textlabel">Reason</td>
                    <td style={{ colspan: '4' }}>
                        <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50}
                            style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
                    </td>
                </tr>
            </tbody>
        </table >`;
        
    }

    getValidations(json) {
         
        
        fields = {
            subject: { name: 'Subject', validation: { required: true } },
            location: {
            name: 'Location', validation: {
                required: true,
                regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
            }
            },
            description: {
            name: 'Description', validation: {
                required: true, minLength: 5, maxLength: 500
            }
            },
            startTime: { name: 'StartTime', validation: { required: true } },
            endTime: { name: 'EndTime', validation: { required: true } }
        };
    }

    
}