import { createContext, useState } from "react";

export const ContextFav = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFav: (id) => {},
})

export default FavProvider = ({children}) => {
const [favMealId, updateFavMealId] = useState([])
const addFavoriteMeal = (id) => {
    updateFavMealId((current) => [...current, id])
}
const removeFavoriteMeal = (id) => {
    updateFavMealId((current) => current.filter((itemId) => itemId !== id))
}
const value = {
    ids: favMealId,
    addFavorite: addFavoriteMeal,
    removeFav: removeFavoriteMeal,
}

return <ContextFav.Provider value={value}>{children}</ContextFav.Provider>
}