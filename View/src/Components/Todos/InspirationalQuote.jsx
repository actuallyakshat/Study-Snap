import Quote from "inspirational-quotes";

export const InspirationalQuote = () => {
  const quote = Quote.getQuote();

  return (
    <div className="w-full bg-primaryPurple/40 border border-primaryPurple/80 rounded-xl p-4 mt-6">
      <p className="tracking-wide">&quot;{quote.text}&quot;</p>
      <p className="text-right text-sm">- {quote.author}</p>
    </div>
  );
};
