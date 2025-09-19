import { forwardRef, useImperativeHandle, useState, ReactNode, useRef } from "react";

interface TabItem {
  label: string;
  isGray?: boolean;
  render: () => ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

export interface TabsHandle {
  goToTab: (index: number) => void;
}

const Tabs = forwardRef<TabsHandle, TabsProps>(({ tabs }, ref) => {
  const [activeTab, setActiveTab] = useState(0);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    goToTab: (index: number) => {
      setActiveTab(index);

      // прокрутка по X к активной кнопке
      const btn = buttonsRef.current[index];
      if (btn) {
        btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    },
  }));

  const greenTabs = tabs.filter(tab => !tab.isGray);
  const grayTabs = tabs.filter(tab => tab.isGray);

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto hide-scrollbar justify-between border-b-4 border-main-green md:px-7 w-full">
        <div className="flex">
          {greenTabs.map(tab => {
            const originalIndex = tabs.indexOf(tab);
            const isActive = originalIndex === activeTab;
            return (
              <button
                key={originalIndex}
                ref={el => {
                  buttonsRef.current[originalIndex] = el;
                }}
                
                onClick={() => setActiveTab(originalIndex)}
                className={`cursor-pointer text-sm md:text-base py-2 px-6 font-semibold transition-colors border-t-2 border-r-2 border-l-2 border-main-green rounded-t-2xl ${
                  isActive ? "bg-main-green text-white" : "text-main-green"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex">
          {grayTabs.map(tab => {
            const originalIndex = tabs.indexOf(tab);
            const isActive = originalIndex === activeTab;
            return (
              <button
                key={originalIndex}
                ref={el => {
                  buttonsRef.current[originalIndex] = el;
                }}
                
                onClick={() => setActiveTab(originalIndex)}
                className={`cursor-pointer py-2 px-6 text-sm md:text-base font-semibold transition-colors border-t-2 border-r-2 border-l-2 border-main-gray rounded-t-2xl ${
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

Tabs.displayName = "Tabs";

export default Tabs;
