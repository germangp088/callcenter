import { CallCenter } from "../models/callcenter";
import EmployeeType from "../models/enums/employeetype";
import EmployeeResponse from "../models/enums/employeeresponse";

export class CallCenterService {
    private _callCenter: CallCenter

    constructor() {
      this._callCenter = new CallCenter()
    }

    public chat() {
      const employees = this._callCenter.getEmployeesFormat()
      let employee: any

      const getResponse = (employeeType: EmployeeType, employeeResponse: EmployeeResponse) => {

        const index = employees.findIndex((x: any) => x.available && x.employeeType === employeeType)
        
        if (index > -1) {
          this._callCenter.employees[index].available = false
          return this._callCenter.employees[index].toObject()
        }

        return null
      }

      employee = getResponse(EmployeeType.L1Op, EmployeeResponse.L1Op)
      if(!employee) {
        employee = getResponse(EmployeeType.Supervisor, EmployeeResponse.Supervisor)
        if(!employee) {
          employee = getResponse(EmployeeType.Manager, EmployeeResponse.Manager)
        }
      }
      return employee
    }

    updateEmployees(request: any) {
      const update = (key: string, qty: number, employeeType: EmployeeType, response: EmployeeResponse) => {

        if(request[key] > qty) {
          const diff = request[key] - qty
          for (let index = 0; index < diff; index++) {
            this._callCenter.addEmployee(employeeType, response)            
          }
        }

        if(request[key] < qty) {
          const diff = (request[key] - qty) * -1
          this._callCenter.removeEmployees(diff, employeeType)   
        }
      }

      const l1OpQty = this._callCenter.getL1OpQty()
      const supervisorQty = this._callCenter.getSupervisorQty()
      const managerQty = this._callCenter.getManagerQty()

      update("l1OpQty", l1OpQty, EmployeeType.L1Op, EmployeeResponse.L1Op)
      update("supervisorQty", supervisorQty, EmployeeType.Supervisor, EmployeeResponse.Supervisor)
      update("managerQty", managerQty, EmployeeType.Manager, EmployeeResponse.Manager)
    }

    get callCenter(): any {
      return this._callCenter.toObject();
    }
}