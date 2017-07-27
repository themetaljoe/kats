import React from 'react';


export default class Faq extends React.Component {
  render() {
    return (
      <div className="faq">
        <div className="questions">
          <div className="question1">
            <p>Is there a limit or cap to the total amount I can borrow from All Pawn, Inc.?
            </p>
          </div>
          <div className="question2">
            <p>I do not want to loose my pawned items. How long do I have to redeem them? 
            </p>
          </div>
          <div className="question3">
            <p>Is it possible to extend a loan past 60 days?
            </p>
          </div>
          <div className="question4">
            <p>If I do not redeem, pay interest or extend within the grace period, what happens?
            </p>
          </div>
          <div className="question5">
            <p>When I pawn an item do I receive cash or will I get a check from All Pawn?
            </p>
          </div>
          <div className="question6">
            <p>Can I redeem my items or pay interest with a check, credit card or other non-cash forms?
            </p>
          </div>
          <div className="question7">            
            <p>Can another person redeem my items without my knowledge?
            </p>
          </div>
          <div className="question8">            
            <p>What can I do if my pawn ticket is lost or destroyed?
            </p>
          </div>
          <div className="question9">            
            <p>Can I make interest payments by mail?
            </p>
          </div>
        </div>
        <div className="answers">
          <div className="answers1">
            <p>	The only limit is the amount we will loan on a single item of collateral. When you need cash beyond the single item limit, you can offer multiple items for collateral. Given the total value and number of items, you can borrow thousands when you need it.
            </p>
          </div>
          <div className="answers2">
            <p>	There is a 60 day (grace) period in which to redeem your items. To redeem your property, present your pawn ticket and repay the loan plus the up-to-date interest.
            </p>
          </div>
          <div className="answers3">
            <p>Yes. If the loan is within the initial 60 day grace period, you may request an extension. Bring your pawn ticket and pay your interest up-to-date to begin an additional 60 days.
            </p>
          </div>
          <div className="answers4">
            <p>By Texas State Law, your items become the legal property of the lender (pawn broker).
            </p>
          </div>
          <div className="answers5">
            <p>CASH! We are a cash only pawn broker.
            </p>
          </div>
          <div className="answers6">
            <p>No. We are a cash only pawn broker.
            </p>
          </div>
          <div className="answers7">
            <p>Yes. By law, a third party can redeem your items, but must possess the original pawn ticket, present a valid ID, and pay-off the loan in full. Therefore, is best practice to keep your pawn ticket in a safe place. To avoid fraud, DON'T LOSE OR MISPLACE YOUR PAWN TICKET.
            </p>
          </div>
          <div className="answers8">
            <p>	Go immediately to the All Pawn location where you made the loan. If your items have not been redeemed and you are within the grace period, you can complete and submit a lost ticket request for a nominal fee. Bring the same photo identification card you used when pawning your items.
            </p>
          </div>
          <div className="answers9">
            <p>n special cases, it is possible to make such arrangements. Call the location at which you made the loan for detailed information. 
    All Pawn in The Woodlands-Spring area (281.363.2110) 
    All Pawn II, Inc. in Willis (936.809.7396)
            </p>
          </div>  
        </div>
      </div>
    );
  }
}