import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import tw from "twin.macro";

export const Places = ({ setPlace }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelelct = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setPlace({ lat: lat, lng: lng });

    setTimeout(() => {
      setValue("");
    }, 5000);
  };

  let Pop = styled(ComboboxPopover)``;

  const Loader = styled.div`
    ${tw`w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin`}
    border-top-color:transparent
  `;

  return (
    <>
      <div className="map__control__input">
        <h1 className="text-center lg:pl-4 lg:text-left pt-5 text-2xl md:text-xl">
          Find a Place ?
        </h1>
        {!ready ? (
          <div className="text-center h-[100%] p-5">
            <Loader />
          </div>
        ) : (
          <Combobox onSelect={handleSelelct}>
            <ComboboxInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="combobox-input"
              disabled={!ready}
              placeholder="search office address"
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ place_id, description }) => {
                    return (
                      <ComboboxOption key={place_id} value={description} />
                    );
                  })}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        )}
      </div>
    </>
  );
};
