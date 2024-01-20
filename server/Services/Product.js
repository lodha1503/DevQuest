const data = require('../product.json');
const Fuse = require('fuse.js');
const Product = require('../Models/product');
const User = require('../Models/user');
const mongoose = require('mongoose');

const options = {
  keys: ['title'],
};

const fuse = new Fuse(data, options);
//display items
const displayProducts = (req, res) => {

  const query = req.params.title.toLowerCase();

  // Check for exact match (ignoring case differences)
  const exactMatch = data.filter(item => item.title.toLowerCase() === query);

  if (exactMatch.length > 0) {
    // If exact match found, return those products
    res.json(exactMatch);
  } else {
    // If no exact match found, use fuse.js for fuzzy string matching
    const fuseResults = fuse.search(query);

    if (fuseResults.length > 0) {
      res.json(fuseResults);
    } else {
      res.status(404).json({ error: 'Products not found with the specified title' });
    }
  }
}


//search


const searchProducts = async (req, res) => {
  const query = req.params.title.toLowerCase();
  const userId = req.params.user_id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const exactMatch = data.filter(item => item.title.toLowerCase() === query);

    if (exactMatch.length > 0) {
      // Assuming you want to add all exact matches to the user's products array

      await user.save();
      res.json(user.products);
    } else {
      const fuseResults = fuse.search(query);

      if (fuseResults.length > 0) {
        // Create new Product documents from the search results
        const newProductData = fuseResults.map(result => result.item);
        const newProducts = await Product.create(newProductData);

        // Add the newly created products to the user's products array
        user.products = user.products.concat(newProducts);

        // Save the updated user
        await user.save();

        res.json(user.products);
      } else {
        res.status(404).json({ error: 'Products not found with the specified title' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// const checkIsFavorite = async (req, res) => {
//   const { user_id, product_id } = req.params;

//   try {
//     const user = await User.findById(user_id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if the product with product_id exists in the user's favorites
//     const isFavorite = user.products.some((product) => product._id.equals(product_id));

//     res.json({ isFavorite });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
const toggleFavorite = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findById(userId);
    const productId = req.params.product_id;
    const product = await Product.findById(new mongoose.Types.ObjectId(productId));


    const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);

    if (!isValidObjectId) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }



    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isFavorite = user.products.some((favProduct) => favProduct && favProduct.productId === productId);

    if (isFavorite) {
      // Remove product from favorites
      user.products = user.products.filter((favProduct) => favProduct.productId !== productId);
    } else {
      // Add product to favorites
      user.products.push(product);
    }

    // Save the updated user
    await user.save();

    res.json({ favorite: !isFavorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// //Filter
// const filterBySite = (req,res) =>{
//     const productSite = req.params.site.toLowerCase();
//     const productTitle = req.params.title.toLowerCase();
//     const exactMatch = data.filter(item => item.site.toLowerCase() === productSite && item.title.toLowerCase() === productTitle);


//     res.json(exactMatch);

// }


module.exports = { displayProducts, searchProducts, toggleFavorite, };