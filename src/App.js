import logo from './logo.svg';
import './App.css';
import { FaTwitter, FaLinkedin, FaSearch } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import topai from './topai.csv';
import Papa from 'papaparse';
function App() {

  const [data, setData] = useState();
  const [uniqueCategories, setuniqueCategories] = useState();
  const [uniquePrice, setuniquePrice] = useState();
  const [cardCategories, setcardCategories] = useState();
  const [cardPrice, setcardPrice] = useState();
  const [sortOption, setSortOption] = useState('');

  const [headerArray, setHeaderArray] = useState(
    [
      "View All", "All Free", 'Avatar', 'Social Media', 'Video Editing', 'Speech Generation', 'AI Detectors', 'Teachers', 'Students', 'Chatbots', 'Writing', 'Marketing', 'Coding', "Finance", 'Data', 'Fun', 'Inspiration', 'Generative Art', 'Video Creation', 'Music', 'Prompting', 'Productivity', 'Business', 'Self Improvement', 'Tool Databases', 'AI Communities', ' Recently added tools']
  );


  // Filter products based on selected category and price
  const filteredProducts = data && data.filter((product) => {
    if (cardCategories && cardPrice) {
      return product.Category === cardCategories && product.Price === cardPrice;
    } else if (cardCategories) {
      return product.Category === cardCategories;
    } else if (cardPrice) {
      return product.Price === cardPrice;
    }
    return true;
  });

  const sortProducts = (array, option) => {
    if (option === '') {
      return array.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'title-asc') {
      return array.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === 'title-desc') {
      return array.sort((a, b) => b.title.localeCompare(a.title));
    } else if (option === 'description-asc') {
      return array.sort((a, b) => a.Description.localeCompare(b.Description));
    } else if (option === 'description-desc') {
      return array.sort((a, b) => b.Description.localeCompare(a.Description));
    } else if (option === 'category-asc') {
      return array.sort((a, b) => a.Category.localeCompare(b.Category));
    } else if (option === 'category-desc') {
      return array.sort((a, b) => b.Category.localeCompare(a.Category));
    }
    return array;
  };

  const sortedProducts = filteredProducts && sortProducts(filteredProducts, sortOption);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(topai);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,

        skipEmptyLines: true
      }).data;
      parsedData && setData(parsedData);
      parsedData && setuniqueCategories([...new Set(parsedData.map((product) => product.Category))]);
      parsedData && setuniquePrice([...new Set(parsedData.map((product) => product.Price))]);
    };
    fetchData();
  }, []);

  return (
    <div className='app h-full' >
      <nav className="sticky top-0 pt-10 w-full h-20 bg-regal-black1 bg-opacity-50 flex items-center justify-center  px-6 z-10">
        <div className="logo">
          <img src="https://super-static-assets.s3.amazonaws.com/9b1db7dc-155d-4da6-bf88-a68ad1c2af0f/uploads/logo/6b5058c2-94fe-4d1a-90b6-727882b1acf7.png" alt="Logo" className="float-left
          h-20 mr-10" />
        </div>
        <ul className="flex gap-4">
          <li><a href="#" className="text-white font-bold">Top Picks</a></li>
          <li><a href="#" className="text-white font-bold">Submit</a></li>
          <li><a href="#" className="text-white font-bold">Sponsor</a></li>
        </ul>
      </nav>
      <div className='app' >
        <div className='header'>
          <p>LookAITools</p>
          <p>Accessories</p></div>
        <header className="App-header">
          <img src='https://s3.us-east-2.amazonaws.com/uploads.spreadsimple/bf6094bb-7602-4f01-8cac-b92ea313386d_eco-store-logo.png' className="App-logo" alt="logo" />
          <h1 >
            1000+ AI tools
          </h1>
          <p>
            Find the AI Tool that fits best to you
          </p>
        </header>
      </div>
      <div className='supertool h-full '>
        {
          uniqueCategories && uniqueCategories.map((item, index) => {
            return <button className='m-1 p-2 border' key={index} onClick={(e) => setcardCategories(item)} value={item} >{item}</button>


          })}
        <div className='border-b-2'> <div className="flex m-10"><span className="p-3" ><FaSearch className="   search-icon  " /></span>
          <input class="h-10   w-full  bg-regal-black to-transparent outline-none" type="search" autocomplete="off" onChange={(e) => { setcardCategories(e.target.value) }} spellcheck="false" aria-live="polite" placeholder="Category you are looking for" /></div>
          <div className='lg:flex md:flex sm:w-full  justify-between'>
            <div className='lg:flex  '>
              <select id="countries" onChange={(e) => setcardCategories(e.target.value)} class="p-3 m-3  text-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" selected>Category </option>
                {
                  uniqueCategories && uniqueCategories.map((item, index) => {
                    return <option key={index} value={item} >{item}</option>

                  })

                }
                {/* {console.log(cardCategories)} */}
              </select>
              <select id="countries" onChange={(e) => setcardPrice(e.target.value)} class="p-3 m-3 text-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" selected>Price </option>
                {
                  uniquePrice && uniquePrice.map((item, index) => {
                    return <option key={index} value={item} >{item}</option>

                  })

                }
                {console.log(cardPrice)}
              </select>
            </div>
            <div><select id="countries" onChange={(e) => setSortOption(e.target.value)} class="p-3 m-3 text-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected value="">Default</option>
              <option value="title-asc">Title asc</option>
              <option value="title-desc">Title dec</option>
              <option value="description-asc">Discription asc</option>
              <option value="description-desc">Discription desc</option>
              <option value="category-asc">Category asc</option>
              <option value="category-desc">Category desc</option>
            </select></div>
          </div>
        </div>

        <div>
          <div class=" flex flex-wrap ">
            {sortedProducts ? sortedProducts.map((item, index) => (

              <div key={index} class="lg:w-1/4 md:w-1/3 curser-pointer p-10 sm:w-full ">
                <img src={item.img} alt={item.title} class="w-full h-100" />
                <div class="">
                  <h5 class="text-xl mt-5 pb-5 text-white font-bold tracking-widest mb-2 border-b-2 uppercase">{item.title}</h5>
                  <p className='text-xl text-white mt-5 pb-6 border-b-2'>{item.Description.slice(0, 50)}...</p>
                  <h5 class="text-sm mt-5 pb-5 text-white font-bold tracking-widest mb-2  ">
                    <span className='float-left'>Category:</span>
                    <span className='text-lg font-bold float-right'>{item.Category}</span>

                  </h5>
                  <h5 class="text-xl mt-5 pb-5 text-white font-bold tracking-widest mb-2 border-b-2 uppercase">{item.Price}</h5>

                  <a href="#" class="bg-gray-u hover:bg-gray-600 text-white px-4 py-2 text-center font-bold block mt-4 rounded">Visit</a>
                </div>
              </div>
            ))
              :
              <span className='text-white'>loading...</span>
            }
          </div>
        </div>

      </div>
      <footer className="h-full container mx-auto footer  p-10">
        <img src="https://super-static-assets.s3.amazonaws.com/9b1db7dc-155d-4da6-bf88-a68ad1c2af0f/uploads/logo/6b5058c2-94fe-4d1a-90b6-727882b1acf7.png" alt="Logo" className="
          h-20 m-10"/>
        <span className='mr-10'>
          <FaTwitter className="m-3 twitter-icon float-right" />
          <FaLinkedin className="m-3 linkedin-icon float-right" />
        </span>
        <h1 >
          Privacy Policy

          Terms & Conditions


        </h1>
        <p>
          © 2023 The Rundown AI, Inc. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;
