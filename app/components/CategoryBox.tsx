"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons';
import qs from 'query-string' ;
interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(()=> {
    let currentQuery = {};
    if (params) {
      // we parse this because we want back an object not a string
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery : any = {
      ...currentQuery,
      category : label
    }
    // we want to DEselect an item with this logic
    if (params?.get("category") === label) {
      delete updatedQuery.category ;
    }
    const url = qs.stringifyUrl({
      url : "/" ,
      query: updatedQuery
    },
    {skipNull:true});
    router.push(url);
  },[label,params,router])

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-4
        mb-1
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
   );
}

export default CategoryBox