import React from 'react'

export type SalesProps = {
  name: string;
  email: string;
  saleAmount: string;
}

const SalesCard = (props: SalesProps) => {
  return (
    <div className='flex flex-wrap justify-between gap-3'>
      <section className='flex justify-between gap-3'>
        {/* image */}
        <div className='h-12 w-12 rounded-full p-1 bg-gray-100'>
          <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${props.name}`} alt="avtar" width={200} height={200} />
        </div>
        {/* name and email divs */}
        <div className='text-sm'>
          <p>{props.name}</p>
          <div className='text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto'>
            {props.email}
          </div>
        </div>
      </section>
        {/* sale amount */}
        <p>{props.saleAmount}</p>
    </div>
  )
}

export default SalesCard