interface TabNavigationProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="flex flex-wrap border-b border-gray-200 bg-white px-2 pt-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`relative px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === index
              ? 'text-vnu-green'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {tab}
          {activeTab === index && (
            <div className="bg-vnu-green absolute bottom-0 left-0 h-0.5 w-full"></div>
          )}
        </button>
      ))}
    </div>
  );
}
