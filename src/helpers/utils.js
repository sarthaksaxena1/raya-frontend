import { isEmpty } from "lodash";

export const isUserLoggedIn = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  return !!user;
};

export const isUserAuthenticated = (roles) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) return false;
  if (!roles.includes(user.user_type)) return false;
  return true;
};

export const authHeader = () => {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { Authorization: user.token };
  } else {
    return {};
  }
};

export const getUserRole = () => {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.user_type) {
    return user.user_type;
  } else {
    return null;
  }
};

export const setTableRowColor = (value, index) => {
  return index % 2 === 0 ? "bg-gray-100" : "bg-gray-50";
};

export const getSortOrderParams = (order, fieldName) => {
  if (!order) {
    return [];
  } else {
    if (order === "ascend") {
      return [fieldName];
    } else {
      return ["-" + fieldName];
    }
  }
};

export const getFilterParams = (filters, existingFilters = {}) => {
  if (isEmpty(filters)) {
    return { ...existingFilters };
  } else {
    let filterParams = { ...existingFilters };

    for (const property in filters) {
      filterParams[property] = Array.isArray(filters[property])
        ? filters[property][0]
        : filters[property];
    }
    for (let key in filterParams) {
      if (!filterParams[key]) {
        delete filterParams[key];
      }
    }
    return filterParams;
  }
};

export const getSortFilterAPIBody = (params) => {
  let paramsBody = {};
  let ceir_filter_fields = ["region", "province", "city", "barangay"];
  if (!!params.order) paramsBody["order"] = params.order;
  if (!!params.filter) {
    let enhancedFilterParams = {};
    for (let property in params.filter) {
      if (ceir_filter_fields.includes(property)) {
        enhancedFilterParams["ceir__" + property + "__icontains"] =
          params.filter[property];
      } else {
        enhancedFilterParams[property + "__icontains"] =
          params.filter[property];
      }
    }
    paramsBody["filter"] = enhancedFilterParams;
  }
  return paramsBody;
};
