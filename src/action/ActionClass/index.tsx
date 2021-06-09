export const addNewClass=(Class)=>{
   return {
       type:'ADD_NEW',
       payload:Class
   }
}

export const GetAll = (data)=>{
    return{
        type:"GET_ALL",
        payload:data
    }
}