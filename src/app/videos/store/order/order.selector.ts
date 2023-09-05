import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Order } from "./../video";
import { map } from "rxjs";


//This thing grabs things from the store
export const selectOrders = createFeatureSelector<Order[]>("myOrders");
export const selectCartOrders = createFeatureSelector<Order[]>("mycartOrders");


//select cart Order by id
// export const cartOrderCartByOrder = () => {
//     return createSelector(selectCartOrders, (Orders: Order[]) => {
            
//             //slice creates copy of array before sorting
//             let sortedOrders = Orders.slice().sort((a, b) => a.Order_id - b.Order_id);

//             return sortedOrders;
//         }
//     )
// }

//select cart Order by id
// export const cartOrderByLatestOrder = () => {
//     return createSelector(selectCartOrders, (Orders: Order[]) => {
//             const amounts = Orders.map((a) => a)
//             const highestAmount = Math.max(...amounts);     
//             var OrderById = Orders.filter( _ => _.cart_order == highestAmount);

//             if(OrderById.length == 0){
//                 return null;
//             }

//             return OrderById[0];
//         }
//     )
// }

//select cart Order by id
// export const selectCartOrderById = (OrderID:number) => {
//     return createSelector(selectCartOrders, (Orders: OrderCartItems[]) => {
//             var OrderById = Orders.filter( _ => _.Order_id == OrderID);

//             if(OrderById.length == 0){
//                 return null;
//             }

//             return OrderById[0];
//         }
//     )
// }

//this filters the things it selects
export const selectOrderById = (OrderID:number) => {
    return createSelector(selectOrders, (Orders: Order[]) => {
            var OrderById = Orders.filter( _ => _.id == OrderID);

            if(OrderById.length == 0){
                return null;
            }

            return OrderById[0];
        }
    )
}