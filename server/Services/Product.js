const data = require('../product.json');
const Fuse = require('fuse.js');
const options = {
    keys: ['title'],
  };
  
  const fuse = new Fuse(data, options);
//display items
const displayProducts = (req,res)=>{

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
const searchProducts = (req,res) => {
    const query = req.params.title.toLowerCase();
  

    const exactMatch = data.filter(item => item.title.toLowerCase() === query);
  
    if (exactMatch.length > 0) {
      
      res.json(exactMatch);
    } else {
     
      const fuseResults = fuse.search(query);
  
      if (fuseResults.length > 0) {
        const titles = fuseResults.map(result => result.item.title)
        res.json(titles);
      } else {
        res.status(404).json({ error: 'Products not found with the specified title' });
      }
    }
};

//Filter
const filterBySite = (req,res) =>{
    const productSite = req.params.site.toLowerCase();
    const productTitle = req.params.title.toLowerCase();
    const exactMatch = data.filter(item => item.site.toLowerCase() === productSite && item.title.toLowerCase() === productTitle);


    res.json(exactMatch);

}


module.exports = {displayProducts,filterBySite,searchProducts};