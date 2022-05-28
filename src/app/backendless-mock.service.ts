import {InMemoryDbService} from 'angular-in-memory-web-api';

export class BackendlessMockService implements InMemoryDbService {
  createDb() {
    const employees = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'McGee',
        position: 'CEO',
        directReports: [2, 3]
      },
      {
        id: 2,
        firstName: 'Homer',
        lastName: 'Thompson',
        position: 'Dev Manager',
        directReports: [4,5]
      },
      {
        id: 3,
        firstName: 'Rock',
        lastName: 'Strongo',
        position: 'Lead Tester'
      },
      {
        id: 4,
        firstName: 'Max',
        lastName: 'Power',
        position: 'Junior Software Engineer'
      },{
        id: 5,
        firstName: 'Arish',
        lastName: 'Bhayani',
        position: 'Intern'
      }
    ];
    return {employees};
  }
}
