import { PersonnelSidebar } from '@/components/main/PersonnelSidebar';
import ContractHistory from '@/components/personnel/ContractHistory';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv',
)({
  component: RouteComponent,
});
function RouteComponent() {
  const [activeTab, setActiveTab] = useState('Quá trình ký hợp đồng');
  return (
    <div className="flex h-screen w-full">
      <PersonnelSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="grow bg-gray-50 p-6 overflow-y-auto">
        {activeTab === 'Quá trình ký hợp đồng' ? (
          <ContractHistory />
        ) : (
          <div className="text-gray-500 italic">
            Màn hình {activeTab} đang được xây dựng...
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
