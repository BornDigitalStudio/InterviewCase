import React, {useEffect, useState, useRef} from 'react'
import NavButton from '../Buttons/NavButton'
import Tab from './Tab';
import TabHeader from './TabHeader';
import Button from '../Buttons/Button';
import FormUserUpdate from '../Form/FormUserUpdate';
import { ToastPortal } from '../Toast/ToastPortal';
import { Toast } from '../Toast/Toast';
import { ToastType } from '../Toast/ToastPortal';

type Props = {
    tabTitles: string[];
    clickHandler?: (e?: any) => void;
    children?: any;
}

const TabContainer: React.FC<Props> = ({ tabTitles, clickHandler, children }) => {
    const [activeTab, setActiveTab] = useState<string | null>("0");
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(true) // disables submit BTN
    const [resetForm, setResetForm] = useState<boolean>(false) // Resets form
    const [submit, setSubmit] = useState<boolean>(false)
    const modal = useRef<ToastType>(null)

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        setActiveTab(button.getAttribute('data-tab-key'))
    };

    const addMember = () => {
        console.log('member added')
    }
    
    return  <>
    <div className='flex mb-6 border-b border-custom-border'>
        { tabTitles.map((tab, index) => 
            <NavButton 
                className='p-3' 
                type={"button"}
                onClick={buttonHandler} 
                data-tab-key={index}
                active={index === Number(activeTab)}
                key={index}
            >
                {tab}
            </NavButton>
        )}
    </div>
    <div className='bg-white p-6 border border-custom-border rounded-[10px]'>
        <Tab activeTab={activeTab!} dataTab="0">
            <TabHeader title="General settings" subTitle="Here you can change your email and password">
                <Button type='button' btnType="secondary" size="md" onClick={() => setResetForm(!resetForm)}>Cancel</Button>
                <Button type='button' btnType="secondary" size="md" disabled={submitBtnDisabled} onClick={() => setSubmit(!submit)}>Update details</Button>
            </TabHeader>
            <FormUserUpdate setSubmitBtnDisabled={setSubmitBtnDisabled} shouldFormReset={resetForm} callSubmit={submit}/>
        </Tab>
        <Tab activeTab={activeTab!} dataTab="1" title="" subTitle="">Tab 2</Tab>
        <Tab activeTab={activeTab!} dataTab="2" >
            <TabHeader title="Update authorized people" subTitle="Manage your team members and their account permissions here.">
                <Button type='button' btnType="secondary" size="md" onClick={addMember}>+ Add team member</Button>
            </TabHeader>
        </Tab>
        <Tab activeTab={activeTab!} dataTab="3" title="" subTitle="">Tab 3</Tab>

    </div>
    {/* <Toast text="HELLO" type="info" cloasable={true}/>
    <ToastPortal ref={modal} /> */}
    </>
}
export default TabContainer