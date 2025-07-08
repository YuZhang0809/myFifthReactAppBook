import React, { useReducer } from 'react'

const initialState = {
  // 'IDLE' | 'WORKING' | 'BREAK' | 'PAUSED'
  status: 'IDLE',
  previousStatus: '',
  timeLeft: 0,
  isActive:false,
  currentSession:0,
  totalSessions:0
}

const ACTIONS = {
  START_WORK: 'START_WORK',
  START_BREAK: 'START_BREAK',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  RESET: 'RESET',
  TICK: 'TICK',
  COMPLETE_SESSION: 'COMPLETE_SESSION'
}

function timerReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_WORK:
      return {...state, status:'WORKING', isActive:true, timeLeft: 1500}
    case ACTIONS.START_BREAK:
      return{...state, status:'BREAK', isActive:true, timeLeft: 300}
    case ACTIONS.PAUSE:
      return{...state, status:'PAUSED', isActive:false}
    case ACTIONS.RESUME:
      return{...state, status:state.previousStatus, isActive:true}
    case ACTIONS.RESET:
      return initialState
    case ACTIONS.TICK:
      return{...state, timeLeft:state.timeLeft - 1}
    case ACTIONS.COMPLETE_SESSION:
      return{...state, totalSessions: state.totalSessions + 1}
    default:
      return state;
  }
}

const isVaildTransition = (currentState, action) => {
  const transition = {
    IDLE: ['START_WORK'],
    WORKING: ['PAUSE', 'RESET', 'COMPLETE_WORK'],
    BREAK: ['PAUSE', 'RESET', 'SKIP_BREAK', 'COMPLETE_BREAK'],
    PAUSED: ['RESUME', 'RESET']
  }
  return transition[currentState].includes(action.type)
}

const getButtonStates = (status) => {
  switch (status) {
    case 'IDLE':
      return { showStart: true, showPause: false, showReset: false }
    case 'WORKING':
      return { showStart: false, showPause: true, showReset: true }
    case 'BREAK':
      return { showStart: false, showPause: true, showReset: true, showSkip: true }
    case 'PAUSED':
      return { showStart: false, showResume: true, showReset: true }
  }
}

export default function Timer() {

  const [state, dispatch] = useReducer(timerReducer, initialState)

  return (
    <div>Timer</div>
  )
}
