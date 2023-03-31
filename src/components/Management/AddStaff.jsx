import { useCallback, useMemo, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import ModalWrapper from "../../common/ModalWrapper";
import avatar from "../../assets/avatar.svg";
import calender from "../../assets/calender.svg";
import { useAuth } from "../API/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Box,
  Radio,
  RadioGroup,
  Button,
  Image,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const radio = [
  {
    title: "Design",
    des: "The design team is responsible for creating visual and interactive experiences for the organization's products, services.",
  },
  {
    title: "Engineering",
    des: "The engineering team is responsible for developing and maintaining the organization's products and services.",
  },
  {
    title: "Community",
    des: "Responsible for promoting the organization's products and services to customers and stakeholders. ",
  },
  {
    title: "Marketing",
    des: "The design team is responsible for creating visual and interactive experiences for the organization's products, services, and brand.",
  },
  {
    title: "Operations",
    des: "The engineering team is responsible for developing and maintaining the organization's products and services.",
  },
  {
    title: "Culture",
    des: "Responsible for creating and maintaining a positive and strong culture requires intentional effort and investment.",
  },
];

const thumbsContainer = {
  positon: "relative",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: -10,
  marginLeft: 10,
};

const thumb = {
  display: "inline-flex",
  // borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  // marginRight: 8,
  borderRadius: "100%",
  width: 50,
  height: 50,
  // padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  borderRadius: "100%",
  border: "1px solid #eaeaea",
};

const img = {
  display: "block",
  width: "50px",
  height: "50px",
};

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("This field is required"),
  email: Yup.string().required("Email is required"),
  nationality: Yup.string().required("This field is required"),
  gender: Yup.string().required("This field is required"),
  file: Yup.array().min(1, "At least one image is required"),
  team: Yup.string().required("Required"),
  state_date: Yup.string().required("This field is required"),
  job_role: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  wallet_address: Yup.string().required("This field is required"),
  phone_number: Yup.string().required("This field is required"),
});

