const validator = require("validator");

const validateSignUpData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }
    else if(firstName.length < 4 && firstName.length > 50)
    {
        throw new Error("FirstName should be to 4-50 chrachters")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Please enter a strong Password");
    }
};

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "photoUrl", "gender", "age","about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => 
        allowedEditFields.includes(field)
     );

     return isEditAllowed;
}

module.exports = {
    validateSignUpData,validateProfileEditData
}