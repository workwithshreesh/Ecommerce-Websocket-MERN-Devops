const db = require('../models');
const { Category } = db;
const handleErrorRes = require('../utils/error-success-res/errorRes');
const handleSuccessRes = require('../utils/error-success-res/successRes');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return handleErrorRes(res, 400, 'Category name is required');
    }

    const category = await Category.create({
      name,
      description,
      createdBy: req.user.id,
    });

    return handleSuccessRes(res, 201, {
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return handleErrorRes(res, 500, error.message || 'Internal server error');
  }
};      


exports.getAllCategories = async (req, res) => {
    try {

        
        const categories = await Category.findAll({
            where: { createdBy: req.user.id },
        })

        handleSuccessRes(res, 200, categories);

    } catch (error) {
        handleErrorRes(res, 500, error.message || 'Internal server error')
    }
}


exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return handleErrorRes(res, 404, "Category not found");
        }
        
        return handleSuccessRes(res, 200, category);

    } catch (error) {
        handleErrorRes(res, 500, error.message || "Internal server error");
    }
}   


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return handleErrorRes(res, 404, "Category not found");
        }

        if (category.createdBy !== req.user.id) {
            return handleErrorRes(res, 403, "You are not authorized to update this category");
        }

        if (name) category.name = name;

        await category.save();

        return handleSuccessRes(res, 200, {
            message: "Category updated successfully",
            data: category,
        });                     

    } catch (error) {
        handleErrorRes(res, 500, error.message || "Internal server error");
    }
}


exports.allUserCategory = async (req, res) => {
    try {

    } catch (error) {
        handleErrorRes(res, 500, error.message || 'Internal server error')
    }
}