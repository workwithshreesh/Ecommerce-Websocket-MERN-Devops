const db = require('../models');
const { Product, ProductImage, Category, Users } = db;
const handleErrorRes = require('../utils/error-success-res/errorRes');
const handleSuccessRes = require('../utils/error-success-res/successRes');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId, stock } = req.body;

    if (!name || !price || !description || !stock || !categoryId) {
      return handleErrorRes(res, 400, { message: 'All fields are required' });
    }

    const product = await db.Product.create({
      name,
      price,
      description,
      stock,
      categoryId: categoryId || null,
      createdBy: req.user.id,

    });

    const productImages = await db.ProductImage.create({
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      productId: product.id
    })

    return handleSuccessRes(res, 201, { product: product, images: productImages });
  } catch (error) {
    return handleErrorRes(res, 500, { message: error.message || 'Internal server error' })
  }
};



exports.updateProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const { name, price, description, categoryId } = req.body;

    if (!id) {
      handleErrorRes(res, 222, "Product ID is required to update a product");
    }


    if (!name && !price && !description && !categoryId) {
      handleErrorRes(res, 222, "At least one field is required to update a product");
    }

    const product = await Product.findByPk(id);


    if (product.createdBy !== req.user.id) {
      handleErrorRes(res, 403, "You are not authorized to update this product");
    }

    if (!product) {
      handleErrorRes(res, 404, "Product not found");
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (categoryId) product.categoryId = categoryId;
    if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;

    await product.save();

    return handleSuccessRes(res, 200, {
      message: "Product updated successfully",
      data: product
    });


  } catch (error) {

    handleErrorRes(res, 500, error.message || "Internal server error");

  }
}



exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        // { model: Users, as: 'creator', attributes: ['id', 'fname', 'lname', 'email'] }
        { model: ProductImage, as: "ProductImages", attributes: ["id", "imageUrl"] }
      ],
      order: [['createdAt', 'DESC']],
    });


    if (!products.length) {
      return res.status(404).json({ success: false, message: 'No products found' });
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: Users, as: 'creator', attributes: ['id', 'fname', 'lname', 'email'] },
        { model: ProductImage, as: 'ProductImage', attributes: ['id', 'imageUrl']}
      ],
    });

    if (!product) {
      return handleErrorRes(res, 404, 'Product not found');
    }

    return handleSuccessRes(res, 200, product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return handleErrorRes(res, 500, error.message || 'Internal server error');
  }
};


exports.deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      handleErrorRes(res, 222, "Product ID is required to delete a product");
    }

    const product = await Product.findByPk(id);

    if (product.createdBy !== req.user.id) {
      handleErrorRes(res, 403, "You are not authorized to delete this product");
    }

    if (!product) {
      handleErrorRes(res, 404, "Product not found");
    }

    await product.destroy();

    return handleSuccessRes(res, 200, "Product deleted successfully");

  } catch (error) {
    handleErrorRes(res, 500, error.message || "Internal server error");
  }
}

getProductByOwners = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { createdBy: req.user.id },
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: ProductImage, as: 'productImages', attributes: ['id', 'imageUrl'] }
      ]
    });

    if (!products.length) {
      handleErrorRes(res, 404, "No products found for this user");
    }

    return handleSuccessRes(res, 200, products);
  }
  catch (error) {
    handleErrorRes(res, 500, error.message || "Internal server error");
  }
}