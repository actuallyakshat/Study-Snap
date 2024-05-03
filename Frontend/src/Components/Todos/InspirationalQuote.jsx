import Quote from "inspirational-quotes";

export const InspirationalQuote = () => {
  const quote = Quote.getQuote();

  return (
    <>
      {" "}
      {quote && (
        <div className="mt-8 w-full rounded-xl border border-gray-600/70 bg-slate-800/70 p-4">
          <p className="tracking-wide">&quot;{quote?.text}&quot;</p>
          <p className="mt-2 text-right text-sm">- {quote?.author}</p>
        </div>
      )}
    </>
  );
};
