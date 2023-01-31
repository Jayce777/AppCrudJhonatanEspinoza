


  interface EmployeeDTO{
    age: number;
    email: string;
    name: string;
    position: string;
    surname:string

  }

  interface EmployeeUpdateDTO{
    status: boolean;
    age: number;
    email: string;
    name:string
    position: string;
    surname: string;

  }


  export{EmployeeDTO,EmployeeUpdateDTO};