import Quote from "inspirational-quotes";

export const InspirationalQuote = () => {
  const quote = Quote.getQuote();

  return (
    <div className="w-full bg-spaceBlack rounded-xl p-4 my-6">
      <p className="tracking-wide">&quot;{quote.text}&quot;</p>
      <p className="text-right text-sm">- {quote.author}</p>
    </div>
  );
};
