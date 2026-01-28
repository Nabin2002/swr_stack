import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (err: any) {
    throw new Error(err)
  }
}
const App = () => {
  const { data, error, isLoading } = useSWR('/product', fetcher, { refreshInterval: 10000 })
  const [form, setForm] = useState({
    title: '',
    price: '',
    discount: ''
  })

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const value = input.value
    const name = input.name
    setForm({
      ...form,
      [name]: value
    })
  }
  const addProduct = async (e: FormEvent) => {
    try {
      e.preventDefault()
      axios.post("/product", form)
      mutate("/product")
      // setCount(count+1)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = async (id: String) => {
    await axios.delete(`/product/${id}`)
    mutate("/product")
  }
  return (
    <div className='min-h-screen m-0 bg-slate-900'>
      <div className="w-11/12 mx-auto p-10 flex gap-8 rounded-xl bg-slate-900 text-slate-100">
        <div className="w-100 bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Data Fetcher
          </h1>
          <form className="flex flex-col gap-4" onSubmit={addProduct}>
            <input
              required
              onChange={handleForm}
              type="text"
              name="title"
              placeholder="Product title"
              className="bg-slate-900 border border-slate-700 text-slate-100 
                 p-3 rounded-lg placeholder-slate-400
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              required
              onChange={handleForm}
              type="number"
              name="price"
              placeholder="Price"
              className="bg-slate-900 border border-slate-700 text-slate-100 
                 p-3 rounded-lg placeholder-slate-400
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              required
              onChange={handleForm}
              type="number"
              name="discount"
              placeholder="Discount (%)"
              className="bg-slate-900 border border-slate-700 text-slate-100 
                 p-3 rounded-lg placeholder-slate-400
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 
                 text-white py-3 rounded-lg font-semibold transition"
            >
              Create Product
            </button>
          </form>
        </div>
        <div className="flex-1 grid grid-cols-3 gap-4 border border-slate-700 rounded-xl p-6 bg-slate-800">
          {isLoading && (
            <p className="text-slate-400 col-span-3">Loading products...</p>
          )}

          {data &&
            data.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-700 rounded-xl p-5
                   hover:border-indigo-500 transition flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <h1 className="text-lg font-semibold capitalize text-white">
                    {item.title}
                  </h1>

                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="text-slate-400 hover:text-rose-500 transition"
                    title="Delete product"
                  >
                    <i className="ri-delete-bin-line text-xl"></i>
                  </button>
                </div>

                <p className="text-indigo-400 font-medium">
                  ₹ {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>

  )
}

export default App







