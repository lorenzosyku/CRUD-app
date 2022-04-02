const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { item } = req.body;
      const modifiedItems = item.map((item) => ({
        quantity: 1,
        price_data: {
          currency: "GBP",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            images: [item.img],
          },
        },
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: modifiedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/cancelled`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    // NOTE NEEDED
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
