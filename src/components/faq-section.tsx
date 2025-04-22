import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section id="faqs" className="bg-[#070D20] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to the most common questions about TradeLink Trading
            and our P2P platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is TradeLink Trading (TL)?
              </AccordionTrigger>
              <AccordionContent>
                TradeLink Trading (TL) is a peer-to-peer digital asset trading
                and exchange platform that acts as an intermediary between
                sellers and buyers of digital assets (coins or tokens). Our
                platform enables secure, transparent, and efficient trading
                without traditional intermediaries.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How does P2P trading work?</AccordionTrigger>
              <AccordionContent>
                Peer-to-peer (P2P) trading allows users to trade directly with
                each other without a central authority. On our platform, sellers
                list their digital assets with their desired price and payment
                methods. Buyers can browse listings, select one that matches
                their requirements, and initiate a trade. Our escrow system
                holds the digital assets until the payment is confirmed,
                ensuring a secure transaction.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What cryptocurrencies can I trade on TL?
              </AccordionTrigger>
              <AccordionContent>
                TradeLink Trading supports a wide range of cryptocurrencies
                including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Binance
                Coin (BNB), and many other popular altcoins. We regularly add
                support for new cryptocurrencies based on market demand and
                community feedback.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Is TradeLink Trading secure?</AccordionTrigger>
              <AccordionContent>
                Yes, security is our top priority. We implement
                industry-standard security measures including two-factor
                authentication (2FA), advanced encryption for all data, cold
                storage for the majority of assets, and regular security audits.
                Additionally, our escrow system protects both buyers and sellers
                during transactions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                What are the fees for trading on TL?
              </AccordionTrigger>
              <AccordionContent>
                TradeLink Trading charges a small fee for each successful
                transaction, typically ranging from 0.1% to 0.5% depending on
                the trading volume and user tier. We do not charge any deposit
                fees, and withdrawal fees vary depending on the cryptocurrency
                network. You can view our complete fee schedule in your account
                dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                How do I get started with TradeLink Trading?
              </AccordionTrigger>
              <AccordionContent>
                Getting started is simple: 1) Create an account by clicking the
                "Sign Up" button, 2) Complete the verification process to secure
                your account, 3) Deposit funds or cryptocurrencies into your
                wallet, and 4) Start trading! Our intuitive interface makes it
                easy for both beginners and experienced traders.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                What payment methods are supported?
              </AccordionTrigger>
              <AccordionContent>
                TradeLink Trading supports various payment methods including
                bank transfers, credit/debit cards, PayPal, and other popular
                online payment services. Available payment methods may vary by
                region and are determined by the sellers' preferences when
                listing their assets.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>
                How long do transactions take to complete?
              </AccordionTrigger>
              <AccordionContent>
                Transaction times vary depending on the payment method and
                cryptocurrency network. P2P trades typically complete within
                minutes to a few hours, depending on how quickly the buyer
                confirms payment. Cryptocurrency withdrawals depend on the
                specific blockchain network's confirmation times, ranging from
                minutes to an hour.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
