import { Meteor } from 'meteor/meteor';
import { exec } from 'child_process';
import cheerio from 'cheerio';
import rp from 'request-promise';
import { Transforms } from './collections/transforms/collection';
import { APIContracts, APIControllers } from 'authorizenet';
const { CC_AUTH_LOGIN, CC_AUTH_TRANSACTION_KEY } = Meteor.settings;

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

  getEforoProducts(page) {
    const options = {
      uri: 'https://onlineposting.e-foro.com/items_api/get_items',
      qs: { status: 'IN_QUEUE', page },
      headers: {
        'User-Agent': 'allpawn-autobot-optimus-prime',
        'X-Authorization': `TOKEN ${Meteor.settings.PRODUCTS_API_TOKEN}`,
      },
      json: true,
    }

    return new Promise((resolve, reject) => {
      rp(options)
        .then(results => {
          resolve({ items: results.items, pageCount: results.page_count, page });
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
  },

  imageSearch(query) {
    var options = {
        uri: `https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${query}`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36',
        },

        transform: function (body) {
          return cheerio.load(body);
        }
    };

    return rp(options)
      .then(function ($) {
        let result;
        $('img').each((i, img) => {
          if (i === 5) {
            result = $(img).attr('src');
          }
        })
        return Promise.resolve(result);
      })
      .catch(function (err) {
        console.log(err)
      });
  },

  login(un, pw) {
    return un === Meteor.settings.ADMIN_LOGIN_UN && pw === Meteor.settings.ADMIN_LOGIN_PW;
  },

  saveTransform(transform) {
    return Transforms.upsert({'_id': transform._id }, transform).insertedId;
  },

  getTransforms() {
    return Transforms.find().fetch();
  },

  authCreditCard(cart, cc, formData) {
    const { bfirstName, blastName, bcompany, baddress, bcity, bstate, bzip, bcountry } = formData;
    const { sfirstName, slastName, scompany, saddress, scity, sstate, szip, scountry } = formData;
    const items = cart.map(p => {
      const lineItem = new APIContracts.LineItemType()
      lineItem.setItemId(p.characteristics.sku);
      lineItem.setName(p.title.replace(/ /g, ''));
      lineItem.setDescription(p.description);
      lineItem.setQuantity('1');
      lineItem.setUnitPrice(p.value);
      return lineItem;
    });

    const lineItems = new APIContracts.ArrayOfLineItem();
    lineItems.setLineItem(items);

    const billTo = new APIContracts.CustomerAddressType();
    billTo.setFirstName(bfirstName);
    billTo.setLastName(blastName);
    billTo.setCompany(bcompany);
    billTo.setAddress(baddress);
    billTo.setCity(bcity);
    billTo.setState(bstate);
    billTo.setZip(bzip);
    billTo.setCountry(bcountry);

    const shipTo = new APIContracts.CustomerAddressType();
    shipTo.setFirstName(sfirstName);
    shipTo.setLastName(slastName);
    shipTo.setCompany(scompany);
    shipTo.setAddress(saddress);
    shipTo.setCity(scity);
    shipTo.setState(sstate);
    shipTo.setZip(szip);
    shipTo.setCountry(scountry);

    const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(CC_AUTH_LOGIN);
    merchantAuthenticationType.setTransactionKey(CC_AUTH_TRANSACTION_KEY);

    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(cc.cardNumber);
    creditCard.setExpirationDate(cc.expirationDate);
    creditCard.setCardCode(cc.cardCode);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(cart.reduce((acc, next) => +acc + +next.value, 0.00).toFixed(2));
    transactionRequestType.setLineItems(lineItems);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setShipTo(shipTo);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

    return new Promise((resolve, reject) => {
      ctrl.execute(() => {
        const apiResponse = ctrl.getResponse();
        const response = new APIContracts.CreateTransactionResponse(apiResponse);

        console.log(JSON.stringify(response, null, 2));
        if(response != null){
            if(response.getMessages().getResultCode() == APIContracts.MessageTypeEnum.OK &&
                response.getTransactionResponse().getResponseCode() == '1'){
                resolve(response.getTransactionResponse().getTransId());
            }
            else{
              reject({
                result: response.getMessages().getResultCode(),
                err: response.getMessages().getMessage()[0].getCode(),
                text: response.getMessages().getMessage()[0].getText(),
              });
            }
        }
        else{
          reject(null);
        }
      });
    })
  }
});
