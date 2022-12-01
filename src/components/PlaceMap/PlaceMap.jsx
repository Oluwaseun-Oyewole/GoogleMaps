import React, { useRef, useState } from "react";
import { Map } from "../Map/Map";
import { Places } from "../Places/Places";
import tw from "twin.macro";
import styled from "styled-components";

const Container = styled.div`
  ${tw`flex h-[100%] `}
  > div:first-child {
    flex: 1;
    background: #14161a;
    color: #fff;
  }
  > div:last-child {
    flex: 4;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > div:first-child {
      background: #14161a;
      color: #fff;
      flex: 0.5;
    }
    > div:last-child {
    }
  }
`;

export const PlaceMap = () => {
  const mapRef = useRef();
  const [place, setPlace] = useState();

  return (
    <Container>
      <div>
        <Places
          setPlace={(position) => {
            setPlace(position);
            mapRef?.current?.panTo(position);
          }}
        />
      </div>
      <div>
        <Map place={place} />
      </div>
    </Container>
  );
};
