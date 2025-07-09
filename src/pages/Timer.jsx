import React, { useEffect, useReducer, useContext } from 'react'
import { SettingsContext } from '../contexts/SettingsContext'

const ACTIONS = {
  START_WORK: 'START_WORK',
  START_BREAK: 'START_BREAK',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  RESET: 'RESET',
  TICK: 'TICK',
  COMPLETE_SESSION: 'COMPLETE_SESSION'
}


const getButtonStates = (status, previousStatus) => {
  if (status === 'IDLE' && (previousStatus === '' || previousStatus === 'BREAK' )) {
    return { 
      showStartWork: true, 
      showStartBreak: false, 
      showPause: false, 
      showReset: false,
      showResume: false
    }
  } 
  else if(status === 'IDLE' && previousStatus === 'WORKING' ) {
    return{   
        showStartWork: false, 
        showStartBreak: true, 
        showPause: false, 
        showReset: false,
        showResume: false
      }
  }

  else if (status === 'WORKING') {
    return{
      showStartWork: false, 
      showStartBreak: false,
      showPause: true, 
      showReset: true,
      showResume: false      
    }
  }

  else if (status === 'BREAK') {
    return{
      showStartWork: false, 
      showStartBreak: false,
      showPause: true, 
      showReset: true,
      showResume: false   
    }
  }

  else if (status === 'PAUSED') {
    return{
      showStartWork: false, 
      showStartBreak: false,
      showPause: false, 
      showReset: true,
      showResume: true
    }
  }
  else{
    return {}
  }
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

function timerReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_WORK:
      return {...state, status:'WORKING', isActive:true, timeLeft: state.workDuration}
    case ACTIONS.START_BREAK:
      return{...state, status:'BREAK', isActive:true, timeLeft: state.breakDuration}
    case ACTIONS.PAUSE:
      return{...state, status:'PAUSED', isActive:false, previousStatus:state.status}
    case ACTIONS.RESUME:
      return{...state, status:state.previousStatus, isActive:true}
    case ACTIONS.RESET:
      return {
        status: 'IDLE',
        previousStatus: '',
        timeLeft: 0,
        isActive: false,
        currentSession: 0,
        totalSessions: 0,
        workDuration: state.workDuration,  // 使用当前state中的值
        breakDuration: state.breakDuration  // 使用当前state中的值
      }
    case ACTIONS.TICK:
      if (state.timeLeft <= 1) {
        const newState = {
          ...state,
          timeLeft: 0,
          isActive: false
        }       // 如果是工作阶段完成，增加会话数
        if (state.status === 'WORKING') {
          alert(`工作时间结束！休息一下吧！现在已完成${state.currentSession + 1}个番茄钟！`)
          newState.currentSession = state.currentSession + 1
          newState.totalSessions = state.totalSessions + 1
          newState.status = 'IDLE'  // 工作完成回到空闲
          newState.previousStatus = 'WORKING'
        } else if (state.status === 'BREAK') {
          alert('休息时间结束！让我们开始工作吧')
          newState.previousStatus = 'BREAK'
          newState.status = 'IDLE'  // 休息完成回到空闲
        }   
        return newState
      }
      return{...state, timeLeft:state.timeLeft - 1}
    case ACTIONS.COMPLETE_SESSION:
      return{...state, totalSessions: state.totalSessions + 1}
          case ACTIONS.UPDATE_DURATIONS: {
        const newState = {
          ...state,
          workDuration: action.payload.workDuration,
          breakDuration: action.payload.breakDuration
        };
        return newState;
      }
    default:
      return state;
  }
}


export default function Timer() {

  const {settings} = useContext(SettingsContext)

  const initialState = {
    // 'IDLE' | 'WORKING' | 'BREAK' | 'PAUSED'
    status: 'IDLE',
    previousStatus: '',
    timeLeft: 0,
    isActive:false,
    currentSession:0,
    totalSessions:0,
    workDuration:settings.workDuration,
    breakDuration:settings.breakDuration
  }

  const [state, dispatch] = useReducer(timerReducer, initialState)

  //定时器
  useEffect(() => {
    let timer; // 在顶层作用域声明
  
    if (state.isActive) {
      // 只有在 active 时才创建和赋值
      timer = setInterval(() => {
        dispatch({ type: ACTIONS.TICK });
      }, 1000);
    }
    // 清理函数可以访问到外部的 timer
    return () => {
      if (timer) {
        clearInterval(timer);
      }

    };
  }, [state.isActive]); 

  //更新时长
  useEffect(() => {
    
    dispatch({
      type: ACTIONS.UPDATE_DURATIONS,
      payload: {
        workDuration: settings.workDuration,
        breakDuration: settings.breakDuration
      }
    })
  }, [settings.workDuration, settings.breakDuration])

  const renderButtons = () => {
    const buttons = getButtonStates(state.status, state.previousStatus)
    
    return (
      <div>
        {buttons.showStartWork && (
          <button onClick={handleStartWork}>开始工作</button>
        )}
        {buttons.showStartBreak && (
          <button onClick={handleStartBreak}>开始休息</button>
        )}
        {buttons.showPause && (
          <button onClick={handlePause}>暂停</button>
        )}
        {buttons.showResume && (
          <button onClick={handleResume}>继续</button>
        )}
        {buttons.showReset && (
          <button onClick={handleReset}>重置</button>
        )}
      </div>
    )
  }

  const handleStartWork = () => {
    dispatch({ type: ACTIONS.START_WORK })
  }
  
  const handleStartBreak = () => {
    dispatch({ type: ACTIONS.START_BREAK })
  }
  
  const handlePause = () => {
    dispatch({ type: ACTIONS.PAUSE })
  }
  
  const handleResume = () => {
    dispatch({ type: ACTIONS.RESUME })
  }
  
  const handleReset = () => {
    // 可以添加确认对话框
    if (window.confirm('确定要重置计时器吗？')) {
      dispatch({ type: ACTIONS.RESET })
    }
  }

  const getStatusText = (status) => {
    const statusTexts = {
      IDLE: '准备开始',
      WORKING: '专注工作中',
      BREAK: '休息时间',
      PAUSED: '已暂停'
    }
    return statusTexts[status] || '未知状态'
  }

  return (
    <div className="timer-container">
      {/* 状态显示 */}
      <div className="status">
        <h2>{getStatusText(state.status)}</h2>
        <div className="session-info">
          第 {state.currentSession + 1} 个番茄钟
        </div>
      </div>
      
      {/* 时间显示 */}
      <div className="time-display">
        <h1>{formatTime(state.timeLeft)}</h1>
      </div>
      
      {/* 控制按钮 */}
      <div className="controls">
        {renderButtons()}
      </div>
      
      {/* 统计信息 */}
      <div className="stats">
        今日完成：{state.totalSessions} 个番茄钟
      </div>
    </div>
  )
}
