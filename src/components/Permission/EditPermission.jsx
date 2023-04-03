import React, { useState, useEffect } from "react";
import { useDisclosure, Input, Select, useToast } from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import Edit from "../../assets/Edit.svg";
import { getAllPermissions, updateStaff } from "../../helpers";
import { successToastMessage, errorToastMessage } from "../../helpers/toast";
import { useAuth } from "../API/AuthContext";
const EditPermission = ({ audit, permissionId, userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [permission, setPermission] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(permissionId);
  const { loading, setLoading, setRefresh, refresh } = useAuth();
  const toast = useToast();
  useEffect(() => {
    getAllPermissions()
      .then((data) => {
        setPermission(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    if (selectedPermission !== permissionId) {
      console.log(selectedPermission);
      console.log(userId);
      let formData = new FormData();
      formData.append("permission", selectedPermission);
      updateStaff(userId, formData)
        .then((data) => {
          setRefresh(!refresh);

          setLoading(false);
          onClose();
          successToastMessage(toast, "Permission updated successfully");
        })
        .catch((err) => {
          setLoading(false);
          onClose();
          errorToastMessage(toast, err.message);
        });
    }
  };
  return (
    <div>
      <button
        onClick={onOpen}
        className="flex items-center gap-2 px-5 py-2 h-fit rounded-lg"
      >
        <img src={Edit} alt="" />
        {audit}
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form onSubmit={handleSave} className=" py-6">
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]">Edit Permission</p>
            <button className="px-5 py-1 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save
            </button>
          </div>

          <div className="mt-10">
            <div className="mt-6 w-full">
              <label className="font-semibold text-18px">
                Admin Permission
              </label>
              <Select
                onChange={(e) => setSelectedPermission(e.target.value)}
                mt={1}
                py={2}
                h={"50px"}
                fontWeight={"500"}
                value={selectedPermission}
              >
                {permission?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default EditPermission;
