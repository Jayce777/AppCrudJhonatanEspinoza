


  interface DepartamentsDTO{
    description: string;
    name: string;
    phone: string;
    entrerprisesId: number;

  }

  interface DepartamentsUpdateDTO{
    description: string;
    name: string;
    phone: string;
    status:boolean
    entrerprisesId: number;
  }


  export{DepartamentsDTO,DepartamentsUpdateDTO};