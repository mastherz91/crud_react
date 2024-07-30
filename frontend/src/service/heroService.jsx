export const heroService = {
  getHerosData() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    return fetch("http://localhost:3001/hero", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response;
      })

      .catch((error) => console.error(error));
  },

  editHerosData(heroInfo) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const idHero=heroInfo._id
    delete heroInfo._id
    const raw = JSON.stringify(heroInfo);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(`http://localhost:3001/hero/${idHero}`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response;
      })

      .catch((error) => console.error(error));
  },
};
