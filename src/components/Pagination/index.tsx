// import React from 'react';

// import {
//   SelectItem,
//   Select,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import PageNumbers from './PageNumbers';

// interface PaginationControlsProps {
//   pageSize?: string;
//   setPageSize?: (size: string) => void;
//   currentPage?: number;
//   setCurrentPage?: (page: number) => void;
//   totalRows: number;
// }

// const pageOptions = [
//   { name: '10' },
//   { name: '20' },
//   { name: '50' },
//   { name: '100' },
// ];

// const PaginationControls: React.FC<PaginationControlsProps> = ({
//   pageSize,
//   setPageSize,
//   currentPage,
//   setCurrentPage,
//   totalRows,
// }) => {
//   const handlePageSizeChange = (value: string) => {
//     if (setPageSize) setPageSize(value);
//   };

//   return (
//     <div className="grid grid-cols-12 mt-3">
//       <div className="col-span-10 relative flex-wrap  w-full pb-2 sm:pb-12 pt-1 ">
//         <PageNumbers
//           length={totalRows}
//           currentPage={currentPage}
//           gotoPage={setCurrentPage}
//           pageSize={Number(pageSize)}
//         />
//       </div>
//       <div className="col-span-2 flex justify-end items-center">
//         <p className="mr-2 w-100 text-black font-normal text-sm ">
//           Result Per Page:
//         </p>
//         <div className="w-15">
//           <Select onValueChange={handlePageSizeChange}>
//             <SelectTrigger
//               iconColor="fill-border stroke-border ml-3"
//               className="border !border-brand h-8 px-2 shadow-none focus:ring-0 focus:ring-ring focus:ring-offset-0 text-sm "
//             >
//               <SelectValue placeholder={pageSize} />
//             </SelectTrigger>
//             <SelectContent>
//               {pageOptions.map((option) => (
//                 <SelectItem key={option.name} value={option.name}>
//                   <span>{option.name}</span>
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaginationControls;
