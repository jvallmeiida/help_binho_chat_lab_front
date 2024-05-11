
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Dialog, Disclosure, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';


function formatNumber(number) {
  let numStr = String(number);
  numStr = numStr.slice(0, 1) + '.' + numStr.slice(1);
  numStr = numStr.slice(0, 5) + ',' + numStr.slice(5);
  return numStr;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);

        setProduct(response.data);        
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    fetchProductData();
  }, [id]); 

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product?.productVariations?.map((variation) => (
                    <Tab
                      key={variation.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{variation.name}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img src={variation.imageUrl} alt="" className="h-full w-full object-cover object-center" />
                          </span>
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product?.variations?.map((variation) => (
                  <Tab.Panel key={variation.id}>
                    <img
                      src={variation.imageUrl}
                      alt={variation.name}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}  
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product?.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                {console.log('aaa', product)}
                <p className="text-3xl tracking-tight text-gray-900">R$ {formatNumber(product?.prices?.min)}</p>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }}
                />
              </div>

              <div className="flex justify-between space-x-4 mt-6">
                <div className="w-1/3 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-700">Preço Médio</h3>
                  {console.log(product)}
                  <p className="text-lg font-semibold text-gray-900">R$ {formatNumber(product?.prices?.med)}</p>
                  
                </div>
                <div className="w-1/3 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-700">Preço Mínimo</h3>
                  <p className="text-lg font-semibold text-gray-900">R$ {formatNumber(product?.prices?.min)}</p>
                  
                </div>
                <div className="w-1/3 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-700">Preço Máximo</h3>
                  <p className="text-lg font-semibold text-gray-900">R$ {formatNumber(product?.prices?.max)}</p>
                  {/* <Link to={`/loja/Amazon`} className="text-blue-500 hover:underline">Amazon</Link> */}
                </div>
              </div>

              <section aria-labelledby="details-heading" className="mt-12">
              <div className="divide-y divide-gray-200 border-t">
                {product?.variations?.map((variation) => (
                  <div className="justify-between" key={variation.name}>
                    <h3>
                      <button
                        onClick={() => window.open(variation?.sellerUrl, '_blank')}
                        className="group relative flex w-full items-center justify-between py-6 text-left"
                      >
                        <span>
                          {variation?.sellerName}
                        </span>
                        <span className="ml-6 flex items-center">
                          <ChevronRightIcon
                            className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </h3>
                  </div>
                ))}
              </div>

              </section>
            </div>
          </div>

          <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
            <h2 id="related-heading" className="text-xl font-bold text-gray-900">
              Outros Produtos Semelhantes
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {product?.variations?.map((variation) => (
                <div key={variation.id}>
                  <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                      <img
                        src={variation.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                      />
                      <p className="relative text-lg font-semibold text-white">{product.price}</p>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
