export const heroService = {
  getHerosData() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    return fetch("http://localhost:3001/hero", requestOptions)
      .then((response) => response.json())
      .then((response) => {console.log(response); return response})
     
      .catch((error) => console.error(error));
  },



  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  },

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  },

  getProducts() {
    return Promise.resolve(this.getProductsData());
  },

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  },

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  },
};
