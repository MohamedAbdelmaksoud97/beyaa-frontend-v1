import BottomNav from "./BottomNav";
import HeaderBar from "./HeaderBar";

function MainWrapper({ pageName, children, size }) {
  return (
    <>
      <HeaderBar />
      <div className="flex justify-center">
        <div
          className={`mx-5 ${size === "wide" ? "max-w-4xl" : "max-w-lg"} w-full pb-16 lg:px-0`}
        >
          <header className="pt-8 pb-4">
            <h1 className="text-secondary-900 text-center text-2xl font-semibold tracking-tight">
              {pageName}
            </h1>
          </header>
          {children}
          <BottomNav />
        </div>
      </div>
    </>
  );
}

export default MainWrapper;
