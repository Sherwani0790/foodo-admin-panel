import React from "react";
//Styles
import "./globalmultiselect.scss";
//P-Components
import { MultiSelect } from "primereact/multiselect";
const GlobalMultiSelect = (props) => {
  const {
    style,
    maxSelectedLabels,
    placeholder,
    optionLabel,
    onChange,
    onClick,
    options,
    value,
    label,
    isRequired,
    isDependent,
    editable=false,
    disabled,
    ...remainingProps
  } = props;
  return (
    <>
        {label && (
                <div className="d-flex">
                    <label>
                        <b>{label}</b>
                        {(isRequired || isDependent) && <span className={`${isDependent ? "clr_green" : "clr_red"}  `}>*</span>}
                    </label>
                </div>
            )}
      <MultiSelect
        className={"input_styles"}
        value={value}
        options={options}
        onChange={onChange}
        onClick={onClick}
        optionLabel={optionLabel}
        placeholder={placeholder}
        maxSelectedLabels={maxSelectedLabels}
        style={style}
        editable={editable} disabled={disabled} {...remainingProps}
      />
    </>
  );
};

export default GlobalMultiSelect;
