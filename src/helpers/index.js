const appUrl = process.env.REACT_APP_LORCHAIN_API;
let token = localStorage.getItem("lorchaintoken");
const getAllPermissions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${appUrl}/permissions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.ok) resolve(data);
      throw new Error(data.message);
    } catch (error) {
      reject(error);
    }
  });
};

const updateStaff = (userId, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${appUrl}/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      let data = await response.json();
      if (response.ok) resolve(data);
      throw new Error(data.message);
    } catch (error) {
      reject(error);
    }
  });
};


const revertStaffPermission = (userId, permissionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${appUrl}/users/${userId}/${permissionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.ok) resolve(data);
      throw new Error(data.message);
    } catch (error) {
      reject(error);
    }
  });
};

//createing permission
const createStaffPermission = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${appUrl}/permissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: formData,
      });
      let data = await response.json();
      if (response.ok) resolve(data);
      throw new Error(data.message);
    } catch (error) {
      reject(error);
    }
  });
};


const updateStaffPermission = (permissionId, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${appUrl}/permissions/${permissionId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: formData,
      });
      let data = await response.json();
      if (response.ok) resolve(data);
      throw new Error(data.message);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteStaffPermission = (permissionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${appUrl}/permissions/${permissionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.ok) resolve(data);
      throw new Error(data.message);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  getAllPermissions,
  updateStaff,
  createStaffPermission,
  updateStaffPermission,
  deleteStaffPermission,
  revertStaffPermission,
};
