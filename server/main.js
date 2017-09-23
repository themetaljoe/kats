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
  getEforoProducts() {
    const options = {
      uri: 'https://onlineposting.e-foro.com/items_api/get_items',
      qs: { status: 'IN_QUEUE' },
      headers: {
        'User-Agent': 'allpawn-autobot-optimus-prime',
        'X-Authorization': `TOKEN ${Meteor.settings.PRODUCTS_API_TOKEN}`,
      },
      json: true,
    }
    return new Promise((resolve, reject) => {
      rp(options)
        .then(results => {
          if(results.page_count === 1) {
            resolve(results.items);
          } else {
            resolve(keepGettingShit(2, results.page_count, results.items))
          }
        })
    });
  },
  uploadImageTest() {
    const options = {
      uri: 'https://onlineposting.e-foro.com/items_api/add_photo',
      body: {
        external_id: "689D1B89-4073-4B06-A6B4-BFC4AFE47D4A",
        photo_url: "https://www.smarthomedb.com/files/product/watermark/amazon-echo_10.jpg"
      },
      qs: {
        external_id: "689D1B89-4073-4B06-A6B4-BFC4AFE47D4A",
        photo_url: "https://www.smarthomedb.com/files/product/watermark/amazon-echo_10.jpg"
      },
      headers: {
        'User-Agent': 'allpawn-autobot-optimus-prime',
        'X-Authorization': `TOKEN ${Meteor.settings.PRODUCTS_API_TOKEN}`,
      },
      json: true,
    };
    return rp(options).then(res => {
      return Promise.resolve(res);
    }).catch(err => console.log('fuckery once again', err));
  }
});

function keepGettingShit(page, pageCount, arrayOfProducts) {
  let productsCopy = arrayOfProducts;
  const options = {
    uri: 'https://onlineposting.e-foro.com/items_api/get_items',
    qs: { status: 'IN_QUEUE', page },
    headers: {
      'User-Agent': 'allpawn-autobot-optimus-prime',
      'X-Authorization': `TOKEN ${Meteor.settings.PRODUCTS_API_TOKEN}`,
    },
    json: true,
  }
  return rp(options).then(results => {
    productsCopy = arrayOfProducts.concat(results.items);
    if (page + 1 > pageCount) {
      return Promise.resolve(productsCopy);
    } else {
      return keepGettingShit(page + 1, pageCount, productsCopy)
    }
  });
}

function uploadImageTest() {
}

