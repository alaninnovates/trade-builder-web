import { fonts } from './fonts';
import { Providers } from './providers';
import { AppLayout } from './ui/AppLayout';
import React from 'react';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={fonts.rubik.variable}>
			<body>
				<Providers>
					<AppLayout>{children}</AppLayout>
				</Providers>
			</body>
		</html>
	);
}
