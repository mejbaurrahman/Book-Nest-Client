/* eslint-disable react/no-unescaped-entities */
export default function Faq() {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>

      <div
        tabIndex="0"
        className="collapse collapse-arrow bg-gray-100 rounded-box mb-4"
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-lg font-medium text-gray-800">
          What is Book-Nest?
        </div>
        <div className="collapse-content text-gray-700">
          <p>
            Book-Nest is an online platform where you can explore a variety of
            books, purchase them, and have them delivered to your doorstep.
          </p>
        </div>
      </div>

      <div
        tabIndex="0"
        className="collapse collapse-arrow bg-gray-100 rounded-box mb-4"
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-lg font-medium text-gray-800">
          How do I place an order?
        </div>
        <div className="collapse-content text-gray-700">
          <p>
            You can place an order by selecting your preferred book, adding it
            to your cart, and completing the checkout process with your payment
            information.
          </p>
        </div>
      </div>

      <div
        tabIndex="0"
        className="collapse collapse-arrow bg-gray-100 rounded-box mb-4"
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-lg font-medium text-gray-800">
          What payment methods do you accept?
        </div>
        <div className="collapse-content text-gray-700">
          <p>
            We accept a variety of payment methods including credit/debit cards,
            PayPal, and other secure online payment gateways.
          </p>
        </div>
      </div>

      <div
        tabIndex="0"
        className="collapse collapse-arrow bg-gray-100 rounded-box mb-4"
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-lg font-medium text-gray-800">
          How long does shipping take?
        </div>
        <div className="collapse-content text-gray-700">
          <p>
            Shipping times vary depending on your location. Typically, orders
            are processed within 1-2 business days, and shipping takes 3-7
            business days.
          </p>
        </div>
      </div>

      <div
        tabIndex="0"
        className="collapse collapse-arrow bg-gray-100 rounded-box mb-4"
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-lg font-medium text-gray-800">
          Can I return or exchange a book?
        </div>
        <div className="collapse-content text-gray-700">
          <p>
            Yes, we have a return and exchange policy in place. If you're not
            satisfied with your purchase, please contact us within 14 days for
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
