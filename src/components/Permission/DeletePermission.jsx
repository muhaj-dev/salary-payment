import React, { useState, useEffect } from "react";
import { useDisclosure, Input, Select, useToast } from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import Edit from "../../assets/Edit.svg";
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { getAllPermissions, updateStaff } from "../../helpers";
import { successToastMessage, errorToastMessage } from "../../helpers/toast";
import { useAuth } from "../API/AuthContext";


const DeletePermission = ({ audit, permissionId, userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [permission, setPermission] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(permissionId);
  const { loading, setLoading, setRefresh, refresh } = useAuth();
  const toast = useToast();

  return (
    <div>
      <button
        onClick={onOpen}
        className="flex items-center gap-2 px-2 py-2 h-fit rounded-lg"
      >
        <MdOutlineDeleteOutline />
      
        Delete
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"md"}
        onOpen={onOpen}
        onClose={onClose}
      >
       <div className='my-10'>
            <p className="text-[20px]  font-bold text-center">This Admin will not have access to any of the permission. Are you sure you want to delete the admin?</p>
            <div className="flex justify-between w-fit gap-6 mx-auto mt-10"> 
            <button className="bg-green-500 text-white py-3 px-5 rounded-md">Ok</button>
                <button className="bg-red-500 text-white py-3 px-5 rounded-md">Cancel</button>
            </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default DeletePermission;
