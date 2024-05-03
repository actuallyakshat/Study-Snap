import ReactLoading from "react-loading";
export default function Loading() {
  return (
    <div className="bg-spaceBlack absolute top-0 z-[1000] flex h-screen w-full flex-col items-center justify-center">
      <ReactLoading type="bars" color="#7f007f" height={100} width={80} />
      <h2 className="text-2xl font-bold">Loading Study Snap...</h2>
    </div>
  );
}
