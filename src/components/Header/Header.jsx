
import React from 'react';

const Header = ({ handleOpenCreateModal, clearFilters }) => {
    return (
        <div className='md:justify-between justify-center flex md:flex-row flex-col lg:w-[49rem] w-full'>
            <h1 className='text-3xl md:text-start text-center text-[#ECF0F1]'>Selecciona tu pokemon</h1>
            <div className='flex gap-3 justify-center pt-3 md:pt-0'>
                <button
                    onClick={handleOpenCreateModal}
                    className="bg-[#27AE60]  hover:bg-[#1E8449] text-white py-1 px-2 rounded sm:flex"
                >
                    Crear Pokemon
                </button>
                <button
                    onClick={clearFilters}
                    className="bg-red-500 text-white py-1 px-2 rounded hidden sm:flex hover:bg-red-600"
                >
                    Limpiar Filtros
                </button>
            </div>
        </div>
    );
};

export default Header;