const AddStaff = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addStaff, setLoading } = useAuth();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState([]);

  const options = { day: "numeric", month: "short", year: "numeric" };
  const currentDate = new Date().toLocaleDateString("en-US", options);

  const dateStr = new Date(currentDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // console.log(dateStr);

  const initialValues = {
    full_name: "",
    email: "",
    nationality: "",
    gender: "",
    // images: [],
    file: [],
    team: "",
    state_date: dateStr,
    job_role: "",
    address: "",
    wallet_address: "",
    phone_number: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("done");
      const formData = new FormData();
      
      formData.append("name", values.full_name);
      formData.append("email", values.email);
      formData.append("gender", values.gender);
      formData.append("team", values.team);
      formData.append("stated_date", values.state_date);
      formData.append("job_role", values.job_role);
      formData.append("address", values.address);
      formData.append("address", values.wallet_address);
      formData.append("phone_number", values.phone_number);
      
      console.log(formData);
      // values.images.forEach((image) => {
      //   formData.append("images[]", image);
      // });
      // console.log(formData);
      onClose();

      // const response = await fetch(
      //   `${process.env.REACT_APP_LORCHAIN_API}/users/register`,
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );

      // const data = await response.json();

      // console.log(data);
    },
  });

  // const handleDrop = (acceptedFiles) => {
  //   formik.setFieldValue("images", formik.values.images.concat(acceptedFiles));
  // };

  // const onDrop = (acceptedFiles) => {
  //   // setImages([...images, ...acceptedFiles]);
  //   formik.setFieldValue("images", formik.values.images.concat(acceptedFiles));
  // };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFile) => {
      setFile(
        acceptedFile.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      formik.setFieldValue("file", formik.values.file.concat(acceptedFile));
    },
  });

  const thumbs = file.map((file) => (
    <div className="absolute top-3" style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          // className="w-[50px] h-[50px]"
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt=""
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => file.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);


  return (
    <div>
      <button
        onClick={onOpen}
        className="px-5 py-2 text-white bg-primary border-2 border-primary rounded-lg"
      >
        Add Staff
      </button>
      <ModalWrapper
        isOpen={isOpen}
        size={"4xl"}
        onOpen={onOpen}
        onClose={onClose}
      >
        {/* 
        <Image
          src={URL.createObjectURL(formik.values.image)}
          alt="Image preview"
          boxSize="200px"
          objectFit="cover"
          display={formik.values.image ? "block" : "none"}
        /> */}
        {/* 
        <div>
          {" "}
          <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        </div> */}

        <form className=" py-6" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between ">
            <p className="font-[500] text-[22px]">Add Staff</p>
            <button className="px-5 py-2 text-white bg-primary h-fit border-2 border-primary rounded-lg">
              Save information
            </button>
          </div>

          {/* <div>
            <label htmlFor="images">Images:</label>
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag and drop some files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
            {formik.values.images.length > 0 && (
              <div>
                <h4>Selected Images:</h4>
                <ul>
                  {formik.values.images.map((image) => (
                    <li key={image.name} className='w-[50px]'>
                      {image.name}
                      <div  key={image.name}>

                      <div style={thumbInner}>
                        <img
                          src={image.preview}
                          // className="w-[50px] h-[50px]"
                          style={img}
                          // Revoke data uri after image is loaded
                          onLoad={() => {
                            URL.revokeObjectURL(image.preview);
                          }}
                          alt="jk"
                        />
                      </div>
                      </div>
                    </li>
                  ))}
                </ul>
              
              </div>
            )}
          </div> */}

          <section className="container mt-5 relative">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />

              <div className="flex gap-3 bg-[#F7F7F7] py-3 pl-4  w-full  rounded-xl">
                <div>
                  <img className="w-[50px]" src={avatar} alt="" />
                </div>
                <div>
                  <p className="font-semibold ">
                    Upload staff picture or drag and drop
                  </p>
                  <p className="text-[14px]">
                    only files in PNG or JPG upto 3MB
                  </p>
                </div>
              </div>
            </div>
            <aside
              className="rounded-full border-2 border-white w-fit h-fit  "
              style={thumbsContainer}
            >
              {thumbs}
            </aside>
          </section>

          <div className="flex items-center mt-10 gap-2 h-[38px] rounded-md font-semibold border-2 border-[#EEEEEE] p-3">
            <img src={calender} alt="" />
            <p>{dateStr}</p>
          </div>
          <div className="flex gap-5 justify-between">
            <div className="w-full tablet:w-[48%]">
              <FormControl
                id="emial"
                mt="5"
                mb={4}
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage className="absolute -bottom-5">
                  {formik.errors.email}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="text"
                mt="5"
                mb={4}
                isInvalid={formik.errors.full_name && formik.touched.full_name}
              >
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter staff name"
                  {...formik.getFieldProps("full_name")}
                />
                <FormErrorMessage className="absolute -bottom-5">
                  {formik.errors.full_name}
                </FormErrorMessage>
              </FormControl>

              {/* <div className="mt-6">
                <label>Email address</label>
                <Input
                  label="email"
                  type="email"
                  // value={regFormData.email}
                  // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
                  placeholder="enter company mail"
                  mt={1}
                />
              </div> */}
              <FormControl
                id="gender"
                mt="5"
                isInvalid={formik.errors.gender && formik.touched.gender}
              >
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Gender"
                  fontWeight={"500"}
                  icon={<ChevronDownIcon />}
                  {...formik.getFieldProps("gender")}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Binary">Binary</option>
                </Select>
                <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
              </FormControl>
            </div>

            <div className="w-full tablet:w-[48%]">

              <FormControl
                id="nationality"
                mt="5"
                isInvalid={
                  formik.errors.nationality && formik.touched.nationality
                }
              >
                <FormLabel>Nationality</FormLabel>
                <Select
                  placeholder="Nationality"
                  fontWeight={"500"}
                  icon={<ChevronDownIcon />}
                  {...formik.getFieldProps("nationality")}
                >
                  <option value="Nigera">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                </Select>
                <FormErrorMessage>{formik.errors.nationality}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="text"
                mt="5"
                mb={4}
                isInvalid={formik.errors.address && formik.touched.address}
              >
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  placeholder="Full address"
                  {...formik.getFieldProps("address")}
                />
                <FormErrorMessage className="absolute -bottom-5">
                  {formik.errors.address}
                </FormErrorMessage>
              </FormControl>
            </div>
          </div>

          <div className="mt-6 ">
            <FormControl
              id="team"
              isInvalid={formik.errors.team && formik.touched.team}
            >
              <FormLabel fontWeight={600} fontSize={"20px"}>
                Staff Name
              </FormLabel>
              <RadioGroup
                {...formik.getFieldProps("team")}
                onChange={(value) => {
                  formik.setFieldValue("team", value);
                }}
              >
                <div className="flex flex-wrap gap-4 justify-between">
                  {radio.map((option) => (
                    <Box
                      w={{ base: "40%", md: "30%", lg: "30%" }}
                      className="shadow-md rounded-lg p-4"
                    >
                      <Radio key={option.title} value={option.title}>
                        <p className="text-gray-900 font-[500]">
                          {option.title}
                        </p>
                        <p className="text-[13px] leading-4 text-gray-700">
                          {option.des}
                        </p>
                      </Radio>
                    </Box>
                  ))}
                </div>
              </RadioGroup>
              <FormErrorMessage>{formik.errors.team}</FormErrorMessage>
            </FormControl>
          </div>
          <div className="flex gap-5 justify-between">
            <div className="w-full tablet:w-[48%]">
              <FormControl
                id="job_role"
                mt="5"
                isInvalid={formik.errors.job_role && formik.touched.job_role}
              >
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Product Designer"
                  fontWeight={"500"}
                  icon={<ChevronDownIcon />}
                  {...formik.getFieldProps("job_role")}
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="devops">DevOps</option>
                  <option value="management">Management</option>
                </Select>
                <FormErrorMessage>{formik.errors.job_role}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="job_role"
                mt="5"
                mb={4}
                isInvalid={formik.errors.wallet_address && formik.touched.wallet_address}
              >
                <FormLabel>Wallet Address</FormLabel>
                <Input
                  type="text"
                  placeholder="0xC57c4384f0eE6E4Ca8FE7FA834a6D525477fC6B5"
                  {...formik.getFieldProps("wallet_address")}
                />
                <FormErrorMessage className="absolute -bottom-5">
                  {formik.errors.wallet_address}
                </FormErrorMessage>
              </FormControl>
            </div>
            <div className="w-full tablet:w-[48%]">
              <FormControl
                id="salary"
                mt="5"
                mb={4}
                pos={"relative"}
                isInvalid={formik.errors.salary && formik.touched.salary}
              >
                <FormLabel>Salary</FormLabel>
                <Input
                  type="number"
                  pl="6"
                  placeholder="000"
                  {...formik.getFieldProps("salary")}
                />
                <span className="font-bold absolute top-10 left-3">$</span>
                <FormErrorMessage className="absolute -bottom-5">
                  {formik.errors.salary}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="tax"
                mt="5"
                mb={4}
                pos={"relative"}
                isInvalid={formik.errors.tax && formik.touched.tax}
              >
                <FormLabel>Tax rate</FormLabel>
                <Input
                  type="number"
                  pl="7"
                  placeholder="00"
                  {...formik.getFieldProps("tax")}
                />
                <span className="font-bold absolute top-10 left-3">%</span>
                <FormErrorMessage className="absolute -bottom-5">
                  {formik.errors.tax}
                </FormErrorMessage>
              </FormControl>
            </div>
          </div>
          <br />
        </form>
      </ModalWrapper>
    </div>
  );
};

export default AddStaff;
