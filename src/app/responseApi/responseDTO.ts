/* interface ResponseEnterprise {
    Id: number;
    created_by: string;
    created_date: Date;
    modified_by: string;
    modified_date: Date;
    status: boolean;
    address: string;
    name: string;
    phone: string;
  
  } */


  interface responseDTO{
    success:boolean,
    message:string,
    data:any,
    errors:any
  }

  export {responseDTO};