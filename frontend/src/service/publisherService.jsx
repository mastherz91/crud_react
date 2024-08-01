export const publisherService = {
  getPublisherData() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      return fetch("http://localhost:3001/publisher", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          return response;
        })
  
        .catch((error) => console.error(error));
    }
};
