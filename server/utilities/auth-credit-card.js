import { APIContracts, APIControllers } from 'authorizenet';
import { Meteor } from 'meteor/meteor';

const { CC_AUTH_LOGIN, CC_AUTH_TRANSACTION_KEY } = Meteor.settings;

export default function authCreditCard(cart, cc, formData) {
  const { bfirstName, blastName, bcompany, baddress, bcity, bstate, bzip, bcountry } = formData;
  const { sfirstName, slastName, scompany, saddress, scity, sstate, szip, scountry } = formData;
  const { email } = formData;

  const items = cart.map((p) => {
    const lineItem = new APIContracts.LineItemType();
    lineItem.setItemId(p.characteristics.sku);
    lineItem.setName(`${p.characteristics.manufacturer}-${p.characteristics.model}`);
    lineItem.setDescription('');
    lineItem.setQuantity('1');
    lineItem.setUnitPrice(p.value);
    return lineItem;
  });

  const lineItems = new APIContracts.ArrayOfLineItem();
  lineItems.setLineItem(items);

  const customer = new APIContracts.CustomerDataType({
    email,
    id: Meteor.uuid().substr(0, 20),
    type: 'individual',
  });
  /* demo code from the docs other than variable replacements */
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
  transactionRequestType.setTransactionType(
    APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION,
  );
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(cart.reduce((acc, next) => +acc + +next.value, 0.00).toFixed(2));
  transactionRequestType.setLineItems(lineItems);
  transactionRequestType.setBillTo(billTo);
  transactionRequestType.setShipTo(shipTo);
  transactionRequestType.setCustomer(customer);

  const createRequest = new APIContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setTransactionRequest(transactionRequestType);

  /* TODO: Refactor logs out after production is working properly */
  console.log(JSON.stringify(createRequest.getJSON(), null, 2));

  const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

  return new Promise((resolve, reject) => {
    ctrl.execute(() => {
      const apiResponse = ctrl.getResponse();
      const response = new APIContracts.CreateTransactionResponse(apiResponse);

      /* TODO: Refactor logs out after production is working properly */
      console.log(JSON.stringify(response, null, 2));
      if (response != null) {
        if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK &&
            response.getTransactionResponse().getResponseCode() === '1') {
          resolve(response.getTransactionResponse().getTransId());
        } else {
          resolve(response);
        }
      } else {
        reject(null);
      }
    });
  });
}
