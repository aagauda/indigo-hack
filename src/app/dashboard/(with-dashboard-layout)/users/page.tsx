"use client"

import { DataTable } from '@/components/DataTable'
import DropDown, { DropDownMenuItemType } from '@/components/DropDown/DropDown';
import PageTitle from '@/components/PageTitle';
import { baseUrl } from '@/util/config';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { CircleEllipsis } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type Props = {};


type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

let DropDownMenuItems: DropDownMenuItemType[] = [
  {
    itemName: "View",
    link: "/settings/profile"
  }
]

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => { // here this is to add more data or modify the cell of status
      return (
        <div className='flex gap-2 items-center'>
          <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${row.getValue("status")}`} alt="avtar" className='h-10 w-10' />
          <p>{row.getValue("status")}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "dropAction",
    header: "Action",
    cell: ({ row }) => {
      const users = row.original
      //  console.log(users)
      return (
        <DropDown DropDownIcon={CircleEllipsis} DropDownLabel={"Actions"} DropDownMenuItems={DropDownMenuItems} />
      )
    },
  },

]

export const paymentData: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]


const UsersPage = (props: Props) => {
  const { data: session, status } = useSession();
  let token = session?.user?.tempToken

  console.log(session);
  // api states
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Or whatever your default page size is
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(session?.user?.tempToken)
        const response = await axios.get(`${baseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page,
            pageSize,
            // role: "someRole", // Adjust as needed
            // name: "someName"  // Adjust as needed
          }
        });

        setResult(response.data.users); // Adjust based on your API response structure
        setTotalPages(response.data.totalPages); // Adjust based on your API response structure
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, session]);

  console.log(result)





  return (
    <>
      {
        status == "loading" ?
          <p>Loading...</p>
          :
          <div className="flex flex-col gap-5 w-full">
            <PageTitle title={"Users"} />
            <DataTable columns={columns} data={result} pageSize={pageSize} pageNumber={page-1} />
          </div>

      }

    </>

  )
}

export default UsersPage