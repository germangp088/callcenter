import * as uuid from 'uuid';
import EmployeeType from './enums/employeetype';


export class Employee {
    private readonly _id: string
    private readonly _employeeType: EmployeeType
    private readonly _response: string = ''
    private _available: boolean

    constructor(employeeType: EmployeeType, response: string){
        this._id = uuid.v4()
        this._employeeType = employeeType
        this._response = response
        this._available = true
    }
    
    public toObject(): {} {
        return {
            'id': this.id,
            'employeeType': this.employeeType,
            'response': this.response,
            'available': this.available
        };
    }

    get id(): string {
        return this._id;
    }

    get employeeType(): EmployeeType {
        return this._employeeType;
    }

    get response(): string {
        return this._response;
    }

    get available(): boolean {
        return this._available;
    }

    set available(value: boolean) {
        this._available = value;
    }
}