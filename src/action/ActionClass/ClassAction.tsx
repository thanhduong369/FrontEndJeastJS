export const GetAll =(data)=>{
    return {
        type:'GET_ALL_CLASS',
        payload:data
    }
}

export const FindOneClass =(data) =>{
    return{
        type:'FIND_ONE_CLASS',
        payload:data
    }
}

export const DeleteClass =(data) =>{
    return{
        type:"DELETE_BY_ID",
        payload:data
    }
}