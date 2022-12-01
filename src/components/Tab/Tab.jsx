import { tab } from "@testing-library/user-event/dist/tab";
import { useState, useEffect } from "react";
import styled from "styled-components";

const TabContainer = styled.section`
  display: flex;
  height: auto;
  justify-content: space-around;
  color: #e8f0f2;
  border-radius: 2rem;
  width: 30%;

  @media (max-width: 1024px) {
    width: 50%;
    align-items: center;
  }

  @media (max-width: 769px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  gap: 1rem;
`;

export const Tab = ({ tabs }) => {
  // const [activeTab, setActiveTab] = useState(localStorage.getItem("store"));
  const store = localStorage.setItem("store", 0);
  const [activeTab, setActiveTab] = useState(0);
  const getStore = JSON.parse(localStorage.getItem("store"));
  console.log("getStore", getStore);

  return (
    <>
      <div className="tab__container">
        <div>
          <TabContainer>
            {tabs?.map((tab, index) => {
              return (
                <ul className="nav">
                  <li
                    className={activeTab === index ? "active" : ""}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.title}
                  </li>
                </ul>
              );
            })}
          </TabContainer>
        </div>
        {/* <div>{tabs[getStore].component()}</div> */}
        <div>
          {tabs?.map((tab, index) => {
            return activeTab === index && tab.component();
          })}
        </div>
      </div>
    </>
  );
};
