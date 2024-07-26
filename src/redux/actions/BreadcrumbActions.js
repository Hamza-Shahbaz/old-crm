import { CATEGORY_BREADCRUMB, PRODUCT_BREADCRUMB } from "../constant/constants";

function findCategoryPath(categories, categoryId, path = []) {
    for (let sub_category of categories) {
        let sub_name = sub_category.category_title
        let sub_id = sub_category.category_id
        let sub_path = `/subCategory/${sub_id}`
        if(sub_id == categoryId) {
            return [{name : sub_name, path : sub_path}]
        }
        else if (sub_category.sub_category.length > 0) {
            for (let category of sub_category.sub_category) {
                let cat_name = category.category_title
                let cat_id = category.category_id
                let cat_path = `/category/${cat_id}`
                if (cat_id == categoryId) {
                    return [{name : sub_name, path : sub_path}, {name : cat_name, path : cat_path}]
                }
                else if (category.child_category.length > 0) {
                    for (let childCat of category.child_category) {
                        let child_name = childCat.category_title
                        let child_id = childCat.category_id
                        let child_path = `/category/${child_id}`
                        if (child_id == categoryId) {
                            return [{name : sub_name, path : sub_path}, {name : cat_name, path : cat_path}, {name : child_name, path : child_path}]
                        }
                        else if (childCat.sub_child_category.length > 0) {
                            for (let subChild of childCat.sub_child_category) {
                                let subChild_name = subChild.category_title
                                let subChild_id = subChild.category_id
                                let subChild_path  = `/category/${subChild_id}`
                                if (subChild_id == categoryId) {
                                    return [{name : sub_name, path : sub_path}, {name : cat_name, path : cat_path}, {name : child_name, path : child_path}, {name : subChild_name, path : subChild_path}]
                                }
                                else if (subChild.level_one_categories.length > 0) {
                                    for (let levelOne of subChild.level_one_categories) {
                                        let levelOne_name = levelOne.category_title
                                        let levelOne_id = levelOne.category_id
                                        let levelOne_path = `/category/${levelOne_id}`
                                        if (levelOne_id == categoryId) {
                                            return [{name : sub_name, path : sub_path}, {name : cat_name, path : cat_path}, {name : child_name, path : child_path}, {name : subChild_name, path : subChild_path}, {name : levelOne_name, path : levelOne_path}]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return []
}


export const productBreadcrumbsHandler = (categories, product) => {
    let breadcrumbs = [{name : "Home", path : "/"}]
    let paths = findCategoryPath(categories, product.category_id)
    if (paths.length > 0) {
        breadcrumbs = breadcrumbs.concat(paths)
    }
    breadcrumbs = breadcrumbs.concat({name : product.product_name, path : `/product/productid=${product.product_id}`})
    return ({
        type : PRODUCT_BREADCRUMB,
        payload : breadcrumbs
    })
}

export const categoryBreadcrumbHandler= (categories, categoryId) => {
    let breadcrumbs = [{name : "Home", path : "/"}]
    let paths = findCategoryPath(categories, categoryId)
    if (paths.length > 0) {
        breadcrumbs = breadcrumbs.concat(paths)
    }
    return breadcrumbs
}
