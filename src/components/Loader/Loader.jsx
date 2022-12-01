import styled from "styled-components";
import tw from "twin.macro";

const LoaderContainer = styled.div`
  ${tw`absolute left-0 w-full h-full overflow-hidden flex justify-center top-0 items-center z-[21]`}
`;

const Spinner = styled.div`
  ${tw`w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin`}
  border-top-color:transparent
`;
export const Loader = () => {
  return (
    <>
      <LoaderContainer>
        <Spinner />
      </LoaderContainer>
    </>
  );
};
