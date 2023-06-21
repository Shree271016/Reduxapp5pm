const initialData ={
    items : []
}
const ItemReducer = ( state = initialData,action)=>{
    return {...state, items :action.payload}
}

export default ItemReducer