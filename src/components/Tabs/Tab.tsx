import React, {useEffect} from 'react'

type Props = {
    activeTab: string;
    dataTab: string;
    title?: string;
    subTitle?:  string;
    children?: any;
}

const Tab: React.FC<Props> = ({ activeTab, dataTab, title,  subTitle, children }) => {
    const shouldTabBeVisible = activeTab === dataTab ? "" : "hidden"
    
    return <div className={"tab "+ shouldTabBeVisible}>
        {children}
    </div>
}

export default Tab