const db = require('../models');
const handleErrorRes = require('../utils/error-success-res/errorRes');
const handleSuccessRes = require('../utils/error-success-res/successRes');
const { OrderItem } = db;

exports.getAllOrderItem = async (req, res) => {
    try {

        const orderItem = await OrderItem.findAll({});

        if(!orderItem){
            handleErrorRes(res, 404, 'No Orders found');
        }

        handleSuccessRes(res, 200, OrderItem)

    } catch(error) {
        handleErrorRes(res, 400, error.message || 'Internal server error')
    }
}