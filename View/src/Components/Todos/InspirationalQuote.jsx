import Quote from "inspirational-quotes";

export const InspirationalQuote = () => {
  const quote = Quote.getQuote();

  return (
    <div className="w-full bg-[#4c004c]/50 border border-primaryPurple/60 rounded-xl p-4 mt-8">
      <p className="tracking-wide">&quot;{quote.text}&quot;</p>
      <p className="text-right text-sm">- {quote.author}</p>
    </div>
  );
};
