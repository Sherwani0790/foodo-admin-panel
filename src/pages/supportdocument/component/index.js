import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import GlobalDropdown from "../../../ui-components/globaldropdown";
import GlobalTextarea from "../../../ui-components/globaltextarea";
import GlobalInputField from "../../../ui-components/globalinputfield";
import DefaultButton from "../../../ui-components/defaultbutton";
import SecondaryButton from "../../../ui-components/secondarybutton";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUserList, resetUserSlice, updateUser } from "../../../redux/auth_slice/usermanagement_slice";
// import { reduxService } from "../../../redux/services/redux_utils";
import { toast } from "react-toastify";
import GlobalMultiSelect from "../../../ui-components/globalmultiselect";
const AddEditDoc = (props) => {
    const dispatch = useDispatch();
    const { onHide, editData } = props;

    //Redux Selector
    const addUserReducer = useSelector((state) => state.userMainList);
    const { addLoading, addSuccess, addError } = addUserReducer;
    const editUserReducer = useSelector((state) => state.userMainList);
    const { updateData, updateSuccess, updateError, editLoading } = editUserReducer;

    //Formik Vaidations
    const validationSchema = Yup.object().shape({
        fileName: Yup.mixed().required("Full Name is required"),
        selectArea: Yup.mixed().required("Area is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            fileName: "",
            selectArea: "",
            description: "",
        },
        onSubmit: async (values) => {
            const payload = {
                id: values.id,
                fileName: values.fileName,
                description: values.description,

            };
            if (editData === null) {
                dispatch(addUser(payload));
            } else {
                payload.id = editData.id;
                dispatch(updateUser(payload));
            }
        },
    });
    useEffect(() => {
        if (addSuccess !== undefined) {
            if (addSuccess === true) {
                toast.success("Successfully Added");
                onHide();
                formik.resetForm();
                dispatch(getUserList());
            } else {
                toast.error(addError);
            }
        }
        if (updateSuccess !== undefined) {
            if (updateSuccess === true) {
                toast.success("Status Updated Successfully");
                formik.resetForm();
                onHide();
                dispatch(getUserList());
            } else {
                toast.error(updateError);
            }
        }
        return () => {
            dispatch(resetUserSlice());
        };
    }, [addSuccess, addError, updateData, updateSuccess, updateError,]);


    //Drpdown List
    const roleName = [
        { name: "Admin", code: "AD" },
        { name: "User", code: "US" },
    ];
    const genderName = [
        { name: "Male", code: "ML" },
        { name: "Female", code: "FM" },
        { name: "Other", code: "OT" },
    ];
    //Formik Error
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const settingValuesHanlder = (result) => {
        // console.log({ result });
        formik.setFieldValue("fileName", result?.fileName);
        formik.setFieldValue("selectArea", result?.selectArea);
        formik.setFieldValue("description", result?.description);
    };
    useEffect(() => {
        if (editData !== null) {
            settingValuesHanlder(editData);
        }
    }, [editData]);
    // console.log({ editData });
    const selectArea = [
        { name: "Bahria Town", code: "ML" },
        { name: "Gulberg Greens", code: "FM" },
        { name: "PWD", code: "OT" },
        { name: "Jinah Garden", code: "OT" },
        { name: "Jinah Avenue", code: "OT" },
    ];
    return (
        <>
            <div className="container-fluid">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid">
                        <div className="col-12 md:col-12 pb-3">
                            <GlobalInputField label="File Name" name="fileName" id="fileName" placeholder="Enter File Name" isRequired disabled={editData !== null} value={formik.values.fileName} onChange={formik.handleChange} />
                            {getFormErrorMessage("fileName")}
                        </div>
                        <div className="col-12 md:col-12 pb-3">
                            <GlobalMultiSelect label="Areas" name="selectArea" id="selectArea" placeholder="Select Area" isRequired disabled={editData !== null} value={formik.values.selectArea} onChange={formik.handleChange} options={selectArea} optionLabel="name" optionValue="name" />
                            {getFormErrorMessage("selectArea")}
                        </div>


                        <div className="col-12 md:col-12 pb-3">
                            <GlobalTextarea label="Description" name="description" id="description" rows="5" placeholder="Enter Description" disabled={editData !== null} value={formik.values.description} onChange={formik.handleChange} />
                            {getFormErrorMessage("description")}
                        </div>
                        <div className="col-12 mb-3">
                            <div className="text-center">
                                <DefaultButton
                                    label="Cancel"
                                    style={{ marginRight: "7px" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onHide();
                                    }}
                                />
                                <SecondaryButton type="submit" style={{ marginLeft: "7px" }} label={editData == null ? "Save" : "Update"} loading={editData == null ? addLoading : editLoading} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddEditDoc
