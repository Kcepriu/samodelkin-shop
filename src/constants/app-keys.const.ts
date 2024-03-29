// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_AUTH: "SAMODELKIN_JWT_TOKEN_AUTH",
  // JWT_TOKEN_INSTRUCTOR: "SAMODELKIN_JWT_TOKEN_INSTRUCTOR",
  // ADDRESS: "ADDRESS",
  // TOKEN: "TOKEN",
};

// Backend Routes
export const BACKEND_ROUTES = {
  LOGIN: "/api/auth/local",
  CURRENT_USER: "/api/users/me",
  REGISTER: "/api/auth/local/register",
  // LOGOUT: "/user/logout",
  CATEGORIES: "/api/categories",
  PRODUCTS: "/api/products",
  PRODUCTS_BY_LIST: "/api/products-by-list",
  COLORS: "/api/colors",
  DELIVERY_SERVICES: "/api/delivery-services",
  ORDERS: "/api/orders",
  ABOUT_US: "/api/about-us-section",
  MAIN_PAGE: "/api/main-page",
  CATEGORY_DESCRIPTION: "/api/category-descriptions",
  PRODUCT_DESCRIPTION: "/api/product-descriptions",
  REVIEWS: "/api/reviews",
  MY_REVIEWS: "/api/my-reviews",
  LAST_REVIEWS: "/api/last-reviews",
  REPLY_TO_REVIEWS: "/api/reply-to-review",
  CHANGE_STATUS_REVIEWS: "/api/change-status-review",
  CHANGE_REPLY_TO_REVIEWS: "/api/change-reply-to-review",
  FAVORITES: "/api/favorites",
  REVISED: "/api/reviseds",
  CART: "/api/carts",
  DELIVERY_AND_PAYMENT: "/api/delivery-and-payment",
  CHANGE_AND_RETURN: "/api/exchange-and-return",
  INFO_PRODUCT_REVIEW: "/api/get-info-product-review",
  ABOUT_USER: "/api/about-users",
  ABOUT_ME: "/api/users/me",
  ABOUT_ME_UPDATE: "/api/users",
  SUBSCRIBE: "/api/subscriptions",
  FILTERS: "/api/filters",
};

// Frontend routes
export const FRONTEND_ROUTES = {
  HOME: "/",
  PRODUCTS: "/product",
  PRODUCT: "/product",
  CHECKOUT: "/checkout",
  ABOUT_US: "/about_us",
  CONTACTS: "/contacts",
  DELIVERY: "/delivery",
  CHANGE: "/change",
  ACCOUNT: "/account",
  // SIGNIN: "/api/auth/signin",
  SIGNIN: "/signin",
  SIGNOUT: "/api/auth/signout",
  ABOUT_ME: "/api/about_me",
  ABOUT_USER: "/api/about_user",
  MARK_PRODUCT: "/api/mark_product",
  PRODUCT_BY_LIST: "/api/products_by_list",
};

export const PRODUCT_ADD_INFORMATION_ROUTES = {
  DESCRIBE: "",
  INFO: "/info",
  REVIEWS: "/reviews",
  BOX_CONTENT: "/box_content",
  VIDEOS: "/videos",
  MANUALS: "/manuals",
};

export const TYPES_PRODUCT_ADD_INFORMATION = [
  {
    title: "Опис",
    url: PRODUCT_ADD_INFORMATION_ROUTES.DESCRIBE,
  },
  {
    title: "Характеристики",
    url: PRODUCT_ADD_INFORMATION_ROUTES.INFO,
  },
  {
    title: "Вміст коробки",
    url: PRODUCT_ADD_INFORMATION_ROUTES.BOX_CONTENT,
  },
  {
    title: "Відгуки",
    url: PRODUCT_ADD_INFORMATION_ROUTES.REVIEWS,
  },
  {
    title: "Відео",
    url: PRODUCT_ADD_INFORMATION_ROUTES.VIDEOS,
  },
];

export const KEYS_LOCAL_STORAGE = {
  FAVORITE: "FAVORITE_PRODUCT",
  CART: "CART_SHOP",
  REVISED: "REVISED_PRODUCT",
  ABOUT_USER: "ABOUT_USER",
  ABOUT_ME: "ABOUT_ME",
};

export const ACCOUNT_ADD_INFORMATION_ROUTES = {
  INFORMATION: "/information",
  ORDERS: "/orders",
  FAVORITES: "/favorites",
  REVIEWS: "/reviews",
  REVISED: "/revised",
  REVIEWS_MODERATOR: "/reviews-moderator",
};

export enum ROLES {
  CreateReplyReview = "createReplyReview",
  FeedbackModerator = "feedbackModerator",
}
export const ALL_ROLES = {
  REVIEWS_MODERATOR: [ROLES.FeedbackModerator],
  REVIEWS_CREATE_REPLY: [ROLES.CreateReplyReview],
};

export const TYPES_ACCOUNT_ADD_INFORMATION = [
  {
    title: "Мої замовлення",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.ORDERS,
    onlyAuth: true,
  },
  {
    title: "Список бажань",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.FAVORITES,
    onlyAuth: false,
  },
  {
    title: "Переглянуті",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.REVISED,
    onlyAuth: false,
  },
  {
    title: "Мої відгуки",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS,
    onlyAuth: true,
  },
  {
    title: "Моя інформація",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.INFORMATION,
    onlyAuth: true,
  },
  {
    title: "Модерація відгуків",
    url: ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS_MODERATOR,
    onlyAuth: true,
    fromRoles: ALL_ROLES.REVIEWS_MODERATOR,
  },
];

export const TAGS_DATA = {
  INFORMATION: "/information",
  ORDERS: "/orders",
  FAVORITES: "/favorites",
  REVIEWS: "/reviews",
  REVISED: "/revised",
};

export const DELIVERY_SERVICES = {
  NOVA_POSHTA: 1,
  UKR_POSHTA: 2,
  CURRIER: 3,
};

export const SLIDES_PER_VIEW = {
  desktop: 4,
  tablet: 3,
  mobile: 2,
  mobile_small: 2,
};
