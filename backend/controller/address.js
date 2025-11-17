const db = require('../models');
const { Address } = db;
const handleErrorRes = require('../utils/error-success-res/errorRes');
const handleSuccessRes = require('../utils/error-success-res/successRes');

exports.addAddress = async (req, res) => {
    try {

        const { userId, fullName, phoneNumber, pincode,
            state, city, street, landmark, addressType, isDefault } = req.body;

        if (!userId || !fullName || !phoneNumber || !pincode || !state || !city || !street || !isDefault) {
            return handleErrorRes(res, 409, "All fields are required");
        }

        const address = await Address.create({
            userId: userId,
            fullName: fullName,
            phoneNumber: phoneNumber,
            pincode: pincode,
            state: state,
            city: city,
            street: street,
            landmark: landmark,
            addressType: addressType,
            isDefault: isDefault,
        });

        handleSuccessRes(res, 201, address);

    } catch (error) {
        handleErrorRes(res, 500, error.message || "Internal server error");
    }
}


exports.UpdateAddress = async (req, res) => {
    try {

        const { userId, fullName, phoneNumber, pincode,
            state, city, street, landmark, addressType, isDefault } = req.body;

        if (!userId && !fullName && !phoneNumber && !pincode && !state && !city && !street &&
            !landmark && !addressType && !isDefault
        ) {
            handleErrorRes(res, 409, "Atleast one field are required to update the data");
        }

        if (userId) Address.userId = userId;
        if (fullName) Address.fullName = fullName;
        if (phoneNumber) Address.phoneNumber = phoneNumber;
        if (pincode) Address.pincode = pincode;
        if (state) Address.state = state;
        if (city) Address.city = city;
        if (street) Address.street = street;
        if (landmark) Address.landmark = landmark;
        if (addressType) Address.addressType = addressType;
        if (isDefault) Address.isDefault = isDefault;

        handleSuccessRes(res, 200, 'Adress is updated')

    } catch (error) {
        handleErrorRes(res, 500, error.message || 'Internal server error')
    }
}


exports.findAddressByUser = async (req, res) => {
    try {

        const address = await Address.find({
            where: { userId: req.user.id }
        });

        handleSuccessRes(res, 200, address);

    } catch (error) {
        handleErrorRes(res, 500, error.message || 'Internal Server Error')
    }
}


exports.findAddressById = async (req, res) => {
    try {

        const { id } = req.params;

        const address = await Address.findByPk(id);

        if (!address) {
            return handleErrorRes(res, 404, "Address not found");
        }

        handleSuccessRes(res, 200, address);


    } catch (error) {
        handleErrorRes(res, 500, error.message || 'Internal Server error')
    }
}


exports.deleteAddress = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            handleErrorRes(res, 222, "Address ID is required to delete a address");
        }

        const address = await Address.findByPk(id);

        if(address.user !== req.user.id){
            handleErrorRes(res, 404, "Address not found");
        }

        await address.destroy();

        return handleSuccessRes(res, 200, "Address deleted successfully");

    } catch (error) {
        handleErrorRes(res, 500, error.message || 'Internal Server error')
    }
}