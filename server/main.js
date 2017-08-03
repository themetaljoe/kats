import { Meteor } from 'meteor/meteor';
import cheerio from 'cheerio';
import rp from 'request-promise';

var options = {
    uri: 'https://www.ebay.com/sch/katsguitars/m.html?_ipg=50&_sop=12&_rdc=1',
    transform: function (body) {
      return cheerio.load(body);
    }
};

Meteor.methods({
  getEbayProducts(user) {
    if (user) {
      options.uri = `https://www.ebay.com/sch/${user}/m.html?_ipg=50&_sop=12&_rdc=1`;
    }

    const ebayRequest = rp(options).then(($) => {
      const productNames = [];
      const productPaths = [];
      const productLinks = [];
      const productPrices = [];
      const productInfo = [];
      $('#Results li h3').each((index, value) => {
        productNames.push($(value).text().trim());
      });
      $('#Results li img').each((index, value) => {
        productPaths.push($(value).attr('src'));
      });
      $('#Results li .lvpic a').each((index, value) => {
        productLinks.push($(value).attr('href'));
      });
      $('#Results li .lvprice span').each((index, value) => {
        productPrices.push($(value).text().trim());
      });
      $('#Results li .lvformat span').each((index, value) => {
        productInfo.push($(value).text().trim());
      });

      const products = productNames.map((name, i) => {
        return {
          name,
          path: productPaths[i],
          price: productPrices[i],
          info: productInfo[i],
          link: productLinks[i],
        };
      });

      return Promise.resolve(products);
    });

    return ebayRequest;
  },
});
