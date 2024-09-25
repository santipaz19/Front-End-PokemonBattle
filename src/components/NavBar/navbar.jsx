import pokemonLogo from '../../assets/img/pokemonLogo.png';
import IconSearch from '../../assets/img/IconSearch.png';

const Navbar = ({ searchText, setSearchText }) => {
    return (
        <div className='flex justify-center sm:justify-between w-full bg-[#FFCC00] text-[#2C3E50] h-20 items-center px-3'>
            <img src={pokemonLogo} className='w-[10rem] h-fit hidden sm:block' alt='pokemon logo' />
            <h1 className='text-3xl font-semibold hidden sm:block leading-10'>Battle of Pokemon</h1>
            <div className='sm:hidden flex gap-2 items-center justify-center'>
                <h1 className='text-3xl font-semibold leading-10'>Battle of </h1>
                <img src={pokemonLogo} className='w-[10rem] h-fit block sm:hidden' alt='pokemon logo' />
            </div>
            <div className='items-center hidden sm:flex bg-white px-2 rounded-lg'>
                <input
                    className='h-[2rem] outline-none text-[#2C3E50]'
                    placeholder='Busque un pokemon'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <img src={IconSearch} className='w-6 h-6 ml-2' alt='icon search' />
            </div>
        </div>
    );
};

export default Navbar;
