import { BsCheckCircleFill } from "react-icons/bs";
import { Flex } from "@chakra-ui/react";

const successToastMessage = (toast, message) => {
  return toast({
    position: "top-right",
    render: () => (
      <Flex
        color="primary"
        p={3}
        bg="white"
        w="fit-content"
        className="gap-2  items-center font-semibold shadow-card "
        rounded={"md"}
      >
        <BsCheckCircleFill className="text-[#16A34A] " />
        {message}
      </Flex>
    ),
  });
};

export { successToastMessage };
