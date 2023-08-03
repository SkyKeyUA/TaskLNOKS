/** @format */

import { useAppSelector } from '@/hooks/redux';

export const useShortUrlsSelector = () => useAppSelector((state) => state.shortUrls);
