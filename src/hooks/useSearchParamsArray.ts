import { useSearchParams } from 'next/navigation';

export const useSearchParamArray = (array: string[]): string[] => {
	const searchParams = useSearchParams();
	return array.map(el => searchParams.get(el) as string);
};
