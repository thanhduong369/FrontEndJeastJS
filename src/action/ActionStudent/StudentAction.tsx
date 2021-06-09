export const GetAll =(data)=>{
    return {
        type:'GET_ALL_STUDENT',
        payload:data
    }
}

export const GetAllBYIDCLASS =(data)=>{
    return {
        type:'GET_ALL_STUDENT_BY_IDCLASS',
        payload:data
    }
}

export const Delete_bY_ID =(data)=>{
    return {
        type:'Delete_BY_ID',
        payload:data
    }
}
export const Create_NEW =(data)=>{
    return {
        type:'CREATE_NEW_STUDENT',
        payload:data
    }
}
export const FindByid =(data)=>{
    return {
        type:'FIND_BY_ID',
        payload:data
    }
}
