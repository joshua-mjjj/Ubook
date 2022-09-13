import React from "react";

const propertiesInitialData = {
  client_name: "",
  client_email: "",
  client_contact: "",
  property_name: "",
  property_type: "",
  property_location: "",
  property_description: "",
  price: "",
  partial_payment: "",
  additional_info: "",
  owner: "",
  verified_by: "",
};

export default function useForm() {
  const [propertyData, setPropertyData] = React.useState(propertiesInitialData);

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleClearForm = () => {
    setPropertyData(propertiesInitialData);
  };

  return {
    propertyData,
    setPropertyData,
    handleInputChange,
    handleClearForm,
  };
}
