import React from 'react';
import { EmptyIcon } from '@/assets/svgs/no-record';
import { textConstants } from '@/configs/textConstants';

const EmptyTable = () => {
  return (
    <div>
      <EmptyIcon />
      <div className="text-align: center; padding: 20px;">
        <h2>{textConstants.emptyTableHeading}</h2>
        <p>{textConstants.emptyTableParagraph}</p>
      </div>
    </div>
  );
};

export default EmptyTable;
