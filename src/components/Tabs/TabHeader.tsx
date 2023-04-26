import React, {useEffect} from 'react'

type Props = {
    title?: string;
    subTitle?:  string;
    children?: any;
}

const TabHeader: React.FC<Props> = ({ title,  subTitle, children }) => {
    
    return <div className="flex justify-between pb-6 border-b border-custom-border">
                <div>
                    <h2 className='mb-2 font-medium text-base'>{title}</h2>
                    <h3 className='disabled'>{subTitle}</h3>
                </div>
                { children && <div className='flex items-center gap-[10px]'>
                    {children}
                </div> }
            </div>
}

export default TabHeader