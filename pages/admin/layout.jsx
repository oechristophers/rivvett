import SLayout from '@/components/admin/Layout';
import React from 'react';
export default function Layout({ children }) {
  return (
    <div className="server">
      <SLayout>{children}</SLayout>
    </div>
  );
}
