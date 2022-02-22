import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

const Loader = () => {

    const showLoader = useSelector(state => state.loader.showLoader);

    const showAppLoader = () => {
        const loader = showLoader ?
            <div className='w-full h-full bg-white bg-opacity-70 fixed top-0 z-10 flex flex-row items-center justify-items-center'>
                <div className='flex my-0 mx-auto'>
                    <Spin size='large' />
                </div>
            </div> : null;

        return loader
    }


    return showAppLoader()
}


export default Loader;
