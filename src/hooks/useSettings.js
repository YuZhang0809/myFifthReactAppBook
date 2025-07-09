import { useEffect, useState} from "react";

export function useSettings(){

    const initialSettings = {
        workDuration : 1500,
        breakDuration : 500,
        theme: 'light'
    }

    const [settings, setSettings] = useState(initialSettings)

    useEffect(
        () => {
            let localSettings = localStorage.getItem('settings')
            if (localSettings) {
                setSettings(JSON.parse(localSettings))
            }
        }
        ,[]
    )    

    function updateSettings(newSetting) {
        const newSettings = {...settings, ...newSetting}
        setSettings(newSettings)
        localStorage.setItem('settings', JSON.stringify(newSettings))
    }




    return {settings:settings, updateSettings:updateSettings}
}