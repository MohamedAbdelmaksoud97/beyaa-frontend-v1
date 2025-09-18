//import { useStore } from "@/contexts/StoreContext";

function Logo({ logo, name }) {
  //const { data: store } = useStore();
  //const logo = store?.logo;
  //const name = store?.name;
  console.log(logo);

  return logo ? (
    <img
      src={`${import.meta.env.VITE_ASSETS_BASE}/img/logos/${logo}`}
      alt={name}
      className="h-10 w-10"
    />
  ) : (
    <div className="text-md" style={{ fontFamily: "lobster" }}>
      {name}
    </div>
  );
}

export default Logo;
