import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/** 類型化的 dispatch / selector，整個 app 都用這兩個 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
