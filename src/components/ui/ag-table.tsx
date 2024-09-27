import React, { useMemo, useState, useEffect, useRef } from 'react';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// import PaginationControls from '../Pagination';

// Register the required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface AgGridTableProps extends AgGridReactProps {
  columns: ColDef[];
  rowData: any[];
  totalRows: number;
  pageSize?: string;
  onPaginationChanged?: (params: any) => void;
  setPageSize?: (size: string) => void;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  enablePagination?: boolean;
  onPageChange?: (page: number) => void;
  customHeight?: number;
}

const AgGridTable: React.FC<AgGridTableProps> = ({
  columns,
  rowData,
  pageSize,
  onPaginationChanged,
  setPageSize,
  currentPage,
  setCurrentPage,
  totalRows,
  enablePagination = false,
  onPageChange,
  customHeight,
  ...props
}) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<string>('100%'); // Default height
  const [showPageination, setShowPagination] = useState<boolean>(false);
  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: false,
      resizable: true,
      flex: 1,
    }),
    []
  );

  useEffect(() => {
    const resizeListener = () => {
      if (gridContainerRef.current && typeof window !== 'undefined') {
        setGridHeight(`${gridContainerRef.current.clientHeight}px`);
      }
    };

    // Check if window is defined before adding event listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeListener);
      resizeListener(); // Initial call to set height

      return () => {
        window.removeEventListener('resize', resizeListener);
      };
    }
  }, []);

  const handleGridReady = () => {
    // Optionally, perform actions when the grid is ready
    setShowPagination(true);
  };

  const handlePage = (page: number) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="w-full h-full flex flex-col" ref={gridContainerRef}>
      <div
        className="ag-theme-alpine"
        style={{ height: customHeight ? customHeight : gridHeight }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={enablePagination}
          paginationPageSize={enablePagination ? Number(pageSize) : undefined}
          suppressPaginationPanel={enablePagination}
          defaultColDef={defaultColDef}
          colResizeDefault={'shift'}
          onGridReady={handleGridReady}
          ref={gridRef}
          {...props}
        />
      </div>
      {/* {enablePagination && showPageination && (
        <PaginationControls
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={handlePage}
          totalRows={totalRows}
        />
      )} */}
    </div>
  );
};

export default AgGridTable;
