import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AgGridTable from '@/components/ui/ag-table';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../../../styles/globals.css';
import CustomOptions from './customOption';
import { deleteItem, updateItem } from '@/store/features/items/golditemsSlice';
import { deleteCashItem } from '@/store/features/cash-items/cashSlice';
import { useRouter } from 'next/navigation';

// Define types for columns and row data
interface ColumnDef {
  headerName: string;
  field: string;
  cellRenderer?: any;
  cellRendererParams?: any;
}

interface Item {
  item: string;
  amount?: number;
  weight?: number;
  quantity?: string;
  quality?: string;
  usage?: string;
}
export interface GoldItem extends Item {
  goldId: string;
}
export interface CashItem extends Item {
  cashId: string;
}

interface RowDataDef {
  id: number;
  item: string;
  amount?: string;
  zakat: string;
  quantity?: string;
  quality?: string;
}

const GridSection: React.FC = () => {
  const dispatch = useDispatch();

  const items: GoldItem[] =
    useSelector((state: any) => state.items.items) || [];
  const cash: CashItem[] = useSelector((state: any) => state.cash.cash) || [];
  console.log({ items });
  console.log({ cash });
  const zakatVal = useSelector((state: any) => state.zakat.zakat.value);
  const income: string[] =
    useSelector((state: any) => state.income.income) || [];
  const router = useRouter();

  // State variables for grid height, columns, and row data
  const rowHeight = 92;
  const maxHeight = 400;
  const minHeight = 100;
  const [gridHeight, setGridHeight] = useState<number>(maxHeight);
  const [columns, setColumns] = useState<ColumnDef[]>([]);
  const [rowData, setRowData] = useState<RowDataDef[]>([]);

  // Dynamically update the grid height based on the number of items
  // useEffect(() => {
  //   if (items.length !== 0) {
  //     const numberOfRows = items.length;
  //     const calculatedHeight = Math.min(numberOfRows * rowHeight, maxHeight);
  //     setGridHeight(calculatedHeight);
  //   } else {
  //     setGridHeight(maxHeight);
  //   }
  // }, [items.length]);

  useEffect(() => {
    if (income.includes('Cash') || income.includes('Checking')) {
      if (cash.length > 0) {
        const calculatedHeight = Math.min(cash.length * rowHeight, maxHeight);
        setGridHeight(calculatedHeight);
      } else {
        setGridHeight(maxHeight); // Set to max height if cash is empty
      }
    } else if (income.includes('Gold')) {
      if (items.length > 0) {
        const calculatedHeight = Math.min(items.length * rowHeight, maxHeight);
        setGridHeight(calculatedHeight);
      } else {
        setGridHeight(maxHeight); // Set to max height if items is empty
      }
    } else {
      setGridHeight(maxHeight); // Default max height if no relevant income type
    }
  }, [items.length, cash.length, income]);

  // Set columns based on the income type (runs when income changes)
  useEffect(() => {
    let updatedColumns: ColumnDef[] = [];

    // Determine columns based on income type
    if (income.includes('Cash') || income.includes('Checking')) {
      updatedColumns = [
        { headerName: 'Item', field: 'item' },
        { headerName: 'Amount', field: 'quantity' },
        { headerName: 'Zakat', field: 'zakat' },
        {
          headerName: '',
          field: 'option',
          cellRenderer: (params: any) =>
            CustomOptions({
              id: params.data.cashId,
              onDelete: handleDelete,
              onEdit: handleEdit,
            }),
        },
      ];
    }

    if (income.includes('Gold')) {
      updatedColumns = [
        { headerName: 'Item', field: 'item' },
        { headerName: 'Quantity', field: 'quantity' },
        { headerName: 'Quality', field: 'quality' },
        { headerName: 'Zakat', field: 'zakat' },
        {
          headerName: '',
          field: 'option',
          cellRenderer: (params: any) =>
            CustomOptions({
              id: params.data.goldId,
              onDelete: handleDelete,
              onEdit: handleEdit,
            }),
        },
      ];
    }

    setColumns(updatedColumns); // Set columns independently of rowData
  }, [income]);

  // Set row data based on items (runs when items or zakatVal changes)
  useEffect(() => {
    let updatedRowData: RowDataDef[] = [];

    if (income.includes('Cash') || income.includes('Checking')) {
      updatedRowData = cash.map((item, index) => ({
        id: index,
        item: item.item,
        quantity: `$${item.quantity ?? 0}`,
        zakat: `$${zakatVal}`,
        cashId: item.cashId,
      }));
    }

    if (income.includes('Gold')) {
      updatedRowData = items.map((item, index) => ({
        id: index,
        item: item.item,
        quantity: `${item.weight ?? 0} ${item.quantity ?? ''}`,
        quality: item.quality ?? '',
        zakat: `$${zakatVal}`,
        goldId: item.goldId,
      }));
    }

    setRowData(updatedRowData);
  }, [items, cash, zakatVal, income]);

  // Handle edit and delete actions
  const handleEdit = (id: string) => {
    // router.push(`add-items/item-details?id=${id}`);
    // if (income.includes('Gold')) {
    //   dispatch(updateItem(id));
    // } else if (income.includes('Cash')) {
    //   dispatch(deleteCashItem(id));
    // }
  };

  const handleDelete = (id: string) => {
    console.log('Delete clicked for:', id);
    if (income.includes('Gold')) {
      dispatch(deleteItem(id));
    } else if (income.includes('Cash')) {
      dispatch(deleteCashItem(id));
    }
  };

  const totalRows = rowData.length;

  // Alternate row styling
  const getRowClass = (params: any) => {
    return params.rowIndex % 2 === 0 ? 'row-even' : 'row-odd';
  };

  // Placeholder message when no data is available
  const EmptyTable = `
  <div style="display : flex; flex-direction : column; justifyContent : center; alignItems : center; gap : 5px">
    <div style="display : flex; justifyContent : center; alignItems : center; padding-left : 45px">
       <svg width="36" height="36"  viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.148 31.05L34.0886 29.2078C34.7355 28.589 34.7636 27.5765 34.1589 26.9156C33.5402 26.2687 32.5277 26.2406 31.8808 26.8453L29.9261 28.6875L28.1402 26.789C27.5214 26.1422 26.5089 26.114 25.8621 26.7187C25.2152 27.3375 25.1871 28.35 25.7917 28.9968L27.5777 30.8953L25.6371 32.7375C24.9902 33.3562 24.9621 34.3687 25.5667 35.0156C26.1855 35.6625 27.198 35.6906 27.8449 35.0859L29.7855 33.2437L31.6699 35.2406C32.2886 35.8875 33.3011 35.9156 33.948 35.3109C34.5949 34.6922 34.623 33.6797 34.0183 33.0328L32.148 31.05Z" fill="black"/>
        <path d="M9.2541 6.91882H9.45098C10.365 6.91882 11.1104 6.17351 11.1104 5.25945V1.89851C11.1104 0.984448 10.365 0.239136 9.45098 0.239136H9.2541C8.34004 0.239136 7.59473 0.984448 7.59473 1.89851V5.24539C7.59473 6.17351 8.34004 6.91882 9.2541 6.91882Z" fill="black"/>
        <path d="M17.7756 6.91882H17.9725C18.8865 6.91882 19.6318 6.17351 19.6318 5.25945V1.89851C19.6318 0.984448 18.8865 0.239136 17.9725 0.239136H17.7756C16.8615 0.239136 16.1162 0.984448 16.1162 1.89851V5.24539C16.1162 6.17351 16.8615 6.91882 17.7756 6.91882Z" fill="black"/>
        <path d="M26.0021 6.91882H26.199C27.1131 6.91882 27.8584 6.17351 27.8584 5.25945V1.89851C27.8584 0.984448 27.1131 0.239136 26.199 0.239136H26.0021C25.0881 0.239136 24.3428 0.984448 24.3428 1.89851V5.24539C24.3428 6.17351 25.0881 6.91882 26.0021 6.91882Z" fill="black"/>
        <path d="M25.5807 31.4438L24.5822 30.4454C23.3166 29.1798 23.3166 27.1407 24.5822 25.8751C25.8479 24.6095 27.8869 24.6095 29.1525 25.8751L30.151 26.8735L31.1494 25.8751C31.8666 25.1579 32.8229 24.8485 33.751 24.947V4.99229C33.751 4.07822 33.0057 3.33291 32.0916 3.33291H29.0822V5.31572C29.0822 7.05947 27.6619 8.47978 25.9182 8.47978C24.1744 8.47978 22.7541 7.05947 22.7541 5.31572V3.31885H20.8416V5.30166C20.8416 7.04541 19.4213 8.46572 17.6775 8.46572C15.9338 8.46572 14.5135 7.04541 14.5135 5.30166V3.31885H12.5588V5.30166C12.5588 7.04541 11.1385 8.46572 9.39473 8.46572C7.65098 8.46572 6.23066 7.04541 6.23066 5.30166V3.31885H3.0666C2.15254 3.31885 1.40723 4.06416 1.40723 4.97822V33.7079C1.40723 34.622 2.15254 35.3673 3.0666 35.3673H23.7104C23.4994 34.3407 23.7947 33.2298 24.5822 32.4282L25.5807 31.4438ZM5.9916 12.7688C5.9916 11.8548 6.73691 11.1095 7.65098 11.1095H27.5635C28.4775 11.1095 29.2229 11.8548 29.2229 12.7688V12.9657C29.2229 13.8798 28.4775 14.6251 27.5635 14.6251H7.66504C6.75098 14.6251 6.00566 13.8798 6.00566 12.9657L5.9916 12.7688ZM19.9838 26.9579C19.9838 27.647 19.4213 28.1954 18.7463 28.1954H7.24316C6.5541 28.1954 6.00566 27.6329 6.00566 26.9579V26.8173C6.00566 26.1282 6.56816 25.5798 7.24316 25.5798H18.7463C19.4354 25.5798 19.9838 26.1423 19.9838 26.8173V26.9579ZM23.3729 20.3063C23.3729 21.2204 22.6275 21.9657 21.7135 21.9657H7.66504C6.75098 21.9657 6.00566 21.2204 6.00566 20.3063V20.1095C6.00566 19.1954 6.75098 18.4501 7.66504 18.4501H21.6994C22.6135 18.4501 23.3588 19.1954 23.3588 20.1095L23.3729 20.3063Z" fill="black"/>
      </svg>
    </div>
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 style="font-weight: 500;">No Data Available</h2>
        <p style="font-weight: 500">Please Add Your Items.</p>
      </div>
    </div>
  `;

  return (
    <div className="grid-container gridscrollbar">
      <AgGridTable
        columns={columns} // Columns will always be displayed
        rowData={rowData} // Row data will be empty or populated based on items
        getRowClass={getRowClass}
        totalRows={totalRows}
        customHeight={gridHeight}
        overlayNoRowsTemplate={EmptyTable} // Show placeholder when no rows are present
      />
    </div>
  );
};

export default GridSection;
