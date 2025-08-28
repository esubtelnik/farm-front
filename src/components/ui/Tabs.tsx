"use client";
import { FC, ReactNode, useState } from "react";
import { observer } from "mobx-react-lite";

interface TabItem {
  label: string;
  isGray?: boolean;
  render: () => ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

const Tabs: FC<TabsProps> = observer(({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const greenTabs = tabs.filter(tab => !tab.isGray);
  const grayTabs = tabs.filter(tab => tab.isGray);

  return (
    <div className="w-full">
      <div className="flex justify-between border-b-4 border-main-green px-7 w-full">
        <div className="flex">
          {greenTabs.map((tab) => {
            const originalIndex = tabs.indexOf(tab);
            const isActive = originalIndex === activeTab;
            return (
              <button
                key={originalIndex}
                onClick={() => setActiveTab(originalIndex)}
                className={`cursor-pointer py-2 px-6 font-semibold transition-colors border-t-2 border-r-2 border-l-2 border-main-green rounded-t-2xl ${
                  isActive ? "bg-main-green text-white" : "text-main-green"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex">
          {grayTabs.map((tab) => {
            const originalIndex = tabs.indexOf(tab);
            const isActive = originalIndex === activeTab;
            return (
              <button
                key={originalIndex}
                onClick={() => setActiveTab(originalIndex)}
                className={`py-2 px-6 font-semibold transition-colors border-t-2 border-r-2 border-l-2 border-main-gray rounded-t-2xl ${
                  isActive ? "bg-main-gray text-white" : "text-main-gray"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="p-4">{tabs[activeTab].render()}</div>
    </div>
  );
});

export default Tabs;
