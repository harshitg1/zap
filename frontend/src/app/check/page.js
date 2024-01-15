import React from 'react'

const page = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto mt-20 p-6  rounded  border border-b-0 ">
      <div className="text-4xl flex justify-center font-manrope items-center   font-bold ">Create Invoice</div>
      
      <form className="flex justify-around mt-7 ">
        <div className="" >
       
          <input
            type="number"
            id="title"
            name="title"
            placeholder="Invoice no"
        
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />
        </div>
        <div >
     
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="amount"
            
          
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />
        </div>

        <div >
       
          <input
            type="date"
            id="duedate"
            name="duedate"
          
        
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-black  px-4 py-2 text-white  rounded-lg focus:outline-none "
        >
          Add
        </button>
      </form>

      </div>
    
    
    </>
  )
}

export default page