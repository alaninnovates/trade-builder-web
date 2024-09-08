import { Container } from '@chakra-ui/react';
import { fonts } from './fonts';
import { Providers } from './providers';
import { AppLayout } from './ui/AppLayout';

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
