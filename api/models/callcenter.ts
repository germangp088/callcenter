import { Employee } from './employee';
import EmployeeType from './enums/employeetype';
import EmployeeResponse from './enums/employeeresponse';

export class CallCenter {
    private _employees: Employee[] = []

    constructor() {
        for (let index = 0; index < 10; index++) {
          this.addEmployee(EmployeeType.L1Op, EmployeeResponse.L1Op)
        }
        for (let index = 0; index < 3; index++) {
          this.addEmployee(EmployeeType.Supervisor, EmployeeResponse.Supervisor)
        }
        this.addEmployee(EmployeeType.Manager, EmployeeResponse.Manager)
    }

    getQty = (arr: any, type: EmployeeType) => arr.filter((x: any) => x.employeeType === type).length
        
    public getL1OpQty() {
        const employees: any[] = this.getEmployeesFormat()
        return this.getQty(employees, EmployeeType.L1Op)
    }

    public getSupervisorQty() {
        const employees: any[] = this.getEmployeesFormat()
        return this.getQty(employees, EmployeeType.Supervisor)
    }

    public getManagerQty() {
        const employees: any[] = this.getEmployeesFormat()
        return this.getQty(employees, EmployeeType.Manager)
    }

    public toObject() {
        return {
            'employees': this.getEmployeesFormat(),
            'l1OpQty': this.getL1OpQty(),
            'supervisorQty': this.getSupervisorQty(),
            'managerQty': this.getManagerQty()
        };
    }

    public addEmployee(employeeType: EmployeeType, response: EmployeeResponse) {
        this._employees.push(new Employee(employeeType, response))
    }

    public removeEmployees(qty: number, employeeType: EmployeeType) {
        const employees: Employee[] = this._employees.filter(x => x.employeeType !== employeeType)
        const newArr: Employee[] = this._employees.filter(x => x.employeeType === employeeType)
        this._employees = [...employees, ...newArr.slice(qty, newArr.length + 1)]
    }

    public getEmployeesFormat() {
        const result: any[] = []
        this._employees.forEach(employee => {
            result.push(employee.toObject())
        });

        return result;
    }

    get employees(): Employee[] {
        return this._employees;
    }
}