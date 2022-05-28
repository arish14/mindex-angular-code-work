import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

import {forkJoin, of} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() editDirectReportClickEvent = new EventEmitter<number>();
  @Output() deleteDirectReportClickEvent = new EventEmitter<{directReportEmployeeId: number, employeeId: number}>();

  totalCountOfDirectReports: number;
  directReportEmployees: Employee[];
  displayedColumns: string[] = ['employee', 'actions'];

  constructor(private employeeService: EmployeeService) {
    this.totalCountOfDirectReports = 0;
    this.directReportEmployees = [];
  }

  // direct report click events
  editDirectReport(employeeId: number) {
    this.editDirectReportClickEvent.emit(employeeId);
  }

  //deleting the employee from the list
  deleteDirectReport(directReportEmployeeId: number, employeeId: number) {
    this.deleteDirectReportClickEvent.emit({directReportEmployeeId: directReportEmployeeId, employeeId: employeeId});
  }

  //get direct reports if any
  processDirectReports(employee: Employee) {
    return employee.directReports && employee.directReports.length > 0 ?
      forkJoin(
        employee.directReports.map(directReportEmployeeId => this.getDirectReports(directReportEmployeeId))
      )
      : of([]);
  }

  getDirectReports(directReportEmployeeId: number) {
    return this.employeeService.get(directReportEmployeeId).pipe(
      flatMap((employee: Employee) => this.processDirectReports(employee)),
      map((employees: Employee[]) => this.totalCountOfDirectReports++),
     );
  };

  fetchDirectReports(directReportEmployeeIds: number[]) {
    return directReportEmployeeIds && directReportEmployeeIds.length > 0 ?
      forkJoin(directReportEmployeeIds.map(employeeId => this.employeeService.get(employeeId)))
      : of([]);
  }

  ngOnInit(): void {
    this.processDirectReports(this.employee).subscribe();
    this.fetchDirectReports(this.employee.directReports).subscribe(directReports =>
      this.directReportEmployees = directReports);
  }
}
