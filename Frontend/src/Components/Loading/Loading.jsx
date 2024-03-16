import ReactLoading from "react-loading";
export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <ReactLoading type="bars" color="#7f007f" height={100} width={80} />
      <h2 className="font-bold text-2xl">Loading Study Snap...</h2>
    </div>
  );
}
