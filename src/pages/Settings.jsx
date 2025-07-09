import React, { useState, useContext } from 'react'
import { SettingsContext } from '../contexts/SettingsContext'

export default function Settings() {
  

  const {settings, updateSettings} = useContext(SettingsContext)
  const [localSettings, setLocalSettings] = useState(settings)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target
    setLocalSettings({...localSettings, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      updateSettings(localSettings)
      alert('保存成功！')  
    }
    else{
      alert('请修改参数！')
    }
  }

  const handleReset = () => {
    setLocalSettings(settings)
  }

  const validateForm = () => {
    const newErrors = {}
    if (localSettings.workDuration <= 0){
      newErrors.workDuration = '时间必须大于0'
    }
    if (localSettings.breakDuration <= 0){
      newErrors.breakDuration = '时间必须大于0'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 
  }

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>工作时间</label>
          <input value={localSettings.workDuration} name='workDuration' onChange={handleChange} type='number'/>
          {errors.workDuration && <p>{errors.workDuration}</p>}
        </div>
        <div>
          <label>休息时间</label>
          <input value={localSettings.breakDuration} name='breakDuration' onChange={handleChange} type='number'/>
          {errors.breakDuration && <p>{errors.breakDuration}</p>}
        </div>
        <div>
          <label>浅色模式</label>
          <input value='light' name='theme' onChange={handleChange} type='radio' checked={localSettings.theme === 'light'}/>
          <label>深色模式</label>
          <input value='dark' name='theme' onChange={handleChange} type='radio' checked={localSettings.theme === 'dark'}/>
        </div>
        <button type='submit'>保存</button>
        <button type='button' onClick={handleReset}>重置</button>
      </form>
      
      </div>
  )
}
