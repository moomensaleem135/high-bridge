import React from 'react';
import { EmptyIcon } from '@/assets/svgs/no-record';

const EmptyTable = () => {
  return (
    <div>
      <EmptyIcon />
      <div className="text-align: center; padding: 20px;">
        <h2>No Data Available</h2>
        <p>Please check back later or try a different filter.</p>
      </div>
    </div>
  );
};

export default EmptyTable;
