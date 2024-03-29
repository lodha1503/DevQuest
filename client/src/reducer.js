export const initialState={
  basket:[],
  user:null
};


//Selector function -- Accepts the basket and returns the subtotal of the items in it.
export const getBasketTotal= (basket) =>
  basket.reduce((amount,item)=> item.price + amount ,0);

// basket?.reduce((amount,item)=> Updating the value of amount ,Initial amount)




const reducer=(state,action)=>{
  switch(action.type){
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket:[...state.basket,action.item]
      };
      default:
        return state;

    case "REMOVE_FROM_BASKET":
      const index=state.basket.findIndex(
        (basketItem)=> basketItem.id===action.id
      );
      
      let newBasket=[...state.basket];
      
      if(index>=0)
        newBasket.splice(index,1);
      else
        console.warn(`Can't remove product (id: ${action.id}) as it is not available in the Basket`)
      

      return {
        ...state,
        basket : newBasket
      }

      case "SET_USER":
        return {
          ...state,
          user:action.user
        }

  }

}

export default reducer;