import search from '../../assets/icons/search.svg';
import settings from '../../assets/icons/settings.svg';


export function SearchContent(){
    return (
        <>
         <div className='header_contet search_header_content'>
                        <div className='search_input_content'>
                            <input className='search_input' placeholder='Search' />
                            <img src={search} className='search_icon' />
                        </div>
                        <img src={settings} className='setting_icon' />
                    </div>
        </>
    )
}