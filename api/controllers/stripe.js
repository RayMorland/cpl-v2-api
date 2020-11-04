var stripeService = require('../services/stripe.service');

const webhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let result;

    try {
        result = await stripeService.webhook(req, sig);
        res.status(200).send(result);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
}

module.exports = {
    webhook
}