import React from 'react';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';
import { s2ab } from '@/lib/helpers';
import { textConstants } from '@/configs/textConstants';
import { useCreateEventMutation } from '@/store/features/events/eventsApi';
import Spinner from './Spinner';
import { Button } from '../ui/button';

interface Props {
  dataSet: [];
}

const CSVDownload: React.FC<Props> = ({ dataSet }) => {
  const [login, { isLoading }] = useCreateEventMutation();
  const generateData = () => {
    const data = dataSet.map(({ income, item, zakat, price, quantity }) => ({
      Income: income,
      Item: item,
      Price: price ? `$${price}` : `$${quantity}`,
      Zakat: `$${Math.ceil(zakat)}`,
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
      className="bg-black hover:bg-btnHover text-white xs:text-sm md:text-base font-medium"
      onClick={generateData}
    >
      {isLoading ? <Spinner /> : textConstants.downloadButtonText}
    </Button>
  );
};

export default CSVDownload;
