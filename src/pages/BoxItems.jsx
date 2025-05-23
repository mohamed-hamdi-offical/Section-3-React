import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function BoxItems() {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [likedProducts, setLikedProducts] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1040);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    async function getAllproduct() {
        const request = await fetch("https://dummyjson.com/products");
        const bodyres = await request.json();
        setProducts(bodyres.products);
    }

    useEffect(() => {
        getAllproduct();
    }, []);

    const handleAddToCart = (id) => setCount((prev) => ({ ...prev, [id]: 1 }));
    const handleIncrement = (id) => setCount((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    const handleDecrement = (id) =>
        setCount((prev) => {
            const newCount = prev[id] - 1;
            if (newCount <= 0) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            }
            return { ...prev, [id]: newCount };
        });

    const toggleLike = (id) => setLikedProducts((prev) => ({ ...prev, [id]: !prev[id] }));

    const renderProductCard = (item) => (
        <div className="bg-white rounded-2xl p-5 shadow-sm relative">
            <div className="w-full h-48 border border-gray-300 rounded-2xl overflow-hidden mb-6">
                <img className="w-full h-full object-contain" src={item.thumbnail} alt={item.title} />
            </div>
            <div
                onClick={() => toggleLike(item.id)}
                className={`absolute right-8 top-10 w-[3.5em] h-[3.5em] flex items-center justify-center rounded-[0.625em] cursor-pointer transition ${
                    likedProducts[item.id] ? "bg-[#DB4444]" : "bg-[#F1F1FF] hover:bg-red-100"
                }`}>
                <svg width="26" height="24" viewBox="0 0 26 24" fill={likedProducts[item.id] ? "white" : "none"}>
                    <path
                        d="M13 23.6875L11.1875 22.0375C4.75 16.2 0.5 12.3375 0.5 7.625C0.5 3.7625 3.525 0.75 7.375 0.75C9.55 0.75 11.6375 1.7625 13 3.35C14.3625 1.7625 16.45 0.75 18.625 0.75C22.475 0.75 25.5 3.7625 25.5 7.625C25.5 12.3375 21.25 16.2 14.8125 22.0375L13 23.6875Z"
                        fill={likedProducts[item.id] ? "#ffffff" : "#1D1D1D"}
                    />
                </svg>
            </div>
            <div
                onClick={() => setSelectedProduct(item)}
                className="absolute right-8 top-28 w-[3.5em] h-[3.5em] bg-[#F1F1FF] flex items-center justify-center rounded-[0.625em] cursor-pointer hover:bg-gray-200 transition">
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                    <path
                        d="M14 6.25C13.0054 6.25 12.0516 6.64509 11.3483 7.34835C10.6451 8.05161 10.25 9.00544 10.25 10C10.25 10.9946 10.6451 11.9484 11.3483 12.6517C12.0516 13.3549 13.0054 13.75 14 13.75C14.9946 13.75 15.9484 13.3549 16.6517 12.6517C17.3549 11.9484 17.75 10.9946 17.75 10C17.75 9.00544 17.3549 8.05161 16.6517 7.34835C15.9484 6.64509 14.9946 6.25 14 6.25ZM14 16.25C12.3424 16.25 10.7527 15.5915 9.58058 14.4194C8.40848 13.2473 7.75 11.6576 7.75 10C7.75 8.3424 8.40848 6.75269 9.58058 5.58058C10.7527 4.40848 12.3424 3.75 14 3.75C15.6576 3.75 17.2473 4.40848 18.4194 5.58058C19.5915 6.75269 20.25 8.3424 20.25 10C20.25 11.6576 19.5915 13.2473 18.4194 14.4194C17.2473 15.5915 15.6576 16.25 14 16.25ZM14 0.625C7.75 0.625 2.4125 4.5125 0.25 10C2.4125 15.4875 7.75 19.375 14 19.375C20.25 19.375 25.5875 15.4875 27.75 10C25.5875 4.5125 20.25 0.625 14 0.625Z"
                        fill="black"
                    />
                </svg>
            </div>
            <div className="text-lg font-semibold text-[#DB4444] mb-2">
                {item.price} <span>$</span>
            </div>
            <div className="text-lg font-medium text-black mb-4 line-clamp-2">{item.title}</div>
            {count[item.id] ? (
                <div className="w-full h-12 bg-black text-white rounded-xl flex items-center justify-between px-4">
                    <button onClick={() => handleDecrement(item.id)} className="text-xl">
                        −
                    </button>
                    <span className="text-lg">{count[item.id]}</span>
                    <button onClick={() => handleIncrement(item.id)} className="text-xl">
                        +
                    </button>
                </div>
            ) : (
                <button onClick={() => handleAddToCart(item.id)} className="w-full h-12 bg-black rounded-xl text-white font-medium hover:bg-[#231111] transition duration-150">
                    Add To Cart
                </button>
            )}
        </div>
    );

    return (
        <div className="container mx-auto px-4">
            {/* Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-[#3a3a3aa0] flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-11/12 max-w-md relative">
                        <button className="absolute top-2 right-3 text-2xl" onClick={() => setSelectedProduct(null)}>
                            &times;
                        </button>
                        <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-full h-52 object-contain mb-4 rounded-lg" />
                        <h2 className="text-xl font-bold mb-2">{selectedProduct.title}</h2>
                        <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
                        <div className="text-red-500 font-semibold text-lg">{selectedProduct.price} $</div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-20 md:mt-32">
                <div>
                    <div className="flex items-center space-x-2">
                        <div className="w-1 h-12 bg-red-500 rounded"></div>
                        <h2 className="text-red-500 text-lg md:text-xl font-medium">Our products</h2>
                    </div>
                    <h1 className="text-black mt-4 md:mt-10 text-2xl md:text-3xl font-medium mb-8">Explore Our Products</h1>
                </div>
                {isMobile && (
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <div className="arrow-left group w-12 h-12 border border-[#1D1D1D80] rounded-full flex items-center justify-center hover:bg-[#1D1D1D] hover:shadow-md cursor-pointer transition-all duration-300">
                            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                                <path
                                    d="M0.366 9.884C0.132 9.649 0 9.331 0 9c0-.331.132-.649.366-.884L7.438 1.045a1.01 1.01 0 0 1 1.681.777 1.01 1.01 0 0 1-.281.406L3.018 9l6.188 6.188a1.008 1.008 0 0 1-.003 1.372 1.009 1.009 0 0 1-1.372.003L0.366 9.884Z"
                                    fill="currentColor"
                                    className="text-[#1D1D1D80] group-hover:text-white"
                                />
                            </svg>
                        </div>
                        <div className="arrow-right group w-12 h-12 border border-[#1D1D1D80] rounded-full flex items-center justify-center hover:bg-[#1D1D1D] hover:shadow-md cursor-pointer transition-all duration-300">
                            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" className="rotate-180">
                                <path
                                    d="M0.366 9.884C0.132 9.649 0 9.331 0 9c0-.331.132-.649.366-.884L7.438 1.045a1.01 1.01 0 0 1 1.681.777 1.01 1.01 0 0 1-.281.406L3.018 9l6.188 6.188a1.008 1.008 0 0 1-.003 1.372 1.009 1.009 0 0 1-1.372.003L0.366 9.884Z"
                                    fill="currentColor"
                                    className="text-[#1D1D1D80] group-hover:text-white"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Products List */}
            {isMobile ? (
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".arrow-right",
                        prevEl: ".arrow-left",
                    }}
                    spaceBetween={20}
                    breakpoints={{
                        0: { slidesPerView: 1.2 },
                        500: { slidesPerView: 8 },
                        768: { slidesPerView: 2.5 },
                    }}
                    className="mt-10 mb-8 w-full">
                    {products.map((item) => (
                        <SwiperSlide key={item.id}>{renderProductCard(item)}</SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 mb-8">
                    {products.map((item) => (
                        <div key={item.id}>{renderProductCard(item)}</div>
                    ))}
                </div>
            )}
        </div>
    );
}
