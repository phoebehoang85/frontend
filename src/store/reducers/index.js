import { combineReducers } from 'redux'
import substrateReducer from './substrate'
import poolsReducer from './pools'

export const rootReducer = combineReducers({
  substrate: substrateReducer,
  pools: poolsReducer,
})
