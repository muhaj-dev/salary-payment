import { useDisclosure, useToast } from "@chakra-ui/react";
import ModalWrapper from "../../common/ModalWrapper";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { revertStaffPermission } from "../../helpers";
import { successToastMessage, errorToastMessage } from "../../helpers/toast";
import { useAuth } from "../API/AuthContext";

const DeletePermission = ({ permissionId, userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, setLoading, setRefresh, refresh } = useAuth();
  const toast = useToast();

  const revertUserPermission = () => {
    setLoading(true);
    // console.log(userId, permissionId);
    revertStaffPermission(userId, permissionId)
      .then((data) => {
        setRefresh(!refresh);

        setLoading(false);
        onClose();
        successToastMessage(toast, "User permission reverted successfully");
      })
      .catch((err) => {
        setLoading(false);
        onClose();
        errorToastMessage(toast, err.message);
      });
  };
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
        <div className="my-10">
          <p className="text-[20px]  font-bold text-center">
            This Admin will not have access to any of the permission. Are you
            sure you want to delete the admin?
          </p>
          <div className="flex justify-between w-fit gap-6 mx-auto mt-10">
            <button
              onClick={revertUserPermission}
              className="bg-green-500 text-white py-3 px-5 rounded-md"
            >
              Ok
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-3 px-5 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default DeletePermission;
