const appUrl = process.env.REACT_APP_LORCHAIN_API;
let token = localStorage.getItem("lorchaintoken");
const getAllPermissions = () => {
  return new Promise((resolve, reject) => {
    fetch(`${appUrl}/permissions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateStaff = (userId, formData) => {
  return new Promise((resolve, reject) => {
    fetch(`${appUrl}/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getAllPermissions, updateStaff };
