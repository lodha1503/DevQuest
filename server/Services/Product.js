const data = require('../product.json');
const Fuse = require('fuse.js');
const Product = require('../Models/product'); // Unused in the current code
const User = require('../Models/user');       // Unused in the current code
const mongoose = require('mongoose');

const options = {
  keys: ['title'],
};

const fuse = new Fuse(data, options);

// Display items based on title
const displayProducts = (req, res) => {
  const query = req.params.title.toLowerCase();
  const exactMatch = data.filter(item => item.title.toLowerCase() === query);

  if (exactMatch.length > 0) {
    res.json(exactMatch);
  } else {
    const fuseResults = fuse.search(query);

    if (fuseResults.length > 0) {
      res.json(fuseResults);
    } else {
      res.status(404).json({ error: 'Products not found with the specified title' });
    }
  }
};

// Search products based on title and user ID
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
      res.json(exactMatch);
    } else {
      const fuseResults = fuse.search(query);

      if (fuseResults.length > 0) {
        const titles = fuseResults.map(result => result.item.title);
        res.json(titles);
      } else {
        res.status(404).json({ error: 'Products not found with the specified title' });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// API endpoint to provide suggestions
const suggestions = (req, res) =>{
  const { title } = req.params;

  // Perform a fuzzy search
  const searchResults = fuse.search(title);

  // Extract and send the suggestions
  const suggestions = searchResults.map(result => result.item.title);
  res.json(suggestions);
}

const noisyText =  (req, res) => {
  const { title } = req.params;

  // Perform a fuzzy search on partial input
  const partialResults = fuse.search(title);

  // Extract and send the suggestions for partial input
  const partialSuggestions = partialResults.map(result => result.item.title);
  res.json(partialSuggestions);
}                         ;


// Uncomment and integrate the filter function if needed
// const filterBySite = (req, res) => {
//   // Your filtering logic here
// };

module.exports = { displayProducts, searchProducts, suggestions, noisyText };
