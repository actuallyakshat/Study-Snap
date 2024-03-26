import ReactLoading from "react-loading";
export default function Loading() {
  return (
    <div className="h-screen w-full absolute bg-spaceBlack top-0 z-[1000] flex flex-col items-center justify-center">
      <ReactLoading type="bars" color="#7f007f" height={100} width={80} />
      <h2 className="font-bold text-2xl">Loading Study Snap...</h2>
    </div>
  );
}
