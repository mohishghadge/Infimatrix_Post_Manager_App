import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import Header from './Header';
import { FaTrash, FaPlus } from 'react-icons/fa';

const Card = () => {

  const [datas,setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [page,setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  let limit = 10;

  async function fetchData (){
    try {
      setLoading(true)
      let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        if(!response.ok) throw new Error("Failed to Fetch Data")
      let result =  await response.json();
      setLoading(false)
      setDatas(result)
      setFilteredData(result)
      const total = response.headers.get('x-total-count');
      setTotalPages(Math.ceil(total / limit));

    } catch (err) {
      setError(err)
    }
  }

  useEffect(()=>{
    fetchData(page);
  },[page])

  useEffect(() => {
    const filtered = datas.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredData(filtered);
  }, [searchQuery, datas])

  const handlePageClick = (newPage) => {
    if(newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  }

  const handleDelete = (id) => {
    const updatedData = filteredData.filter(post => post.id !== id);
    setFilteredData(updatedData);
  }

  const handleAddPost = (newPost) => {
    const updatedData = [{ id: Date.now(), ...newPost }, ...filteredData];
    setFilteredData(updatedData);
    setTitle('');
    setBody('');
  }

  if(loading) return <div className='text-center text-lg font-semibold my-8'>Loading...</div>
  if(error) return <div className='text-center text-lg font-semibold my-8 bg-red-600'>{error.message}</div>
  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className='mt-6 mx-20 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' >
            {
              filteredData && filteredData.length ? filteredData.map(({id,title,body})=>(
                <div onClick={() => handlePostClick({id, title, body})} className='relative border border-gray-300 h-auto w-full rounded-xl px-6 py-4 shadow-xl transition-transform duration-200 ease-in-out hover:scale-105 hover:border-violet-500' key={id} >
                <FaTrash className='absolute top-3 right-3 text-red-500 cursor-pointer' onClick={(e) => { e.stopPropagation(); handleDelete(id); }} />
                <div className='text-xl font-bold text-violet-400 mb-2'>
                    Title:
                </div>
                <div className='mx-3 text-gray-600 mb-2 text-xl'>
                  {title}
                </div>
                <div className='text-xl font-bold text-violet-400 mb-2'>
                    Content:
                </div>
                <div className='mx-3 text-gray-600 mb-2 text-xl'>
                  {body}
                </div>
              </div>
              )) : <div className='text-center text-violet-500 font-bold text-xl mt-8'>This post not available</div>
            }
       </div>

       {filteredData.length > 0 && <Pagination currentPage={page} totalPages={totalPages} handlePageClick={handlePageClick} />}

       {showModal && selectedPost && (
        <div className='fixed inset-0 backdrop-invert backdrop-opacity-20  flex items-center justify-center'>
           <div className='bg-white p-8 rounded-xl w-1/3'>
             <h2 className='text-2xl font-bold text-violet-500'>{selectedPost.title}</h2>
             <p className='text-gray-600 mt-4'>{selectedPost.body}</p>
             <button onClick={() => setShowModal(false)} className='mt-6 bg-violet-500 text-white px-4 py-2 rounded'>Close</button>
           </div>
         </div>
       )}

       <button onClick={() => setShowAddModal(true)} className='fixed bottom-10 right-10 bg-violet-500 text-white p-4 rounded-full shadow-lg'>
         <FaPlus size={24} />
       </button>

       {showAddModal && (
        <div className='fixed inset-0 backdrop-invert backdrop-opacity-20 flex items-center justify-center'>
           <div className='bg-white p-8 rounded-xl w-1/3'>
             <h2 className='text-2xl font-bold text-violet-500 mb-4'>Add New Post</h2>
             <input type='text' placeholder='Title' className='w-full p-2 border border-gray-300 rounded mb-4' value={title} onChange={(e) => setTitle(e.target.value)} />
             <textarea placeholder='Content' className='w-full p-2 border border-gray-300 rounded mb-4' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
             <button onClick={() => { handleAddPost({ title, body }); setShowAddModal(false); }} className='bg-violet-500 text-white px-4 py-2 rounded'>Add Post</button>
             <button onClick={() => setShowAddModal(false)} className='ml-4 text-gray-500'>Cancel</button>
           </div>
         </div>
       )}
    </div>
  )
}

export default Card