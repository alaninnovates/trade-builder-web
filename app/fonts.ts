import { Rubik } from 'next/font/google';
import localFont from 'next/font/local'

const buycat = localFont({
	src: './Buycat.ttf',
});

const rubik = Rubik({
	subsets: ['latin'],
	variable: '--font-rubik',
});

export const fonts = {
	buycat,
	rubik,
};
