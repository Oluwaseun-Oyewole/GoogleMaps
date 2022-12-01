import { Places } from "./components/Places/Places";
import { Map } from "./components/Map/Map";
import { Tab } from "./components/Tab/Tab";
import { PlaceMap } from "./components/PlaceMap/PlaceMap";

export const App = () => {
  return (
    <div>
      <Tab
        tabs={[
          {
            index: 0,
            title: "Display Map",
            component: () => <Map />,
          },
          {
            title: "Search Places",
            component: () => <PlaceMap />,
          },
        ]}
      />
    </div>
  );
};
