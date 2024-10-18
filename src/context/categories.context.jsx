import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// 전역적으로 제품 정보를 관리할 수 있는 컨텍스트를 생성
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap();
    }, []);
    const value = { categoriesMap };
    return <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>;
}