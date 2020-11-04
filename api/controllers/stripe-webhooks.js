const memberService = require("../services/members.service");

const webhook = async (req, res) => {
  let event;
  try {
    event = req.body;
    console.log(event.type);
    if ("customer" in event.data.object) {
      let member = await memberService.findMember({
        stripeId: event.data.object.customer,
      });
      //   console.log(member);
    }
    switch (event.type) {
      // Payment endpoints
      case "payment_intent.created":
        const paymentIntent = event.data.object;
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        break;
      // case 'payment for meet registration'
      // create notification

      case "charge.succeeded":
        break;

      // Customer endpoints
      case "customer.created":
        //   console.log(event.data.object);
        break;
      case "customer.subscription.created":
        try {
          let member = await memberService.findMember({
            stripeId: event.data.object.customer,
          });
          member.membership.status = event.data.object.status;
          console.log(new Date(event.data.object.current_period_end));
          let updatedMember = await memberService.updateMember(
            member._id,
            member
          );
        } catch (err) {
          console.log(err);
        }
        break;
      case "customer.subscription.updated":
        try {
          //   let member = await memberService.findMember({
          //     stripeId: event.data.object.customer,
          //   });
          //   let updatedMember = await memberService.updateMember(member._id, {
          //     membership: { status: event.data.object.status },
          //   });
          //   console.log(updatedMember);
        } catch (err) {
          console.log(err);
        }
        break;
      case "customer.subscription.deleted":
        console.log(event.data.object.status);
        try {
          let member = await memberService.findMember({
            stripeId: event.data.object.customer,
          });
          member.membership.status = event.data.object.status;
          let updatedMember = await memberService.updateMember(
            member._id,
            member
          );
          console.log(updatedMember);
        } catch (err) {
          console.log(err);
        }
        break;

      // Subscription endpoints
      case "invoice.created":
        //   console.log(event.data.object);
        break;
      case "invoice.finalized":
        //   console.log(event.data.object);
        break;
      case "invoice.upcoming":
        //   console.log(event.data.object);
        break;
      case "invoice.payment_succeeded":
        if (event.data.object)
          console.log(event.data.object);
          try {
            let member = await memberService.findMember({
              stripeId: event.data.object.customer,
            });
            member.membership.status = event.data.object.status;
            let updatedMember = await memberService.updateMember(
              member._id,
              member
            );
          } catch (err) {
            console.log(err);
          }
        //   console.log(event.data.object);
        break;
      default:
        break;
      // return res.status(400).end();
    }
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  res.status(200).json({ received: true });
};

module.exports = {
  webhook,
};
