import React from 'react';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';
import { Button } from '../ui/button';
import { s2ab } from '@/lib/helpers';
import { textConstants } from '@/configs/textConstants';

interface Props {
  dataSet: [];
}

const CSVDownload: React.FC<Props> = ({ dataSet }) => {
  const generateData = () => {
    const data = dataSet.map(({ income, item, zakat, price, quantity }) => ({
      Income: income,
      Item: item,
      Price: price ? `$${price}` : `$${quantity}`,
      Zakat: `$${zakat}`,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Zakat');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      'zakat.xlsx'
    );
  };

  return (
    <Button
      className="bg-black hover:bg-gray-500 text-white xs:text-sm md:text-lg"
      onClick={generateData}
    >
      {textConstants.downloadButtonText}
    </Button>
  );
};

export default CSVDownload;
